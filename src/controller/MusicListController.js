angular.module('app')
    .controller('MusicListController', ['$scope', '$state', 'MusicService', function ($scope, $state, MusicService) {
        $scope.tracks = MusicService.query();
        $scope.refresh = function () {
            $scope.tracks = MusicService.query();
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
    }]);
