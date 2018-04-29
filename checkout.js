class Checkout{
    constructor(priceRules){
        this.priceRules = priceRules;
        this.products = [];
        this.freeProductCandidate = {};
        this.productsString = '';
    }

    scan(product){
        if(product === undefined ){
            alert("Product not found, try another SKU.");
        }else{
            if(this.products === undefined){
                this.products[product.SKU] = product;
                this.products[product.SKU].quantity = 1;
            }else if(this.products[product.SKU] !== undefined){
                this.products[product.SKU].quantity ++;
            }else{
                this.products[product.SKU] = product;
                this.products[product.SKU].quantity = 1;
            }
        }
    }

    total(){
        var totalPrice = 0;
        this.freeProductCandidate = {};
        this.productsString = '';
        for (var key in this.products) {
            if(this.priceRules[key] === undefined){
                totalPrice += this.products[key].price * this.products[key].quantity;
            }else{
                var price = this.salePrice(this.products[key], this.priceRules[key]);
                totalPrice += price;
            }
            this.productsString += JSON.stringify(this.products[key]);
        }
        for (var key in this.freeProductCandidate) {
            if(this.products[key] !== undefined){
                if(this.products[key].quantity >= this.freeProductCandidate[key])
                    totalPrice -= (this.products[key].price * this.freeProductCandidate[key]);
            }
        }
        return totalPrice;
    }

    salePrice(regularProduct, priceRule){
        if(priceRule.benefit.type !== undefined){
            switch(priceRule.benefit.type){
                case 'discountFixedPrice':
                    return this.discountFixedPrice(regularProduct, priceRule);
                case 'freeProduct':
                    return this.freeProduct(regularProduct, priceRule);
                default:
                    return regularProduct.price;
            }
        }
    }

    discountFixedPrice(regularProduct, priceRule){
        switch(priceRule.benefit.typeRule){
            case 'each':
                switch(priceRule.quantityRule){
                    case 'plus':
                        if(regularProduct.quantity >= priceRule.quantity)
                            return Math.round((regularProduct.quantity * priceRule.benefit.value)*100)/100;
                        else
                            return Math.round((regularProduct.quantity * regularProduct.price)*100)/100;
                    default:
                        return Math.round((regularProduct.quantity * regularProduct.price)*100)/100;
                }
                
            case 'package':
                if(priceRule.quantityRule == 'package'){
                    var quotient = Math.floor(regularProduct.quantity / priceRule.quantity);
                    var remainder = regularProduct.quantity % priceRule.quantity;
                    return (quotient * priceRule.benefit.value) + (remainder * regularProduct.price);
                }

                return priceRule.benefit.value;
            default:
                return regularProduct.price;
        }

    }
    
    freeProduct(regularProduct, priceRule){
        if(priceRule.benefit.SKU === regularProduct.SKU){
            if (regularProduct.quantity >= priceRule.quantity){
                return regularProduct.price * (regularProduct.quantity - 1);
            }
        }else{
            if (regularProduct.quantity >= priceRule.quantity){
                if(this.freeProductCandidate[priceRule.benefit.SKU] === undefined){
                    this.freeProductCandidate[priceRule.benefit.SKU] = 1;
                }else{
                    this.freeProductCandidate[priceRule.benefit.SKU] ++;
                }
            }
        }
        return regularProduct.price * regularProduct.quantity;
        
    }
}

function screenControl () {
    var input = document.querySelector('input');
    var btn = document.querySelector('button');
    var para = document.querySelector('p');
    document.getElementById('srcCode').innerHTML = JSON.stringify(productsJson,null,4);
    var checkout = new Checkout(pricingRulesJson);
    btn.onclick = function() {
        var sku = input.value;
        checkout.scan(productsJson[sku]);
        
        var totalAmount = checkout.total();

        document.getElementById('shoppingCart').innerHTML = '<h3>Total: $' + totalAmount + '</h3>';
        document.getElementById('shoppingCart').innerHTML += '<code>' + checkout.productsString + '</code>';
    }
}

function preload(){
    // this function is only used on ONLINE checktou, please refer to read.me
}

screenControl();
startTest();
