/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { toast } from 'react-toastify';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

function GoogleCalendar(props) {
  const [dateTime, setDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  function dateTimeHandler(e) {
    setDateTime(e.toISOString());
    console.log(dateTime);
    e.setHours(e.getHours() + 1);
    setEndDateTime(e.toISOString());
    console.log(endDateTime);
  }

  function createCalendarEvent() {
    const TOKEN = localStorage.getItem('accessToken');
    fetch('/add_to_calendar', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          start: dateTime,
          end: endDateTime,
          token: TOKEN,
          place: props.place,
        },
      ),
    }).then((response) => console.log(response.json()));
  }

  function buttonHandler() {
    if (dateTime == null) {
      toast.error('No date entered', {
        toastId: 'error1',
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      createCalendarEvent();
      toast.success(`${dateTime} added to calendar`, {
        toastId: 'success1',
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(text) => <TextField {...text} />}
          label="Enter date"
          value={dateTime}
          inputformat="yyyy-MM-dd HH:mm:ss"
          onChange={(e) => dateTimeHandler(e)}
        />
        <button type="button" onClick={() => buttonHandler()}>Add to google calendar</button>
      </LocalizationProvider>
    </div>
  );
}

export default GoogleCalendar;
