const Koa = require('../index.js');

const app = new Koa();

app.use(async (ctx, next) => {
  // console.log(ctx);
  await next();
});

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
});

app.listen(4000, () => {
  console.log('server listening on 4000');
});