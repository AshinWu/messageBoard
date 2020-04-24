const moment = require('moment');
const ApiError = require('../error/ApiError');
const ApiErrorNames = require('../error/ApiErrorNames');
const MessageDao = require('../dao/message_dao');

//添加主题
let addTopic = async (ctx) => {
  ctx.set('Content-Type', 'application/json;charset="utf-8"');
  console.log('进入添加主题controller...');
  let session = ctx.session;
  if (JSON.stringify(session) == '{}') {
    throw new ApiError(ApiErrorNames.NOT_SIGNED_IN);
  }
  let { uid, user, title, content } = ctx.request.body;
  await MessageDao.insertToMessageInfo([uid, title, content, moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]).then(res => {
    if (res.affectedRows === 0) {
      throw new ApiError(ApiErrorNames.ADD_TOPIC_ERROR);
    }
    ctx.body = {
      code: 0,
      message: '发表成功',
      data: {
        id: res.insertId,
        uid: uid,
        author: user,
        title: title,
        content: content
      }
    };
    console.log('用户' + user + '发表主题成功');
  })
}

//获取主题列表
let getTopics = async (ctx) => {
  ctx.set('Content-Type', 'application/json;charset="utf-8"');
  console.log('进入获取主题列表controller...');
  let author = ctx.query.author || 'all',
    page = ctx.query.page || 0,
    size = ctx.query.size || 10,
    result = {};
  await MessageDao.countTopics(author)
    .then(res => {
      console.log('获取主题总数成功');
      // topicCount = res[0].count;
      result.count = res[0].count;
    })
  await MessageDao.findTopicList(author, page, size)
    .then(res => {
      console.log('获取列表成功');
      result.raw = res;
      ctx.body = {
        code: 0,
        message: '获取成功',
        data: result
      };
    })
  // await ctx.render('list', {
  //     session: ctx.session,
  //     title: "留言板",
  //     count: topicCount,
  //     topicInfo: result.raw
  // })
}

//修改主题跳转
let getModifyTopic = async (ctx) => {
  console.log('进入修改主题跳转controller...');
  let session = ctx.session;
  if (JSON.stringify(session) == '{}') {
    throw new ApiError(ApiErrorNames.NOT_SIGNED_IN);
  }
  let id = ctx.params.id;
  await MessageDao.findTopicById(id).then(async (res) => {
    if (res.length === 0) {
      throw new ApiError(ApiErrorNames.TOPIC_NOT_EXIST);
    } else {
      // ctx.body = {
      //     code: 0,
      //     message: '获取成功',
      //     data: res
      // };
      //使用ejs模版渲染
      await ctx.render('modify', {
        topic: res,
        session: ctx.session
      })
    }
  })
}

//获取单个主题
let getTopic = async (ctx) => {
  console.log('进入获取单个主题controller...');
  let id = ctx.params.id;
  await MessageDao.findTopicById(id).then(async (res) => {
    if (res.length === 0) {
      throw new ApiError(ApiErrorNames.TOPIC_NOT_EXIST);
    } else {
      ctx.body = {
        code: 0,
        message: '获取成功',
        data: res
      };
    }
  })
}

//修改主题
let modifyTopic = async (ctx) => {
  console.log('进入修改主题controller...');
  let session = ctx.session;
  if (JSON.stringify(session) == '{}') {
    throw new ApiError(ApiErrorNames.NOT_SIGNED_IN);
  }
  let { mid, title, content } = ctx.request.body;
  await MessageDao.updateTopic(mid, [title, content, moment().format('YYYY-MM-DD HH:mm:ss')]).then(res => {
    if (res.affectedRows === 0) {
      throw new ApiError(ApiErrorNames.UPDATE_TOPIC_ERROR);
    }
    ctx.body = {
      code: 0,
      message: '修改成功',
      data: res
    };
  })

}

//删除主题
let deleteTopic = async (ctx) => {
  console.log('进入删除主题controller...');
  let session = ctx.session;
  if (JSON.stringify(session) == '{}') {
    throw new ApiError(ApiErrorNames.NOT_SIGNED_IN);
  }
  let { mid } = ctx.request.body;
  await MessageDao.deteteTopic(mid).then(res => {
    if (res.affectedRows === 0) {
      throw new ApiError(ApiErrorNames.DELETE_TOPIC_ERROR);
    }
    ctx.body = {
      code: 0,
      message: '删除成功',
      data: res
    };
  })
}

//跳转到详情页
let getRedirectDetail = async (ctx) => {
  ctx.set('Content-Type', 'text/html;charset="utf-8"');
  await ctx.render('detail', {
    session: ctx.session
  });
}

module.exports = {
  addTopic,
  getTopics,
  getTopic,
  getModifyTopic,
  modifyTopic,
  deleteTopic,
  getRedirectDetail
};
