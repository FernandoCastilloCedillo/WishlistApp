(function() {
    
    var app = angular.module('wishlistApp', ['ngRoute', 'ngAnimate']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'WishlistController',
                templateUrl: 'app/views/wishlist.html'
            })
            .when('/config', {
                controller: 'configController',
                templateUrl: 'app/views/configuration.html'
            })
            .otherwise( { redirectTo: '/' } );
    });
    
}());