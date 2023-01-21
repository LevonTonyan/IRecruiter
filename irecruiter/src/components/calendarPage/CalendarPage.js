import './CalendarPage.css'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';


function CalendarPage() {
 const [value, setValue] = React.useState(new Date());

  return (
      <div className='calendar-main'> 
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
            orientation="portrait"
            openTo="day"
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
    </div>
  )
}

export default CalendarPage