import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

const DisplayCountry = ({country, apikey}) => {
    const [weather, setweather] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country[0].capital}&units=metric&wind.direction.code&appid=${apikey}`)
      .then(response => {
          setweather(response.data)
          setLoaded(true)
        })
    }, [country, apikey])

    console.log("weather: ", weather);

    const DisplayWeather = () => {
        if (loaded) {
            let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];

            console.log(weather.location);
            return(
                <div>
                <h4>Weather in {country[0].capital}</h4>
                <p><b>temperature</b> {weather.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <p><b>wind:</b> {weather.wind.speed}mts/sec {compassSector[(weather.wind.deg / 22.5).toFixed(0)]}</p>
          </div>            
            )
        }
        else {
            return null
        }
    }

    return(<>
      <h2>{country[0].name.common}</h2>
      <p>capital {country[0].capital}</p>
      <p>population {country[0].population}</p>
      <h4>languages</h4>
      <ul>
      {Object.values(country[0].languages).map((item) => {
        return(
          <li key={item}>{item}</li>
          )
        })}
      </ul>
      <img src={country[0].flags.png} alt="flag" />
      <DisplayWeather/>
    </>)
  }

export default DisplayCountry;
