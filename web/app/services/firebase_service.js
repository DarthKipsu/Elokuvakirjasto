MyApp.service('FirebaseService', function ($firebase) {
	var firebaseRef = new Firebase('https://luminous-inferno-3769.firebaseio.com/movies')
	var sync = $firebase(firebaseRef)
	var movies = sync.$asArray()

	this.getMovies = function () {
		return movies
	}

	this.addMovies = function (name, director, release, description) {
		movies.$add({
			name: name,
			director: director,
			release: release,
			description: description
		})
	}
})