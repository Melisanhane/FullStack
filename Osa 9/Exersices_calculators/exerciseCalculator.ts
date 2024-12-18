export interface exerciseData {
    dailyExercises: number[];
    target: number;
  }

// Interface antaa mahdollisuuden nimetä objectin tyypit fiksummin
export interface Result {
    periodLenght: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseArray = (args: string[]): exerciseData => {
    if (args.length < 4) throw new Error("Not enough arguments");
  
    const dailyExercises: number[] = args.slice(3).map((day) => {
      const perDay = parseFloat(day);
    // Tsekataan, onko tyyppi numero
      if (typeof perDay === "number") {
        return perDay;
      } else {
        throw new Error("Provided values were not numbers!");
      }
    });

    if (!isNaN(Number(args[2]))) {
        const target = Number(Number(args[2]));
        return { dailyExercises, target };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

export const calculateExercises = (args: exerciseData) : Result => {
    let exercisesDays = 0;
    let days = 0;
    let hours = 0;
    let rating = 0;
    let success = false;
    let ratingD: string = "";
    args.dailyExercises.forEach((day) => {
        if (day !== 0) {
            days += 1;
            hours += day;
        }
        exercisesDays += 1;
    });
// Pyöristetään keskiarvo 2 desimaalin tarkkuuteen
    const averageNum = hours / exercisesDays;
    const rounded = averageNum.toFixed(2);
    const average = parseFloat(rounded);
// AVERAGE
    if (average >= args.target) {
        success = true;
        ratingD = "Good job!";
    }
    if (average <= args.target) {
        success = false;
        ratingD = "Not bad but could be better";
    }
// RATING
    if (hours < 10) {
        rating = 1;
    }
    if (hours > 10 && hours < 20) {
        rating = 2;
    }
    if (hours > 20) {
        rating = 3;
    }
    return {
        periodLenght: exercisesDays,
        trainingDays: days,
        success: success,
        rating: rating,
        ratingDescription: ratingD,
        target: args.target,
        average: average,
    };
};

// TRY ALOITTAA OHJELMAN
try {
    const data = parseArray(process.argv);
    const results = calculateExercises(data);
    console.log(results);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }