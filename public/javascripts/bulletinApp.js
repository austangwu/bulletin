angular.module('bulletin', [])
.controller('MainCtrl', [
'$scope',
function($scope){
  $scope.test = 'Hello this is bulletin!';
}]);
