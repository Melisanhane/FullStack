import { v1 as uuid } from 'uuid';
import patientsData from "../data/patients";
import { PatientEntry, NewPatient, NonSensitivePatientEntry, EntryWithoutId, Entry } from "../types/types";

const getEntries = (): PatientEntry[]  => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (entry: NewPatient): PatientEntry => {
  console.log('addadaa patientti PATIENTSERVICE');
  const id: string = uuid();
  const patientEntry = {
    id: id,
    ...entry,
  };
  patientsData.push(patientEntry);
  return patientEntry;
};

const findOne = (id: string) => {
  return patientsData.find((patient) => {
    if (patient.id === id) {
      return patient;
    } else {
      return null;
    }
  });
};

const addInsidePatientEntry = (entryInsidePerson:EntryWithoutId, id:string):Entry => {
  const rio = patientsData.find(n => n.id === id)?.entries;
  const uid = uuid();
  const newEntry = {
      id:uid,
      ...entryInsidePerson
  };
  if(rio){
      rio.push(newEntry);
  }
  return newEntry;
};

export default {
  getEntries,
  addPatient,
  getNonSensitiveEntries,
  findOne,
  addInsidePatientEntry
};