angular.module('app')
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/welcome");
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                controller: 'AppController',
                templateUrl: 'view/welcome.html'
            })
            .state('todo', {
                url: '/todo',
                controller: 'TodoController',
                templateUrl: 'todo/view/todo-list.html'
            })
            .state('music', {
                url: '/music',
                controller: 'MusicController',
                templateUrl: 'music/view/music-list.html'
            });
    }]);
