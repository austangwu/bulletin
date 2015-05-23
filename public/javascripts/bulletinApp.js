var app = angular.module('bulletin',['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: '/home.html',
	      controller: 'MainCtrl'
	    })

$urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', 
	function($scope, $http) {
  		$http.get('forecast').then(function(data){
  			$scope.temperature = data.data.currently.temperature;
  			$scope.longitude= data.data.longitude;
  			$scope.latitude = data.data.latitude;
  		})
});



/*


angular.module('bulletin', ['ui.router'])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider
	    .state('home', {
	      url: '/home',
	      templateUrl: '/home.html',
	      controller: 'MainCtrl'
	    })

$urlRouterProvider.otherwise('home');
}]);

.factory('forecast', ['$http', function($http){
	var o = {};
	o.getForecast = function(){
		return $http.get('/forecast').then(function(res){
			angular.copy(data, o);
		})
	}
	return o;
}]);

.controller('MainCtrl', [
'$scope', 
function($scope){
  $scope.test = 'Hello this is bulletin!';
  $scope.temperature = -99;
}]);

app.factory('forecast', ['$http', function($http){
	var weather = {latitude: 3};
	var input = {temperature: 10};

	return {
		weather: function(){
			return weather.latitude;

		},
		temperature: function(){
			return input.temperature;
		}
	}
}])

app.controller('MainCtrl', [
	'$scope', 
	'forecast',
	function($scope, forecast, $http) {
  		$http.get('forecast').then(function(data){
  			$scope.weather = data;
  		})
  		$scope.test = 'Hello World!';
  		$scope.temperature = forecast.temperature();
  		

}]);

*/


