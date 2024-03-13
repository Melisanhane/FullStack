import { useState, useEffect } from 'react'
import personsService from './services/persons'

// Tässä on jo Filter ja Person komponentit yhdessä || LOOPPI
const Numbers = ({name, number, id, find, deletePerson}) => {
  // Filtteröinti
  if(name.startsWith(find)) {
    return (
      <div>
        {name} {number}
        <button type="submit" onClick={deletePerson} name={name} id={id}>delete</button>      
      </div> 
    )
  }
  // Kaikki henkilöt
  if (find === ' ') {
    return(
      <div>
        {name} {number} 
        <button type="submit" onClick={deletePerson} name={name} id={id}>delete</button>
      </div> 
    )
  }
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
        <button type='submit'>add</button>
      </div>
    </form>
    </>
  )
}

// Looppaa alussa x2 ja toistaa itseään kun kirjoittaa hakukenttiin jtn
const Notification =({message}) => {
  console.log(message)
  if (message === '') {
    return 
  }
  return (
    <div className='add'>
      {message}
    </div>
  )
}

// MAIN
const App = () => {
  // TILAKÄSITTELIJÄT || LOOPPI  
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(' ')
  const [newFind, setNewFind] = useState('')
  const [addMessage, setAddMessage] = useState('')

  useEffect(() => {
    console.log('1. lomakkeen haku')
    personsService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  // Nimen lisäys ja numeron päivitys
  const addName = (event) => {
    event.preventDefault()
    const NameObject = {
      name: newName,
      number: newNumber
    }
    if (NameObject.name === '') {
      alert (`give name`)
      return
    }
    if (NameObject.number === ' ') {
      alert (`give phone number`)
      return
    }
    if (persons.some(person => person.name == newName)) {
      const existingPerson = persons.find((person) => person.name === newName);
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        NumberUpdate(existingPerson)
        return // turha
      }
      return  // Oltava koska muuten jatkaa ja luo uuden .create
    }
    personsService.create(NameObject).then(response => {
      setAddMessage(
        `Added ${NameObject.name}`
      )
      setTimeout(() => {
        setAddMessage('')
      }, 5000)
      setPersons(persons.concat(response.data))
    })
    setNewName('')
    setNewNumber(' ')
  }

const DeletePerson = (event) => {
  event.preventDefault()
  console.log(event.target)
  if (window.confirm(`Delete ${event.target.name} ?`))
    personsService.del(event.target.id).then(response => {
      setAddMessage(
        `Removed ${event.target.name}`
      )
      setTimeout(() => {
        setAddMessage('')
      }, 5000)
    personsService.getAll().then(response => {setPersons(response.data) })
  })
}
// Tämä päivittää okein .JSON tiedostoon mutta bugaa findiin || 2.15
const NumberUpdate = (existingPerson) => {
  const updatedPerson = {
    ...existingPerson,
    number: newNumber
  };
  console.log(updatedPerson)
  personsService.update(updatedPerson.id, updatedPerson).then((response) => {
    setPersons(persons.map((person) =>
        person.id !== updatedPerson.id ? person : newNumber
    ))
    setAddMessage(
      `Number changed to ${NameObject.name}`
    )
    setTimeout(() => {
      setAddMessage('')
    }, 5000)
    setNewName('')
    setNewNumber(' ')
    personsService.getAll().then(response => {setPersons(response.data) })
  })
}

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
      <Notification message={addMessage}/>
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
        <Numbers key={numbers.id} name={numbers.name} number={numbers.number} id={numbers.id} find={newFind} deletePerson={DeletePerson} />
      ))}
    </div>
  )
}
/*
Tämä toimii windows confirmaation alla niin, että päivittää suoraam selaimeenm || 2.15

 let person = persons.find((person) => person.name === newName)
        // Updatetaan PUT metodilla lomake
        personsService.update(person.id, person).then(response => {
          person.number = newNumber
          setPersons(persons.map(person =>
          person.id === person.id ? person : newNumber
          ))
          console.log(person.number, person.name)
        })


        Messaget lisätty
        2.15 Tekemättä
        2.17 delete || hyödynnä .catch esim. .catch(() => {
          setNotification(
            `${updatedPerson.name} has already been removed from the server`
          );

*/


export default App