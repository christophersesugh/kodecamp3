const { Duplex, Transform } = require("stream");

// const myStream = new Duplex({
//   read(size) {
//     this.push(`${size} bytes of data \n`);
//     if (size >= 20) {
//       this.push(null);
//     }
//   },
//   write(chunk, encoding, fn) {
//     console.log(chunk.toString());
//     fn();
//   },
// });

// myStream.pipe(process.stdout);
// myStream.write("Hello");
// myStream.write("Stream");
// myStream.end();

const upperase = new Transform({
  transform(chunk, encoding, fn) {
    const upperCase = chunk.toString().toUpperCase();
    this.push(upperCase);
    // this.push(null);c
    fn();
  },
});

process.stdin.pipe(upperase).pipe(process.stdout);
