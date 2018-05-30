/**
 * Created by zhangxiang on 2018/04/15
 */
const http = require('http');
const stream = require('stream');
const EventEmitter = require('events');

const compose = require('./compose');
const request = require('./request');

module.exports = class Koa extends EventEmitter {
  constructor() {
    super();
    
    this.proxy = false;
    this.middlewares = [];
    this.context = Object.create(null);
    this.request = Object.create(request);
    this.response = Object.create(null);
  }

  use (func) {
    if (!(typeof func === 'function')) {
      console.error('middleware must be a function.');
      return;
    }
    this.middlewares.push(func);
  }

  listen (...args) {
    
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback () {
    const middlewaresFunc = compose(this.middlewares);

    return (req, res) => {
      const context = this.createContext(req, res);
      return this.handleRequest(context, middlewaresFunc);
    };
  }

  createContext (req, res) {
    const context = Object.create(this.context);
    const request = Object.create(this.request);
    const resposne = Object.create(this.response);
    context.request = response.request = request;
    context.response = request.response = response;
    context.res = this.res = request.res = response.res = res;
    context.req = this.req = request.req = response.req = req;
    context.app = this;
    return context;
  }

  handleRequest (ctx, middlewares) {
    
    const handleResponse = () => { response(ctx); };
    
    return middlewares(ctx).then(handleResponse).catch((err) => { console.log(err); });
  }

};

const emptyCode = [404, 500, 304, 204];

const response  = function (ctx) {
  const res = ctx.res;
  const code = ctx.status;
  let body = ctx.body;

  if (emptyCode.includes(code)) {
    body = null;
    return res.end();
  }

  if (ctx.method === 'HEAD') {
    if (!res.headerSent) {
      ctx.length = Buffer.byteLength(body);
    }
    body = null;
    return res.end();
  }

  if (body == null) {
    body = message[code] || null;
    if (!res.headerSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' === typeof body) return res.end(body);
  if (body instanceof stream) return body.pipe(res);

  body = JSON.stringify(body);
  if (!res.headerSent) {
    ctx.length = Buffer.byteLength(body);
  }
  return res.end(body);
};