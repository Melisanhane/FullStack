import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [raiting, setRaiting] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setRaiting(event.target.value as string);
  };

  return (
    <Box sx={{ width: 260 }}>
      <FormControl fullWidth>
        <InputLabel>healtcheck raiting</InputLabel>
        <Select
          value={raiting}
          label="raiting"
          onChange={handleChange}
        >
          <MenuItem value={0}>healthy</MenuItem>
          <MenuItem value={1}>low risk</MenuItem>
          <MenuItem value={2}>high risk</MenuItem>
          <MenuItem value={3}>critical risk</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}