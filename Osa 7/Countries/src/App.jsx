import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])

  // Haetaan kaikki maat ensiksi palvelimelle
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

  // Etsitään yksittäinen maa palvelimelta
  useEffect(() => {
    if (name) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(res => {
        setCountry(allCountries.filter((country) =>
          country.name.common.toLowerCase().startsWith(name)
        ))
      })
      .catch(error => {
        console.log('error')
        setCountry('error')
      })
    }
  }, [name])

  if (name === '' || !country) {
    return
  }
  if (country === 'error') {
    return country
  }
  return country[0]

}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  if (country === "error") {
    return (
      <div>
        not found...
      </div>
    )
  }
  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>
      <Country country={country} />
    </div>
  )
}

export default App