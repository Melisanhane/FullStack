const Course = ({course}) => {
  // EXERSICES LIST
  const exList = []
  course.parts.forEach(ex => { 
    exList.push(ex.exercises)
  })
  const total = exList.reduce((x, y) => x + y,)

  return (
    <>
        <h2>{course.name}</h2>
        {course.parts.map(parts => 
          <p key={parts.id}>{parts.name} {parts.exercises}</p>
        )}
        <b>total of {total} exercises</b>
    </>
  ) 
}

export default Course