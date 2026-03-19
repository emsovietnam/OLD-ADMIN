import { Avatar, Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { ReactNode, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Emso from 'src/assets/images/LogoEmso.svg';
import SideNav from 'src/components/SideNav/SideNav';
import { getInfoMeReq } from 'src/store/action/userAction';
const theme = createTheme();

const useStyles = makeStyles(() => ({
  root: {
    // display: 'flex',
    height: '100%',
    overflow: 'hidden',
    padding: '0px 10px 0px 0px'
  },
  wrapHeader: {
    width: '100%'
  },
  appBar: {
    borderBottom: '1px solid #eff2f5',
    height: theme.spacing(6.5)
  },
  toolBar: {
    display: 'flex',
    marginTop: '-6px',
    justifyContent: 'space-between'
  }
}));
interface Props {
  children: ReactNode;
}

export default function MainLayout(props: Props) {
  const { children } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const meInfo = useSelector((state: any) => state.meReducer.info);
  const getDataMeInfo = useCallback(() => {
    if (!meInfo?.id) {
      dispatch(getInfoMeReq());
    }
  }, []);

  React.useEffect(() => {
    getDataMeInfo();
  }, []);

  return (
    <div className={classes.root}>
      <Box className={classes.wrapHeader}>
        <AppBar
          classes={{ root: classes.appBar }}
          position="fixed"
          color="inherit"
        >
          <Toolbar classes={{ root: classes.toolBar }}>
            <Avatar src={Emso} />
          </Toolbar>
          {/* <Avatar src={} /> */}
        </AppBar>
      </Box>
      <SideNav
        title="Admin"
        icon={<i style={{ fontSize: 30 }} className="fas fa-sack-dollar"></i>}
      />
      <CssBaseline />
      {children}
    </div>
  );
}
