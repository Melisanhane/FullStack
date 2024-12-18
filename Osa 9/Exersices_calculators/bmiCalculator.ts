// Exportataan vain tärkeimmät funktiot jota tarvitaan index.ts

export interface MultiplyValues {
    height: number;
    weight: number;
  };

// args[0] = node modules kansioon menevä osoite??
// args[1] = laskuritiedostoon menevä
// args[2-3] = argumentit jotka määritellään
export const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    };
  };

export const calculateBmi = (height:number, weight:number) => {
    const l = height / 100;
    const result = weight / (l * l);

// TARVIIKO RETURNEJA??
    if (result < 17) {
        console.log('Under range');
        return 'Under range';
    }
    if (result > 25) {
        console.log('Over range');
        return 'Over range';
    }
    else {  // (result > 17 || result < 25)
        console.log('Normal range');
        return 'Normal range';
    }
};

try {
  //  const height = 180
  //  const weight = 90
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight);
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
};