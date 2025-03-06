const Creatomate = require("creatomate");
const client = new Creatomate.Client("2e76414a78ce4f64bc25a82afeda3c9e582a7fb5580a60f01829f772e0bf1c44b00ef6b3928d8fd3cba63b0dcd38282e");
const StorageService = require("../services/storageService");

const VideoService = {
  async processVideo(beneficiary, name) {

    const options = {
      // The ID of the template that you created in the template editor
      templateId: '69d243a7-23bb-4dce-9793-2278a046f2d0',
      // Modifications that you want to apply to the template
      modifications: {
        'Image-placeholder': 'https://firebasestorage.googleapis.com/v0/b/qr-memories-collage-app-95f04.appspot.com/o/qr-codes%2Ftheodor-petre%2Fantonia-theo%2Fimage.jpg?alt=media&token=18f7f8fb-03c4-4592-84a3-242dc3b83753'
      },
    };
    const renders = await client.render(options);
    console.log(renders);

  },
};

module.exports = VideoService;

