import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const CountriesDetails = ({ details }) => {
  const {
      name,
      capital,
      area,
      languages,
      flags,
      latlng
  } = details[0];
  const [weatherData, setWeatherData] = useState([]);
  const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;

  //main.temp     wind.speed      weather.icon
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${weatherKey}`)
        .then(res => {
          const { main, wind, weather } = res.data;
          setWeatherData({
            temp: main.temp,
            windSpeed: wind.speed,
            weatherIcon: weather[0].icon,
          });
        })
  }, []);

  return (
      <div>
        <h2>{name.common}</h2>
        <p>capital {capital}</p>
        <p>area {area}</p>

        <h4>languages:</h4>
        <ul>
          {
            Object.values(languages).map((language) => (
              <li key={language}>{language}</li>
            ))
          }
        </ul>

        <img src={flags.png} className="CountryFlag"  alt="country flag" />

        <Weather temp={weatherData?.temp} name={name.common} weatherIcon={weatherData?.weatherIcon} windSpeed={weatherData?.wind} />
      </div>
  )

};

export default CountriesDetails;