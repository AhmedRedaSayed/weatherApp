let todayContainer = document.getElementById('today');
let footerContainer = document.getElementById('footer');
let tomorrowContainer = document.getElementById('tomorrow');
let afterTomorrowContainer = document.getElementById('after-tomorrow');
let tomorrowDay = document.getElementById('tomorrowDay');
let afterTomorrowDay=document.getElementById('afterTomorrowDay');
let searchInput = document.getElementById('search');
let find = document.getElementById('find')



let getData = async(city) =>
{   
    let weather= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d8bf6e8146c7401ab20173226221310&q=lon&days=3&aqi=no&alerts=no`);

    if(city != "")
    {
     weather= await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d8bf6e8146c7401ab20173226221310&q=${city}&days=3&aqi=no&alerts=no`);


    }

     let weatherReuslt = await weather.json();
     return weatherReuslt
    
}


let getApi = async() =>
{
    let Api = await getData(searchInput.value);
    let location = Api.location;
    let forecast = Api.forecast.forecastday;
    let today = forecast[0].day
    let tomorrow = forecast[1].day
    let afterTomorrow = forecast[2].day
    let windSpeed = forecast[0].hour[0].wind_kph;
    let windDirection = forecast[0].hour[0].wind_dir;
    let humidity= forecast[0].hour[0].humidity;
    let todayDate = new Date();
    todayDate = String(todayDate).split(" ");
   let tomorrowDate=new Date(forecast[1].date);
    tomorrowDate = String(tomorrowDate).split(" ");
   let afterTomorrowDate=new Date(forecast[2].date);
    afterTomorrowDate= String(afterTomorrowDate).split(" ");
    

    searchInput.addEventListener('input' , function()
    {
        getApi()
    })

    find.addEventListener('click',function()
    {
        getApi()
    }) 





    todayContainer.innerHTML = `<div class="day  m-2 d-flex justify-content-between">
    <p>${getDay(todayDate[0])}</p>
    <p>${todayDate[2]}${getMonth(todayDate[1])}</p>
</div>
<div class="location  p-3">
    <p>${location.name}</p>
    <div class="num d-flex justify-content-between">
    
        <p class="fw-bolder fs-1 text-white">${today.maxtemp_c} <sup>o</sup> C</p>
        <img  src="${today.condition.icon}" alt="">
    </div>
    <p class="text-info">${today.condition.text}</p>
</div>
`
footerContainer.innerHTML = `  <div class="icons d-flex ">
<div class="d-flex me-3">
    <img width="20" height="20" class="me-2" src="icon-umberella.png" alt=""> <p>${humidity}</p>
</div>
<div class="d-flex me-3" >
    <img width="20" height="20" class="me-2" src="icon-wind.png" alt=""> <p>${windSpeed}</p>

</div>
<div class="d-flex me-3">
    <img width="20" height="20" class="me-2" src="icon-compass.png" alt=""><p>${windDirection}</p>
</div>

</div>`

tomorrowContainer.innerHTML = `<img class="py-2" src="${tomorrow.condition.icon}" alt="">
<p class="fw-bolder fs-1">${tomorrow.maxtemp_c} <sup>o</sup> C</p>
<p class="text-muted">${tomorrow.mintemp_c}</p>
<p class="text-info">${tomorrow.condition.text}</p>`

afterTomorrowContainer.innerHTML = `<img class="py-2" src="${afterTomorrow.condition.icon}" alt="">
<p class="fw-bolder fs-1">${afterTomorrow.maxtemp_c} <sup>o</sup> C</p>
<p class="text-muted">${afterTomorrow.mintemp_c}</p>
<p class="text-info">${afterTomorrow.condition.text}</p>`

tomorrowDay.innerHTML = `<p class = "m-2">${getDay(tomorrowDate[0])}</p>`
afterTomorrowDay.innerHTML = `<p class=" m-2">${getDay(afterTomorrowDate[0])} </p>`
    

}
getApi()







function getDay(day)
{

let days = new Map();
days.set('Sat','Saturday');
days.set('Sun','Sunday');
days.set('Mon','Monday');
days.set('Tue','Tuesday');
days.set('Wed','Wednesday');
days.set('Thu','Thursday');
days.set('Fri','Friday');

return days.get(day)
}


console.log(getDay(date[0]));

function getMonth(month)
{
     let months = new Map();
     months.set('Jan','january');
     months.set('Feb','February');
     months.set('Mar','March');
     months.set('Apr','April');
     months.set('May','May');
     months.set('Jun','June');
     months.set('Jul','July');
     months.set('Aug','August');
     months.set('Sep','September');
     months.set('Oct','October');
     months.set('Nov','November');
     months.set('Dec','December');
     return months.get(month);
}



