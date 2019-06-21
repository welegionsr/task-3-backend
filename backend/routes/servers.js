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
  console.log("GET request for all servers");
  const [results, metadata] = await pool.execute(
    "SELECT servers.*, hosting_providers.provider_name FROM servers INNER JOIN hosting_providers ON servers.hostingId = hosting_providers.id"
  );
  res.send(results);
});

router.post("/", async function(req, res) {
  console.log(req.body);
  const [results, metadata] = await pool.execute(
    `INSERT INTO servers (alias, ip_address, hostingId, server_status, time_created) VALUES (?, ?, ?, ?, ?)`,
    [
      req.body.alias,
      req.body.ip_address,
      req.body.hostingId,
      req.body.server_status,
      req.body.time_created
    ]
  );
  console.log("added a new server named " + req.body.alias + ". don't forget to say hi!");
  res.send({ status: "success", addedServerIp: req.body.ip_address, addedServerAlias: req.body.alias });
});

router.put("/:id", async function(req, res) {
  console.log(req.body);
  const [results, metadata] = await pool.execute(
    `UPDATE servers SET server_status=? WHERE id=?`,
    [req.body.server_status, req.body.id]
  );
  res.send({ status: "success", updatedId: req.params.id });
});

router.delete("/:id", async function(req, res) {
  const [results, metadata] = await pool.execute(
    `DELETE FROM servers WHERE id=?`,
    [req.params.id]
  );
  res.send({ status: "success", deletedServerId: req.params.id });
});

module.exports = router;
