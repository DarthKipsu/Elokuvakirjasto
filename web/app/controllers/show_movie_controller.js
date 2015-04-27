MyApp.controller('ShowMovieController', function($scope, FirebaseService, $routeParams){
	FirebaseService.getMovie($routeParams.id, function(data) {
		$scope.movie = data
	})
	
	$scope.editMovie = function(movie) {
		if (movie.name.length > 0) {
			FirebaseService.updateMovie(movie)
		}
	}
})