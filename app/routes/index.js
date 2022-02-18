const express = require("express");
const productRoutes = require("../controllers/product.controller");
const merchantRoutes = require("../controllers/merchant.controller");
const loginRoutes = require("../controllers/login.controller");
const productMiddleware = require("../middlewares/product.middleware");
const merchantMiddleware = require("../middlewares/merchant.middleware");
const loginMiddleware = require("../middlewares/login.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Merchant Service API Server.",
  });
});

// product router
router.get("/product", authMiddleware.isAuthenticate, productRoutes.getListProduct);
router.post("/product", authMiddleware.isAuthenticate, productMiddleware.productValidation, productRoutes.addProduct);
router.put("/product/:id", authMiddleware.isAuthenticate, productMiddleware.productValidation, productRoutes.updateProduct);
router.put("/product/softDelete/:id", authMiddleware.isAuthenticate, productRoutes.softDeleteProduct);
router.delete("/product/:id", authMiddleware.isAuthenticate, productRoutes.deleteProduct);

// merchant router
router.post("/merchant", merchantMiddleware.createValidation, merchantRoutes.registerMerchant);
router.put("/merchant", authMiddleware.isAuthenticate, merchantMiddleware.updateValidation, merchantRoutes.updateMerchant);
router.put("/merchant/updatePassword", authMiddleware.isAuthenticate, merchantMiddleware.updatePasswordValidation, merchantRoutes.updateMerchantPassword);
router.put("/merchant/softDelete", authMiddleware.isAuthenticate, merchantMiddleware.deleteValidaiton, merchantRoutes.softDeleteMerchant);
router.delete("/merchant", authMiddleware.isAuthenticate, merchantMiddleware.deleteValidaiton, merchantRoutes.deleteMerchant);

// login router
router.post("/login", loginMiddleware.loginValidation, loginRoutes.login);

module.exports = router;
