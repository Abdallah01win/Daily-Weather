const country = document.querySelector('#form-country');
const city = document.querySelector('#form-city');
const submit = document.querySelector('#submit');

const worldCities = {
    Spain : ['Madrid', 'Barcalona','Valencia', 'Seville', 'Zaragoza', 'Málaga','Murcia','Bilbao','Alicante','Granada'],

    Italy : ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Venice'],

    Germany : ['Berlin', 'Hamburg', 'Munich', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],

    Norway : ['Oslo', 'Trondheim', 'Drammen', '	Kristiansand', 'Ålesund', 'Tønsberg', 'Moss', 'Haugesund', 'Arendal', 'Hamar'],

    Switzerland : ['Zürich', 'Geneva', 'Basel', 'Lausanne', 'Bern', 'Winterthur', 'Lucerne', 'St. Gallen', 'Lugano', 'Biel/Bienne']
}

country.addEventListener('change', () => {
    
    let countryValue = country.options[country.selectedIndex].value;
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

submit.addEventListener('click', (e)=>{
    e.preventDefault()
    const getData = async () =>{
        const weatherData = await axios.get(`api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=9840f5f10d58e26a6f4365d0c7aa5157`)
    }
    console.log(city.value)
})

