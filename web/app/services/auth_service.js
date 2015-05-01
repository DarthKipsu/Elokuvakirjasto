MyApp.service('AuthenticationService', function($firebase, $firebaseAuth, $rootScope){
	var firebaseRef = new Firebase('https://luminous-inferno-3769.firebaseio.com/movies')
	var firebaseAuth = $firebaseAuth(firebaseRef)
	
	this.logUserIn = function(email, password){
		return firebaseAuth.$authWithPassword({
			email: email,
			password: password
		}).then(function(val) {
			$rootScope.$broadcast('loginChange', val)
		})
	}
	
	this.logUserOut = function() {
		firebaseRef.unauth()
		$rootScope.$broadcast('loginChange', false)
	}
	
	this.createUser = function(email, password){
		return firebaseAuth.$createUser({
			email: email,
			password: password
		}).then(function(val) {
			$rootScope.$broadcast('loginChange', val)
		})
	}
	
	this.checkLoggedIn = function(){
		return firebaseAuth.$waitForAuth();
	}
});