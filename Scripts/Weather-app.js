const country = document.querySelector('#form-country');
const city = document.querySelector('#form-city');
const submit = document.querySelector('#submit');

const worldCities = {
    Spain: ['Madrid', 'Barcalona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Bilbao', 'Alicante', 'Granada'],

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
    //CreatHTMLElements
    const generalStatus = document.createElement('DIV');
    const main = document.createElement('DIV')
    const description = document.createElement('DIV')
    const icon = document.createElement('img')
    const temp = document.createElement('DIV')
    const minTemp = document.createElement('DIV')
    const maxTemp = document.createElement('DIV')

    //setNewAttrebutes
    generalStatus.setAttribute('id', 'weatherStatus');
    main.setAttribute('id','main');
    description.setAttribute('id','description');
    icon.setAttribute('id','icon');
    temp.setAttribute('id','temp');
    minTemp.setAttribute('id','minTemp');
    maxTemp.setAttribute('id','maxTemp');

    const weatherIcon = resp.data.weather[0].icon;
    icon.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

    //appendData
    main.append(resp.data.weather[0].main);
    description.append(resp.data.weather[0].description);
    temp.append(resp.data.main.temp);
    minTemp.append(resp.data.main.temp_min);
    maxTemp.append(resp.data.main.temp_max);
    
    //appendToDOM
    generalStatus.append(icon);
    generalStatus.append(main);
    generalStatus.append(temp);
    generalStatus.append(minTemp);
    generalStatus.append(maxTemp);
    generalStatus.append(description);
    document.body.append(generalStatus);
}


