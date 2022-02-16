const db = require("../../config/dbConnection");
const crypto = require("crypto");

const dataMerchant = {
  name: "Dummy Merchant",
  phone_number: "081233548796",
  password: "qwerty12345",
  address:
    "Jl. Dummy No.51A RT.03/RW.01, Kec. Sukolilo, Kota SBY, Jawa Timur 60111",
};

const insertQuery = `INSERT INTO merchant (name, phone_number, password, address) VALUES (?, ?, ?, ?);`;

db.query(
  insertQuery,
  [
    dataMerchant.name,
    dataMerchant.phone_number,
    crypto.createHash("sha256").update(dataMerchant.password).digest("hex"),
    dataMerchant.address,
  ],
  (error, results) => {
    if (error) {
      throw err;
    } else {
      console.log(`Data merchant: "${dataMerchant.name}" inserted!`);
    }
  }
);

const dataProduct = [
  {
    merchant_id: 1,
    name: "Dummy Product 1",
    quantity: 2,
    price: 10000,
  },
  {
    merchant_id: 1,
    name: "Dummy Product 2",
    quantity: 3,
    price: 12500,
  },
];

dataProduct.forEach((value) => {
  const insertQuery = `INSERT INTO product (merchant_id, name, quantity, price) VALUES (?, ?, ?, ?);`;

  db.query(
    insertQuery,
    [value.merchant_id, value.name, value.quantity, value.price],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        console.log(`Data product: "${value.name}" inserted!`);
      }
    }
  );
});
