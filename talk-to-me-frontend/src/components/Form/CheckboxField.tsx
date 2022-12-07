import React from 'react';
import FormControl from '@mui/material/FormControl';

import { Controller } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import { FormGroup, FormControlLabel } from '@mui/material';


const CheckboxField = (props: any) => {
  const { name, error, label, control, disabled, isRequired } = props;

  return (
    <FormControl fullWidth>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormGroup>
            <FormControlLabel control={<Checkbox {...field} {...label} disabled={disabled} checked={field.value || ''} />} label={label} />
          </FormGroup>
        )}
        rules={{ required: isRequired }}
      />
    </FormControl>
  );
};

CheckboxField.defaultProps = {
  isRequired: false,
  disabled: false,
};

export { CheckboxField };