const fs = require("fs");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 5173,
    ...(isDev && {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, "cert/server.key")),
        cert: fs.readFileSync(path.resolve(__dirname, "cert/server.crt")),
      },
    }),
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
