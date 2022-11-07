import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

import { Controller } from "react-hook-form";

const PasswordField = (props: any) => {
  const { name, error, label, control, isRequired } = props;

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            type="password"
            error={!!error}
            helperText={error ? error.message : null}
            label={label}
          />
        )}
        rules={{ required: isRequired }}
      />
    </FormControl>
  );
};

PasswordField.defaultProps = {
  isRequired: false,
};

export { PasswordField };