angular.module('StatusNotification')
    .directive('statusNotification', function() {
        return {
            restrict: 'E',
            transclude: false,
            replace: true,
            templateUrl: 'view/status-notification.html',
            scope: {
                showStatus: '=',
                updateStatusFn: '=?'
            },
            controller: function ($scope) {
                // $scope.updateStatus = function (type, messages) {
                //     console.log('here: ', type, messages);
                // };
                console.log('in directive controller...');
            },
            /*
            compile: function (elem, attrs, transcludeFn) {
                console.log('in compile: ', elem, attrs, transcludeFn);
                return {
                    pre: function ($scope, elems, attrs, controllers) {
                        // pre-link function
                    },
                    post: function ($scope, elems, attrs, controllers) {
                        // post-link function
                        $scope.updateStatusFn = function () {
                            console.log('updating status...', arguments);
                        };
                    }
                };
            },
            */
            // when activate compile, link functions will not be invoked.
            link: {
                pre: function ($scope) {
                    // $scope.updateStatus = {
                    //     method: function (type, messages) {
                    //         console.log('here: ', type, messages);
                    //     }
                    // };
                    console.log('in prelink');
                },
                post: function ($scope, elem, attrs, controller) {
                    console.log('in post link', controller);
                    $scope.updateStatusFn = function () {
                        console.log('updating status...', arguments);
                    };
                }
            },
        };
    });
