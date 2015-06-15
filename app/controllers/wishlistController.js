(function() {

    var wishlistController = function ($scope, wishlistFactory) {
    	var init;

        init = function() {
	        $scope.data = {
	        				'items': wishlistFactory.getItems()
	        			  };

	        $scope.ui = {
	        	'itemsFilter' : {'name': '', 'purchased': false},
	        	'defaultForm': { 
		        	               'name': null, 
		                           'description': null
		                        },
		        'itemForm': {},
		        'editForm': {}
	        };

	        $scope.ui.itemForm = angular.copy($scope.ui.defaultForm);
	        $scope.ui.editForm = angular.copy($scope.ui.defaultForm);

	        $scope.images = [];
        };

        $scope.events = {
        	sort : function(sName) {

        	},
        	save : function() {
        		wishlistFactory.createItem({ 'name': $scope.ui.itemForm.name, 'description': $scope.ui.itemForm.description, 'images': angular.copy($scope.images) });
				$scope.events.updateData();
        	},
        	update : function(index) {
        		wishlistFactory.updateItem(index, { 'name': $scope.ui.editForm.name, 'description': $scope.ui.editForm.description, 'images': angular.copy($scope.images) });
				$scope.events.updateData();
        	},
        	delete : function(index) {
				wishlistFactory.deleteItem(index);
				$scope.events.updateData();
        	},
        	getElement: function(index) {
        		var itemData = wishlistFactory.getItem(index);
        		$scope.images = itemData.images;
        		$scope.ui.editForm.name = itemData.name;
        		$scope.ui.editForm.description = itemData.description;
        		$scope.ui.editForm.id = index;
        	},
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
							$scope.images.push({'sSrc': e.target.result, 'sFileName': theFile.name});
							$scope.$apply();
						};
					})(f);
					// Read in the image file as a data URL.
					fileReader.readAsDataURL(f);
				   
			   }
        	},
        	removeImage: function(index) {
        		$scope.images.splice(index, 1);
        	},
        	resetForm: function() {
        		$scope.ui.itemForm.name = null;
        		$scope.ui.itemForm.description = null;
        		$scope.images = [];
        	},
        	updateData: function() {
        		$scope.data.items = wishlistFactory.getItems();
        	}
        };

        init();

    };

    wishlistController.$inject = ['$scope', 'wishlistFactory'];

    angular.module('wishlistApp')
    	.controller('wishlistController', wishlistController);

}());