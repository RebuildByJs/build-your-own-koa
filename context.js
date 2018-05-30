// 代理
let proto = {};

const delegaSet = (property, name) => {
  proto.__defineSetter__(name, (val) => {
    this[property][name] = val;
  });
};

const delegaGet = (property, name) => {
  proto.__defineGetter__(name, () => {
    return this[property][name];
  });
};


let requestSet = [];
let requestGet = [];

let responseSet = ['body', 'status'];
let responseGet = ['body', 'status'];

requestSet.forEach((name) => {
  deleteSet('request', name);
});

requestGet.forEach((name) => {
  deleteGet('request', name);
});

responseSet.forEach((name) => {
  deleteSet('response', name);
});

responseGet.forEach((name) => {
  deleteGet('response', name);
});

module.exports = proto;