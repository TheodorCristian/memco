const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Route for token verification
router.post("/verify-token", authController.verifyToken);
// Route for new user creation in database using the authentication uid
router.post("/create-new-user", authController.createNewUser);
// Route for getting user roles
router.post("/get-user-roles", authController.getUserRoles);
// Route for seting http cookie for role
router.post('/setup-role-claim', authController.setupRoleClaimForUser);

module.exports = router;
