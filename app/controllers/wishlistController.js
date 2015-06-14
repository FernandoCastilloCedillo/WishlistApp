(function() {
    
    var WishlistController = function ($scope, wishlistFactory) {
        $scope.items = [];
        
    };
    
    WishlistController.$inject = ['$scope', 'wishlistFactory'];

    angular.module('wishlistApp')
      .controller('WishlistController', WishlistController);
    
}());