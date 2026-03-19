import * as React from 'react';
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CustomizedMenus(props) {
  const {
    label,
    disabled,
    color,
    action,
    fullWidth,
    icon,
    style,
    variant,
    textColor,
    loading,
    sx
  } = props;

  const theme = useTheme();

  return (
    <LoadingButton
      id="demo-customized-button"
      aria-haspopup="true"
      variant={variant ? variant : 'contained'}
      disableElevation
      loading={loading}
      loadingIndicator={<CircularProgress color="inherit" size={16} />}
      onClick={e => {
        action && action(e);
      }}
      style={style}
      startIcon={icon}
      disabled={disabled}
      fullWidth={fullWidth}
      sx={{
        textTransform: 'none',
        fontWeight: '600 !important',
        fontFamily: 'Segoe UI',
        fontSize: 16,
        padding: '4px 12px',
        marginRight: '7px',
        backgroundColor: loading
          ? '#e4e6eb'
          : variant === 'text'
          ? 'transparent'
          : color && !disabled
          ? color
          : theme.palette.mode === 'dark'
          ? '#4b4b4b'
          : '#e4e6eb',
        color: textColor
          ? textColor
          : color
          ? '#f7f7f7'
          : theme.palette.mode === 'dark'
          ? '#e4e6ea'
          : '#0b0b0b',
        '&:hover': {
          backgroundColor: 'button.primary.hover'
        },
        height: '36px',
        borderRadius: '6px',
        cursor: disabled ? 'no-drop' : 'pointer',
        ...style
      }}
    >
      {label}
    </LoadingButton>
  );
}
