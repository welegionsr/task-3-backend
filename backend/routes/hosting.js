var express = require("express");
var router = express.Router();
var mysql = require("mysql2/promise");

let pool;
(async function initializePool() {
  pool = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "vmware_ripoff",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
})();

router.get("/", async function(req, res) {
  console.log("GET request for all hosting providers");
  const [results, metadata] = await pool.execute(
    "SELECT * FROM hosting_providers"
  );
  res.send(results);
});

module.exports = router;
