const { firestore } = require("../configurations/firebaseconfig");
const QRService = require("../services/qrGenerationService");

const AdminService = {
  async getOrders() {
    try {
      const ordersSnapshot = await firestore.collection("orders").get();
      const orders = [];
      ordersSnapshot.forEach((doc) => {
        orders.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      return orders; // Return the fetched orders
    } catch (error) {
      throw new Error("Error getting orders: " + error.message);
    }
  },

  async generateQrCodes(data) {
    try {
      // create beneficiary folder in storage
      // for each name in names, create folder, generate qrcode and upload image to folder
      const names = data.names.split(",");

      let urls = [];
      for (const index in names) {
        let url = await QRService.generateAndUploadQrCode(
          data.beneficiary,
          names[index],
          data.date
        );
        urls.push(url);
      }

      return urls;
    } catch (error) {
      throw new Error("Error creating QR Codes: " + error.message);
    }
  },

};

module.exports = AdminService;
