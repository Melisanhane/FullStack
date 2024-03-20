import { useState, useEffect } from 'react'
import axios, { all } from 'axios'

// MAIN
const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState('')
  const [countries, setCountries] = useState([])
  const [cityWeather, setCityWeather] = useState(null)

  const api_key = import.meta.env.VITE_OPEN_WEATHER_API;

// Haetaan aluksi kaikki maat palvelimelta 
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

const CountriesToShow = () => { 
// console.log(".")
// Haetaan maat palvelimelta SHOW btn tapahtuma 
const countrySelected = (country) => {
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`)
    .then((response) => {
      setCountries(response.data)
      console.log('GET succesfully')
      PostCountry(response.data)
    })
    .catch((error) => {
      console.log('GET error message')
    })
  }
// Postaa maan || 404 vaikka toimiikin?
const PostCountry = (countries) => {
  debugger
  axios
  .post(`https://studies.cs.helsinki.fi/restcountries/api/name/${countries.name.common}`)
  // ^^  https://studies.cs.helsinki.fi/restcountries/api/name/Sweden 404 ??
  .then((response) => {
    console.log('POST succesfully')
  })
  .catch((error) => {
    console.log('POST error message')
  })
};

//  Maiden filtteröinti 
let filterCountries = allCountries.filter((country) =>
  country.name.common.toLowerCase().startsWith(search.toLowerCase())
)
if (search !== '') {
  if (filterCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  else if (filterCountries.length === 1) {
    const country = filterCountries[0]
    CountryWeather(country)
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital: {country.capital[0]}</p>
        <p>area: {country.area}</p>
        <h3>languages</h3>
        <ul>
          {Object.entries(country.languages).map(([code, lang]) => (
            <li key={code}>{lang}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt}></img>
        <h2>Weather in {country.capital[0]}</h2>
      </div>
      // {`https://www.foreca.fi/${country.name.common}/${country.capital[0]}`} <-- Tämä jotenkin tänne

    )
  }
  else {
    return filterCountries.map((country) => (
      <div key={country.cca3}>
          <span>
            {country.name.common}
            <button onClick={() => countrySelected(country)}>show</button>
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
/*
const apiKey = process.env.VITE_REACT_APP_WEATHERSTACK_API_KEY;

const Weather = ({ country }) => {
  const [capitalWeather, setCapitalWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.weatherstack.com/current?access_key=${apiKey}&query=${country.capital}`
      )
      .then((response) => {
        setCapitalWeather(response.data);
      })

      .catch((error) => {
        console.log("Error fetching weather data:", error);
      });
  }, [country]);

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {capitalWeather.current?.temperature}</p>
    </div>
  );
};
*/

export default App