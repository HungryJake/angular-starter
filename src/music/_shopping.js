angular.module('app.shopping', [
        'ui.bootstrap',
        'templates-app',
        'ui.router',
        'ngResource',
        'StatusNotification'
    ])
    .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/list");
        $stateProvider
            .state('cart.list', {
                url: '/cart/list',
                controller: 'ShoppingCartController',
                templateUrl: 'cart/view/shopping-cart-list.html'
            });
            // .state('shopping.new', {
            //     url: '/shopping/new',
            //     controller: 'NewMusicController',
            //     templateUrl: 'shopping/view/new-shopping.html'
            // })
            // .state('shopping.edit', {
            //     url: '/shopping/edit/:id',
            //     controller: 'NewMusicController',
            //     templateUrl: 'shopping/view/new-shopping.html'
            // });
    }]);
