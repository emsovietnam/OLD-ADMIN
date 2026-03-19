import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import { buttonStyle, modalBackdrop } from 'src/constants/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs(props) {
  const {
    title,
    text,
    open,
    handleClose,
    action,
    labelButton,
    colorButton,
    loading,
    contentDialog,
    alignText,
    hiddenButton,
    styleDialogContent,
    maxWidth
  } = props;
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={maxWidth ?? undefined}
        BackdropProps={modalBackdrop}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography
            style={{ fontWeight: 'bold', fontSize: 20 }}
            textAlign={alignText ?? 'start'}
          >
            {title}
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent
          // dividers={!hiddenButton}
          style={{ ...styleDialogContent }}
        >
          <Typography style={{ fontSize: 15 }}>{text}</Typography>
          {contentDialog || null}
        </DialogContent>
        {!hiddenButton && (
          <DialogActions>
            <Button
              onClick={handleClose}
              style={{ ...buttonStyle, textTransform: 'none' }}
            >
              Hủy
            </Button>
            <ButtonInherit
              action={() => {
                handleClose();
                action();
              }}
              color={colorButton || '#1b74e4'}
              style={{ fontSize: '14px' }}
              label={labelButton ? labelButton : 'Xóa'}
              loading={loading}
            />
          </DialogActions>
        )}
      </BootstrapDialog>
    </div>
  );
}
