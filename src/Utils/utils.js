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
};

export default Utils;
