// Kurssin nimen renderöiminen Headeriin
const Header = (props) => {
  return (
    <div>
      <p>{props.course.name}</p>
    </div>
  )
}
// Osat ja harjoitukset
const Content = (props) => {
  return (
    <>
      <Part parts={props.parts[0]}/>
      <Part parts={props.parts[1]}/>
      <Part parts={props.parts[2]}/>
    </>
  )
}
// Part komponentti jossa renderöidään Conten osien nimet
const Part = (props) => {
    return (
      <p>{props.parts.name} {props.parts.exercises}</p>
    )
}
// Tehtävien yhteismäärät tänne, eli part + exercises
const Total = (props) => {
  console.log(props)
  return (
    <div>
      <p>Total Parts: {3}
        <br />
        Total exercises: {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
      </p>
    </div>
  )
}
// MAIN COMPONENT
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>

    </div>
  )
}
     
export default App