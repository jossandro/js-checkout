function checkoutTest(shoppingCart, totalExpected) {
  results.total++;
  var Skus = shoppingCart.split(',');
  var checkout = new Checkout(pricingRulesJson);
  for(var i=0; i<Skus.length; i++){
    checkout.scan(productsJson[Skus[i]]);
  }
  
  var result = checkout.total();
  if (result !== totalExpected) {
      results.bad++;
      console.log("Expected " + totalExpected + ", but was " + result);
  }
}
var results = {
  total: 0,
  bad: 0
};
function startTest(){
  checkoutTest("atv,atv,atv,vga", 249.00);
  checkoutTest("atv,ipd,ipd,atv,ipd,ipd,ipd", 2718.95);
  checkoutTest("mbp,vga,ipd", 1949.98);
  console.log("Of " + results.total + " tests, " + results.bad + " failed, " + (results.total - results.bad) + " passed.");
}


