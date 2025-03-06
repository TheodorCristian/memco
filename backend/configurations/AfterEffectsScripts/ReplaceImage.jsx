// ReplaceImage.jsx

// ReplaceImageFunction: Replace the image in the specified layer with a new image
function ReplaceImage(newImagePath) {
  try {
      var comp = app.project.activeItem;

      // Check if a composition is active
      if (comp && comp instanceof CompItem) {
          // Replace the image in the specified layer
          var imageLayer = comp.layer("image-placeholder"); // Replace with the actual name of your image layer

          // Create a File object for the new image
          var newImageFile = new File(newImagePath);

          // Import the new image into the project
          var newImage = app.project.importFile(new ImportOptions(newImageFile));

          // Replace the source of the image layer with the new image
          imageLayer.replaceSource(newImage, false);

          // Scale the image layer to 36%
          imageLayer.scale.setValue([36, 36]);
      } else {
          // Alert if no active composition is found
          alert("No active composition found.");
      }
  } catch (error) {
      // Alert if an error occurs
      alert(error.toString());
  }
}

// Call the function with the provided image path
  ReplaceImage(imagePath); // Replace with the actual path to your new image
