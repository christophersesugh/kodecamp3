import async from "async";

const arr = [1, 2, 3, 7, 8];

async.each(
  arr,
  function (item, fn) {
    console.log("Processing item:", item * 2);
    fn();
  },
  function (error) {
    if (error) {
      console.error("Error", error);
    } else {
      console.log("All items processed");
    }
  }
);
