import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = (country) => {
  console.log(country)
  debugger
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API
  const [capitalWeather, setCapitalWeather] = useState(null)  // Show napista tekee errorin koska invalid Hook call
  useEffect(() => {
    getWeather(country.latlng[0], country.latlng[1]);
  });
  
  const getWeather = async (lat, lon) => {
    await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then((response) => setCapitalWeather(response.data));
  };
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <div>
          <img src={country.flags["png"]} />
        </div>
        {capitalWeather && (
          <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>Temperature: {capitalWeather.main.temp} Celcius</p>
            <div>
              <img
                src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
                alt={capitalWeather.weather[0].description}
              />
              <p>Wind: {capitalWeather.wind.speed} mph</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
};

const CountriesToShow = (filtered) => { 
  const countries = filtered.countries
  if (countries.length === 250) {
  return
  }
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  if (countries.length === 1) {
    const country = countries[0]
      return ShowCountry(country)
  }
  else {
    return countries.map((country) => (
      <div key={country.cca3}>
        <span>
          {country.name.common}
          <button onClick={() => ShowCountry(country)}>show</button>
        </span>
      </div>
    ))
  }
}
 
// MAIN
const App = () => {
  const [allCountries, setAllCountries] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then((result) => {
        setAllCountries(result.data)
      })
      .catch((error) => {
        console.log('error message')
      })
  }, [])

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value
    setCountries (allCountries.filter((country) =>
      country.name.common.toLowerCase().startsWith(searchTerm)
    ))
  }

  return (
    <>
      <div>
        find countries <input type='text' onChange={handleSearchChange} />
      </div>
      <div>
        <CountriesToShow countries={countries}/>
      </div>
    </>
  )
}

export default App