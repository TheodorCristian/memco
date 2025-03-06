const Utils = {
  encryptValue(value) {
    try {
      return btoa(value);
    } catch (err) {
      console.log(err);
    }
  },
  decryptValue(value) {
    try {
      return atob(value);
    } catch (err) {
      console.log(err);
    }
  },

  handlesessionStorageRefresh() {
    window.addEventListener("storage", (event) => {
      if (event.key === "sessionStorageUpdated") {
        // Handle the event here
        // Update session storage or refresh data after receiving the event
        const updatedData = JSON.parse(event.newValue); // Parse the new value from the event

        // Synchronize session storage with updated data received from another tab
        for (const key in updatedData) {
          if (updatedData.hasOwnProperty(key)) {
            sessionStorage.setItem(key, updatedData[key]);
          }
        }
      }
    });
  },

  setBackground(images) {
    const style = {};

    let randomNo = Math.floor(Math.random() * images.length);
    style.backgroundImage = `url(${images[randomNo]})`;
    style.backgroundSize = "cover";
    style.height = "100vh";
    style.width = "100%";
    style.backgroundPosition = "center";
    style.margin = "0";
    style.padding = "0";

    return style;
  },
};

export default Utils;
