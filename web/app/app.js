var MyApp = angular.module('MyApp', ['firebase', 'ngRoute']);

MyApp.config(function($routeProvider){
	$routeProvider
	.when('/movies', {
		controller: 'MovieController',
		templateUrl: 'app/views/listaus.html',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.when('/movies/search', {
		controller: 'SearchMovieController',
		templateUrl: 'app/views/search.html',
	})
	.when('/movies/new', {
		controller: 'AddMovieController',
		templateUrl: 'app/views/new.html',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.when('/movies/:id', {
		controller: 'ShowMovieController',
		templateUrl: 'app/views/show.html',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.when('/movies/:id/edit', {
		controller: 'ShowMovieController',
		templateUrl: 'app/views/edit.html',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.when('/signin', {
		controller: 'UserController',
		templateUrl: 'app/views/register_user.html',
	})
	.when('/login', {
		controller: 'UserController',
		templateUrl: 'app/views/login.html',
	})
	.when('/logout', {
		controller: 'UserController',
		templateUrl: 'app/views/logout.html',
		resolve: {
			currentAuth: function(AuthenticationService) {
				return AuthenticationService.checkLoggedIn();
			}
		}
	})
	.otherwise({
		redirectTo: '/movies'
	})
});

MyApp.config(['$httpProvider', function($httpProvider) {
	delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}