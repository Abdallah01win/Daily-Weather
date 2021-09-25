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
        const weatherData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=cbcafb424d21d0e5649df03b5bb0e352`)
        displayData(weatherData)
        //console.log(weatherData.data.weather[0].main)
    } catch (e) {
        console.log(e)
    }

}

// Displays general weather Status

const displayData = (resp) => {
    const generalStatus = document.createElement('DIV');
    generalStatus.setAttribute('id', 'weatherStatus');

    const main = document.createElement('DIV')
    main.setAttribute('id','main'); 

    main.append(resp.data.weather[0].main);
    generalStatus.append(main);

    const description = document.createElement('DIV')
    description.setAttribute('id','description');
    description.append(resp.data.weather[0].description)
    generalStatus.append(description);

    const weatherIcon = resp.data.weather[0].icon
    const icon = document.createElement('img')
    icon.setAttribute('id','icon');
    icon.src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
    generalStatus.append(icon)

    document.body.append(generalStatus)
}