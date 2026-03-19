import React from 'react';
import { Button, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
interface PropType {
  buttonName?: string;
  onClick?: any;
  icon?: any;

  startIcon?: any;

  sx?: any;
  className?: any;
}
const useStyles = makeStyles(
  (theme: Theme) => ({
    buttonAction: {
      padding: '10px !important',
      margin: '0 3px !important',
      minWidth: '0px !important',
      color: `${theme.palette.grey[600]} !important`
    },
    rootIconItem: {
      minWidth: '30px !important',
      paddingRight: 10
    }
  }),
  { index: 1 }
);

const BaseButtonIcon = (props: PropType) => {
  const classes: any = useStyles();
  const { onClick, sx, buttonName, icon, className } = props;
  return (
    <Button
      sx={sx}
      classes={{ root: classes.buttonAction }}
      onClick={onClick}
      title={buttonName && buttonName}
      className={className || undefined}
    >
      {icon}
    </Button>
  );
};
export default BaseButtonIcon;
