const productModel = require("../models/product.model");

const getListProduct = (req, res) => {
  const merchantId = req.query.merchant_id;

  productModel.getByMerchant([merchantId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json(results);
    }
  });
};

const addProduct = (req, res) => {
  const { merchant_id, name, quantity, price } = req.body;

  productModel.create(
    [merchant_id, name, quantity, price],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json({
          message: "Product has been added.",
        });
      }
    }
  );
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const { name, quantity, price } = req.body;

  productModel.update([name, quantity, price, productId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Product has been updated.",
      });
    }
  });
};

const softDeleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  productModel.softDelete([productId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Product has been soft deleted.",
      });
    }
  });
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);

  productModel.productDelete([productId], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Product has been deleted.",
      });
    }
  });
};

module.exports = {
  getListProduct,
  addProduct,
  updateProduct,
  softDeleteProduct,
  deleteProduct,
};
