const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const app = new Koa();

// log request URL 打印请求地址
app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// parser request body  解析请求内容
app.use(bodyParser());


// add controller  添加控制业务逻辑
app.use(controller());

app.listen(3000, () => {
    console.log('app listened at port 3000');
})