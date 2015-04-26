MyApp.controller('AddMovieController', function($scope, FirebaseService){
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