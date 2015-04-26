var MyApp = angular.module('MyApp', ['firebase', 'ngRoute']);

MyApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			controller: 'MovieController',
			templateUrl: 'app/views/listaus.html'
		})
		.when('/movies', {
			controller: 'MovieController',
			templateUrl: 'app/views/listaus.html'
		})
		.when('/movies/new', {
			controller: 'AddMovieController',
			templateUrl: 'app/views/new.html'
		})
		.otherwise({
			redirectTo: '/'
		})
});