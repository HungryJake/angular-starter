angular.module('NgEnter', [])
    .directive("ngEnter", function  () {
        return function (scope, elem) {
            console.log('ng enter link function....');
            $(elem).keyup(function  (e) {
                //Enter Keycode is 13
                if (e.keyCode === 13) {
                    /*Also update the Angular Cycle*/
                    scope.$apply(function  () {
                        scope.addTodo(); //Call addTodo defined inside controller
                    });
                }
            });
        };
    });
