# Rate Limiter

A rate limit middleware designed for Koa2.

## Usage

```javascript
const Redis = require('ioredis');
const redis = new Redis();
const ratelimit = require('./index.js');

app.use(ratelimit({
  db: redis,
  max: 1000
}));
```
### Available Options

1. `db`: An instance of `ioredis` package
2. `max`: Max request number per visitor every hour
