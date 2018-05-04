angular.module('app.todo', ["ui.sortable", "LocalStorageModule", 'editInPlace', 'ngEnter'])
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
