import React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import ButtonInherit from 'src/components/Button/ButtonInherit';
import InputTextField from 'src/components/Input/InputTextField';

import { changePasswordApi } from 'src/apis/user.api';
import { useHistory } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const FormSubmitReset = ({ tokenReset, setTokenReset }) => {
  const history = useHistory();
  const [objectMessage, setObjectMessage] = React.useState<any>({
    isError: false,
    message: ''
  });

  const handleChangePassword = async data => {
    let response = await changePasswordApi(data);
    if (response.status === 200) {
      setTokenReset('');
      history.push('/login?type=reset');
    }
  };

  const validationSchema = Yup.object({
    new_password: Yup.string().required('Mật khẩu không được để trống'),
    new_password_confirmation: Yup.string().required(
      'Mật khẩu không được để trống'
    )
  });

  const formik = useFormik({
    initialValues: {
      reset_password_token: tokenReset,
      new_password: '',
      new_password_confirmation: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      if (values.new_password !== values.new_password_confirmation) {
        setObjectMessage({
          isError: true,
          message: 'Xác nhận mật khẩu không đúng, vui lòng kiểm tra lại.'
        });
      } else {
        handleChangePassword(values);
      }
    }
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography style={{ fontSize: 17, fontWeight: 500 }}>
          Hoàn thiện bước cuối cùng để đăng nhập tài khoản của bạn.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography style={{ fontSize: 15, fontWeight: 500, color: '#1876f2' }}>
          Cập nhật mật khẩu mới
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <InputTextField
          formik={formik}
          id="new_password"
          label="Nhập mật khẩu mới"
          required
          field="new_password"
          type="password"
          autoFocus
        />
      </Grid>

      <Grid item xs={12}>
        <InputTextField
          formik={formik}
          id="new_password"
          label="Xác nhận mật khẩu mới"
          required
          field="new_password_confirmation"
          type="password"
        />
      </Grid>

      {objectMessage.isError && (
        <Grid item xs={12}>
          <Typography style={{ color: 'red', fontSize: 15 }}>
            {objectMessage.message}
          </Typography>
        </Grid>
      )}

      <Grid container justifyContent="flex-end" item xs={12}>
        <ButtonInherit
          action={() => formik.submitForm()}
          color="#1876f2"
          label="Cập nhật mật khẩu"
          style={{ marginRight: 0 }}
        />
      </Grid>
    </Grid>
  );
};

export default FormSubmitReset;
