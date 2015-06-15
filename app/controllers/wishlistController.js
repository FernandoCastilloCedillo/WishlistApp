(function() {

    var WishlistController = function ($scope, wishlistFactory) {
    	var init;

        init = function() {
	        $scope.data = {
	        				'items': []
	        			  };

	        $scope.ui = {
	        	'itemsFilter' : {'name': '', 'purchased': false},
	        	'isFormValid' : false,
	        	'defaultForm': { 
		        	               'name': '', 
		                           'description': ''
		                        },
		        'itemForm': {}
	        };

	        $scope.ui.itemForm = angular.copy($scope.ui.defaultForm);

	        $scope.images = [];
        };

        $scope.events = {
        	sort : function(sName) {

        	},
        	save : function() {

        	},
        	edit : function() {
        		
        	},
        	delete : function(iItemId) {

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
        		$scope.ui.itemForm = angular.copy($scope.ui.defaultForm);
        		$scope.images = [];
        	}
        };

        init();

    };

    WishlistController.$inject = ['$scope', 'wishlistFactory'];

    angular.module('wishlistApp')
      .controller('WishlistController', WishlistController);

}());