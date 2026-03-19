import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  InputBase
} from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import { styled, alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import { modalBackdrop } from 'src/constants/styles';
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
  }
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  },
  '& .MuiPaper-root': {
    width: 700
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
export default function ScrollDialog(props) {
  const { open, handleClose, text, action } = props;
  const [isError, setIsError] = React.useState(false);
  const [note, setNote] = React.useState<any>('');

  return (
    <div>
      <BootstrapDialog
        open={open}
        onClose={handleClose}
        scroll={'body'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        BackdropProps={modalBackdrop}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography
            style={{ fontWeight: 'bold', fontSize: 20 }}
            textAlign={'center'}
          >
            Từ chối phê duyệt
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 5,
              justifyContent: 'space-between'
            }}
          >
            <Typography style={{ fontSize: 17, fontWeight: 500 }}>
              {text}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControl style={{ width: '100%' }} variant="standard">
              <BootstrapInput
                autoFocus
                fullWidth
                multiline
                placeholder="Lý do từ chối"
                size="small"
                rows={3}
                onChange={e => {
                  setNote(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isError ? 'space-between' : 'start'
            }}
          >
            {isError && (
              <FormHelperText id="component-error-text" sx={{ color: '#f00' }}>
                Chỉ được phép nhập tối đa 100 ký tự
              </FormHelperText>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'end',
              marginTop: 5
            }}
          >
            <ButtonInherit
              label="Hủy"
              style={{ marginRight: 0, marginLeft: 5 }}
              action={handleClose}
            />
            <ButtonInherit
              disabled={isError}
              label="Gửi"
              color="#1876f2"
              style={{ marginRight: 0, marginLeft: 5 }}
              action={() => {
                action({
                  status: 'rejected',
                  note: note
                });
                handleClose();
              }}
            />
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
