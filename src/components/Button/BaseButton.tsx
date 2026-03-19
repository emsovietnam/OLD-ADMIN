import { LoadingButton } from '@mui/lab';
import { BUTTON_STYLE } from 'src/constants/styles';
import React from 'react';
interface PropType {
  buttonName?: string;
  onClick?: any;
  StartIcon?: HTMLElement;
  loading?: boolean;
  startIcon?: any;
  sx?: any;
  color?: any;
  disabled?: boolean;
}

const BaseButton = (props: PropType) => {
  const { buttonName, onClick, startIcon, loading, sx, color, disabled } =
    props;
  return (
    <LoadingButton
      disabled={disabled}
      style={sx}
      color={color || 'primary'}
      startIcon={startIcon || <i className="fa fa-save" />}
      size={'small'}
      variant="contained"
      onClick={e => onClick(e)}
      loading={loading || false}
      sx={BUTTON_STYLE}
    >
      {buttonName || 'Save'}
    </LoadingButton>
  );
};
export default BaseButton;
