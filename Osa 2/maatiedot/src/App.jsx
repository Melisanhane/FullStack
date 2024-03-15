import { useState } from 'react'
// import countryService from './services/countries'

const FindCountry = (find) => {
  console.log(find)

}





const App = () => {
  const [newFind, setNewFind] = useState('')

// TAPAHTUMAKÄSITTELIJÄ
  const handleSearchChange = (event) => {
    setNewFind(event.target.value)
  }

  return (
    <>
    <div>
      find countries <input value={newFind} onChange={handleSearchChange}></input>
    </div>
    <div>
      <FindCountry find={newFind}/>
    </div>
    <div>
      näytettävät maat 1- 10
    </div>
    <div>
      kun yksi jäljellä, näytetään vain yksi maa ja sen kaikki tiedot 
    </div>
    </>
  )
}


/*
Maat löytyy sivulta 
https://studies.cs.helsinki.fi/restcountries/

package.json > "server": "json-server -p3001 --watch XX.json" <-- Tarvviiko?

*/

export default App