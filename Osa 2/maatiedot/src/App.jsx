import { useState, useEffect } from 'react'
import axios, { all } from 'axios'
// import countryService from './services/countries'

// Löytää oikean maan ja päästään tänne mutta miten tulostetaan || 2.18
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
      {country.flag}
    </div>
  )
}

// Eli tänne filtteröidyt maat 
const filteredCountries = (filtered) => {
  console.log('Täällä on filtteröidyt maat')
}

// MAIN
const App = () => {
  const [search, setSearch] = useState('')
  const [allCountries, setAllCountries] = useState('')

// Haetaan kaikki maat palvelimelta 
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

// Saako siirettyä pois APPista siten, että allCountries tulisi mukana
const CountriesToShow = () => { 
//  console.log('Jos bugaa, poista koodi ja console log ')
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
    else {  // Tämän voi yrittää kanssa laittaa omaansa
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

// TAPAHTUMAKÄSITTELIJÄ
  const handleSearchChange = (event) => {
    setSearch(event.target.value) // inputti value
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

2.18 --- Pitäisi saada yksittäinen maa tulostettua
2.19 -- napin painallus avaa uuden sivun https://studies.cs.helsinki.fi/restcountries/api/name/{HALUTTU MAA}





const CountriesToShow = () => {   
    const countrySelected = (country) => {
      setCountries([country])
      //setSelected(setCountries([country])) // creating a separte state is not working when button is clicked 
      // setSeach("") // this would blog the if statement below 
    };
    if (search !== "") {
      ->
      else if (filterCountries.length === 1) {
        const country = filterCountries[0];
        return <CountryInfo country={country} />;
      } else {
        return filterCountries.map((country) => (
          <div key={country.cca3}>
            <span>
              {country.name.common}
              <button onClick={() => countrySelected(country)}>show</button>
            </span>
          </div>
        ));
      }
    }
  };



return (
    <>
      <Filter value={searchTerm} onChange={handleChange} />
      <CountriesContainer countries={filteredCountries} />
    </>
  )


const Countries = (param) => {
  const { maat } = param;
  f (Object.keys(maat).length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    if (Object.keys(maat).length === 0) {
      return <div>No countries found</div>;
    }
    maat.map((country) => {
      console.log(country.cca3, country.name.common);
      return <li key={country.cca3}>{country.name.common}</li>;
    });
  }
};




Maat löytyy sivulta 
https://studies.cs.helsinki.fi/restcountries/

package.json > "server": "json-server -p3001 --watch XX.json" <-- Tarvviiko?

*/

export default App