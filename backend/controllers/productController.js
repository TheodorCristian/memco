const ProductService = require("../services/productService");

const productController = {
  async getProducts(req, res) {
    try {
      const data = await ProductService.getProducts();

      res.status(200).json({ data }); // Sending orders as JSON response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getProductBySlug(req, res) {
    try { 
        const productSlug = req.params.id;
        const data = await ProductService.getProductBySlug(productSlug);
        res.status(200).json({ data }); // Sending orders as JSON response
    } catch (error) {
        res.status(500).json({error: error.message});
    }
  }
};

module.exports = productController;
