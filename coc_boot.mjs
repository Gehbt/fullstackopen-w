import concurrently from "concurrently";

concurrently(["npm:dev.be", "npm:start"]).then(
  () => {
    console.log("success");
  },
  () => {
    console.log("fail");
  }
);
