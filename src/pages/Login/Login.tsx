import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

// import DialogRegisterAccount from 'src/components/Dialog/DialogRegisterAccount';
import DialogLogin from 'src/components/Dialog/DialogLogin';
import FormSignIn from './FormSignIn';
import FormResetPassword from './FormResetPassword';
import FormSubmitReset from './FormSubmitReset';

import { useLocation, useRouteMatch } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { loginReq } from 'src/store/action/login';

import { PATHS } from 'src/constants/paths';

const useStyles = makeStyles(() => ({
  buttonLink: {
    color: '#1976D2',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f0f2f5 !important',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden auto'
  },
  gridRoot: {
    width: '980px !important',
    height: '600px !important'
  },
  wrapForm: {
    boxShadow: '0 2px 4px rgb(0, 0, 0, 0.1), 0 8px 16px rgb(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    borderRadius: 8,
    width: '100%',
    maxWidth: 396,
    margin: '40px 0',
    padding: '20px 20px 28px'
  },
  wrapBoxSignIn: {
    width: 140,
    height: 170,
    position: 'relative',
    borderRadius: 8,
    '&:hover': {
      cursor: 'pointer'
    },
    border: '1px solid rgba(0,0,0,0.1)',
    display: 'inline-block',
    margin: '8px 4px',
    backgroundColor: '#fff'
  },
  wrapIconLogin: {
    position: 'absolute',
    top: -8,
    right: -8
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const [openRegister, setOpenRegister] = React.useState(false);
  const [isForgetPassword, setIsForgetPassword] = React.useState(false);
  const [tokenReset, setTokenReset] = React.useState<any>('');
  const [listUserLogin, setListUserLogin] = React.useState<any>([]);
  const [listUserFastLogin, setListUserFastLogin] = React.useState<any>([]);
  const [isRememberPassword, setIsRememberPassword] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  const handleClickLoginUser = (user, userRememberPassword) => {
    let userSelectedLogin = listUserLogin.find(
      (el: any) => +el.id === +user.id
    );
    if (userSelectedLogin) {
      if (userRememberPassword[0]?.isFastLogin === 'no') {
        setOpen(true);
        setUserSelected(user);
      } else dispatch(loginReq(null, null, userSelectedLogin.token));
    }
  };

  const handleDeleteSignIn = user => {
    let newListUserLogin: any = listUserLogin?.filter(
      (el: any) => +el.id !== +user.id
    );
    let newListUserFastLogin: any = listUserFastLogin?.filter(
      (el: any) => +el.id !== +user.id
    );
    setListUserLogin(newListUserLogin);
    setListUserFastLogin(newListUserFastLogin);
    localStorage.setItem('dataUser', JSON.stringify(newListUserLogin));
    localStorage.setItem(
      'userRememberPassword',
      JSON.stringify(newListUserFastLogin)
    );
  };

  const BoxSignIn = ({ user, userRememberPassword }) => {
    return (
      <div key={user.id} className={classes.wrapBoxSignIn}>
        <div onClick={() => handleClickLoginUser(user, userRememberPassword)}>
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '8px 8px 0px 0px',
              backgroundImage: `url(${user.show_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <Typography
            style={{ fontSize: 17, color: '#65676b', textAlign: 'center' }}
          >
            {user.name.split(' ')[user.name.split(' ').length - 1]}
          </Typography>
        </div>
        <div
          onClick={() => handleDeleteSignIn(user)}
          className={classes.wrapIconLogin}
        >
          <i
            style={{
              backgroundColor: '#fff',
              borderRadius: '50%',
              color: '#4b4b4b'
            }}
            className="fa-light fa-circle-xmark"
          ></i>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    let listUserLoginStorage: any = localStorage.getItem('dataUser') ?? '[]';
    setListUserLogin(JSON.parse(listUserLoginStorage ?? ''));
    let listUserLoginFastStorage: any =
      localStorage.getItem('userRememberPassword') ?? '[]';

    setListUserFastLogin(JSON.parse(listUserLoginFastStorage ?? ''));
  }, []);

  let query = useQuery();

  React.useEffect(() => {
    if (query.get('reset_password_token')) {
      setTokenReset(query.get('reset_password_token'));
    }
  }, [query.get('reset_password_token')]);

  return (
    <div className={classes.root}>
      <Grid className={classes.gridRoot} container>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          flexDirection="column"
          item
          xs={12}
          md={6}
          sx={{ padding: '40px 20px 20px 20px' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              style={{ color: '#ed7f4d', fontWeight: 700, fontSize: 48 }}
            >
              Emso
            </Typography>
            <Typography
              style={{ color: '#7165e0', fontWeight: 700, fontSize: 48 }}
            >
              Social
            </Typography>
          </div>
          <Typography
            style={{
              fontSize: 28,
              textAlign: 'center',
              color: '#050505',
              marginTop: 10
            }}
          >
            Kết nối để sẻ chia
          </Typography>

          <div style={{ height: 20 }}></div>

          {listUserLogin.length ? (
            <>
              <Typography
                style={{ fontSize: 17, fontWeight: 500, color: '#65676b' }}
              >
                Đã đăng nhập gần đây
              </Typography>

              <div style={{ width: '100%', marginTop: 10 }}>
                {listUserLogin?.map((el: any) => (
                  <BoxSignIn
                    user={el}
                    userRememberPassword={listUserFastLogin?.filter(
                      (item: any) => item.id === el.id
                    )}
                  />
                ))}
              </div>
            </>
          ) : null}
        </Grid>
        <Grid
          sx={{
            padding: '0px 20px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}
          item
          xs={12}
          md={6}
        >
          <div className={classes.wrapForm}>
            {/* {tokenReset && match.path === PATHS.LOGIN_RESET ? (
              <FormSubmitReset
                tokenReset={tokenReset}
                setTokenReset={setTokenReset}
              />
            ) :  */}
            {isForgetPassword ? (
              <FormResetPassword
                setIsForgetPassword={setIsForgetPassword}
                classes={classes}
                setOpenRegister={setOpenRegister}
              />
            ) : (
              <FormSignIn
                query={query}
                setIsForgetPassword={setIsForgetPassword}
                classes={classes}
                setOpenRegister={setOpenRegister}
              />
            )}
          </div>
        </Grid>
      </Grid>

      {/* {openRegister && (
        <DialogRegisterAccount
          open={openRegister}
          handleClose={() => setOpenRegister(false)}
        />
      )} */}
      {open && (
        <DialogLogin
          open={open}
          handleClose={() => setOpen(false)}
          userSelected={userSelected}
          setIsRememberPassword={setIsRememberPassword}
          setIsForgetPassword={setIsForgetPassword}
          isRememberPassword={isRememberPassword}
        />
      )}
    </div>
  );
}
