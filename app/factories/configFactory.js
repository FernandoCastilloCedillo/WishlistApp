(function() {
    var configFactory = function() {
    
        //init variables 
        var factory = {},
            maxBudget,
            _initFactory;

        //this is used to set initial values
        _initFactory = function() {
            maxBudget = localStorage.getItem('maxBudget');
            maxBudget = maxBudget !== null ? maxBudget : 0;
        };
        
        //establish a max budget value
        factory.setMaxBudget = function(budget) {
            if(isNaN(budget) || budget === null) {
                budget = 0;
            }
            localStorage.setItem('maxBudget', budget);
        };
        
        //return a max budget value
        factory.getMaxBudget = function(budget) {
            maxBudget = localStorage.getItem('maxBudget');
            if(maxBudget === null){
                maxBudget = 0;
            }
            return parseInt(maxBudget);
        };

        //run initializer
        _initFactory();
        
        return factory;
    };

    //adding the created factory to whishlist application
    angular.module('wishlistApp').factory('configFactory', 
                                           configFactory);

}());