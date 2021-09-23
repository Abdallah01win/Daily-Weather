const country = document.querySelector('#form-country');
const city = document.querySelector('#form-city');

const worldCities = {
    Spain : ['Madrid', 'Barcalona', 'Sivilia', 'Granada', 'Valencia'],
    Italy : ['Milan', 'Rome', 'Vinice', 'Naplis', 'Torine'],
    Finland : ['Helsinki', 'Osspo', 'Turku', 'Tampere', 'Pori']
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