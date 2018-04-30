(function(){
    'use strict';

    angular.module('yourApp').directive('numberOnly', function() {
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                if(!ngModelCtrl) {
                    return;
                }

                ngModelCtrl.$parsers.push(function(val) {
                    if(val === undefined || val === null) {
                        val = '';
                    }

                    // here we try and clean it to make sure it's only numbers
                    var clean = val.toString().replace(/[^0-9]+/g, '');

                    // if a letter/etc got in there, set the model to the "cleaned" number value
                    if(val !== clean) {
                        ngModelCtrl.$setViewValue(clean);
                        ngModelCtrl.$render();
                    }
                    return clean;
                });

                // "101" = e
                // "69" = E
                // "46" = .
                // "45" = +
                // "44" = ,
                // "43" = -
                // "32" = spacebar
                element.bind('keypress', function(event) {
                    var code = event.keyCode || event.which;

                    if(code === 101 || code === 69 || code === 46 || code === 45 || code === 44 || code === 43 || code === 32) {
                        e.preventDefault();
                    }
                });

                scope.$on('$destroy', function() {
                    element.unbind('keypress');
                });
            }
        };
    });
})();
