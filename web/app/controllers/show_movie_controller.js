MyApp.controller('ShowMovieController', function($scope, FirebaseService, $routeParams, currentAuth, $location){
	if(!currentAuth && $location.$$path.endsWith('edit')){
		$location.path('/login');
	}

	FirebaseService.getMovie($routeParams.id, function(data) {
		$scope.movie = data
	})
	
	$scope.editMovie = function(movie) {
		if (movie.name.length > 0) {
			FirebaseService.updateMovie(movie)
		}
	}
})