const input = document.querySelector('input');
const button = document.querySelector('button');
const errorMsg = document.querySelector('p.error_message');

const cityName = document.querySelector('h2.city_name');
const weatherImg = document.querySelector('img');
const temp = document.querySelector('p.temp');
const description = document.querySelector('p.description');


const feelsLike = document.querySelector('span.feels_like');
const pressure = document.querySelector('span.pressure');
const humidity = document.querySelector('span.humidity');
const windSpeed = document.querySelector('span.wind_speed');
const clouds = document.querySelector('span.clouds');
const visibility = document.querySelector('span.visibility');


const apiInfo = {
    link: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '&appid=e8e9605e56a6d48a1bef1893e03ae040',
    units: '&units=metric',
    lang: '&lang=pl'
}

function getWeatherInfo()
{
    const apiInfoCity = input.value;





    const URL =`${apiInfo.link}${apiInfoCity}${apiInfo.key}${apiInfo.units}${apiInfo.lang}`;
    console.log(URL);

    axios.get(URL).then((response)=>{


        console.log(response.data);


        

        cityName.textContent = `${response.data.name}, ${response.data.sys.country}`;

        temp.textContent = `${Math.round(response.data.main.temp)} ℃`;

        description.textContent = `${response.data.weather[0].description}`;
        weatherImg.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;

        feelsLike.textContent = `${Math.round(response.data.main.feels_like)} ℃`;


        pressure.textContent = `${response.data.main.pressure} hPa`;

        humidity.textContent = `${response.data.main.humidity} %`;

        windSpeed.textContent = `${Math.round(response.data.wind.speed * 3.6)} km/h`;

        clouds.textContent = `${response.data.clouds.all} %`;

        visibility.textContent = `${response.data.visibility / 1000} km`;


        errorMsg.textContent = '';

    }).catch((error) => {
        console.log(error);
        errorMsg.textContent = `${error.response.data.cod} - ${error.response.data.message}. `;

        weatherImg.src = ``;
        [cityName, temp, description, feelsLike, windSpeed, humidity, pressure, visibility, clouds].forEach(el => el.textContent = '');
    }).finally()
    {
        input.value = '';
    }

}

button.addEventListener('click', getWeatherInfo);
input.addEventListener('keypress', function(event){
if(event.key === 'Enter')
    button.click();
});