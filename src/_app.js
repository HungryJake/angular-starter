angular.module('app')
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
      // For any unmatched url, send to /route1
      $urlRouterProvider.otherwise("/list");
      $stateProvider
          .state('list', {
              url: '/list',
              controller: 'MusicListController',
              templateUrl: 'view/music-list.html'
          })
          .state('new', {
              url: '/new',
              controller: 'NewMusicController',
              templateUrl: 'view/new-music.html'
          })
          .state('edit', {
              url: '/edit/:id',
              controller: 'NewMusicController',
              templateUrl: 'view/new-music.html'
          });
  }])
  .run(function () {
    console.log('here..... _app.js');
  });
