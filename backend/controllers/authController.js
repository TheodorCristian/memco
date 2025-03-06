const AuthService = require("../services/authService");

const authController = {
  async verifyToken(req, res) {
    const token = req.headers.authorization;
    const tokenWithoutBearer = token ? token.slice(7) : null;

    try {
      let tokenResult = await AuthService.verifyToken(tokenWithoutBearer);
      res.status(200).json({ message: "Token verified", tokenResult });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createNewUser(req, res) {
    const data = req.body.data;
    try {
      let result = await AuthService.createNewUser(data);
      res.status(200).json({
        message: "User created successfully!",
        result: result.isSuccess,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserRoles(req, res) {
    const uid = req.body.uid;

    try {
      let result = await AuthService.getUserRoles(uid);
      res.status(200).json({
        message: "User roles returned successfuly!",
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async setupRoleClaimForUser(req, res) {
    try {
      const role = req.body.role;
      const uid = req.body.uid;
      let result = await AuthService.setupRoleClaimForUser(role, uid);
      res.status(200).json({
        message: "User roles added successfully!",
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Other authentication-related controller methods...
};

module.exports = authController;
