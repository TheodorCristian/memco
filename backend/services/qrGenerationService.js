const { storage } = require("../configurations/firebaseconfig");
const Utils = require("./utils");
const QRCode = require("qrcode");

async function generateAndUploadQrCode(beneficiary, name, date) {
  let id = Utils.generateRandomId();

  const qrUrl = `http://localhost:3000/${beneficiary}/${name}/${date}/${id}/qr-landing-page`;

  try {
    // Generate QR code
    const qrCode = await QRCode.toDataURL(qrUrl);

    // Convert data URL to buffer
    const qrCodeBuffer = Buffer.from(
      qrCode.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    // Define file path and name
    const filePath = `qr-codes/${beneficiary}/${name}/${name}-qr-code.png`;
    const file = storage.bucket().file(filePath);

    // Upload QR code image to Firebase Storage
    await file.save(qrCodeBuffer, {
      metadata: {
        contentType: "image/png",
      },
    });

    // Get the public URL of the uploaded file
    const publicUrl = await file.getSignedUrl({
      action: "read",
      expires: "01-01-3000", // Modify expiration date if needed
    });

    return publicUrl[0];
  } catch (err) {
    throw new Error("Error generating/uploading QR code: " + err);
  }
}

module.exports = { generateAndUploadQrCode };
