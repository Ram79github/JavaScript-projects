document.addEventListener('DOMContentLoaded' ,() =>{
    const cityInput = document.getElementById("city-Input");
    const searchBtn = document.getElementById("searchBtn");
    const weatherInfo= document.getElementById("weather-info");
    const cityName = document.getElementById("city-name");
    const cityTemp = document.getElementById("temperature");
    const Description = document.getElementById("description");
    const errorMsg = document.getElementById("error-message");
 const APIkey= "5f56d525d1619d0a2cd2eac4ce55588e"
 searchBtn.addEventListener('click',async()=>{
     const city = cityInput.value.trim();
     if(!city) return;

     try {
        const weatherdata= await fetchWeatherdata(city);
        diplayWeatherdata(weatherdata);

     } catch (error) {
        showError();
     }
    
 })
async function fetchWeatherdata(city){
   const Url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
  const response= await  fetch(Url);
  console.log("REsponse",response);
   if(!response.ok){
      throw new Error("city not found");}
   const data= await response.json();
   return data;
  
 }
 function diplayWeatherdata(data)
 {
   const{name,main,weather}= data;
   cityName.textContent = name;
   cityTemp.textContent = `${main.temp}°C`;
   Description.textContent = weather[0].description;
   //unlock hidden weather info
   weatherInfo.classList.remove("hidden");
   errorMsg.classList.add("hidden");
 }
  function showError(){
   //show error message and hide weather info
    weatherInfo.classList.add('hidden');
    errorMsg.classList.remove("hidden");
  }

})
