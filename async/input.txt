import async from "async";

async.waterfall(
  [
    function (fn) {
      fn(null, "step 1 ");
    },
    function (prevResults, fn) {
      console.log("Previous results", prevResults);
      const updatedR = prevResults + "-> step 2";
      fn(null, updatedR);
    },
    function (prevResults, fn) {
      console.log("Previous results", prevResults);
      const updatedR = prevResults + "-> step 3";
      fn(null, updatedR);
    },
  ],
  function (error, results) {
    if (error) {
      console.error("Error", error);
    } else {
      console.log("Final results", results);
    }
  }
);
