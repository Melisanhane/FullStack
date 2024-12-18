interface CourseParts {
    name: string,
    exerciseCount: number,
  };

const Total= ({ parts } : {parts: CourseParts[]}) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return (
        <div>
            <b>Number of exercises {totalExercises}</b>
        </div>
    );
    
};

export default Total;