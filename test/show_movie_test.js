describe('Show movie', function(){
	var controller, scope;
	
	var FirebaseServiceMock, RouteParamsMock;
	
  	beforeEach(function(){
    	module('MyApp');
		
    	FirebaseServiceMock = (function(){
			return {
				getMovie: function (id, done) {
					if (id === 'leffa1') {
						done({
							name: 'Leffa',
							director: 'Ohjaaja',
							release: '2000',
							description: 'Siisti leffa'
						})
					} else {
						done(null)
					}
				}
			}
		})();
		
		RouteParamsMock = (function(){
			return {
				id: 'leffa1'
			}
		})();
		
		// Lisää vakoilijat
		spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
		
		// Injektoi toteuttamasi kontrolleri tähän
		inject(function($controller, $rootScope) {
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
	 * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
	 * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
	 * käyttämällä toBeCalled-oletusta.
	 */
	it('should show current movie from Firebase', function(){
		expect(scope.movie.name).toEqual('Leffa')
		expect(scope.movie.director).toEqual('Ohjaaja')
		expect(scope.movie.release).toEqual('2000')
		expect(scope.movie.description).toEqual('Siisti leffa')
		expect(FirebaseServiceMock.getMovie).toHaveBeenCalled()
	});
});