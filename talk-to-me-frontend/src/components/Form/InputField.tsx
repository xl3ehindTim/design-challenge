import React from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

import { Controller } from "react-hook-form";

const InputField = (props: any) => {
  const { name, error, label, control, isRequired, disabled } = props;

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            disabled={disabled}
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

InputField.defaultProps = {
  isRequired: false,
  disabled: false,
};

export { InputField };