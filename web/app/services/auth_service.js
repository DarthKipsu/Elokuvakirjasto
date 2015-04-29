MyApp.service('AuthenticationService', function($firebase, $firebaseAuth){
	var firebaseRef = new Firebase('https://luminous-inferno-3769.firebaseio.com/movies')
	var firebaseAuth = $firebaseAuth(firebaseRef)
	
	this.logUserIn = function(email, password){
		return firebaseAuth.$authWithPassword({
			email: email,
			password: password
		})
	}
	
	this.logUserOut = function() {
		firebaseRef.unauth()
	}
	
	this.createUser = function(email, password){
		return firebaseAuth.$createUser({
			email: email,
			password: password
		})
	}
	
	this.checkLoggedIn = function(){
		return firebaseAuth.$waitForAuth();
	}
});