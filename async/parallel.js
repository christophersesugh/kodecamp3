import async from "async";
async.parallel(
  [
    function (fn) {
      setTimeout(() => {
        console.log("task 1 completed");
        fn(null, "Result 1");
      }, 1500);
    },
    function (fn) {
      setTimeout(() => {
        console.log("task 2 completed");
        fn(null, "Result 2");
      }, 500);
    },
  ],
  function (error, result) {
    if (error) {
      console.error("Error", error);
    } else {
      console.log("Results", result);
    }
  }
);
