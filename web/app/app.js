var MyApp = angular.module('MyApp', ['firebase', 'ngRoute']);

MyApp.config(function($routeProvider){
	$routeProvider
		.when('/movies', {
			controller: 'MovieController',
			templateUrl: 'app/views/listaus.html'
		})
		.when('/movies/new', {
			controller: 'AddMovieController',
			templateUrl: 'app/views/new.html'
		})
		.when('/movies/:id', {
			controller: 'ShowMovieController',
			templateUrl: 'app/views/show.html'
		})
		.when('/movies/:id/edit', {
			controller: 'ShowMovieController',
			templateUrl: 'app/views/edit.html'
		})
		.otherwise({
			redirectTo: '/movies'
		})
});