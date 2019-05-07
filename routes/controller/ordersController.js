/**
 *  @file   ordersController.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Controller for the order ressource.
 *
 */

const ordersService = require("../service/ordersService");

exports.addOrder = async function(req, res){
    try{
        let order = req.body 
        await ordersService.addOrder(order)
        res.status(201).send();   
    }
    catch(err){
        res.status(err.code).send(err)
    }
};

