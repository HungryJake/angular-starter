angular.module('app.todo', [
        'ui.bootstrap',
        'templates-app',
        'ui.router',
        'NgEnter'
    ])
    .config([
        'localStorageServiceProvider',
        '$urlRouterProvider',
        '$stateProvider',
        function (
            localStorageServiceProvider,
            $urlRouterProvider,
            $stateProvider
        ) {
        $stateProvider
            .state('todo.list', {
                url: '/todo',
                controller: 'TodoController',
                templateUrl: 'todo/view/todo-list.html'
            });
        localStorageServiceProvider.setPrefix('todo');
    }]);
