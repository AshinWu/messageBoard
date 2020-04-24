const Koa = require('koa');
const app = new Koa();
const path = require('path');
const router = require('koa-router')();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const staticCache = require('koa-static-cache')

const index = require('./routes/index');
const dbConfig = require('./config/db');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

// 配置服务端模板渲染引擎中间件
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))
 
// session存储配置
const sessionMysqlConfig= {
  user: dbConfig.database.USERNAME,
  password: dbConfig.database.PASSWORD,
  database: dbConfig.database.DATABASE,
  host: dbConfig.database.HOST,
}

// 配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  //响应间隔时间
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
})

// 缓存
app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))
app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
  maxAge: 365 * 24 * 60 * 60
}))

router.use(index.routes(), index.allowedMethods()); 

app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
