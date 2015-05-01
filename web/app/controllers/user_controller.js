MyApp.controller('UserController', function($scope, $location, AuthenticationService){
	$scope.message = ""
	AuthenticationService.checkLoggedIn().then(function(value) {
		$scope.auth = value
	})

	$scope.$on('loginChange', function(event, data) {
		AuthenticationService.checkLoggedIn().then(function(value) {
			$scope.auth = value
		})
	})
	
	$scope.logIn = function(){
		AuthenticationService.logUserIn($scope.email, $scope.password)
				.then(function(){
					$location.path('/movies');
		})
				.catch(function(){
					$scope.message = 'Väärä sähköpostiosoite tai salasana!'
		});
	}
	
	$scope.logOut = function() {
		AuthenticationService.logUserOut()
	}
	
	$scope.register = function(){
		AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
				.then(function(){
					AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
					.then(function(){
						$location.path('/movies');
			});
		})
				.catch(function(){
					$scope.message = 'Tapahtui virhe! Yritä uudestaan';
		});
	}
});