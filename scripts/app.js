const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


const updateUI = async (data) => {

    console.log(data);
    const cityDets = data.cityDets;
    const weather = data.weather;
    let curTime = weather.LocalObservationDateTime.slice(11,16);
    console.log(curTime);
    

    details.innerHTML = `
    <h5 class="my-3 text-uppercase">${cityDets.EnglishName}</h5>
        <div class="my-3 fs-6">${weather.WeatherText}</div>
        <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
        </div>
        <div class="my-3">Current time: ${curTime}</div>
        
    `;

    //update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    
    icon.setAttribute('src', iconSrc);

    let timeSrc = null;

    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }else{
        timeSrc = 'img/night.svg';
    }

    time.setAttribute('src', timeSrc);

    // remove the d-none class if present

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};


const updateCity = async (city) => {
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };
};  

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //get city value
    const city = form.city.value.trim();
    form.reset();
    //update the ui with new city
    updateCity(city).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });

});