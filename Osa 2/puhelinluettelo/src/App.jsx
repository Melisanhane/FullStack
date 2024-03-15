import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './style.css'

const Numbers = ({name, number, id, find, deletePerson}) => {
  if(name.startsWith(find)) {
    return (
      <div>
        {name} {number}
        <button type="submit" onClick={deletePerson} name={name} id={id}>delete</button>      
      </div> 
    )
  }
  if (find === ' ') {
    return(
      <div>
        {name} {number} 
        <button type="submit" onClick={deletePerson} name={name} id={id}>delete</button>
      </div> 
    )
  }
}

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

const Notification =({message}) => {
  if (message === '') {
    return
  }
  return (
    <div className='add'>
      {message}
    </div>
  )
}

const App = () => {
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
      }
      return
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
  .catch(error => {
    setAddMessage(
      `Information of ${event.target.name} has aldredy removed from server`
    )
    setTimeout(() => {
      setAddMessage('')
    }, 5000)
  })
}

const NumberUpdate = (existingPerson) => {
  const updatedPerson = {
    ...existingPerson,
    number: newNumber
  };
  console.log(updatedPerson)
  personsService.update(updatedPerson.id, updatedPerson).then((response) => {
    setAddMessage(
      `Number changed to ${updatedPerson.name}`
    )
    setTimeout(() => {
      setAddMessage('')
    }, 5000)
    setNewName('')
    setNewNumber(' ')
    personsService.getAll().then(response => {setPersons(response.data) })
  })
}

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

export default App