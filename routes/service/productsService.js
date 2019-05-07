
/**
 *  @file   productsService.js
 *  @author  Alexandre Vu
 *  @date    1/19/2019
 *
 *  @section DESCRIPTION
 *
 * Service for products
 *
 */
const productsRepository = require("../repository/productsRepository")

exports.getProducts = async function(criteria){
    
    let products = await productsRepository.getProducts();
   
    if(criteria === "available"){
        return filterAvailableProducts(products);
    }
    return products;
 };

exports.getProduct = async function(id){
    validateId(id);
    
    let product = await productsRepository.getProduct(id); 
    if(!product)
        throw {
            code: 404,
            message: "Not found. The product does not exist"
        }
    return product;
 };

 exports.updateProductCount = async function(id, newCount){
    await productsRepository.updateProductCount(id, newCount);
 };

 function validateId(id){
    if(!Number.isInteger(id) || id < 0){
        throw {
            code: 400,
            message: "Bad request. The id must be a positive integer"
        }
    }
 };

 function filterAvailableProducts(products){
    let availableProducts = [];
    for(let product of products) {
        if(product.inventoryCount !== 0){
            availableProducts.push(product)
        }
    }
    return availableProducts
 }
 