MyApp.controller('SearchMovieController', function($scope, OMDbService){
	$scope.findMovie = function() {
		OMDbService.findMovie($scope.movie.name, $scope.movie.year).success(function(movies) {
			$scope.movies = movies
			$scope.naytaViesti = true
		})
	}
	$scope.naytaViesti = false
})