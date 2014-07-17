var app = angular.module('app', []);

function stuffCtrl($scope, $http) {
	$http.get('http://cors-enabler.herokuapp.com/www.behance.net/v2/users/krishdholakiya/projects?api_key=iaLwUe7zM9AZDIsgsrq5rTRiRGR91vEZ')
		.success(function(data) {
			console.log(data);
			$scope.projects = data.projects.slice(0,6);
		});
}
