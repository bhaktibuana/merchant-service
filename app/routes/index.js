const express = require("express");
const productRoutes = require("../controllers/product.controller");
const productMiddleware = require("../middlewares/product.middleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Merchant Service API Server.",
  });
});

router.get("/product", productRoutes.getListProduct);
router.post("/product", productMiddleware.productValidation, productRoutes.addProduct);
router.put("/product/:id", productMiddleware.productValidation, productRoutes.updateProduct);
router.put("/product/softDelete/:id", productRoutes.softDeleteProduct);
router.delete("/product/:id", productRoutes.deleteProduct);

module.exports = router;
