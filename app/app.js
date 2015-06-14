(function() {
    
    var app = angular.module('wishlistApp', ['ngRoute', 'ngAnimate']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'WishlistController',
                templateUrl: 'app/views/wishlist.html'
            })
            .otherwise( { redirectTo: '/' } );
    });
    
}());