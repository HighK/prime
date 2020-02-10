const express = require("express");
const router = express.Router();
const models = require("../models");

router.post("/", async function(req, res, next) {
  const post = await models.projects.findAll({
    order: [["project_id", "DESC"]]
  });
  res.send(post);
});

router.post("/create", async function(req, res, next) {
  const data = req.body;
});

module.exports = router;
