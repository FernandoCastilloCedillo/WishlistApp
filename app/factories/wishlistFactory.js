(function() {
    var wishlistFactory = function() {
    
        //init variables 
        var factory = {},
            items,
            _initFactory,
            _updateLocalStorage;

        //this is used to set initial values
        _initFactory = function() {
            items = JSON.parse(localStorage.getItem('items'));
            items = items !== null ? items : [];
        };

        //update localstorage when it changes
        _updateLocalStorage = function() {
            localStorage.setItem('items', JSON.stringify(items));
            items = JSON.parse(localStorage.getItem('items'));
            items = items !== null ? items : [];
        };
        
        //return the full array of items 
        factory.getItems = function() {
            _updateLocalStorage();
            return angular.copy(items);
        };
        
        //return a specific element in the item list
        factory.getItem = function(itemId) {
            _updateLocalStorage();
            return angular.copy(items[itemId]);
        };
        
        //add a new item element to the list
        factory.createItem = function(itemData) {
            var data = angular.extend({}, { 'name': '', 'description': '', 'last_modification': Date.now(), 'images': [], 'purchased': false }, itemData);
            items.push(data);
            _updateLocalStorage();
        };
        
        //update an existing item to the list
        factory.updateItem = function(itemId, itemData) {
            var data = angular.extend({}, { 'name': '', 'description': '', 'last_modification': Date.now(), 'images': [], 'purchased': false }, itemData);
            items[itemId] = data;
            _updateLocalStorage();
        };
        
        //mark an existing item as purchased
        factory.purchaseItem = function(itemId, itemData) {
            var data = angular.extend({}, { 'last_modification': Date.now(), 'purchased': true }, itemData);
            items[itemId] = data;
            _updateLocalStorage();
        };
        
        //removes an element of the item list
        factory.deleteItem = function(itemId) {
            items.splice(itemId, 1);
            _updateLocalStorage();
        };

        //run initializer
        _initFactory();
        
        return factory;
    };

    //adding the created factory to whishlist application
    angular.module('wishlistApp').factory('wishlistFactory', 
                                           wishlistFactory);

}());