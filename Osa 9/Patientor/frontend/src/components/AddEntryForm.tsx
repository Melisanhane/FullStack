import { useState, SyntheticEvent } from "react";

import { BaseEntryWithoutId } from '../types';
import  MultipleSelectCheckmarks from './DiagnosesCodes';
import  BasicSelect from './HealtcheckRaiting';

import { TextField, Grid, Button } from '@mui/material';

// DAYS
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface Props {
  onSubmit: (values: BaseEntryWithoutId) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
//    const [sickLeave, setSickLeave] = useState('');
//   const [occupation, setOccupation] = useState('');

    const addPatient = (event: SyntheticEvent) => {
        event.preventDefault();
    // NÄMÄ PITÄÄ MUUTTAAA description, date, specialist, healtcheck raiting, diagnosisCodes
        onSubmit({
          description,
          date,
          specialist,
       //   sickLeave
        });
      };

  return (
      <div>
        <form onSubmit={addPatient}>
          <TextField
            label="description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        <TextField
            label="date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
          <TextField
            label="specialist"
            fullWidth
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
          />
          <div className="selectBox">
            <MultipleSelectCheckmarks />
            <BasicSelect />
          </div>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="sickleave start" />
            <DatePicker label="sickleave end" />
        </LocalizationProvider>
          <Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: "left" }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: "right",
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
};

export default AddEntryForm;