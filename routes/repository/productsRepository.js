/**
 *  @file   productsRepository.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Repository for products.
 *
 */

let dbModel = require("../../db/db");

exports.getProducts = async function(cat){
    let products = [];
    products = await dbModel.Product.find({},{_id:0});
    return products;
}

exports.getProduct = async function(id){
    let product = await dbModel.Product.findOne({id:id},{_id:0});
    return product;
};

exports.updateProductCount = async function(id, newCount){
    await dbModel.Product.update({id:id}, { inventoryCount: newCount })
};