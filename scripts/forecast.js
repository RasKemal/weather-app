const key = 'A6KuGnOYwsPGWJBLvWZmAnT5sEKEOXXO'; 

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

const getWeather = async (cityCode) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}`;
    const query = `?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};



