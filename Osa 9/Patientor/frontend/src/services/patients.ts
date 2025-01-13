import axios from "axios";
import { Entry, Patient, PatientFormValues, BaseEntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`, object
  );
  return data;
};

const findPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const add = async (object: BaseEntryWithoutId, idVal: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${idVal}/entries`, object
  );
  return data;
};

export default {
  getAll, create, findPatient, add
};