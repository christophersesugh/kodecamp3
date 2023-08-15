function ConfigMngr() {
  this.configurations = new Map();
}

ConfigMngr.prototype.set = function (key, value) {
  const consfigSym = Symbol(key);
  this.configurations.set(consfigSym, value);
};

ConfigMngr.prototype.get = function (key) {
  const configSym = Symbol(key);
  return this.configurations.get(configSym);
};

const testCM = new ConfigMngr();
testCM.set("api-key", "sdkjsdjjdskjsd998df998df");
testCM.set("username", "Joshua");

console.log(testCM);

console.log(testCM.get("api-key"));
console.log(testCM.get("username"));
