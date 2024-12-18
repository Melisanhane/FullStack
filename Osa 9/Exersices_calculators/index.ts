import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => { 
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    const bmiResponse = { height: height, weight: weight, bmi: bmi };
    console.log(bmiResponse);
    res.status(200).send(bmiResponse);
  } else {
    res.status(400).send("malformatted parameters");
  }
});

app.post('/exersises', (req, res) => {
// ALEMMALLA KOMMENTILLA SAADAAN OHITETTUA ESLINTIN VAROITUKSET
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { dailyExercises, target } = req.body;
    console.log(dailyExercises);
  if (!dailyExercises || !target) {
    res.status(400).send("malformatted parameters");
    throw new Error("Provided values were not numbers!");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const exerciseData = {dailyExercises, target};
  const results = calculateExercises(exerciseData);
  res.status(200).send(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});