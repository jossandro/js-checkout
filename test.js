class Product {
    contructor(SKU, name, price){
        this.SKU = SKU;
        this.name = name;
        this.price = price;
    }
}

class Checkout{
    constructor(priceRules){
        this.priceRules = priceRules;
    }

    scan(product){
        if(this.products[product.sku]){
            this.products[product.sku].quantity ++;
        }else{
            this.products[product.sku] = product;
            this.products[product.sku].quantity = 1;
        }
    }

    total(){
        console.log(this.products);
        // for (var i = 0, len = this.products.length; i < len; i++) {
        //     console.log(this.products[])
        // }
    }
}


function main () {
    var input = document.querySelector('input');
    var btn = document.querySelector('button');
    var para = document.querySelector('p');
    var checkout = new Checkout();
    btn.onclick = function() {
        var sku = input.value;
        checkout.scan(sku);
    }
}
var productsJson = [];
var pricingRulesJson = [];
function preload(){
    var pricingRulesRequestURLorFile = 'https://github.com/jossandro/js-checkout/blob/master/json/pricing-rules.json?raw=true';
    var pricingRulesRequest = new XMLHttpRequest();
    pricingRulesRequest.open('GET', pricingRulesRequestURLorFile);
    pricingRulesRequest.responseType = 'json';
    pricingRulesRequest.send();
    pricingRulesRequest.onload = function() {
        pricingRulesJson = pricingRulesRequest.response;
    }

    var productsRequestURLorFile = 'https://github.com/jossandro/js-checkout/blob/master/json/products.json?raw=true';
    var productsRequest = new XMLHttpRequest();
    productsRequest.open('GET', productsRequestURLorFile);
    productsRequest.responseType = 'json';
    productsRequest.send();
    productsRequest.onload = function() {
        productsJson = productsRequest.response;
    }
}


main();


// x.toJSON().substring(0,10)