const APIKey = 'YpKFFNSqvH9SVFIG2CK6rh3yq8sGV7ZN';

// CALLBACK HELL
const getCity = (city, callback) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${APIKey}&q=${city}`;

    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === request.DONE && request.status === 200) {
            const data = JSON.parse(request.responseText)[0];
            callback(undefined, data);
        } else if (request.readyState === request.DONE) {
            callback('can not fetch', undefined);
        }
    });

    request.open('GET', base + query);
    request.send();
};

const getWeather = (cityKey, callback) => {
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${APIKey}`;

    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if (request.readyState === request.DONE && request.status === 200) {
            const data = JSON.parse(request.responseText)[0];
            callback(undefined, data);
        } else if (request.readyState === request.DONE) {
            callback('can not fetch', undefined);
        }
    });

    request.open('GET', base + query);
    request.send();
};



getCity('cairo', (err, data) => {
    if (err) {
        console.log(err);
    } else if (data) {
        getWeather(data.Key, (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
                console.log(data)
            }
        })
    }
})

