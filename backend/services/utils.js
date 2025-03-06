const Utils = {
  generateRandomId() {
    let randomId = "";
    const idLength = 10;

    for (let i = 0; i < idLength; i++) {
      randomId += Math.floor(Math.random() * 10); // Appends a random digit (0-9)
    }

    return randomId;
  },
};

module.exports = Utils;
