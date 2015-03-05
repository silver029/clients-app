/**
 * Created by Paweł on 2015-02-28.
 */

(function(){

    var app = angular.module('clientsApp', ['ui.router', 'httpService']);

    app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/clients");
        $stateProvider
            .state('clients', {
                url: "/clients",
                templateUrl: "views/clients-list.html",
                controller: 'clientsListCtrl'
            })
            .state('client-details', {
                url: "/client-details/:clientId",
                templateUrl: "views/client-details.html",
                controller: 'clientDetailsCtrl'
            })
            .state('sectors', {
                url: "/sectors",
                templateUrl: "views/sectors-list.html"
            })
            .state('users', {
                url: "/users",
                templateUrl: "views/users-list.html"
            })

    }]);

    app.controller('clientsListCtrl', ['$scope', 'clients', 'users', 'sectors', function($scope, clients, users, sectors){

        $scope.clients = [];
        $scope.users = [];
        $scope.sectors = [];

        $scope.orderByColumn = 'id';
        $scope.orderByDir = false;

        $scope.filterBy = {};
        $scope.$watch($scope.filterBy, function(){
            console.log($scope);
        });
        clients.getClients(function(results){
            $scope.clients = results;
        });
        users.getUsers(function(results){
            $scope.users = results;
        });

        sectors.getSectors(function(results){
            $scope.sectors = results;
        });

        $scope.changeOrder = function(columnName){

            if( $scope.orderByColumn == columnName){
                $scope.orderByDir = !$scope.orderByDir;
            }else{
                $scope.orderByColumn = columnName;
                $scope.orderByDir = false;
            }
        };

        $scope.isOrderedBy = function(columnName){
            return  ($scope.orderByColumn == columnName);
        };
        $scope.isOrderedReverse = function(){
            return !$scope.orderByDir;
        };

    }]);

    app.controller('clientDetailsCtrl',['$scope', '$stateParams', 'clients', function($scope, $stateParams, clients){
        $scope.user = {};
        $scope.userNotFound = false;

        clients.getClient($stateParams.clientId,
            function(data){
                $scope.user = data;
                console.log($scope.user)
            },
            function(data, status){
                if(404 == status){
                    $scope.userNotFound = true;
                }
            }
        )
    }])

})();