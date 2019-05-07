/**
 *  @file   productsController.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Controller for the products
 *
 */
const productsService = require("../service/productsService");

exports.getProducts = async function(req, res){
    let criteria = req.query.criteria;
    let products = await productsService.getProducts(criteria);
    res.send(products);   
};

exports.getProduct = async function(req, res){    

    try {
        let id = Number(req.params.productId);
        let product = await productsService.getProduct(id);
        res.send(product);
    }
    catch (err) {
        res.status(err.code).send(err);
    }   
};