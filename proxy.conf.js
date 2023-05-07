const PROXY_CONFIG = [
  {
    context: ["/infracao"],
    target: "http://localhost:8083",
    secure: false,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;