var expectPromisedValue = function(promise, expectedValue) {
  promise.then(function(resolvedValue) {
    expect(resolvedValue).toEqual(expectedValue);
  });
}

describe('Weather App', () => {
    var ctrl = null;

    beforeEach(() => {
        bard.appModule('app');
        bard.inject('$controller', '$httpBackend', '$rootScope');        
    });

    beforeEach(() => {
        ctrl = $controller('WeatherController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Controller VM', () => {
        it('should contain a getWeather function', () => {
            expect(ctrl.getWeather).toBeDefined();
        });
        it('should contain a `searches` array property', () => {
            expect(ctrl.searches).toEqual([]);
        });
        it('should contain a cityName string property', () => {
            expect(ctrl.cityName).toEqual('');
        });
        it('should download data when getWeather is called', () => {
            expect(ctrl.getWeather('London'))
        });
    });

    afterEach(inject(function($rootScope) {
        $rootScope.$apply();
    }));
});