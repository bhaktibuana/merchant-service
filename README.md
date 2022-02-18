# merchant-service

merchat-service is a mini-project from Dibimbing course in the form Backend API Server Development. This project used for merchant service of a e-commerce to handle the catalog of products owned by merchants. This project uses [ExpressJs](https://www.npmjs.com/package/express) framework and MySQL as the database.
This project can be accessed online at [https://buana-merchantservice.herokuapp.com](https://buana-merchantservice.herokuapp.com) or you can follow this documentation to use locally on your computer.

# Installation

In the root project directory run `npm install` on your terminal.

# Database Configuration

There are two ways how to setup the database configuration. You can choose one of the methods below:

#### 1st method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Import **./db/merchant_service.sql** file into your MySQL database. It will automatically create new schema named "merchant_service" with its tables and dummy datas.
- Open **./config/dbConnection.js** and you will see the followng code:

```javascript
const mysql = require("mysql");

const db = mysql.createPool({
  host: "YOUR_MYSQL_HOST", // "localhost" by default
  user: "YOUR_MYSQL_USER", // "root" by default
  password: "YOUR_MYSQL_PASSWORD",
  database: "merchant_service",
});

module.exports = db;
```

- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.

#### 2nd method

- The first of all that you have to do is install MySQL database on your computer (this only if you don't have MySQL database yet).
- Open **./config/dbConnection.js** and you will see the code like 1st method above.
- Change the value of **host**, **user** and **password** to your MySQL configuration. If you use another port for your MySQL you can add new **port** property on it.
- In the root project directory open your terminal and run `node ./db/migration/table.migration.js`. It will create the tables that needed.
- After create the tables you can insert the dummy datas into it by running `node ./db/seeder/data.seeder.js` (optional).

# Run The App

- In the root directory you can run `npm start` on your terminal.
- The server uses port: `3000` and it will be running on [http://localhost:3000](http://localhost:3000).

# API Usage

The use of the API in this project is divided into 2 groups namely merchant and product. How to access the API is as follows:

### Merchant

<details>
<summary><b>Register merchant</b></summary>

<p>

`POST` `/merchant`

_Parameters:_ body

- `name` string, min:3, max:50 \*required
- `phone_number` string \*required (only Indonesian mobile phone format)
- `password` string, min:6 \*required
- `password_confirmation` string, min:6 \*required
- `address` string \*required

_Response:_ JSON

- `status: 200` registration success

```json
{
  "message": "Merchant has been registered."
}
```

- `status: 400` registration failed

```json
{
  "message": "Phone number is already registered."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

</p>
</details>

<details>
<summary><b>User login with merchant</b></summary>

<p>

`POST` `/login`

_Parameters:_ body

- `phone_number` string \*required (only Indonesian mobile phone format)
- `password` string, min:6 \*required

_Response:_ JSON

- `status: 200` login success

```json
{
  "message": "Login success",
  "data": {
    "token": "token"
  }
}
```

- `status: 404` merchant doesn't exist

```json
{
  "message": "Phone number is not registered."
}
```

- `status: 400` login failed incorrect password

```json
{
  "message": "Login failed, wrong password"
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

</p>
</details>

<details>
<summary><b>Update merchant</b></summary>

<p>

`PUT` `/merchant`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `name` string, min:3, max:50 \*required
- `phone_number` string \*required (only Indonesian mobile phone format)
- `address` string \*required

_Response:_ JSON

- `status: 200` update success

```json
{
  "message": "Merchant has been updated."
}
```

- `status: 400` phone number already exist

```json
{
  "message": "Phone number is already exist."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

<details>
<summary><b>Update merchant password</b></summary>

<p>

`PUT` `/merchant/updatePassword`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `old_password` string, min:6 \*required
- `new_password` string, min:6 \*required
- `new_password_confirmation` string, min:6 \*required

_Response:_ JSON

- `status: 200` update success

```json
{
  "message": "Merchant has been updated."
}
```

- `status: 400` update failed wrong possword

```json
{
  "message": "Old password is incorrect."
}
```

- `status: 400` new password equal to old password

```json
{
  "message": "New password cannot be the same as the old password."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

<details>
<summary><b>Soft delete merchant</b></summary>

<p>

`PUT` `/merchant/softDelete`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `password` string, min:6 \*required

_Response:_ JSON

- `status: 200` soft delete success

```json
{
  "message": "Merchant has been soft deleted."
}
```

- `status: 400` soft delete failed, incorrect password

```json
{
  "message": "Password is incorrect."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

<details>
<summary><b>Delete merchant</b></summary>

<p>

`DELETE` `/merchant`

\* Careful! Deleting a merchant causes the product list at that merchant to be deleted as well. For safe, use soft delete merchant instead of using delete merchant.

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `password` string, min:6 \*required

_Response:_ JSON

- `status: 200` delete success

```json
{
  "message": "Merchant has been deleted."
}
```

- `status: 400` delete failed, incorrect password

```json
{
  "message": "Password is incorrect."
}
```

- `status: 400` parameters validation failed

```json
{
  "message": {
    "param_key": ["error message array"]
  }
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

### Product

<details>
<summary><b>Get list of product</b></summary>

<p>

`GET` `/product`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ none

_Response:_ JSON

- `status: 200` get data success

```json
[
  {
    "id": "int",
    "name": "string",
    "quantity": "int",
    "price": "int"
  }
]
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

<details>
<summary><b>Add product</b></summary>

<p>

`POST` `/product`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ body

- `name` string, min:3, max:50 \*required
- `quantity` integer, min:1 \*required
- `price` integer, min:10000 \*required

_Response:_ JSON

- `status: 200` add product success

```json
{
  "message": "Product has been added."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

<details>
<summary><b>Update product</b></summary>

<p>

`PUT` `/product/{id}`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ path, body

- `id` integer \*required (path)
- `name` string, min:3, max:50 \*required (body)
- `quantity` integer, min:1 \*required (body)
- `price` integer, min:10000 \*required (body)

_Response:_ JSON

- `status: 200` update product success

```json
{
  "message": "Product has been updated."
}
```

- `status: 404` product not found

```json
{
  "message": "Product with id '{id}' not found in your merchant."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

<details>
<summary><b>Soft delete product</b></summary>

<p>

`PUT` `/product/softDelete/{id}`

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ path

- `id` integer \*required

_Response:_ JSON

- `status: 200` soft delete product success

```json
{
  "message": "Product has been soft deleted."
}
```

- `status: 404` product not found

```json
{
  "message": "Product with id '{id}' not found in your merchant."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

<details>
<summary><b>Delete Product</b></summary>

<p>

`DELETE` `/product/{id}`

\* Careful! Deleting a product causes the product to be deleted from the database. For safe, use soft delete product instead of using delete product.

_Authorization:_ Bearer Token

- `token` token from login response \*required

_Parameters:_ path

- `id` integer \*required

_Response:_ JSON

- `status: 200` delete product success

```json
{
  "message": "Product has been deleted."
}
```

- `status: 404` product not found

```json
{
  "message": "Product with id '{id}' not found in your merchant."
}
```

- `status: 401` unauthorized

```json
{
  "message": "Unauthorized"
}
```

- `status: 400` wrong authorization format

```json
{
  "auth": false,
  "message": "Wrong authorization format"
}
```

- `status: 401` token expired

```json
{
  "auth": false,
  "message": "Token expired"
}
```

- `status: 401` authorization failed

```json
{
  "auth": false,
  "message": "Invalid Token"
}
```

</p>
</details>

To see the response you can do API testing using an application like [Postman](https://www.postman.com/).
If you have inserted the dummy datas you can use dummy merchant for login with phone number **081235971089** and password **qwerty12345**.
You can also import this project's postman_collection at **./postman_collection/merchant-service.postman_collection.json** to your [Postman](https://www.postman.com/).

I hope you guys like this project and ENJOY!!! :grin:
