export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  ssn?: string;
  dateOfBirth?: string;
  occupation: string;
  gender: Gender;
  entries?: Array<Entry>;
}


export interface DiagnoseType {
  code: string
  name: string
  latin?: string
}

export interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<DiagnoseType['code']>
}

export enum HealthCheckRating {
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3,
}

export interface Discharge {
  date: string
  criteria: string
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

export interface Sickleave {
  startDate: string
  endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: Sickleave
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface newPatient {
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
  entries: Array<Entry>
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type BaseEntryWithoutId = Omit<BaseEntry, "id">;