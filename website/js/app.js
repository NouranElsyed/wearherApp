
  const apiKey = "a3b23184ca8f12a9e7b18345d9678c44&units=imperial";
  const baseUrl = `https://api.openweathermap.org/data/2.5/`;

const getWeather = async (zip) => {
  

  let currentWeatherUrl;

  if (/^\d+$/.test(zip)) {
    console.log(zip);

     currentWeatherUrl = await fetch(`${baseUrl}weather?zip=${zip}&appid=${apiKey}`);

 
}else 
{
  console.log(`city ${zip}`);
     currentWeatherUrl = await fetch(`${baseUrl}weather?q=${zip}&appid=${apiKey}`);

}
  try {
    const data = await currentWeatherUrl.json();
    console.log(data);
    const cityName = data.name; 
    console.log(`City: ${cityName}`);
    const temp = data.main.temp; 
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    console.log(iconUrl);
  const  forecastUrl = await fetch(`${baseUrl}forecast?q=${location}&appid=${apiKey}`);;
    
    return { temp , cityName , iconUrl };  
  } catch (error) {
    console.error('Error:', error);
  }
};



const updateUI = async () => {
  const request = await fetch('http://localhost:8000/all');
  try {
    const allData = await request.json();
    console.log(allData.cityName , allData.iconUrl);
    console.log(document.querySelector('.location').innerHTML );
    document.querySelector('.location').innerHTML = allData.cityName; 
console.log(document.querySelector(".weather-icon"));

    document.querySelector(".weather-icon").src = allData.iconUrl;
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = Math.round(allData.temp) + '°F';
    document.getElementById('content').innerHTML = allData.feel;
    document.querySelector('.location').innerHTML = allData.cityName; 

  } catch (error) {
    console.error('Error:', error);
  }
};



document.getElementById('generate').addEventListener('click', async () => {
  const location = document.getElementById('zip').value;
  const feel = document.getElementById('feelings').value;
  const date = new Date().toLocaleDateString();


  const { temp, cityName ,iconUrl } = await getWeather(location);
  console.log(temp,cityName,iconUrl);


  await fetch('http://localhost:8000/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date,
      temp,
      feel,
      cityName,
      iconUrl

    }),
  });

  updateUI();
});



