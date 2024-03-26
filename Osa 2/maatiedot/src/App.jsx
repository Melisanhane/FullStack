import { useState, useEffect } from 'react'
import axios from 'axios'


const CountryWeather = (country) => {
//  const apiKey = import.meta.env.REACT_APP_VITE_KEY
  const [capitalWeather, setCapitalWeather] = useState(null)
  const apiKey = import.meta.env.REACT_APP_VITE_KEY
  console.log(apiKey)
 
  useEffect(() => { async () => { 
    try {
      const response = await 
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)
        setCapitalWeather(response.data)
    }
    catch(error){console.error('Error fetching weather data:', error)} 
  }}, [apiKey]) 
  }
// Tämän pitää näyttää maa painamalla show nappia eli yksittäinen maatiedot tähän 
// ei palauta mtn
const ShowCountry = (country) => {
  console.log(country)
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
    <CountryWeather />
  </div>
)
};

// MAIN
const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState('')
  const [countries, setCountries] = useState([])

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

// Haetaan maat palvelimelta SHOW btn tapahtuma 
const countrySelected = (country) => {
  axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.name.common}`)
    .then((response) => {
      setCountries(response.data)
      console.log('GET succesfully')
      ShowCountry(response.data)
    })
    .catch((error) => {
      console.log('GET error message')
    })
  }

const CountriesToShow = () => { 
// console.log(".")
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
//    CountryWeather(country)
    ShowCountry(country)
  /*
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
        <CountryWeather />
      </div>
    )
  */  
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
} // Tähän astri pois
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