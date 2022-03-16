const express = require("express");
const accountStatsCtrl = require("../controllers/accountStatsctrl");

const accountStatsRoute = express.Router();

accountStatsRoute.get("/api/accounts-statistics", accountStatsCtrl);

module.exports = accountStatsRoute;