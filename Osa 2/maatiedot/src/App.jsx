import { useState, useEffect } from 'react'
import axios, { all } from 'axios'

// Löytää oikean maan ja päästään tänne mutta miten tulostetaan || 2.18
// Tänne vielä pääkaupungin säätiedotus joltakin nettisivulta(https://www.foreca.fi/Finland/Helsinki) || API-avain käyttöön?
const CountryInfo = (country) => {
  console.log(country.name.common)
  console.log(country.capital[0])
  console.log(country.area)
  console.log(country.languages)
  console.log(country.flag) // kuva pitäisi saada näkymään || <img> ?
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital[0]}
      area {country.borders.area}
      <h3>languages</h3>
      <img src="{country.flag}" alt="flag"></img>
    </div>
  )
// {`https://www.foreca.fi/${country.name.common}/${country.capital[0]}`} <-- Tämä jotenkin tänne
}

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

const CountriesToShow = () => { 
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
      CountryInfo(country)
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

export default App