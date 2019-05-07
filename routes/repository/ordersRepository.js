/**
 *  @file   orderRepository.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Repository for orders.
 *
 */
let dbModel = require("../../db/db");

exports.addOrder = async function(newOrder){  
    let orderToSave = new dbModel.Order(newOrder);
    await orderToSave.save();
    
};

exports.getLatestOrder = async function(){  
    return await dbModel.Order.findOne().sort({ id: -1 }).limit(1)
   
};