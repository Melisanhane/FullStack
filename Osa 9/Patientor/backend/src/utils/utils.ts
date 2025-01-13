/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, DiagnosesEntry, BaseEntryWithoutId, EntryWithoutId, HealthCheckRating } from "../types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};
const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

const parseString = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error("Incorrect or missing comment");
  }
  return text;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

export const parseEntry = (param: unknown[]): Entry[] => {
  return param.map((entry) => entry as Entry);
};

export const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object &&
    "entries" in object
  ) {
    const newEntry: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      ssn: parseString(object.ssn),
      entries: object.entries as Entry[],
    };

    return newEntry;
  }
  throw new Error("Incorrect data: a field missing");
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnosesEntry['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      return [] as Array<DiagnosesEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnosesEntry['code']>;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => v).includes(param);
};

const parseHealthCheck = (health: unknown): HealthCheckRating => {
  if (!health || !isNumber(health) || !isHealthCheckRating(health)) {
      throw new Error('Incorrect or Health Check missing data');
  }
  return health;
};
// Typeguards for entries
/* Tarvitaanko välttis koska isString toimii samalla periaatteella? 
const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description');
  }
  return description;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};
const parseCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing criteria');
  }
  return criteria;
};

const parseEmployeeName = (name: unknown): string => {
  if (!name || !isString(name)) {
      throw new Error('Incorrect or missing Employee name');
  }
  return name;
};
*/

export const entryTypeguard = (object: any): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
      throw new Error('Incorrect or missing data');
  }
  const baseEntry: BaseEntryWithoutId = {
      date: parseString(object.date),
      description: parseString(object.description),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };
  
  switch (object.type) {
  case 'Hospital':
      return {
          ...baseEntry, type: 'Hospital', discharge: {
              date: parseString(object.discharge.date),
              criteria: parseString(object.discharge.criteria)
          }
      };
  case 'HealthCheck':
      return {
          ...baseEntry, type: 'HealthCheck',
          healthCheckRating: parseHealthCheck(object.healthCheckRating)
      };
  case 'OccupationalHealthcare':
      if (object.sickLeave) {
          return {
              ...baseEntry, type: 'OccupationalHealthcare',
              employerName: parseString(object.employerName),
              sickLeave: {
                  startDate: parseString(object.sickLeave.startDate),
                  endDate: parseString(object.sickLeave.startDate)
              }
          };
      } else {
          return {
              ...baseEntry, type: 'OccupationalHealthcare',
              employerName: parseString(object.employerName),
          };
      };
  default:
      throw new Error('Invalid or Missing Type');
  }
};

export default toNewPatientEntry;