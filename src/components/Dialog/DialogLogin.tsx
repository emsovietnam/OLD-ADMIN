import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Theme,
  Grid,
  Alert
} from '@mui/material';
import { useFormik } from 'formik';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputTextField from 'src/components/Input/InputTextField';
import CloseIcon from '@mui/icons-material/Close';
import { modalBackdrop } from 'src/constants/styles';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
// import AvatarSocial from 'src/components/ProfileCardImage/AvatarSocial';
import * as Yup from 'yup';
import * as loginApi from 'src/apis/socialAuth.api';

import { loginFailed, loginSuccess } from 'src/store/action/login';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '15px 0px 0px 15px',
    backgroundColor: '#fff',
    marginBottom: 10,
    // borderRadius: 10,
    width: '100%',
    border: '1px solid rgba(0,0,0,0.10)',
    boxShadow: '0 1px 2px rgb(0 0 0 / 20%) !important',
    marginTop: 10,
    minWidth: 400
  },
  listItem: {
    '&.MuiListItemButton-root': {
      cursor: 'text',
      '&:hover': {
        backgroundColor: '#fff'
      },
      '&:focus': {
        backgroundColor: '#fff'
      },
      '&.Mui-focusVisible': {
        '&:focus': {
          backgroundColor: '#fff'
        }
      }
    }
  },
  list: {
    '&.MuiListItem-root': {
      display: 'flex !important',
      padding: '0px 12px 4px 12px'
    }
  },
  firstListItem: {
    marginLeft: 10,
    '&.MuiListItemText-root': {
      fontWeight: 'bold'
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
  '& .MuiDialog-paper': {
    maxWidth: 400
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
            right: 13,
            top: 13,
            color: '#606770',
            backgroundColor: '#e4e6eb',
            padding: '5px'
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DialogLogin(props) {
  const {
    open,
    handleClose,
    userSelected,
    setIsRememberPassword,
    setIsForgetPassword
  } = props;

  const [loadingButton, setLoadingButton] = React.useState<any>(false);
  const [checked, setChecked] = React.useState(false);
  const meInfo = useSelector((state: any) => state.meReducer.info);
  const dispatch = useDispatch();
  const isError = useSelector((state: any) => state.loginReducer.isError);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setIsRememberPassword(event.target.checked);
  };
  const handleSubmit = async (username, password) => {
    localStorage.setItem('isFastLogin', checked === true ? 'yes' : 'no');
    // dispatch(loginReq(username, password));
    try {
      let response = await loginApi.socialLoginApi({
        userName: username,
        passWord: password
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        if (localStorage.getItem('isFastLogin') === null)
          localStorage.setItem('isFastLogin', 'no');
        let isFastLogin: any = localStorage.getItem('isFastLogin');
        let listdataStorage: any = localStorage.getItem('userRememberPassword');
        let listdataUser: any = JSON.parse(listdataStorage ?? '') ?? [];

        // if (isFastLogin === 'yes') {
        //   let dataStorage: any = localStorage.getItem('dataUser');
        //   let dataUser: any = JSON.parse(dataStorage) ?? [];
        //   let indexSelected = dataUser?.findIndex(
        //     (el: any) => el.id === meInfo?.id
        //   );

        //   if (indexSelected >= 0) {
        //     localStorage.setItem(
        //       'dataUser',
        //       JSON.stringify(
        //         _.uniqBy(
        //           dataUser
        //             .map((el: any, index: any) =>
        //               index === indexSelected
        //                 ? { ...el, token: response?.data?.access_token?.token }
        //                 : el
        //             )
        //             ?.filter((el: any) => el.id),
        //           'id'
        //         )
        //       )
        //     );
        //   }
        // }

        let index = listdataUser?.findIndex(
          (el: any) => el.id === userSelected?.id
        );
        if (index >= 0) {
          listdataUser = [
            ...listdataUser.slice(0, index),
            {
              id: meInfo?.id,
              isFastLogin: isFastLogin
              // isRememberPassword: false
            },
            ...listdataUser.slice(index + 1)
          ];
          localStorage.setItem('darkThemeUser', meInfo.theme);
          localStorage.setItem(
            'userRememberPassword',
            JSON.stringify(listdataUser)
          );
        }
        dispatch(loginSuccess());
        window.location.href = '/';
        // console.log('oke');
      } else {
        localStorage.setItem('isFastLogin', 'no');
        localStorage.setItem('darkThemeUser', 'light');
      }
    } catch (error: any) {
      localStorage.setItem('isFastLogin', 'no');
      localStorage.setItem('darkThemeUser', 'light');
      dispatch(
        loginFailed({
          isError: true
        })
      );
    }
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Mật khẩu không được để trống')
  });
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(
        loginFailed({
          isError: false
        })
      );
      handleSubmit(userSelected?.username, values.password);
    }
  });
  React.useEffect(() => {
    dispatch(
      loginFailed({
        isError: false
      })
    );
  }, []);

  return (
    <div>
      <BootstrapDialog
        onClose={() => {
          handleClose();
        }}
        open={open}
        fullWidth
        BackdropProps={modalBackdrop}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => {
            // handleChangePassword(dataPassword, true);
            handleClose();
          }}
        ></BootstrapDialogTitle>
        <DialogContent sx={{ padding: '0px 0px 4px 0px !important' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '10px 0px',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
          >
            {/* <AvatarSocial
              type="feed"
              avatarObj={userSelected}
              style={{ width: 162, height: 162 }}
            ></AvatarSocial> */}
            <Typography
              variant="caption"
              sx={{ fontSize: 17, fontWeight: 600 }}
            >
              {userSelected?.name}
            </Typography>
            <Grid item sx={{ width: '100%' }}>
              <InputTextField
                formik={formik}
                placeholder="Mật khẩu"
                autoComplete="current-password"
                id="password"
                required
                field="password"
                type="password"
              />
            </Grid>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start'
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleChange} />
                  }
                  label="Nhớ mật khẩu"
                />
              </FormGroup>
            </div>
            {isError ? (
              <Grid item xs={12}>
                <Alert sx={{ width: '100% !important' }} severity="error">
                  <Typography style={{ fontSize: 15, fontStyle: 'italic' }}>
                    Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại.
                  </Typography>
                </Alert>
              </Grid>
            ) : null}
            <ButtonInherit
              action={() => {
                formik.submitForm();
                //   handleChangePassword(dataPassword, isLogOut);
              }}
              color="#1b74e4"
              label={'Đăng nhập'}
              loading={loadingButton}
              style={{
                width: '98%',
                height: '40px',
                fontSize: 17,
                marginTop: '10px',
                marginLeft: 1
              }}
            />
            <ButtonInherit
              action={() => {
                setIsForgetPassword(true);
                handleClose();
                //   handleChangePassword(dataPassword, isLogOut);
              }}
              color="#ffffff"
              label={'Quên mật khẩu'}
              //   loading={loadingButton}
              style={{
                width: '98%',
                height: '40px',
                fontSize: 17,
                marginTop: '10px',
                marginLeft: 1,
                color: '#1877F2'
              }}
            />
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
