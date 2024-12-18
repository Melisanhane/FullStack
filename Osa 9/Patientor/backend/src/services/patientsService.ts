import { v1 as uuid } from 'uuid';
import patientsData from "../data/patients";
import { PatientEntry, NewPatientEntry, NonSensitivePatientEntry } from "../types/types";
// const patients: Array<PatientEntry> = patientData;

const getEntries = (): PatientEntry[]  => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id: string = uuid();
  const patientEntry = {
    id: id,
    ...entry,
  //  ...(entry.ssn && { ssn: entry.ssn })
  };
  patientsData.push(patientEntry);
  return patientEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
};