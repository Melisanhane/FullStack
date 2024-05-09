import { useState, useEffect } from 'react'
import axios from 'axios'

const ShowCountry = (country) => {
  console.log(country)
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API
  const [capitalWeather, setCapitalWeather] = useState(null)

  console.log(apiKey)
  useEffect(() => {
    getWeather(country.latlng[0], country.latlng[1]);
  });

  const getWeather = async (lat, lon) => {
    await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`)
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

// MAIN
const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('Haetaan maat sivustolta ensimmäisenä')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then((result) => {
        setAllCountries(result.data)
      })
      .catch((error) => {
        console.log('error message')
      })
  }, [])

const CountriesToShow = () => { 
  let filterCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().startsWith(search.toLowerCase())
  )
  if (search !== '') {
    if (filterCountries.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
    if (filterCountries.length === 1) {
      const country = filterCountries[0]
      return ShowCountry(country)
    }
    else {
      return filterCountries.map((country) => (
        <div key={country.cca3}>
            <span>
              {country.name.common}
              <button onClick={() => ShowCountry(country)}>show</button>
            </span>
          </div>
      ))
    }
  }
}

  const handleSearchChange = (event) => {
    setSearch(event.target.value) 
  }

  return (
    <>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <div>
        <CountriesToShow />
      </div>
    </>
  )
}

export default App
