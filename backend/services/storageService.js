const { storage } = require("../configurations/firebaseconfig");

const StorageService = {
  async uploadFile(filePath, fileBuffer, metadata) {
    try {
      const fileRef = storage.bucket().file(filePath);
      await fileRef.save(fileBuffer, {
        metadata: {
          ...metadata,
        },
      });
      return `File ${filePath} uploaded successfully`;
    } catch (err) {
      throw new Error(`Could not upload file ${filePath}`);
    }
  },

  async downloadFile(filePath, downloadFileDestination) {
    try {
      const fileRef = storage.bucket().file(filePath);
      const [file] = await fileRef.download({
        destination: downloadFileDestination,
      });
      return file;
    } catch (err) {
      throw new Error(`Could not download file ${filePath}: ${err}`);
    }
  },

  async deleteFile(filePath) {
    try {
      const fileRef = storage.bucket().file(filePath);
      await fileRef.delete();
      return `File ${filePath} deleted successfully`;
    } catch (err) {
      throw new Error(`Could not delete file ${filePath}`);
    }
  },

  // Function to create a new folder in Firebase Storage
  async createFolder(folderName) {
    try {
      const bucket = storage.bucket(); // Access the default Firebase Storage bucket

      // Create a reference to the new folder
      const folder = bucket.folder(folderName);

      // Create the new folder by uploading a placeholder file
      // This action automatically creates the folder if it doesn't exist
      await folder.upload(Buffer.from(""), {
        destination: "__placeholder__/placeholder.txt", // Uploading an empty file to create the folder
        metadata: {
          contentType: "text/plain", // Change the content type as needed
        },
      });

      return true;
    } catch (error) {
      console.error("Error creating folder:", error);
      return false;
    }
  },

  // Other storage-related functions...
};

module.exports = StorageService;
