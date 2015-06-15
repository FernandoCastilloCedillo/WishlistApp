 app.filter('sumPurchasesFilter', function() {
     return function(groups) {
         var taxTotals = 0;
         for (i=0; i<groups.length; i++) {
             taxTotal = taxTotal + groups[i].taxes;    
          };
         return taxTotals;
     };
 });