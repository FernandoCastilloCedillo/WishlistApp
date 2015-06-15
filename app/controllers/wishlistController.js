(function() {

    var WishlistController = function ($scope, wishlistFactory) {
        $scope.data = {
        				'items': []
        			  };

        $scope.ui = {
        	'itemsFilter' : {'name': '', 'purchased': false}
        };

        $scope.events = {
        	sort : function(sName) {

        	},
        	delete : function(iItemId) {

        	},
        };

    };

    WishlistController.$inject = ['$scope', 'wishlistFactory'];

    angular.module('wishlistApp')
      .controller('WishlistController', WishlistController);

}());