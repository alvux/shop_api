/**
 *  @file   ordersService.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Service for orders
 *
 */
const productsService = require("../service/productsService");
const ordersRepository = require("../repository/ordersRepository")



exports.addOrder = async function(order){

    await validateOrder(order);
    await updateProductsInStore(order);
    await saveOrder(order);

}

async function updateProductsInStore(order){
    for(let productInfo of order.products){     
        let product = await productsService.getProduct(productInfo.productId);
        await productsService.updateProductCount(productInfo.productId, product.inventoryCount-productInfo.quantity);
    }
}
async function saveOrder(order){
    let latestOrder = await ordersRepository.getLatestOrder(); 
    let newId;

    if(latestOrder)
        newId = latestOrder.id + 1;
    else
        newId = 1;

    let newOrder = {
        id: newId,
        firstName: order.firstName,
        lastName: order.lastName,
        products: order.products
    }

    await ordersRepository.addOrder(newOrder);
}
async function validateOrder(order){
    let firstName = order.firstName;
    let lastName = order.lastName;
    
    if(typeof firstName !== 'string' || !firstName){
        throw {
            code: 400,
            message: "Bad request. First name should be a string that is not empty"
        }
    }

    if(typeof lastName !== 'string' || !lastName){
        throw {
            code: 400,
            message: "Bad request. Last name should be a string that is not empty"
        }
    }

    for(let product of order.products){
        
        let result = await productsService.getProduct(product.productId);
        
        if(!result){
            throw {
                code: 400,
                message: "Bad Request. The product does not exist"
            }
        }

            
        if (!Number.isInteger(product.quantity) || product.quantity < 1)
            throw {
                code: 400,
                message: "Bad Request. The value of the quantity entered is invalid."
            }
           
        if (product.quantity > result.inventoryCount)
            throw {
                code: 400,
                message: "Bad Request. There are not enough " + result.title +" in stock"
            }
        }

}