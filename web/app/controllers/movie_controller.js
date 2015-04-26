MyApp.controller('MovieController', function($scope, FirebaseService){
	$scope.movies = FirebaseService.getMovies()
})