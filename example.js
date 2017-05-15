const Koa = require('koa');
const Redis = require('ioredis');
const redis = new Redis();
const app = new Koa();
const ratelimit = require('./index.js');

app.use(ratelimit({
    db: redis,
    max: 1000
}));

app.use((ctx, next) => {
    ctx.body = "hello";
});

app.listen(3000);
console.log('listening on port 3000');