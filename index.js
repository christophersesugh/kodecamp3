const obj = { name: "kodecamp", age: 620, secret: "some" };
const jf = (key, value) => {
  if (key === "secret") {
    return null;
  }
  return value;
};
const r = JSON.stringify(obj, jf, 6);

console.log(r);
