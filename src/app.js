angular.module('app', [
    'ui.bootstrap',
    'templates-app',
    'ui.router',
    'ngResource',
    'StatusNotification'
  ])
  .run(function () {
    console.log('here..... app.js');
  });
