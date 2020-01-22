const APIKey = 'YpKFFNSqvH9SVFIG2CK6rh3yq8sGV7ZN';

const getCity = city => {
    return new Promise((resolve, reject) => {
        const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=${APIKey}&q=${city}`;

        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState === request.DONE && request.status === 200) {
                const data = JSON.parse(request.responseText)[0];
                resolve(data);
            } else if (request.readyState === request.DONE) {
                reject('can not fetch');
            }
        });

        request.open('GET', base + query);
        request.send();
    });
};

const getWeather = cityKey => {
    return new Promise((resolve, reject) => {
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${cityKey}?apikey=${APIKey}`;

        const request = new XMLHttpRequest();

        request.addEventListener('readystatechange', () => {
            if (request.readyState === request.DONE && request.status === 200) {
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else if (request.readyState === request.DONE) {
                reject('can not fetch');
            }
        });

        request.open('GET', base + query);
        request.send();
    });
};

getCity('cairo')
    .then(data => {
        return getWeather(data.Key);
    }).then(data => {
        console.log(data[0]);
    })
    .catch(err => {
        console.log(err)
    });
