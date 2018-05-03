angular.module('StatusNotification')
    .directive('statusNotification', function () {
        return {
            restrict: 'E',
            transclude: false,
            replace: true,
            templateUrl: 'common/status-notification/view/status-notification.html',
            scope: {
                showStatus: '=',
                sendNotificationFn: '=?'
            },
            link: function ($scope) {
                $scope.alerts = [];
                $scope.sendNotificationFn = function (newAlerts) {
                    if (!(newAlerts instanceof Array)) {
                        $scope.alerts.push(newAlerts);
                    } else {
                        $scope.alerts = $scope.concat(newAlerts);
                    }
                };
                $scope.dismissAlert = function (index) {
                    $scope.alerts.splice(index, 1);
                };
            }
        };
    });
