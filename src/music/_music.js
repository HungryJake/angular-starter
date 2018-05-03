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
            .state('app.music.list', {
                url: '/list',
                controller: 'MusicListController',
                templateUrl: 'music/view/music-list.html'
            })
            .state('app.music.new', {
                url: '/new',
                controller: 'NewMusicController',
                templateUrl: 'music/view/music-list.html'
            })
            .state('app.music.edit', {
                url: '/edit/:id',
                controller: 'NewMusicController',
                templateUrl: 'music/view/music-list.html'
            });
    }]);
