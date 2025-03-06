const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middlewares/tokenVerificationMiddleware");
const adminController = require("../controllers/adminController");

// Route for getting orders
router.post("/orders", verifyFirebaseToken, adminController.getOrders);
router.post("/generate-qr-codes", verifyFirebaseToken, adminController.generateQrCodes);

module.exports = router;
