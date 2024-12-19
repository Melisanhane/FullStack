import { useState, useEffect } from "react";
import axios from "axios";
import diaryService from './services/diarys';
import { Diary } from './types'

const App = () => {
  const [diarys, setDiarys] = useState<Diary[]>([]);

  useEffect(() => {
    void axios.get<void>(`http://localhost:3000/api/ping`);

    const fetchDiaryList = async () => {
      const diarys = await diaryService.getAll();
      setDiarys(diarys);
    };
    void fetchDiaryList();
  });

  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default App;