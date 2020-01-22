class Forecast {
    constructor() {
        this.APIKey = 'rBIA09O0rl7CdDQSVvKoOD2WctQITidP';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }

    async updateCity(city) {
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);

        return { cityDetails, weather };
    }

    // Get city keycode
    async getCity(city) {
        const query = `?apikey=${this.APIKey}&q=${city}`;
        const responce = await fetch(this.cityURL + query);
        const data = await responce.json();

        return data[0];
    }

    // Get weather information
    async getWeather(cityKey) {
        const query = `${cityKey}?apikey=${this.APIKey}`;
        const responce = await fetch(this.weatherURL + query);
        const data = await responce.json();

        return data[0];
    }
}


