
const compose = function (middlewares) {
  return (ctx, final) => {
    const index = -1;
    return next(0);
    
    function next (i) {
      if (i < index) {
        throw new Error('cannot excute next function twice in one middleware.');
      }
      index = i;
      if (index === middlewares.length - 1) {
        next = final;
      }
      const func = middlewares[index];
      return Promise.resolve(func(ctx, async () => {
        return await next(i + 1);
      }));
    }
  };

};

module.exports = compose;