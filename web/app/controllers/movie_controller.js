MyApp.controller('MovieController', function($scope, FirebaseService, currentAuth){
	$scope.movies = FirebaseService.getMovies()
	$scope.auth = currentAuth
//	console.log($scope.auth.password.email)

	$scope.removeMovie = function(movie) {
		FirebaseService.removeMovie(movie)
	}
})