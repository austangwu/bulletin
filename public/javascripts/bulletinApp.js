var app = angular.module('bulletin',['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {
	$stateProvider
	    .state('home', {
	      url: '',
	      templateUrl: '/home.html',
	      controller: 'MainCtrl'
	})
$urlRouterProvider.otherwise('');
}]);

app.controller('MainCtrl',
	function($scope, $http) {
  		$http.get('forecast').then(function(data){
  			$scope.temperature = data.data.currently.temperature;
  			$scope.longitude= data.data.longitude;
  			$scope.latitude = data.data.latitude;
  		})
  		$http.get('calendar').then(function(data){
			$scope.kind = data.data.kind
  		})
});
