/**
 *  @file   shoppingCartController.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Controller for the shopping cart.
 *
 */
const shoppingCartService = require("../service/shoppingCartService");

exports.getProducts = async function(req, res){
    if (!req.session.cart) {
        req.session.cart = []; 
    }

    let cart = await shoppingCartService.getProducts(req.session.cart)
    res.send(cart);  
};

exports.addProduct = async function(req, res){
    if (!req.session.cart) {
        req.session.cart = [];
    }

    try {
        await shoppingCartService.addProduct( req.session.cart, req.body.productId, req.body.quantity);
        res.status(201).send();
    } catch (err) {
        res.status(err.code).send(err);
    }     
};

exports.updateProduct = async function(req, res){
    if (!req.session.cart) {
        req.session.cart = [];
    }
    try{
     
        let id = Number(req.params.productId);
        await shoppingCartService.updateProduct(req.session.cart, id, req.body.quantity)
        res.status(204).send();
    } catch (err) {
        res.status(err.code).send(err);
    }
};

exports.deleteProduct = function(req, res){
    let id = Number(req.params.productId);
    try{
        shoppingCartService.deleteProduct(req.session.cart, id)
        res.status(204).send();
    } catch (err) {
        res.status(err.code).send(err);
    }
};

exports.deleteProducts = function(req, res){
    req.session.cart = [];
    res.status(204).send();
};