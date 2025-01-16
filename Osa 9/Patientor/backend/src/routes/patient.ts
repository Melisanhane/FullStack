import express from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { toNewPatientEntry, entryTypeguard } from '../utils/utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientRouter.get('/:id', (req, res) => {
  res.send(patientsService.findOne(req.params.id));
});

patientRouter.post('/', (req, res) => {
  try {
    console.log(req.body);
    const NewPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(NewPatientEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      console.log('error');
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });    
    }
  }

  patientRouter.post('/:id/entries', (req, res) => {
    try {
        const id:string = req.params.id;
        console.log(req.body);
        const entryInsidePatient = entryTypeguard(req.body);
        const addEntryInsidePatient = patientsService.addInsidePatientEntry(entryInsidePatient,id);
        res.json(addEntryInsidePatient);
    } catch (error) {
        let errorMessage = 'Something bad happened';
        if(error instanceof Error){
            errorMessage += 'Error: ' + error.message;
        }
        res.status(404).send(errorMessage);
    }
  });
});

export default patientRouter;