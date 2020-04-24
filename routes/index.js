const router = require('koa-router')();
const userController = require('../app/controllers/user_controller');
const messageController = require('../app/controllers/message_controller');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '留言板',
    session: ctx.session,
  })
})

//注册
router.post('/signup', userController.userRegister);

//登录
router.post('/login', userController.userLogin);

//登出
router.get('/logout', userController.userLoginout);

//测试用户登录
router.get('/testlogin/:name', userController.testLogin);

//添加主题
router.put('/addtopic', messageController.addTopic);

//获取主题列表
router.get('/gettopics', messageController.getTopics);

//获取单个主题
router.get('/gettopic/:id', messageController.getTopic);

//主题详情页
router.get('/detail/:id', messageController.getRedirectDetail);

//跳转到修改主题
router.get('/getmodifytopic/:id', messageController.getModifyTopic);

//修改主题
router.post('/modifytopic', messageController.modifyTopic);

//删除主题
router.delete('/deletetopic', messageController.deleteTopic);

module.exports = router;
