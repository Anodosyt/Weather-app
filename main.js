const searchForm = document.querySelector('.search-location');
const searchedCity = document.querySelector('#citySelect');
const selectedCountry = document.querySelector('#countrySelect');
const cityName = document.querySelector('.city-name');
const cardBody = document.querySelector('.card-body');
const cardImage = document.querySelector('#cardTopImage');
const cardContainer = document.querySelector('.back-card');



const updateDOM = data=>{

    const iconURL = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    
    const isDaytime = data.weather[0].icon.includes('d');
    let iconBackground =''
    if(isDaytime){
        cardImage.setAttribute('src','./img/day_image.svg')
        iconBackground ='#94c9ff'
        if(cityName.classList.contains('text-white')){
            cityName.classList.remove('text-white')
            cityName.classList.remove('text-black')
        }else {
            cityName.classList.add('text-black')
        }

    }else{
        cardImage.setAttribute('src','./img/night_image.svg')
        iconBackground ='#0c0d43'


        if(cityName.classList.contains('text-black')){
            cityName.classList.remove('text-black')
            cityName.classList.add('text-white')
        }else {
            cityName.classList.add('text-white')
        }
    }

    

    cityName.innerHTML = `
    <p>${data.name}</p>
    <span>(${data.sys.country})</span>
    `
    
    cardBody.innerHTML = `
    <div class="card-mid row">

                    <div class="col-8 text-center temp">
                        <span>${Math.round(data.main.temp)}&deg;C</span>
                    </div>

                    <div class="col-4 condition-temp">
                        <p class="condition">${data.weather[0].description}</p>
                        <p class="highTemp">${Math.round(data.main.temp_max)}&deg;C</p>
                        <p class="lowTemp">${Math.round(data.main.temp_min)}&deg;C</p>
                    </div>

                </div>

               
                <div style="background-color:${iconBackground}" class="icon-container card shadow mx-auto">
                    <img src="${iconURL}" alt="">
                </div>


              
                <div class="card-bottom px-5 py-4 row">

                    <div class="col text-center">
                        <p>${Math.round(data.main.feels_like)}&deg;C</p>
                        <span>Feels Like</span>
                    </div>
                    <div class="col text-center">
                        <p>${data.main.humidity}</p>
                        <span>Humidity</span>
                    </div>

                </div>
    `
    cardContainer.classList.remove('d-none');
}

document.addEventListener('DOMContentLoaded',(e)=>{
    console.log('window loaded')
    countryList().then(async countries=>{
        await countries.forEach(country => {
            selectedCountry.innerHTML += `
            <option class="dropdown-item" value="${country.Code}">${country.Name}</option>
            `
        });
    });
    

})


searchForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(searchedCity.value,selectedCountry.value);

    citySearch(searchedCity.value,selectedCountry.value)
    .then(data=>{
        console.log(data);
        updateDOM(data);
    })
    .catch(err=>{
        console.log(err)
        alert('Something went wrong! Please choose your city and country again')
    })

    searchForm.reset();
})