(function(){
    'use strict';

    angular
        .module('app')
        .controller('WeatherController', WeatherController)

    WeatherController.$inject = ['$http'];

    function WeatherController($http) {
        var vm = this;

        vm.searches = [];
        vm.cityName = '';

        vm.getWeather = getWeather;
        
        ///////////

        function getWeather(city) {
            vm.loading = true;

            $http
                .get('http://api.openweathermap.org/data/2.5/weather?apikey=041b9d493799dcd6d6974147dbcb75e4&units=imperial&q=' + city)
                .then(function(response) {
                    vm.weatherData = response.data;
                    vm.searches.push({
                        timestamp: new Date(),
                        name: vm.weatherData.name
                    });
                    vm.loading = false;
                });
        }
    }
})();