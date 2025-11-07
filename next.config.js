const {
  withBlitz
} = require("@blitzjs/next");

module.exports = withBlitz({
  blitz: {},
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/homepage/index.html",
      },
      {
        source: "/about",
        destination: "/homepage/about.html"
      }
    ];
  },
  compiler: {
    removeConsole: true,
  },
});
