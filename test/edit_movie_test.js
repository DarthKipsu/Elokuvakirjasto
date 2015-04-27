describe('Edit movie', function () {
	var controller, scope;
	
	var FirebaseServiceMock, RouteParamsMock;
	
	beforeEach(function () {
		// Lisää moduulisi nimi tähän
		module('MyApp');
		
		FirebaseServiceMock = (function () {
			var leffa1 = {
				name: 'Leffa',
				director: 'Ohjaaja',
				release: '2000',
				description: 'Siisti leffa'
			}
			return {
				getMovie: function (id, done) {
					if (id === 'leffa1') {
						done(leffa1)
					} else {
						done(null)
					}
				},
				updateMovie: function (movie) {
					leffa1 = movie;
				}
			}
		})();
		
		RouteParamsMock = (function () {
			return {
				id: 'leffa1'
			}
		})();
		
		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
		spyOn(FirebaseServiceMock, 'updateMovie').and.callThrough();
		
		// Injektoi toteuttamasi kontrolleri tähän
		inject(function ($controller, $rootScope) {
			scope = $rootScope.$new();
			// Muista vaihtaa oikea kontrollerin nimi!
			controller = $controller('ShowMovieController', {
				$scope: scope,
				FirebaseService: FirebaseServiceMock,
				$routeParams: RouteParamsMock
			});
		});
	});
	
	/*
	 * Testaa alla esitettyjä toimintoja kontrollerissasi
	 */
	
	/*
	 * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
	 * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
	 * käyttämällä toBeCalled-oletusta.
	 */
	it('should fill the edit form with the current information about the movie', function () {
		expect(scope.movie.name).toEqual('Leffa')
		expect(scope.movie.director).toEqual('Ohjaaja')
		expect(scope.movie.release).toEqual('2000')
		expect(scope.movie.description).toEqual('Siisti leffa')
		expect(FirebaseServiceMock.getMovie).toHaveBeenCalled()
	})
	
	/* 
	 * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
	 * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
	 * käyttämällä toBeCalled-oletusta.
	 */
	it('should be able to edit a movie by its name, director, release date and description', function () {
		scope.movie.name = 'Leffa 2'
		scope.movie.director = 'Joku muu'
		scope.movie.release = '2015'
		scope.movie.description = 'Siisti leffa'
		scope.editMovie(scope.movie)
		expect(scope.movie.name).toEqual('Leffa 2')
		expect(scope.movie.director).toEqual('Joku muu')
		expect(scope.movie.release).toEqual('2015')
		expect(scope.movie.description).toEqual('Siisti leffa')
		expect(FirebaseServiceMock.updateMovie).toHaveBeenCalled()
	});
	
	/*
	 * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
	 * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
	 * käyttämällä not.toBeCalled-oletusta.
	 */
	it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
		scope.editMovie({name: ''})
		expect(scope.movie.name).toEqual('Leffa')
		expect(scope.movie.director).toEqual('Ohjaaja')
		expect(scope.movie.release).toEqual('2000')
		expect(scope.movie.description).toEqual('Siisti leffa')
		expect(FirebaseServiceMock.updateMovie).not.toHaveBeenCalled()
	});
});