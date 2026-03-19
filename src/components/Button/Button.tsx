import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: 36,
    borderRadius: 8,

    // backgroundColor: '#e7f3ff',
    // color: '#1877f2',

    fontWeight: '500 !important'
    // '&:hover': {
    //   cursor: 'pointer',
    //   backgroundColor: '#e5f0f4'
    // }
  },
  rootDisable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: 36,
    borderRadius: 8,

    // backgroundColor: 'rgba(0,0,0,0.12)',
    // color: 'rgba(0,0,0,0.26)',

    fontWeight: '500 !important',
    pointerEvents: 'none'
  }
}));

const Button = props => {
  const { icon, label, action, style, disabled, solid } = props;
  const classes = useStyles();
  return (
    <Box
      onClick={() => {
        action && action();
      }}
      className={disabled ? classes.rootDisable : classes.root}
      sx={{
        backgroundColor: solid
          ? 'button.custom.color'
          : 'button.custom.background',
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: solid
            ? 'button.custom.hoverSolid'
            : 'button.custom.hover'
        },
        color: solid ? 'button.custom.background' : 'button.custom.color',
        ...style
      }}
    >
      {icon ? <>{icon}&nbsp;</> : ''} {label}
    </Box>
  );
};

export default Button;
