import log from './utils/log'
import middleware from './middleware'
import compose from 'koa-compose'
import Router from 'koa-router'
import Koa from 'koa'
const port = process.env.PORT || 3001
const app = new Koa()

app.use(middleware())
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} ${ctx.status} - ${ms}ms`);
});

let router = new Router()
// 监听 POST 请求
router.post('/', ctx => {
  const body = ctx.request.body
  // 分发 url
  io.emit('url', body.url);
  return ctx.status = 200
})

app.use(compose([
  router.routes(),
  router.allowedMethods()
]))

let server = require('http').Server(app.callback())
let io = require('socket.io')(server)
// 开启服务器
server.listen(port);
log.info(`Now running on localhost:${port}`);

export default app;