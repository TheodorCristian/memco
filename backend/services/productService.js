const { firestore } = require("../configurations/firebaseconfig");

const ProductService = {
  async getProducts() {
    try {
      const productsSnapshot = await firestore.collection("products").get();
      const products = [];
      productsSnapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      return products; // Return the fetched products
    } catch (error) {
      throw new Error("Error getting products: " + error.message);
    }
  },
  async getProductBySlug(productSlug) {
    

    try {
      const querySnapshot = await firestore
        .collection("products")
        .where("productSlug", "==", productSlug)
        .get();

      if (querySnapshot.empty) {
        throw new Error(`No product found with slug: ${productSlug}`);
      }

      // Return the first document found with the given role name
      const productDocument = querySnapshot.docs[0].data();

      return productDocument;
    } catch (error) {
      throw new Error("Error getting product by Slug: " + error.message);
    }
  },
};

module.exports = ProductService;
