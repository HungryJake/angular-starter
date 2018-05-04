angular.module('app.music', [
        'ui.bootstrap',
        'templates-app',
        'ui.router',
        'ngResource',
        'StatusNotification'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/list");
        $stateProvider
            .state('music.list', {
                url: '/music/list',
                controller: 'MusicListController',
                templateUrl: 'music/view/music-list.html'
            })
            .state('music.new', {
                url: '/music/new',
                controller: 'NewMusicController',
                templateUrl: 'music/view/new-music.html'
            })
            .state('music.edit', {
                url: '/music/edit/:id',
                controller: 'NewMusicController',
                templateUrl: 'music/view/new-music.html'
            });
    }]);
