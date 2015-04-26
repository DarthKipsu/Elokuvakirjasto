describe('Add movie', function(){
	var controller, scope;
	
	var FirebaseServiceMock;
	
  	beforeEach(function(){
  		// Lisää moduulisi nimi tähän
    	module('MyApp');
		
    	FirebaseServiceMock = (function(){
			var movies = []
			return {
				movies: movies,
				addMovies: function () {
					if (name === '' || director === '' || release === '' || description === '') return
					movies.push({
						name: scope.name,
						director: scope.director,
						release: scope.release,
						description: scope.description
					})
				}
			}
		})();
		
		// Lisää vakoilijat
	    spyOn(FirebaseServiceMock, 'addMovies').and.callThrough();
		
    	// Injektoi toteuttamasi kontrolleri tähän
	    inject(function($controller, $rootScope) {
			scope = $rootScope.$new();
			scope.addMovieForm = {
				$setPristine: function() {}
			};
			// Muista vaihtaa oikea kontrollerin nimi!
			controller = $controller('AddMovieController', {
				$scope: scope,
				FirebaseService: FirebaseServiceMock
			});
	    });
  	});
	
  	/*
	 * Testaa alla esitettyjä toimintoja kontrollerissasi
	 */
	
  	/*
	 * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
	 * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	 * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
	 * toBeCalled-oletusta.
	 */
	it('should be able to add a movie by its name, director, release date and description', function(){
		scope.name = 'Leffa 2'
		scope.director = 'Joku muu'
		scope.release = '2000'
		scope.description = 'Siisti leffa'
		scope.addMovies()
		expect(FirebaseServiceMock.addMovies).toHaveBeenCalled()
	});
	
	/*	
	 * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
	 * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
	 * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
	 * not.toBeCalled-oletusta (muista not-negaatio!).
	 */
	it('should not be able to add a movie if its name, director, release date or description is empty', function(){
		expect(FirebaseServiceMock.movies.length).toBe(0)
		scope.name = ''
		scope.director = ''
		scope.release = ''
		scope.description = ''
		scope.addMovies()
		expect(FirebaseServiceMock.addMovies).toHaveBeenCalled()
		expect(FirebaseServiceMock.movies.length).toBe(0)
	});
});