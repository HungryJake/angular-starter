angular.module('app')
    .factory('MusicService', ['$resource', function($resource) {
        return $resource('/api/songs/:trackId', { trackId: '@id' },
            {
                update: {
                    method: 'PUT'
                }
            }
            // default actions, no overrides needed
            // {
            //     'get':    {method:'GET'}, // get by ID
            //     'save':   {method:'POST'}, // create
            //     'query':  {method:'GET', isArray:true}, // list
            //     'remove': {method:'DELETE'},
            //     'delete': {method:'DELETE'}
            // }
        );
    }]);
