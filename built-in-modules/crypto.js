import { Buffer } from "node:buffer";
const { scrypt, scryptSync, randomFill, createCipheriv, createDecipheriv } =
  await import("node:crypto");

const algorithm = "aes-192-cbc";
//aes: stands for Advanced Encryption Standard and it indicates the algorithm being used is AES
//192: This indicates the key length in bits. In this case, a 192-bit key (24 bytes) is being used.
//cbc: This stands for Cipher Block Chaining, which is a mode of operation for block

// //when you define const algorithms = "aes-192-cbc";, you're creating a constant that holds the string "aes-192-cbc", which can be used to specify the algorithm and its parameters when working with encryption and decryption operations in a cryptographic context.
const password = "password used to generate key";

scrypt(password, "salt", 24, (err, key) => {
  if (err) throw err;
  //scrypt function is used to derive a key from a password using the scrypt key derivation function. The scrypt function is designed to be a memory-hard key derivation function, making it resistant to brute-force and time-memory trade-off attacks. It's commonly used to securely derive encryption keys from user passwords
  randomFill(new Uint8Array(16), (err, iv) => {
    //Unit8Array is a built-in object in Node.js (as well as in browsers) that represents an array of 8-bit unsigned integers. It is designed to work with binary data and allows you to work with raw memory as well as perform various operations on binary data efficiently.
    //In this case a Unit8Array is created with 16 elements initialized to 0
    if (err) throw err;
    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = "";
    cipher.setEncoding("hex");
    cipher.on("data", (chunk) => (encrypted += chunk));
    cipher.on("end", () => console.log(encrypted));

    cipher.write("kodecamp123");
    cipher.end();
  });
});

// this is our encrypted password: b4234199e9193f784dd4fc86f5d5d4ac
// LET US DECRYPT IT

const key = scryptSync(password, "salt", 24);
// The IV is usually passed along with the ciphertext.
const iv = Buffer.alloc(16, 0); // Initialization vector.

const decipher = createDecipheriv(algorithm, key, iv);

let decrypted = "";
decipher.on("readable", () => {
  let chunk;
  while (null !== (chunk = decipher.read())) {
    decrypted += chunk.toString("utf8");
  }
});
decipher.on("end", () => {
  console.log(decrypted);
  // Prints: kodecamp123
});

// Encrypted with same algorithm, key and iv.
const encrypted = "";
decipher.write(encrypted, "hex");
decipher.end();
