(function() {
    
    var app = angular.module('wishlistApp', ['ngRoute', 'ngAnimate']);

    app.config(function($routeProvider) {
        $routeProvider
            .when('/wishlist', {
                controller: 'wishlistController',
                templateUrl: 'app/views/wishlist.html'
            })
            .when('/purchased', {
                controller: 'wishlistController',
                templateUrl: 'app/views/purchased.html'
            })
            .when('/config', {
                controller: 'configController',
                templateUrl: 'app/views/configuration.html'
            })
            .otherwise( { redirectTo: '/wishlist' } );
    });
    
}());