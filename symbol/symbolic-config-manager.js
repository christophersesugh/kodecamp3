function ConfigMngr() {
  this.configurations = new Map();
  this.keyMap = new Map(); // Map to store the mapping between Symbol keys and original keys
}

ConfigMngr.prototype.set = function (key, value) {
  const configSym = Symbol(key);
  this.configurations.set(configSym, value);
  this.keyMap.set(configSym, key); // Store the mapping between Symbol key and original key
};

ConfigMngr.prototype.get = function (key) {
  const configSym = [...this.keyMap.keys()].find(
    (sym) => this.keyMap.get(sym) === key
  );
  if (configSym) {
    return this.configurations.get(configSym);
  }
  return undefined; // Return undefined if the key isn't found
};

const testCM = new ConfigMngr();
testCM.set("api-key", "sdkjsdjjdskjsd998df998df");
testCM.set("username", "Joshua");

console.log(testCM);

console.log(testCM.get("api-key"));
console.log(testCM.get("username"));
