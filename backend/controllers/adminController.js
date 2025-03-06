const AdminService = require("../services/adminService");

const adminController = {
  async getOrders(req, res) {
    try {
      const data = await AdminService.getOrders();
      res.status(200).json({ data }); // Sending orders as JSON response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async generateQrCodes(req, res) {
    const clientData = req.body;
    try {
      const data = await AdminService.generateQrCodes(clientData);
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = adminController;
