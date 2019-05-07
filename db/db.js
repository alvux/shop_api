/**
 *  @file   db.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Database models
 *
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema({
  id: { type: Number, unique: true },
  firstName: String,
  lastName: String,
  products: Array
}, { versionKey: false });


const Product = new Schema({
  id: { type: Number, unique: true },
  title: String,
  price: Number,
  inventoryCount: Number
}, { versionKey: false });

let order = mongoose.model("Order", Order);
let product = mongoose.model("Product", Product);

mongoose.Promise = global.Promise;


mongoose.connect("mongodb://shopAPI:shopAPI1@ds161104.mlab.com:61104/shop", { useNewUrlParser: true });

module.exports = {
  Order: order,
  Product: product
};
