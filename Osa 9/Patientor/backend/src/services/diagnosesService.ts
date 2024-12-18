import diagnosesData from "../data/diagnoses";
import { DiagnosesEntry } from "../types/types";

const diagnoses: DiagnosesEntry[] = diagnosesData as DiagnosesEntry[];

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};
/*
const addDiagnose = () => {
  return null;
};
*/
export default {
  getEntries
//  addDiagnose,
};