/**
 *  @file   index.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Routes of the API
 *
 */
const express = require("express");
const router = express.Router();
const productsController = require("./controller/productsController");
const shoppingCartController = require("./controller/shoppingCartController");
const ordersController = require("./controller/ordersController");


/*-----------------Products-----------------------*/
router.get("/api/products", productsController.getProducts);
router.get("/api/products/:productId", productsController.getProduct);

/*-----------------ShoppingCart-----------------------*/
router.get("/api/shoppingCart", shoppingCartController.getProducts);
router.post("/api/shoppingCart", shoppingCartController.addProduct);
router.put("/api/shoppingCart/:productId", shoppingCartController.updateProduct);
router.delete("/api/shoppingCart/:productId", shoppingCartController.deleteProduct);
router.delete("/api/shoppingCart", shoppingCartController.deleteProducts);


/*-----------------Orders-----------------------*/
router.post("/api/order", ordersController.addOrder);



module.exports = router;