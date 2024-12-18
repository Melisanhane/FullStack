import { z } from 'zod';
import { NewPatientEntry, Gender } from '../types/types';
/*
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseString = (text: unknown): string => {
// IF ei vissiin tarvita? 
    if (!isString(text)) {
        throw new Error('Incorrect or missing comment');
    }
    return z.string().parse(text);
};
*/
export const NewPatientEntrySchema = z.object ({
    name: z.string(),
    dateOfBirth: z.string(),
    ssn: z.string().optional(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});
/*
const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing visibility: ' + gender);
    }
    return gender;
  };
*/
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    console.log(object);
    if (!object || typeof object !== "object") {
        throw new Error('Incorrect or missing comment');
    };
    if ('name' in object && 'dateOfBirth' in object && 'gender' in object && 'occupation' in object && 'ssn' in object) {
        return NewPatientEntrySchema.parse(object);
    //    return newEntry;
    }
    throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry; 