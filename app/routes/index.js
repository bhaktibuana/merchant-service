const express = require("express");
const productRoutes = require("../controllers/product.controller");
const merchantRoutes = require("../controllers/merchant.controller");
const productMiddleware = require("../middlewares/product.middleware");
const merchantMiddleware = require("../middlewares/merchant.middleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Merchant Service API Server.",
  });
});

// product router
router.get("/product", productRoutes.getListProduct);
router.post("/product", productMiddleware.productValidation, productRoutes.addProduct);
router.put("/product/:id", productMiddleware.productValidation, productRoutes.updateProduct);
router.put("/product/softDelete/:id", productRoutes.softDeleteProduct);
router.delete("/product/:id", productRoutes.deleteProduct);

// merchant router
router.post("/merchant", merchantMiddleware.createValidation, merchantRoutes.registerMerchant);
router.put("/merchant/:id", merchantMiddleware.updateValidation, merchantRoutes.updateMerchant);
router.put("/merchant/updatePassword/:id", merchantMiddleware.updatePasswordValidation, merchantRoutes.updateMerchantPassword);
router.put("/merchant/softDelete/:id", merchantMiddleware.deleteValidaiton, merchantRoutes.softDeleteMerchant);
router.delete("/merchant/:id", merchantMiddleware.deleteValidaiton, merchantRoutes.deleteMerchant);

module.exports = router;
