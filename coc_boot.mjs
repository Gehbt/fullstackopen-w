#!/usr/bin/env tsx
import concurrently from "concurrently";
import chalk from "chalk";

concurrently(["npm:dev.be", "npm:start"]).then(
  () => {
    console.log(chalk.green("coc success"));
  },
  () => {
    console.error(chalk.red("coc fail"));
  }
);
console.log("concurrently run");
