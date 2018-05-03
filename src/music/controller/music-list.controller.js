angular.module('app')
    .controller('MusicListController', ['$scope', '$state', 'MusicService', function ($scope, $state, MusicService) {
        var self = this;
        $scope.notify = function (error) {
            $scope.sendNotificationFn(error);
        };
        $scope.refresh = function () {
            $scope.tracks = MusicService.query();
            $scope.tracks.$promise.then(
                angular.noop,
                function (error) {
                    $scope.notify({
                        type: 'danger',
                        msg: error.data
                    });
                });
        };
        $scope.remove = function(trackId) {
            MusicService.remove({
                trackId: trackId
            }).$promise.then(function () {
                $scope.refresh();
            });
        };
        $scope.edit = function (trackId) {
            $state.go('edit', { id: trackId } );
        };
        $scope.refresh();
        $scope.showStatus = false;
    }]);
