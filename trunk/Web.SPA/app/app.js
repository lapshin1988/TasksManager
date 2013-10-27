﻿window.app = angular.module('tasks', ['loadingService',
                                        'ngGrid',
                                        'common',
                                        'ui.bootstrap',
                                        'services.admin.users',
                                        'services.admin.projects']);

angular.module('loadingService', [],
    ['$provide', function ($provide) {
        $provide.factory('customHttpInterceptor', ['$q', '$window', '$location', 'logger', function ($q, $window, $location, logger) {
            return function (promise) {
                return promise.then(function (response) {
                    $('.ajax-indicator').hide();
                    return response;
                }, function (response) {
                    $('.ajax-indicator').hide();
                    if (response.status === 401) {
                        $location.path('/login');
                    }
                    else {
                        logger.error(response.data.message);
                    }
                    return $q.reject(response);
                });
            };
        }]);
    }]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.responseInterceptors.push('customHttpInterceptor');
    var accessToken = sessionStorage["accessToken"] || localStorage["accessToken"];
    if (accessToken) {
        $httpProvider.defaults.headers.common = { 'Authorization': 'Bearer ' + accessToken };
    }

    $httpProvider.defaults.transformRequest.push(function (data, headers) {
        $('.ajax-indicator').show();
        return data;
    });
}]);