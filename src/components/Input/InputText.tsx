import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import { InputBase, FormControl, Typography } from '@mui/material';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3)
  },
  '& .MuiInputBase-input': {
    borderRadius: 10,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow'
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  },
  '& .Mui-disabled': {
    WebkitTextFillColor: theme.palette.mode === 'dark' ? ' #fff' : '#000',
    backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff'
  }
}));

const styleInput = {
  height: '100%',
  '& input': {
    height: 'calc(100% - 35px)'
  }
};
// 83 - 10 -20
const InputText = props => {
  const {
    fullWidth,
    placeholder,
    field,
    formik,
    inputProps,
    rows,
    multiline,
    title,
    required,
    disabled,
    value,
    action,
    style,
    styleTitle,
    secondTitle,
    styleSecondTitle,
    styleInput
  } = props;
  return (
    <FormControl style={{ width: '100%', ...style }} variant="standard">
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography sx={{ ...styleTitle }}>{title}</Typography>
        <Typography sx={{ ...styleSecondTitle }}>{secondTitle}</Typography>
      </div>
      <BootstrapInput
        fullWidth={fullWidth}
        placeholder={placeholder}
        name={field ?? 'field'}
        value={formik ? formik.values[field] : value}
        onChange={e =>
          formik
            ? formik.setFieldValue(field, e.target.value)
            : action(e.target.value)
        }
        multiline={multiline}
        rows={rows}
        required={required}
        disabled={disabled}
        sx={styleInput}
        inputProps={inputProps}
      />
    </FormControl>
  );
};

export default InputText;
