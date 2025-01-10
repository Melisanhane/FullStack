import React from 'react'
import './style.css'
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Entries from './components/Entries'
import Notification from './components/Notification'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  })

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    axios
      .post('http://localhost:3000/api/diaries', newDiary)
      .then((response) => {
        console.log(response.data)
        setDiaries(diaries.concat(response.data));
      })
      .catch((error) => {
        console.log(error)
        const message = 'ADD DATE'
        setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    let value: string | Weather | Visibility = event.target.value
    if (name === 'weather') {
      value = value as Weather 
    } else if (name === 'visibility') {
      value = value as Visibility 
    }
    setNewDiary({
      ...newDiary,
      [name]: value,
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/diaries').then((response) => {
      console.log(response.data)
      setDiaries(response.data as DiaryEntry[])
    })
  }, [newDiary])

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification errorMessage={errorMessage} />
      <form onSubmit={diaryCreation}>
        <label>
          Date:
          <input
            className='date'
            type="date"
            name="date"
            value={newDiary.date}
            onChange={handleChange}
          />
        </label>

        <br />
        <label>
          Weather:
          <br />
          <div className='radioBtns'>
            <input
              type="radio"
              name="weather"
              value={Weather.Sunny}
              checked={newDiary.weather === Weather.Sunny}
              onChange={handleChange}
            />
            Sunny
            <br />
            <input
              type="radio"
              name="weather"
              value={Weather.Rainy}
              checked={newDiary.weather === Weather.Rainy}
              onChange={handleChange}
            />
            Rainy
            <br />
            <input
              type="radio"
              name="weather"
              value={Weather.Cloudy}
              checked={newDiary.weather === Weather.Cloudy}
              onChange={handleChange}
            />
            Cloudy
            <br />
            <input
              type="radio"
              name="weather"
              value={Weather.Stormy}
              checked={newDiary.weather === Weather.Stormy}
              onChange={handleChange}
            />
            Stormy
            <br />
            <input
              type="radio"
              name="weather"
              value={Weather.Windy}
              checked={newDiary.weather === Weather.Windy}
              onChange={handleChange}
            />
            Windy
          </div>
        </label>

        <label>
          Visibility:
            <br />
            <div className='radioBtns'>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Great}
              checked={newDiary.visibility === Visibility.Great}
              onChange={handleChange}
            />
            Great
            <br />
            <input
              type="radio"
              name="visibility"
              value={Visibility.Good}
              checked={newDiary.visibility === Visibility.Good}
              onChange={handleChange}
            />
            Good
            <br />
            <input
              type="radio"
              name="visibility"
              value={Visibility.Ok}
              checked={newDiary.visibility === Visibility.Ok}
              onChange={handleChange}
            />
            OK
            <br />
            <input
              type="radio"
              name="visibility"
              value={Visibility.Poor}
              checked={newDiary.visibility === Visibility.Poor}
              onChange={handleChange}
            />
            Poor
            </div>
        </label>

        <label>
          Comment:
          <input
            className='comment'
            type="text"
            name="comment"
            value={newDiary.comment}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Entry</button>
      </form>
      <Entries diaries={diaries} />
    </div>
  )
}

export default App