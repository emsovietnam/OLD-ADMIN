import React from 'react';
import { TextField, Theme, InputAdornment, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';

import './input.css';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    '&::placeholder': {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important"
    },
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important"
  },
  cssLabel: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important"
  }
}));

const InputTextField = props => {
  const {
    formik,
    label,
    placeholder,
    field,
    id,
    type,
    autoComplete,
    required,
    autoFocus,
    size,
    onBlur
  } = props;

  const classes = useStyles();

  const [showPassword, setShowPassword] = React.useState<any>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      required={required}
      fullWidth
      id={id}
      type={
        type
          ? type === 'password'
            ? showPassword
              ? 'text'
              : 'password'
            : type
          : 'text'
      }
      label={label}
      size={size}
      placeholder={placeholder}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      value={formik.values[field]}
      onBlur={onBlur}
      onChange={e => formik.setFieldValue(field, e.target.value)}
      error={formik.touched[field] && Boolean(formik.errors[field])}
      helperText={formik.touched[field] && formik.errors[field]}
      InputProps={{
        classes: { input: classes.input },
        endAdornment:
          type === 'password' ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
        onKeyDown: e => {
          if (e.key === 'Enter') {
            formik.submitForm();
          }
        }
      }}
      InputLabelProps={{
        classes: {
          root: classes.cssLabel
        }
      }}
    />
  );
};

export default InputTextField;
