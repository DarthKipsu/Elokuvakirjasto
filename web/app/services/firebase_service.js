MyApp.service('FirebaseService', function ($firebase) {
	var firebaseRef = new Firebase('https://luminous-inferno-3769.firebaseio.com/movies')
	var sync = $firebase(firebaseRef)
	var movies = sync.$asArray()

	this.getMovies = function () {
		return movies
	}

	this.getMovie = function(key, done) {
		movies.$loaded(function() {
			done(movies.$getRecord(key))
		})
	}

	this.removeMovie = function(movie) {
		movies.$remove(movie)
	}

	this.updateMovie = function(movie) {
		movies.$save(movie)
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