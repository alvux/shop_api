/**
 *  @file   shoppingCartService.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Service for the shoppingCart
 *
 */
const productsService = require("../service/productsService");

exports.getProducts = async function(cart){
    let content = {
        cart: cart,
        totalAmount: await calculateTotalAmount(cart)
    };

    return content;
}
exports.addProduct = async function(cart, id, quantity){
   
    validateId(id);
    
    let product = await productsService.getProduct(id);
    validateAddProductBody(cart, id, quantity, product);

    let entry = {productId : id , quantity: quantity};
    cart.push(entry);
};

exports.updateProduct = async function(cart, id, newQte){
   
    validateId(id);
    let index = getIndexOfProductInCart(cart,id);
    let product = await productsService.getProduct(id);
    validateUpdateProductBody(newQte, product);   
    
    let newEntry = {productId : id , quantity: newQte};
    cart.splice(index, 1, newEntry);
};

exports.deleteProduct = function(cart, id){
    validateId(id);
    let index = getIndexOfProductInCart(cart,id); 
    
    cart.splice(index, 1);
};


function validateId(id){
    if(!Number.isInteger(id) || id < 0){
        throw {
            code: 400,
            message: "Bad request. The id must be a positive integer"
        }
    }
}

function validateAddProductBody(cart, id, quantity, product){
    isProductNotInCart(cart,id);
    isQuantityValid(quantity,product);
}

function validateUpdateProductBody(quantity, product){
    isQuantityValid(quantity,product);
}


function isProductNotInCart(cart, id){
    if (cart.findIndex(i => i.productId == id) >= 0)
        throw {
            code: 400,
            message: "Bad Request. The product is already in the cart"
        }
    else
        return true;
}

function getIndexOfProductInCart(cart, id){

    let index = cart.findIndex(i => i.productId == id);
    
    if (index < 0) 
        throw {
            code: 404,
            message: "Not Found. The product does not exist in the cart"
        };
    else
        return index;
}

function isQuantityValid(quantity, product){
    if (!Number.isInteger(quantity) || quantity < 1)
        throw {
            code: 400,
            message: "Bad Request. The value of the quantity entered is invalid."
        };
       
    if (quantity > product.inventoryCount)
        throw {
            code: 400,
            message: "Bad Request. There are not enough of the product in stock"
        };
    return true;
}

async function calculateTotalAmount(cart){
    let totalAmount = 0;
    if(cart.length){
        for(let item of cart){
            let product = await productsService.getProduct(item.productId);   
            totalAmount += product.price * item.quantity;
        }
    }

    return totalAmount.toFixed(2);

}
