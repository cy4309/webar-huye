const fs = require("fs");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";
// 取得 three 的「安裝根目錄」：從入口檔往上一層
const threeRoot = path.resolve(path.dirname(require.resolve("three")), "..");

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
      // 用「實際安裝的那一份 three」做 alias，避免載入多份
      three: threeRoot,
      "@": path.resolve(__dirname, "src"),
    },
  },
};
