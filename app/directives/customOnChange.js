(function(){
	var customOnChange = function() {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
			var onChangeHandler = scope.$eval(attrs.customOnChange);
				element.bind('change', onChangeHandler);
			}
		};
	};
	angular.module('wishlistApp')
	.directive('customOnChange', customOnChange);
}());