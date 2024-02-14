const path = require("path");
module.exports =
  // other webpack configuration module:
  {
    rules: [
      // other rules
      {
        resolve: {
          // other resolve configuration
          alias: {
            // ignore files in the 'ignore' directory
            ignore: path.resolve(__dirname, "backend"),
          },
        },
      },
    ],
  };
