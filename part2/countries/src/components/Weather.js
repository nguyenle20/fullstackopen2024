const Weather = ({ temp, windSpeed, weatherIcon, name}) => {

  return (
      <div>
        <h3>Weather in {name}</h3>
        <p>temp {temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weatherIcon}.png`} alt={"current weather"}/>
        <p>wind {windSpeed} m/s</p>
      </div>
  )
};

export default Weather;