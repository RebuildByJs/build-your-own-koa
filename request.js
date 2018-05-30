const url = require('url');

module.exports = {
  get header() {
    return this.req.headers;
  },
  set header(value) {
    this.req.headers = value;
  },
  get headers() {
    return this.header;
  },
  set headers(value) {
    this.header = value;
  },
  get method() {
    return this.req.method;
  },
  set method(value) {
    this.req.method = value;
  },
  get url() {
    return this.req.url;
  },
  set url(value) {
    this.req.url = value;
  },
  get querystring() {
    return url.parse(this.url).search || '';
  },
  get query() {
    return url.parse(this.url).query || '';
  }
};