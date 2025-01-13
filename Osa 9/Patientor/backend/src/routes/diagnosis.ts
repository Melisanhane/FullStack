import express from 'express';
import diagnosesService from '../services/diagnosesService';

const diagnoseRouter = express.Router();

diagnoseRouter.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

diagnoseRouter.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});


export default diagnoseRouter;