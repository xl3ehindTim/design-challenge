import React from 'react';
import FormControl from '@mui/material/FormControl';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { Controller } from "react-hook-form";
import { useEffect, useState } from 'react';

export const AsyncSelectField = ({
  name,
  label,
  control,
  isClearable,
  loadOptions,
  disabled = false,
  ...props
}) => {
  const labelId = `${name}-label`;

  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setLoading(true)
    loadOptions(inputValue).then(response => {
      setOptions(response)
      setLoading(false)
    })
  }, [inputValue])

  return (
    <FormControl fullWidth>
      <Controller
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value || null}
            disableClearable={!isClearable}
            loading={loading}
            filterOptions={(x) => x}
            disabled={disabled}
            getOptionLabel={(option) => option.label}
            options={options}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            renderInput={(params) => <TextField label={label} {...params} />}
            onChange={(_event, value) => {
              field.onChange(value);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
          />
        )}
        name={name}
        control={control}
      />
    </FormControl>
  );
}