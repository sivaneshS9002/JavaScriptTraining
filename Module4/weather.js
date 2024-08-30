function handleInput(event) {
     if (Number(event.target.value)) {
          document.querySelector('.city-name').style.color = 'red';
          document.querySelector('.city-name').style.borderColor = 'red';
     }
     else {
          document.querySelector('.city-name').style.color = 'black';
          document.querySelector('.city-name').style.borderColor = 'black';
     }

}




  function handleClick(event) {
     event.preventDefault();
     const err = document.querySelector('.err-mess');
     const cityName = document.querySelector('.city-name').value;
     const celsius = document.querySelector('.celsius-st');
     const cName = document.querySelector('.cName');
     const humidity = document.querySelector('.Humidity');
     const image = document.querySelector('.weather-img-container');
     if (!cityName || Number(cityName)) {
          err.style.display = 'block';
          err.textContent = "Enter the Valid Inputs";
     }
     else {
          async function fetchWeatherData(cityName) {
               try {
                   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f862069d0e86f8686e96aec5014dae92`);
           
                   if (response.ok) {
                       const data = await response.json();
                       
                       image.innerHTML = `<p>Weather Icon:</p><img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png />`;
                       celsius.textContent = `${Math.round(data.main.temp - 273)} C°`;
                       cName.textContent = cityName;
                       humidity.textContent = `${data.main.humidity} %`;
                       console.log(data.main);
                       err.style.display = 'none';
                   } else {
                       console.log(response);
           
                       if (response.status === 401) {
                           err.style.display = 'block';
                           err.textContent = 'Server did not Respond';
                       } else if (response.status === 404) {
                           err.style.display = 'block';
                           err.textContent = 'Invalid CityName';
                       }
           
                       celsius.textContent = "";
                       cName.textContent = "";
                       humidity.textContent = "";
                       image.innerHTML = "";
                   }
               } catch (error) {
                   console.log(error);
               }
           }
           
           // Usage
           fetchWeatherData(cityName);
           
     }


     document.querySelector('.city-name').value = "";
}

