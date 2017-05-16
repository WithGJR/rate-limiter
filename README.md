# Rate Limiter

A rate limit middleware designed for Koa2.

## Installation

`npm install koa-rate-limiter --save`

## Usage

```javascript
const Koa = require('koa');
const Redis = require('ioredis');
const redis = new Redis();
const app = new Koa();
const ratelimit = require('koa-rate-limiter');

app.use(ratelimit({
    db: redis,
    max: 1000
}));

app.use((ctx, next) => {
    ctx.body = "hello";
});

app.listen(3000);
console.log('listening on port 3000');
```
### Available Options

1. `db`: A redis connection instance
2. `max`: Max request number per visitor(more precisely, an IP address) every hour

## Response Headers

Everytime a HTTP request comes in, two response headers will be set:

1. X-RateLimit-Remaining: Indicate how many HTTP requests a visitor can send before the limit is reached.
2. X-RateLimit-Reset: Indicate remaining time to next hour (in millisecond). In other word, when will the count be reset again.
