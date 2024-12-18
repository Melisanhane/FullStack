import { z } from 'zod';
import { NewPatientEntrySchema } from '../utils/utils';

export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string; // ? = vaihtoehtoinen
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Nonbinary = 'non-binary',
    Other = 'other',
  }

export type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;