import {worldCities} from './cities-Db.js' ;

const country = document.querySelector('#form-country');
const city = document.querySelector('#form-city');
const units = document.querySelector('#form-unit');
const submit = document.querySelector('#submit');

let isDisplayed = false
let cityOptions = false

function selectUnit() {
    if (units.value === 'metric') {
        let tempUnit = 'C';
        let lenghtUnit = 'KM/H';
        console.log(tempUnit, lenghtUnit)
    }
    else if (units.value === 'imperial') {
        let tempUnit = 'F';
        let lenghtUnit = 'MPH';
        console.log(tempUnit, lenghtUnit)
    }
}

country.addEventListener('change', () => {
    const countryValue = country.options[country.selectedIndex].value;
    if (cityOptions === false) {
        creatNewOption(countryValue)
        cityOptions = true
    }
    else if (cityOptions === true) {
        for (let i = city.length - 1; i >= 0; i--) {
            city[i].parentNode.removeChild(city[i]);
        }
        creatNewOption(countryValue)
    }
})

function creatNewOption(countryValue) {

    for (const newCity of worldCities[countryValue]) {
        const newOption = document.createElement('option');
        newOption.value = newCity;
        newOption.append(newCity);
        city.append(newOption);
    }
}

submit.addEventListener('click', (e) => {
    e.preventDefault()
    getData()
})

// Recives data from the API
const getData = async () => {
    try {
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units.value}&appid=cbcafb424d21d0e5649df03b5bb0e352`);
        displayData(weatherData);
        window.scrollTo(0, document.body.scrollHeight);
    }
    // Error Hanndeling
    catch (err) {
        let errorCode = err.message.substring(err.message.length - 3);

        function displayError(message) {
            const dataContainer = document.createElement('DIV');
            dataContainer.setAttribute('id', 'dataContainer');
            let error = document.createElement('DIV');
            error.append(message);
            dataContainer.append(error);
            document.body.append(dataContainer);
            window.scrollTo(0, document.body.scrollHeight);
            isDisplayed = true
        }

        if (errorCode === "400" || "401") {
            message = 'Our servers are a bit under the weather, pleas try again Later.';
            displayError(message);

        }
        else if (errorCode === "404") {
            message = 'The requested information was not found, pleas check your input';
            displayError(message);
        }
        else if (errorCode === "500" || "503") {
            message = 'Our servers are a bit under the weather, pleas try again Later.';
            displayError(message);
        }
    }
}


// Displays general weather Status

const displayData = (resp) => {

    if (isDisplayed === true) {
        document.body.lastChild.remove()
    }

    //CreatHTMLElements
    const dataContainer = document.createElement('DIV');
    const generalStatus = document.createElement('DIV');
    const temStatus = document.createElement('DIV');
    const additinalInfo = document.createElement('DIV');
    const main = document.createElement('DIV')
    const description = document.createElement('DIV')
    const feels = document.createElement('DIV')
    const icon = document.createElement('img')
    const temp = document.createElement('DIV')
    const minTemp = document.createElement('DIV')
    const maxTemp = document.createElement('DIV')
    const wind = document.createElement('DIV')
    const humidity = document.createElement('DIV')
    const pressure = document.createElement('DIV')

    //setNewAttrebutes
    dataContainer.setAttribute('id', 'dataContainer');
    generalStatus.setAttribute('id', 'generalStatus');
    temStatus.setAttribute('id', 'temStatus');
    additinalInfo.setAttribute('id', 'additinalInfo');
    main.setAttribute('id', 'main');
    description.setAttribute('id', 'description');
    feels.setAttribute('id', 'feels');
    icon.setAttribute('id', 'icon');
    temp.setAttribute('id', 'temp');
    minTemp.setAttribute('id', 'minTemp');
    maxTemp.setAttribute('id', 'maxTemp');
    wind.setAttribute('id', 'wind');
    humidity.setAttribute('id', 'humidity');
    pressure.setAttribute('id', 'pressure');

    const weatherIcon = resp.data.weather[0].icon;
    icon.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    //appendData
    let tempUnit = '';
    let lenghtUnit = '';
    if (units.value === 'metric') {
        tempUnit = 'C';
        lenghtUnit = 'KM/H';
    }
    else if (units.value === 'imperial') {
        tempUnit = 'F';
        lenghtUnit = 'MPH';
    }
    else if (units.value === '') {
        tempUnit = 'K';
        lenghtUnit = 'KM/H';
    }

    main.append(resp.data.weather[0].main);
    description.append(resp.data.weather[0].description);
    temp.append(`Temperature: ${resp.data.main.temp} ${tempUnit}`);
    feels.append(`Feels Like: ${resp.data.main.feels_like} ${tempUnit}`);
    minTemp.append(`Min Temperature: ${resp.data.main.temp_min} ${tempUnit}`);
    maxTemp.append(`Max Temperature: ${resp.data.main.temp_max} ${tempUnit}`);
    wind.append(`Wind Speed: ${resp.data.wind.speed} ${lenghtUnit}`);
    humidity.append(`Humidity: ${resp.data.main.humidity} %`);
    pressure.append(`Pressure: ${resp.data.main.pressure} P`);

    //appendToDOM
    generalStatus.append(main, description, feels);
    temStatus.append(temp, maxTemp, minTemp);
    additinalInfo.append(wind, humidity, pressure);
    dataContainer.append(icon, generalStatus, temStatus, additinalInfo);
    document.body.append(dataContainer);
    isDisplayed = true
}


