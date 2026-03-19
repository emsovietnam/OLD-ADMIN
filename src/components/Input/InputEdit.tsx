import { IconButton, Input, InputAdornment } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState } from 'react';
const InputEdit = props => {
  const { defaultValue, onChange, key, handleSave } = props;
  const [value, setValue] = useState(defaultValue);
  return (
    <Input
      key={key + defaultValue}
      style={{ width: '100px', border: 'none' }}
      defaultValue={defaultValue}
      onChange={e => {
        onChange && onChange(e);
        setValue(e.target.value);
      }}
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={() => handleSave && handleSave(value)}>
            <CheckIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};
export default InputEdit;
