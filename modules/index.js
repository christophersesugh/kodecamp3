// const mod = (function () {
//   let privateProp = "hello, i am private";
//   function priv() {
//     console.log("I am private");
//   }
//   return {
//     publicV: "I am public",
//     publicM: function () {
//       console.log("I am a public function ");
//     },
//   };
// })();

// console.log(mod.publicV);
// mod.publicM();
// console.log(mod.priv);
// module.exports = mod;

class Mod {
  constructor() {
    if (!Mod.insatnce) {
      Mod.instance = this;
    }
    return Mod.insatnce;
  }
}
export default new Mod();
