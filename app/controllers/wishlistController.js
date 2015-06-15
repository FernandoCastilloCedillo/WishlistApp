(function() {

    var wishlistController = function ($scope, $filter, $routeParams, wishlistFactory, configFactory) {
    	var init;

    	//initialize values
        init = function() {
	        $scope.data = {
	        				'items': wishlistFactory.getItems()
	        			  };

			console.log($routeParams.item_id);
	        $scope.imageview = ($routeParams.item_id === undefined ? {} : $scope.data.items[$routeParams.item_id].images[0]);
	        //this is not very recommendable but it works
	        $('.modal-backdrop').remove();

	        $scope.ui = {
	        	'itemsFilter'     : {'name': '', 'purchased': false},
	        	'purchasedFilter' : {'name': '', 'purchased': true },
	        	'defaultForm': { 
		        	               'name': null, 
		                           'description': null
		                        },
		        'itemForm': {},
		        'editForm': {},
		        'purchaseForm': { 'cost': 0 }
	        };

	        $scope.ui.itemForm = angular.copy($scope.ui.defaultForm);
	        $scope.ui.editForm = angular.copy($scope.ui.defaultForm);

	        $scope.images = [];
        };

        $scope.events = {
        	//creates a new item on localstorage
        	save : function() {
        		wishlistFactory.createItem({ 'name': $scope.ui.itemForm.name, 'description': $scope.ui.itemForm.description, 'images': angular.copy($scope.images) });
				$scope.events.updateData();
        	},
        	//updates an existing item on localstorage
        	update : function(index) {
        		wishlistFactory.updateItem(index, { 'name': $scope.ui.editForm.name, 'description': $scope.ui.editForm.description, 'images': angular.copy($scope.images) });
				$scope.events.updateData();
        	},
        	// deletes an item from local storage
        	delete : function(index) {
				wishlistFactory.deleteItem(index);
				$scope.events.updateData();
        	},
        	// returns a specified item
        	getElement: function(index) {
        		var itemData = wishlistFactory.getItem(index);
        		$scope.images = itemData.images;
        		$scope.ui.editForm.name = itemData.name;
        		$scope.ui.editForm.description = itemData.description;
        		$scope.ui.editForm.id = index;
        	},
        	//configures the id and cost of an item to be purchased
        	selectToPurchase: function(index) {
        		$scope.ui.purchaseForm.cost = 0;
        		$scope.ui.purchaseForm.id = index; 
        	},
        	// purchases the element changing its status
        	purchaseElement: function(index) {
        		var max = configFactory.getMaxBudget(),
        		    amountPurchases = $filter('sumPurchasesFilter')($scope.data.items)
        		    totalPurchases = amountPurchases + parseInt($scope.ui.purchaseForm.cost);

        		if(max === 0 || totalPurchases <= max) {
	        		var purchased =  angular.copy($scope.data.items[index]);
	        		purchased.purchased = true;
	        		purchased.cost = $scope.ui.purchaseForm.cost;
	        		wishlistFactory.purchaseItem(index, purchased);
					$scope.events.updateData();
				} else {
					alert('You can\'t exceed your budget limit: $ ' + (max - amountPurchases) + ' available.');
				}
        	},
        	//convert the image to base64 to be stored in local storage
        	processFile: function(event) {
        		var files = event.target.files,
        		    fileReader, i, f;

			    for (i = 0, f; f = files[i]; i++) {
					// Only process image files.
					if (!f.type.match('image.*')) {
						continue;
					}
					fileReader = new FileReader();
					// Closure to capture the file information.
					fileReader.onload = (function(theFile) {
						return function(e) {
							// Render thumbnail.
							//$scope.images.push({'sSrc': e.target.result, 'sFileName': theFile.name});
							$scope.images = [{'sSrc': e.target.result, 'sFileName': theFile.name}];
							$scope.$apply();
						};
					})(f);
					// Read in the image file as a data URL.
					fileReader.readAsDataURL(f);
				   
			   }
        	},
        	//deletes an image from the item
        	removeImage: function(index) {
        		$scope.images.splice(index, 1);
        	},
        	//clean the form info to create a new element
        	resetForm: function() {
        		$scope.ui.itemForm.name = null;
        		$scope.ui.itemForm.description = null;
        		$scope.images = [];
        	},
        	//updates the local controller data from the wishlistFactory
        	updateData: function() {
        		$scope.data.items = wishlistFactory.getItems();
        	}
        };

        init();

    };

    //injecting needed dependencies
    wishlistController.$inject = ['$scope', '$filter', '$routeParams', 'wishlistFactory', 'configFactory'];

    // finally adding the controller to the app
    angular.module('wishlistApp')
    	.controller('wishlistController', wishlistController);

}());