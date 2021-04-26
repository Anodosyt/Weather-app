const apiKey = '7eca1419b39449735db909514e22f525'; 


const citySearch = async (city,country) =>{
    const cityApiURL = 'https://api.openweathermap.org/data/2.5/weather';
    
    const query = `?q=${city},${country}&units=metric&appid=${apiKey}`;

    const cityRes = await fetch(cityApiURL+query);
    const cityData = await cityRes.json();


    return cityData
}

const countryList = async()=>{

    const res = await fetch('./json/countries.json');
    const data = await res.json();
    
    return data
}
