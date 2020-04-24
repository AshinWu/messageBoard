const moment = require('moment');
const fs = require('fs');
const md5 = require('md5');

const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const userDao = require('../dao/user_dao');

//获取用户
let getUserById = async (ctx) => {
  await userDao.findUserById(ctx.query.id).then(reslut => {
    let res = reslut;
    // console.log(JSON.stringify(res));
    if (res) {
      ctx.body = {
        username: res[0].ui_nickname,
        pic: res[0].ui_pic,
        profile: res[0].ui_profile,
        createTime: res[0].ui_create_time
      };
    }
  })

}

//用户注册
let userRegister = async (ctx) => {
  ctx.set('Content-Type', 'application/json;charset="utf-8"');
  console.log('进入注册controller...');
  let { name, password, repeatpass, pic } = ctx.request.body;
  await userDao.findUserByName(name).then(async (result) => {
    // console.log(result);
    if (result[0]) {
      throw new ApiError(ApiErrorNames.USER_ALREADY_EXIST);
    } else if (password !== repeatpass || password.trim() === '') {
      throw new ApiError(ApiErrorNames.PASS_WORD_ERROR);
    } else {
      let getName = 'default';//默认头像文件名
      if (pic) {
        getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
        let base64Data = pic.replace(/^data:image\/\w+;base64,/, ""),
          dataBuffer = Buffer.from(base64Data, 'base64'),
          upload = await new Promise((reslove, reject) => {
            fs.writeFile('./public/images/user_pic/' + getName + '.png', dataBuffer, err => {
              if (err) {
                throw err;
                reject(false);
              };
              reslove(true);
              console.log('头像上传成功');
            });
          });
      }
      console.log("当前时间" + moment().format('YYYY-MM-DD HH:mm:ss').valueOf());
      //写入用户登录表
      let insertId;
      await userDao.registerUser([name, md5(password), 1, moment().format('YYYY-MM-DD HH:mm:ss')]).then(async res => {
        if (res.affectedRows == 0) {
          console.log('注册失败');
          return;
        }
        insertId = res.insertId;
        //同时写入用户信息表
        await userDao.insertToUserInfo([res.insertId, getName + '.png', moment().format('YYYY-MM-DD HH:mm:ss')])
      }).then(res => {
        ctx.session = {
          //将用户名和id存入session
          user: name,
          id: insertId,
          pic: getName + '.png'
        };
        console.log('登录id为' + insertId + '，注册成功');
        //注册成功
        ctx.body = {
          code: 0,
          message: '注册成功'
        };
      })
    }
  })
}

//用户登录
let userLogin = async (ctx) => {
  ctx.set('Content-Type', 'application/json;charset="utf-8"');
  console.log('进入登录controller...');
  let { username, password } = ctx.request.body;
  let result;
  await userDao.findUserByName(username).then(async res => {
    result = res;
    if (res.length && username === res[0]['ul_account'] && md5(password) === res[0]['token']) {
      console.log('用户' + JSON.stringify(res));
      await userDao.updateLoginStatus(username, [1])
    } else {
      ctx.body = {
        code: ApiErrorNames.getErrorInfo(ApiErrorNames.USER_LOGIN_ERROR).code,
        message: ApiErrorNames.getErrorInfo(ApiErrorNames.USER_LOGIN_ERROR).message
      }
      console.log('登录失败');
    }
  }).then(res => {
    ctx.session = {
      //将用户名和id存入session
      user: result[0]['ul_account'],
      id: result[0]['ul_id'],
      pic: result[0]['ui_pic']
    };
    ctx.body = {
      code: 0,
      message: '登录成功'
    };
    console.log('session', ctx.session);
    console.log('用户' + username + '登录成功');
  })
}

//用户登出
let userLoginout = async (ctx) => {
  ctx.set('Content-Type', 'application/json;charset="utf-8"');
  console.log('进入登出controller...');
  let name = ctx.request.query.user;
  await userDao.updateLoginStatus(name, [0]).then(result => {
    let res = result;
    if (res.affectedRows > 0) {
      //清空session
      ctx.session = null;
      ctx.body = {
        code: 0,
        message: '登出成功'
      };
    }
  })
}

//测试用户登录
let testLogin = async (ctx) => {
  console.log('进入测试登录controller...');
  let name = ctx.params.name;
  await userDao.checkIsLogin(name).then(res => {
    console.log(res);
    if (res.length !== 0) {
      ctx.body = {
        code: 0,
        message: 'success',
        data: {
          isLogin: 'true',
          username: name
        }
      };
    } else {
      ctx.body = {
        code: -1,
        message: 'success',
        data: {
          isLogin: 'false'
        }
      };
    }
  })
}

module.exports = {
  getUserById,
  userRegister,
  userLogin,
  userLoginout,
  testLogin
};
