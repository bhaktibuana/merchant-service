const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Merchant Service API Server.",
  });
});

module.exports = router;