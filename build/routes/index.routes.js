"use strict";

var _express = require("express");
var _database = require("../database");
const router = (0, _express.Router)();
router.get('/ping', async (req, res) => {
  const [result] = await _database.pool.query('SELECT "Pong" AS result');
  res.json(result[0]);
});
module.exports = router;