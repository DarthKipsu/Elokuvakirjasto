describe('Movie list', function(){
	var controller, scope;
	
	var FirebaseServiceMock;
	
  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MyApp');
		
    	FirebaseServiceMock = (function(){
			var movies = [
				{
					name: 'Leffa',
					director: 'Joku',
					release: '1985',
					description: 'Hyvä leffa'
				}
			]
			return {
				getMovies: function() {
					return movies
				},
				removeMovie: function(movie) {
					movies.splice(movie, 1)
				}
			}
		})();
		
		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
	    spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
		
    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			// Muista vaihtaa oikea kontrollerin nimi!
			controller = $controller('MovieController', {
				$scope: scope,
				FirebaseService: FirebaseServiceMock
			});
	    });
  	});
	
  	/*
	 * Testaa alla esitettyjä toimintoja kontrollerissasi
	 */
	
  	/*
	 * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
	 * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
	 * käyttämällä toBeCalled-oletusta.
	 */ 
	it('should list all movies from the Firebase', function(){
		expect(scope.movies.length).toBe(1)
		expect(FirebaseServiceMock.getMovies).toHaveBeenCalled()
	});
	
	/* 
	 * Testaa, että elokuvan pystyy poistamaan Firebasesta.
	 * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
	 * käyttämällä toBeCalled-oletusta.
	 */
	it('should be able to remove a movie', function(){
		var movie = scope.movies[0]
		scope.removeMovie(movie)
		expect(scope.movies.length).toBe(0)
		expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled()
	});
});