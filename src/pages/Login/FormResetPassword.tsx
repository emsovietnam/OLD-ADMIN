import React from 'react';
import { Grid, Divider, Typography, Alert } from '@mui/material';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import InputTextField from 'src/components/Input/InputTextField';

import {
  requestResetPasswordApi,
  sendEmailResetPasswordApi
} from 'src/apis/user.api';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormResetPassword = props => {
  const { setIsForgetPassword, classes, setOpenRegister } = props;
  const [isNextStep, setIsNextStep] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [isSendAgain, setIsSendAgain] = React.useState(false);

  const handleCheckEmail = async data => {
    try {
      let response: any = await requestResetPasswordApi(data);
      if (response.status === 200) {
        setIsNextStep(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const handleSendEmailAgain = async () => {
    let response = await sendEmailResetPasswordApi(formik.values);
    if (response.status === 200) {
      setIsSendAgain(true);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email không được để trống')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      setIsError(false);
      handleCheckEmail(values);
    }
  });

  const MenuHeader = () => {
    return (
      <>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <span
              onClick={() => setIsForgetPassword(false)}
              className={classes.buttonLink}
            >
              Đăng nhập
            </span>
          </Grid>
          <Grid container justifyContent="flex-end" item xs={6}>
            <span
              onClick={() => setOpenRegister(true)}
              className={classes.buttonLink}
            >
              Đăng ký tài khoản
            </span>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </>
    );
  };

  const StepOne = () => {
    return (
      <Grid container spacing={2}>
        <MenuHeader />
        <Grid item xs={12}>
          <Typography style={{ fontSize: 17, fontWeight: 500 }}>
            Tìm tài khoản của bạn
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ fontSize: 15, fontWeight: 500, color: '#65676b' }}
          >
            Vui lòng nhập địa chỉ email để tìm kiếm tài khoản của bạn.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <InputTextField
            formik={formik}
            id="email"
            label="Địa chỉ email"
            required
            field="email"
            autoComplete="email"
            autoFocus
          />
        </Grid>

        {isError && (
          <Grid item xs={12}>
            <Alert sx={{ width: '100% !important' }} severity="error">
              <Typography style={{ fontSize: 15, fontStyle: 'italic' }}>
                Không tìm thấy tài khoản, vui lòng kiểm tra lại địa chỉ email đã
                nhập.
              </Typography>
            </Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography
            style={{ fontSize: 12, fontWeight: 500, color: '#65676b' }}
          >
            Bằng cách nhấn vào Tiếp tục, chúng tôi sẽ gửi vào email của bạn một
            tin nhắn xác nhận. Vui lòng đọc kĩ tin nhắn và thực hiện các bước
            tiếp theo theo hướng dẫn.
          </Typography>
        </Grid>

        <Grid container item justifyContent="flex-end" xs={12}>
          <ButtonInherit
            action={() => {
              formik.submitForm();
            }}
            style={{ marginRight: 0 }}
            color="#1876f2"
            label="Tiếp tục"
          />
        </Grid>
      </Grid>
    );
  };

  const StepTwo = () => {
    return (
      <Grid container spacing={2}>
        <MenuHeader />
        <Grid item xs={12}>
          <Typography style={{ fontSize: 17, fontWeight: 500 }}>
            Chúng tôi đã gửi email xác nhận về tài khoản mail của bạn, vui lòng
            kiểm tra và thực hiện các bước tiếp theo.
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <span
            onClick={() => setIsNextStep(false)}
            className={classes.buttonLink}
          >
            Nhập lại địa chỉ email.
          </span>
        </Grid>
        <Grid item xs={12}>
          <span>Bạn chưa nhận được mail? </span>
          <ButtonInherit
            action={() => {
              handleSendEmailAgain();
            }}
            label="Gửi lại"
          />
        </Grid>
        {isSendAgain && (
          <Grid item xs={12}>
            <Typography style={{ color: '#1876f2', fontStyle: 'italic' }}>
              <i className="fa-regular fa-check"></i> Đã gửi lại mail
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  };

  return isNextStep ? <StepTwo /> : <StepOne />;
};

export default FormResetPassword;
