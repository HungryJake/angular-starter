angular.module('app', [
        'ui.bootstrap',
        'templates-app',
        'ui.router',
        'ngResource',
        'LocalStorageModule',
        'StatusNotification',
        'app.todo'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/welcome");
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'view/welcome.html'
            })
            .state('todo', {
                abstract: true
            })
            .state('music', {
                abstract: true
            });
    }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);
