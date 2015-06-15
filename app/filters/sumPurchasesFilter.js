 (function(){

 	var countPurchasesFilter = function() {
		return function(groups) {
			var count = 0;
			for (i=0; i<groups.length; i++) {
				count += groups[i].purchased === true ? 1 : 0;    
			};
			return count;
		};
	}

 	var sumPurchasesFilter = function() {
		return function(groups) {
			var sum = 0;
			for (i=0; i<groups.length; i++) {
				sum += groups[i].purchased === true ? groups[i].cost : 0;    
			};
			return sum;
		};
	}

	var app = angular.module('wishlistApp');
	app.filter('countPurchasesFilter', countPurchasesFilter);
	app.filter('sumPurchasesFilter', sumPurchasesFilter);

 }());




