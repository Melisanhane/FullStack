import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import patientService from '../services/patients';
import { Patient, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, BaseEntryWithoutId } from '../types';
import AddEntryForm from './AddEntryForm';
import { Button, Divider, Dialog, DialogTitle, DialogContent, Alert } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HealingIcon from '@mui/icons-material/Healing';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import '../index.css';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (values: BaseEntryWithoutId) => void;
	error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
	<Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
		<DialogTitle>Add a new entry</DialogTitle>
		<Divider />
		<DialogContent>
			{error && <Alert severity="error">{`Error: ${error}`}</Alert>}
			<AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
		</DialogContent>
	</Dialog>
);

const Singlepatient =  () => {
  const id = useParams().id as string;
  const idVal = id ? id : '';
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: BaseEntryWithoutId) => {
    try {
        await patientService.add(values, idVal);
        closeModal();
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            if (e?.response?.data && typeof e?.response?.data === "string") {
              const message = e.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
    }
};

    useEffect(()=> {
        const fetchData = async() => {
        const patientFetch = await patientService.findPatient(id);
        setPatient(patientFetch);
        };
        fetchData();      
    },[id]);

// ENTRIES START ------------------------------------------------------------------
    const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
        switch (entry.type) {
            case "Hospital":
                return <Hospital entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcare entry={entry} />;
            case "HealthCheck":
                return <HealthCheck entry={entry} />;
            default:
                return null;
        }
    };

    const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
        return <div className='patientInfo'>
            <p>{entry.date}
                <LocalHospitalIcon />
            </p>
            <div>{entry.description}</div>
            <div> <b>Discharge date:</b> {entry.discharge.date} <b>Criteria:</b>{entry.discharge.criteria}</div>
            <div>diagnose by {entry.specialist}</div>
        </div>;
    };

    const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
        return <div className='patientInfo'>
            <p>{entry.date}
                <HealingIcon />
            </p>
            <div>{entry.description}  {entry.employerName}</div>
            <div>diagnose by {entry.specialist}</div>
        </div>;
    };

    const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
        return <div className='patientInfo'>
            <p>{entry.date}
                <MedicalServicesIcon />
            </p>
            <div className='patientDescription'>{entry.description}</div>
            <div> <HealthCheckHeart heart={entry.healthCheckRating} /></div>
            <div>diagnose by {entry.specialist}</div>
        </div>;
    };

    function HealthCheckHeart({ heart }: { heart: number }) {
        switch (heart) {
            case 0:
                return <div>💚</div>;
            case 1:
                return <div>💛</div>;
            case 2:
                return <div>💙</div>;
            case 3:
                return <div>🤎</div>;
            default:
                return null;
        }
    }
// ENTRIES END --------------------------------------------------------------------

    if(!patient) {
        return <>No information</>;
    }

    return(
        <div>
            <h2>{patient.name} {
				patient?.gender === 'male' ? <MaleIcon />
				: patient?.gender === 'female' ? <FemaleIcon />
				: null
				}
            </h2>
            <div className='basicInfo'>
                SSN: {patient.ssn}
                <br />
                OCCUPATION: {patient.occupation}
            </div>
            <Button variant="contained" onClick={() => openModal()}>
				Add New Entry
			</Button>
			<AddEntryModal modalOpen={modalOpen}
				error={error}
				onSubmit={submitNewEntry}
				onClose={closeModal} />
            <h3>entries</h3>
            {patient.entries?.map(n => <EntryDetails key={n.id} entry={n}>
                </EntryDetails>)}
        </div>
    );
};

export default Singlepatient;