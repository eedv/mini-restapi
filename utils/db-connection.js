const mongoist = require("mongoist");
module.exports = mongoist(process.env.DB_CONNECTION_URI);