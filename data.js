if(!ONLINE){
	var productsJson = {
		"ipd": {
			"SKU" : "ipd",
			"name": "Super iPad",
			"price": 549.99
		},
		"mbp": {
			"SKU" : "mbp",
			"name": "MacBook Pro",
			"price": 1399.99
		},
		"atv": {
			"SKU" : "atv",
			"name": "Apple TV",
			"price": 109.50
		},
		"vga": {
			"SKU" : "vga",
			"name": "VGA adapter",
			"price": 30.00
		}
	};
	var pricingRulesJson = {
		"ipd": {
			"quantity": 5,
			"quantityRule": "plus",
			"benefit": {
				"type": "discountFixedPrice",
				"typeRule": "each",
				"value": 499.99
			}
	
		},
		"atv": {		
			"quantity": 3,
			"quantityRule": "package",
			"benefit": {
				"type": "discountFixedPrice",
				"typeRule": "package",
				"value": 219
			}     
		},
		"mbp": {
			"quantity": 1,
			"quantityRule": "plus",
			"benefit": {
				"type": "freeProduct",
				"typeRule": "each",
				"SKU": "vga"
			}      
		}
	};
}