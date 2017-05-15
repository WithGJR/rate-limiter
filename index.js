module.exports = function ratelimit(opts) {
  opts.max = opts.max || 1000;

  return async function ratelimit(ctx, next) {
    var millisecond = 1,
        second = 1000 * millisecond,
        minute = 60 * second;

    var now = new Date();
    var remainingMinutes = 60 - now.getMinutes();
    var remainingTimeToNextHour = (remainingMinutes * minute) - (now.getSeconds() * second);
    
    var count = await opts.db.incr(`${ctx.request.ip}:count`);

    if (count === 1) {
      opts.db.pexpire([`${ctx.request.ip}:count`, remainingTimeToNextHour]);
    }

    var limitHaveExceeded = count > opts.max;
    var remainingCount = limitHaveExceeded ? 0 : opts.max - count;
    if (limitHaveExceeded) {
      opts.db.set(`${ctx.request.ip}:count`, opts.max);
    }

    ctx.set({
      'X-RateLimit-Remaining': remainingCount,
      'X-RateLimit-Reset': remainingTimeToNextHour
    });

    if (limitHaveExceeded) {
      ctx.status = 429;
    } else {
      await next();
    }
  };
};