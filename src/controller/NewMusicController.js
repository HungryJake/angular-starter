angular.module('app')
    .controller('NewMusicController', ['$q', '$scope', '$state', '$stateParams', 'MusicService', function ($q, $scope, $state, $stateParams, MusicService) {
        // load this from edit
        $scope.trackId = $stateParams.id;
        $scope.isEdit = !!$stateParams.id;
        $scope.defaultTrack = {
            name: '',
            artist: '',
            album: '',
            duration: null
        };
        $scope.track = $scope.trackId ? MusicService.get({ trackId: $scope.trackId }) : angular.copy($scope.defaultTrack);
        $scope.onSubmit = function () {
            if ($scope.trackId) {
                MusicService
                    .update($scope.track)
                    .$promise.then(
                    function () {
                        $state.go('list');
                    }, function (error) {
                        console.log('failed to create', error);
                    });
            } else {
                MusicService
                    .save($scope.track)
                    .$promise.then(
                    function () {
                        $state.go('list');
                    }, function (error) {
                        console.log('failed to create', error);
                    });
            }
        };
        $scope.onReset = function () {
            $scope.track = $scope.trackId ? MusicService.get({ trackId: $scope.trackId }) : angular.copy($scope.defaultTrack);
        };
    }]);
