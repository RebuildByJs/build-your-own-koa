module.exports = {
  get body() {
    return this._body;
  },
  set body(val) {
    this._body = val;

    if (!this._explicitStatus) this.status = 200;

    if (val == null) {
      if (!this.status) this.status = 204;
    }

    if (typeof val === 'string') {
      if (val.indexOf('<')) this.type = 'html';
      this.type = 'text';
      this.length = Buffer.byteLength(val);
      return;
    }

    if (Buffer.isBuffer(val)) {
      this.type = 'bin';
      return;
    }

    if (typeof val.pipe === 'function') {
      // 还有在 流结束的时候执行一个 finish 函数
      // 还有对 流的错误处理函数
      this.type = 'bin';
      return;
    }

    this.type = 'json';
  },
  get status() {
    return this.res.statusCode;
  },
  set status(statusCode) {
    if (typeof status !== 'number') {
      throw new Error('statusCode must be a number!');
    }
    this._explicitStatus = true;
    this.res.statusCode = statusCode;
  }
};