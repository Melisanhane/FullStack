import express from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils/utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientRouter.post('/', (req, res) => {
  try {
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(NewPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });    
    }
  }
  /*
  /* eslint-disable @typescript-eslint/no-unsafe-assignment 
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const addedEntry = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(addedEntry);
  */
});

export default patientRouter;