import React from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  inputSearch: {
    width: '100%'
  },
  cssOutlinedInput: {
    borderRadius: '30px !important',
    height: 35,
    padding: '5px !important',
    margin: 'auto'
  },
  input: {
    '&::placeholder': {
      fontSize: 15
    }
  },
  notchedOutline: {},
  multilineColor: {
    fontSize: 12
  }
}));

const InputSearch = props => {
  const classes = useStyles();

  const { label, action, keyword, setKeyword, styleInput } = props;

  const handleInputChange = React.useCallback(
    e => {
      setKeyword(e.target.value);
    },
    [keyword]
  );
  return (
    <TextField
      classes={{ root: classes.inputSearch }}
      value={keyword}
      style={{ ...styleInput, fontFamily: 'Segoe UI' }}
      size="small"
      fullWidth
      variant="outlined"
      placeholder={label}
      InputLabelProps={{ shrink: false }}
      InputProps={{
        startAdornment: (
          <i
            style={{
              marginRight: 5,
              padding: 5,
              fontWeight: 500,
              color: '#7b7b7b'
            }}
            className="fa-light fa-magnifying-glass"
          ></i>
        ),
        classes: {
          root: classes.cssOutlinedInput,
          notchedOutline: classes.notchedOutline,
          input: classes.input
        },
        className: classes.multilineColor
      }}
      onKeyPress={e => {
        if (e.key === 'Enter') {
          action && action();
        }
      }}
      onChange={handleInputChange}
      autoFocus={true}
    />
  );
};

export default InputSearch;
