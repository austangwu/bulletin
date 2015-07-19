var app = angular.module('controllers', [])

app.controller('WeatherController', ['$scope','$http', function($scope, $http){
	$http.get('forecast').then(function(data){
		$scope.getDays = function(n){
			array = []
			for (i = 0; i < n; i++) {
				array.push(data.data.daily.data[i])
			}
			return array
		}
	});
}]);

app.controller('CalendarController', ['$scope','$http', function($scope, $http){
	$http.get('calendar').then(function(data){
		$scope.events = data.data.items;
		$scope.getEvents = function(n) {
			array = []
			for (i = 0; i < n; i++){
				if (data.data.items[i]) {
					array.push(data.data.items[i])
				}
			}
			return array
		}
	});
}]);
