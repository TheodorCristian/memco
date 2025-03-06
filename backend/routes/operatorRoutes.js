const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/tokenVerificationMiddleware");
const operatorController = require("../controllers/operatorController");

router.post(
  "/generate-video",
  verifyFirebaseToken,
  operatorController.generateVideo
);

module.exports = router;
