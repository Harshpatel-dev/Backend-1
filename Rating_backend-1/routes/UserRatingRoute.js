const express = require("express");
const router = express.Router();
const ratingController = require("./../controll/controller");

router.route("/").get(ratingController.getAll).post(ratingController.createOne);

module.exports = router;
