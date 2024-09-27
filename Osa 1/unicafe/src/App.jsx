import { useState } from 'react'

const Statistics  = (props) => {
  if (props.total === 0){
    return (
      <StatisticsLine text='No feedback given' /> 
    )
  }
  const badValue = -(props.bad)
  const totalAvarage = (props.good + badValue) / props.total
  const positiveProsent = props.good / props.total * 100
  return (
    <div>
      <table>
        <StatisticsLine text='good' value={props.good} />
        <StatisticsLine text='neutral' value={props.neutral} />
        <StatisticsLine text='bad' value={props.bad} />
        <StatisticsLine text='all' value={props.total} />
        <StatisticsLine text='avarage' value={totalAvarage} />
        <StatisticsLine text='positive' value={positiveProsent} additionalArgument='%' />
      </table>
    </div>
  )
}

  const StatisticsLine = (props) => {
    if (props.text === 'No feedback given'){ 
      return  (
        <p>{props.text}</p>
      )
    }
    return (
      <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
          <td>{props.additionalArgument}</td>
        </tr>
      </tbody>
    )
  }

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}> {text} </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const GoodFeedBack = () => {
    setGood(good + 1)
    setTotal (total + 1)
  }
  const NeutralFeedBack = () => {
    setNeutral(neutral + 1)
    setTotal (total + 1)
  }
  const BadFeedBack = () => {
    setBad (bad + 1)
    setTotal (total + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={GoodFeedBack} text='good' />
      <Button handleClick={NeutralFeedBack} text='neutral' />
      <Button handleClick={BadFeedBack} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />

    </div>
  )
}

export default App