import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

// Tässä on jo Filter ja Person komponentit yhdessä || LOOPPI
const Numbers = ({name, number, id, find}) => {
  // Filtteröinti
  if(name.startsWith(find)) {
    return (
      <div>
        {name} {number}
        <button onClick={DeletePerson} name={name} id={id}>delete</button>
      </div> 
    )
  }
  // Kaikki henkilöt
  if (find === ' ') {
    return(
      <div>
        {name} {number} 
        <button onClick={DeletePerson} name={name} id={id}>delete</button>
      </div> 
    )
  }
}

// Toimii mutta ei saa päivitettyä
const DeletePerson = (event) => {
  event.preventDefault()
  console.log(event.target)
  if (window.confirm(`Delete ${event.target.name} ?`))
  // Poistetaan nimi DELETE metodilla lomakkeelta 
  personsService.del(event.target.id).then(response => {
    console.log(`Deleted post with NAME ${event.target.name}`)
  })
}

// LOOPPI || Jos tähän vaihtaa nimet ilman propsia, miksi ei toimi?? 
const PersonForm = (props) => {
  return (
    <>
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.name} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.number} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type='submit' >add</button>
      </div>
    </form>
    </>
  )
}

// MAIN
const App = () => {
  // TILAKÄSITTELIJÄT || LOOPPI  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(' ')
  const [newFind, setNewFind] = useState('')

  useEffect(() => {
    console.log('1. lomakkeen haku')
    personsService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  // TARVIIKO SIIRTÄÄ OMAAN KOMPONENTTIIIN?? -----------------------------------------
  const addName = (event) => {
    event.preventDefault()
    const NameObject = {
      name: newName,
      number: newNumber
    }
    if (NameObject.number === ' ') {
      alert (`give phone number`)
      return
    }
    // Toimii mut ei päivitä JSONiin
    if (persons.some(person => person.name == newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let person = persons.find((person) => person.name === newName)
        // Updatetaan PUT metodilla lomake
        personsService.update(person.id, person).then(response => {
          person.number = newNumber
          setPersons(persons.map((person) =>
          person.id === person.id
          ? person
          : newNumber
          ))
        })
      }
      return  // Oltava koska muuten jatkaa ja luo uuden .create
    }
    personsService.create(NameObject).then(response => {
      console.log( NameObject.name, 'lisätty listaan')
      setPersons(persons.concat(response.data))
    })
    setNewName('')
    setNewNumber(' ')
  }

  const UpdatePersonService = () => {
    console.log('Personin upppaus')
    // Upitaan nimi GET metodilla lomakkeelle
    personsService.getAll().then(response => { App.setPersons(response.data) })
  }
// --------------------------------------------------------

  // TAPAHTUMAKÄSITTELIJÄT
  // Luodaan tapahtumakäsittelijät onChangeille jotta päästään käsiksi kontrolloituun syötekomponenttiin || LOOPPI
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFindPerson = (event) => {
    setNewFind(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={newFind} onChange={handleFindPerson} />
        </div>
      <h2>add a new</h2>
      <PersonForm addPerson={addName} 
        name={newName} handleNameChange={handleNameChange} 
        number={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {persons.map(numbers =>( 
        <Numbers key={numbers.id} name={numbers.name} number={numbers.number} id={numbers.id} find={newFind} />
      ))}
    </div>
  )
}

export default App