MyApp.controller('AddMovieController', function($scope, FirebaseService, currentAuth, $location){
	if(!currentAuth){
		$location.path('/login');
	}

	$scope.addMovies = function() {
		FirebaseService.addMovies(
				$scope.name,
		$scope.director,
		$scope.release,
		$scope.description
				)
		$scope.name = ''
		$scope.director = ''
		$scope.release = ''
		$scope.description = ''
		$scope.addMovieForm.$setPristine()
	}
})