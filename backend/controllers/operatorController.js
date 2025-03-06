// const OperatorService = require("../services/operatorService");
const VideoService = require("../services/videoService");

const operatorController = {
  async generateVideo(req, res) {
    const data = req.body;
    try {
      const video = await VideoService.processVideo(
        data.beneficiary,
        data.name
      );

      res.status(200).json({ data }); // Sending orders as JSON response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = operatorController;
