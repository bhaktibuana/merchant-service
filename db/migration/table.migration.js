const db = require("../../config/dbConnection");

const createMerchantQuery = `
  CREATE TABLE IF NOT EXISTS merchant (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    phone_number VARCHAR (15) NOT NULL,
    password VARCHAR (200) NOT NULL,
    address VARCHAR (200) NOT NULL,
    join_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
  );
`;

db.query(createMerchantQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table merchant created!");
  }
});

const createProductQuery = `
  CREATE TABLE IF NOT EXISTS product (
    id INT NOT NULL AUTO_INCREMENT,
    merchant_id INT NOT NULL,
    name VARCHAR (50) NOT NULL,
    quantity INT NOT NULL,
    price INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    is_deleted BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id),
    FOREIGN KEY (merchant_id) REFERENCES merchant(id)
  );
`;

db.query(createProductQuery, (error, results) => {
  if (error) {
    throw error;
  } else {
    console.log("Table product created!");
  }
});
