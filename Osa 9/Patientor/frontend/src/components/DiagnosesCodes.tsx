import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const diagnosesCodes = [
  'M24.2',
  'M51.2',
  'S03.5',
  'J10.1',
  'J06.9',
  'Z57.1',
  'N30.0',
  'H54.7',
  'J03.0',
  'L60.1',
  'Z74.3',
  'L20',
  'F43.2',
  'S62.5',
  'H35.29'
];

export default function MultipleSelectCheckmarks() {
    const [code, setCode] = React.useState<string[]>([]);
  
    const handleChange = (event: SelectChangeEvent<typeof code>) => {
      const {
        target: { value },
      } = event;
      setCode(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
    return (
        <div>
          <FormControl sx={{ width: 260 }}>
            <InputLabel>diagnose code</InputLabel>
            <Select
              multiple
              value={code}
              onChange={handleChange}
              input={<OutlinedInput label="code" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {diagnosesCodes.map((dCode) => (
                <MenuItem key={dCode} value={dCode}>
                  <Checkbox checked={code.includes(dCode)} />
                  <ListItemText primary={dCode} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      );
    }