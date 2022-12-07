import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Controller } from "react-hook-form";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

const DateField = (props: any) => {
  const { name, error, label, control, isRequired, disabled } = props;

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={field.value || ''}
              inputFormat="DD-MM-YYYY"
              disabled={disabled}
              onChange={(newValue) => {
                field.onChange(newValue.format('YYYY-MM-DD'));
              }}
              renderInput={(params) => <TextField {...params} label={label} error={!!error} helperText={error ? error.message : null} />}
            />
          </LocalizationProvider>
        )}
        rules={{ required: isRequired }}
      />
    </FormControl>
  );
};

DateField.defaultProps = {
  isRequired: false,
  disabled: false,
};

export { DateField };