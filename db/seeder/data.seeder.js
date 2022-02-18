const db = require("../../config/dbConnection");
const crypto = require("crypto");

const dataMerchant = {
  name: "Valorant Store",
  phone_number: "081235971089",
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
    name: "Jett Valorant T-Shirt Premium Duelist Series",
    quantity: 10,
    price: 149000,
  },
  {
    merchant_id: 1,
    name: "Chamber Valorant T-Shirt Premium Sentinel Series",
    quantity: 10,
    price: 149000,
  },
  {
    merchant_id: 1,
    name: "Omen Valorant Hoodie Premium Controller Series",
    quantity: 5,
    price: 219000,
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
