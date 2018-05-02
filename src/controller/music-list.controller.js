angular.module('app')
    .controller('MusicListController', ['$scope', '$state', 'MusicService', function ($scope, $state, MusicService) {
        var self = this;
        $scope.updateStatus = function () {
            $scope.changeStatus('hello', 'world');
        };
        $scope.refresh = function () {
            $scope.tracks = MusicService.query();
            $scope.tracks.$promise.then(function () {
              console.log('on refresh success');
            }, function (error) {

                console.log('on refresh error');
                $scope.updateStatus(error);
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
        //$scope.updateStatus();
        console.log('in main controller: ', $scope.changeStatus);
        // $scope.statusMethods.updateStatus('success', ['Update success']);
    }]);
