 import { DiaryEntry } from '../types'
 import '../style.css'

const Entries = ({ diaries }: { diaries: DiaryEntry[] }) => {
  return (
    <>
    <h2>Diary entries</h2>
      {diaries.map((entry) => {
        return (
          <div className='diarys'>
            <b>{entry.date}</b>
            <br />
            visibility: {entry.visibility}
            <br />
            weather: {entry.weather}
          </div>
        )
      })}
    </>
  )
}

export default Entries