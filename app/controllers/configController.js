(function() {

    var configController = function ($scope, configFactory) {

        $scope.ui = { 'budgetForm': { 'maxBudget': parseInt(configFactory.getMaxBudget()) } };

        $scope.events = {
        	save : function() {
        		configFactory.setMaxBudget($scope.ui.budgetForm.maxBudget);
        	},
        	loadBudget : function() {
        		$scope.ui.budgetForm.maxBudget = parseInt(configFactory.getMaxBudget());
        	}
        };

    };

    configController.$inject = ['$scope', 'configFactory'];

    angular.module('wishlistApp')
      .controller('configController', configController);

}());