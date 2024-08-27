document.querySelector('.city-name').addEventListener('input', (event) => {
     if (Number(event.target.value)) {
          document.querySelector('.city-name').style.color = 'red';
          document.querySelector('.city-name').style.borderColor = 'red';
     }
     else {
          document.querySelector('.city-name').style.color = 'black';
          document.querySelector('.city-name').style.borderColor = 'black';
     }

});

   


document.querySelector('.btn').addEventListener('click', () => {
     const cityName = document.querySelector('.city-name').value;
     if (!cityName || Number(cityName)) {
          document.querySelector('.err-body').innerHTML = `<p style="color:red;font-weight:700">----Please Enter the CityName----</p>`
     }
     else {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f862069d0e86f8686e96aec5014dae92`)
               .then((response) => {
                    if (response.ok) {
                         console.log(response.ok);
                         return response.json();
                    }
                    else {
                         document.querySelector('.err-body').innerHTML = `<p style="color:red;">In valid City Name</p>`;
                    }
               }).then((data) => {
                    document.querySelector('.weather-img-container').innerHTML = `<p>Weather Icon:</p><img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png
" />`
                    document.querySelector('.celsius-st').textContent = `${data.main.temp - 273} C°`;
                    document.querySelector('.cName').textContent = cityName;
                    document.querySelector('.Humidity').textContent = `${data.main.humidity} %`;
                    console.log(data.main);
               })
               .catch((error) => {
                    console.log(error);
               });
     }


      document.querySelector('.city-name').value="";
})
