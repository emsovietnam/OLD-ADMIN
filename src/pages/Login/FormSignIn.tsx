import React from 'react';
import { Alert, Grid, Divider, Typography } from '@mui/material';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import InputTextField from 'src/components/Input/InputTextField';
import './signin.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { loginReq, loginFailed } from 'src/store/action/login';
import { useDispatch, useSelector } from 'react-redux';

import { signInGoogle } from 'src/apis/user.api';
import { useGoogleLogin } from '@react-oauth/google';

const FormSignIn = ({
  setIsForgetPassword,
  classes,
  setOpenRegister,
  query
}) => {
  const dispatch = useDispatch();
  const isError = useSelector((state: any) => state.loginReducer.isError);
  const [errorEmail, setErrorEmail] = React.useState<any>('');

  const handleSubmit = (username, password) => {
    dispatch(loginReq(username, password));
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse =>
      handleSignInGoogle({ access_token: tokenResponse.access_token })
  });

  const handleSignInGoogle = async data => {
    try {
      let response = await signInGoogle(data);
      if (response.status === 200) {
        if (response.data.access_token) {
          localStorage.setItem('token', response.data.access_token);
          window.location.href = '/';
        }
      }
    } catch (error) {
      dispatch(
        loginFailed({
          isError: true
        })
      );
      setErrorEmail('Đăng nhập bằng gmail bị lỗi, vui lòng thử lại sau');
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(
      'Email hoặc số điện thoại không được để trống'
    ),
    password: Yup.string().required('Mật khẩu không được để trống')
  });

  let type = query.get('type');

  const renderAlert = text => {
    return (
      <Grid item xs={12}>
        <Alert severity="info">
          <Typography style={{ fontSize: 15, fontStyle: 'italic' }}>
            {text}
          </Typography>
        </Alert>
      </Grid>
    );
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      dispatch(
        loginFailed({
          isError: false
        })
      );
      handleSubmit(values.username, values.password);
    }
  });

  React.useEffect(() => {
    dispatch(
      loginFailed({
        isError: false
      })
    );
  }, []);

  React.useEffect(() => {
    if (type === 'confirmed') {
      let dataRegistration: any = localStorage.getItem('emailRegistration');
      if (dataRegistration !== 'undefined') {
        formik.setFieldValue(
          'username',
          JSON.parse(dataRegistration ?? '')?.email
        );
      }
    }
  }, []);

  return (
    <Grid container spacing={2}>
      {type === 'reset'
        ? renderAlert(
            'Đổi mật khẩu thành công. Đăng nhập lại để tiếp tục sử dụng bạn nhé!'
          )
        : type === 'registration'
        ? renderAlert(
            'Chúng tôi đã gửi tin nhắn yêu cầu xác thực tài khoản vào hòm thư Email của bạn, vui lòng kiểm tra và làm theo hướng dẫn.'
          )
        : type === 'confirmed'
        ? renderAlert(
            'Xác thực tài khoản mail thành công, đăng nhập lại để tiếp tục sử dụng bạn nhé.'
          )
        : null}
      {type === 'registration' ? null : (
        <>
          <Grid item xs={12}>
            <InputTextField
              formik={formik}
              placeholder="Email hoặc số điện thoại"
              autoComplete="email"
              id="email"
              autoFocus
              required
              field="username"
            />
          </Grid>
          <Grid item xs={12}>
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
          {isError ? (
            <Grid item xs={12}>
              <Alert sx={{ width: '100% !important' }} severity="error">
                <Typography style={{ fontSize: 15, fontStyle: 'italic' }}>
                  {errorEmail
                    ? errorEmail
                    : 'Tài khoản hoặc mật khẩu không đúng, vui lòng kiểm tra lại.'}
                </Typography>
              </Alert>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <ButtonInherit
              label="Đăng nhập"
              color="#1876f2"
              fullWidth
              style={{ marginRight: 0, height: 42 }}
              action={() => formik.submitForm()}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12}>
        <ButtonInherit
          action={() => login()}
          label="Đăng ký/Đăng nhập bằng Google"
          icon={<i className="fa-brands fa-google"></i>}
          fullWidth
          style={{
            marginRight: 0,
            height: '42px',
            '&:hover': {
              backgroundColor: '#d5dadf'
            }
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid container item justifyContent="space-between" xs={12}>
        <Grid item xs={6}>
          <span
            onClick={() => setIsForgetPassword(true)}
            className={classes.buttonLink}
          >
            Quên mật khẩu?
          </span>
        </Grid>
        <Grid container justifyContent="flex-end" item xs={6}>
          <span
            className={classes.buttonLink}
            onClick={() => setOpenRegister(true)}
          >
            Đăng ký tài khoản
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormSignIn;
