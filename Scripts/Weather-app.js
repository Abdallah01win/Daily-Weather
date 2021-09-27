const country = document.querySelector('#form-country');
const city = document.querySelector('#form-city');
const submit = document.querySelector('#submit');
let isDisplayed = false
const worldCities = {
    Spain: ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Bilbao', 'Alicante', 'Granada'],

    Italy: ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Venice'],

    Germany: ['Berlin', 'Hamburg', 'Munich', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],

    Norway: ['Oslo', 'Trondheim', 'Drammen', '	Kristiansand', 'Ålesund', 'Tønsberg', 'Moss', 'Haugesund', 'Arendal', 'Hamar'],

    Switzerland: ['Zürich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'Lucerne', 'St. Gallen', 'Lugano', 'Biel/Bienne']
}

country.addEventListener('change', () => {
    const countryValue = country.options[country.selectedIndex].value;
    creatNewOption(countryValue)
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
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=cbcafb424d21d0e5649df03b5bb0e352`)
        displayData(weatherData)
    } catch (e) {
        console.log(e)
    }
}

// Displays general weather Status

const displayData = (resp) => {
    // try to make a function that creates HTML Divs
    /*const divs = [
        'dataContainer', 'generalStatus', 'temStatus', 'additinalInfo'
    ]
    const creatDivs = (divs) =>{
        for (let i = 0; i < divs.length; i++) {
            const divs[i] = document.createElement('DIV');
        }
    }
    creatDivs(divs)*/
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
    main.append(resp.data.weather[0].main);
    description.append(resp.data.weather[0].description);
    temp.append(`Temperature: ${resp.data.main.temp} C`);
    feels.append(`Feels Like: ${resp.data.main.feels_like} C`);
    minTemp.append(`Min Temperature: ${resp.data.main.temp_min} C`);
    maxTemp.append(`Max Temperature: ${resp.data.main.temp_max} C`);
    wind.append(`Wind Speed: ${resp.data.wind.speed} KM/H`);
    humidity.append(`Humidity: ${resp.data.main.humidity} %`);
    pressure.append(`Pressure: ${resp.data.main.pressure} P`);

    //appendToDOM
    generalStatus.append(main, description, feels);
    temStatus.append(temp, maxTemp, minTemp);
    additinalInfo.append(wind, humidity, pressure);
    dataContainer.append(icon, generalStatus, temStatus, additinalInfo)

    document.body.append(dataContainer);
    isDisplayed = true
}


