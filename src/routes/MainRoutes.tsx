import { Typography } from '@mui/material';
import React, { Suspense, lazy, memo } from 'react';
import { Switch } from 'react-router-dom';
import Loading from 'src/components/Loading/Loading';
import { PATHS } from 'src/constants/paths';
import AuthenticatedGuard from 'src/guards/AuthenticatedGuard';

const Home = lazy(() => import('src/pages/Home/Index'));
const Project = lazy(() => import('src/pages/Project/Index'));
const Report = lazy(() => import('src/pages/Report/Index'));
const Campaign = lazy(() => import('src/pages/Campaign/Index'));
const Product = lazy(() => import('src/pages/Product/Index'));
const PostChart = lazy(() => import('src/pages/PostChart/Index'));
const Feed = lazy(() => import('src/pages/Feed/Index'));
function Routes(props) {
  const { refScroll } = props;
  const routes = [
    {
      path: [PATHS.HOME],
      component: <Home refScroll={refScroll} />
    },
    {
      path: [PATHS.PROJECT, PATHS.PROJECT_MINE],
      component: <Project refScroll={refScroll} />
    },
    {
      path: [PATHS.REPORT, PATHS.REPORT_MINE],
      component: <Report refScroll={refScroll} />
    },
    {
      path: [PATHS.CAMPAIGNS, PATHS.CAMPAIGNS_CREATE],
      component: <Campaign refScroll={refScroll} />
    },
    {
      path: [PATHS.PRODUCT],
      component: <Product refScroll={refScroll} />
    },
    {
      path: [PATHS.POST_CHART],
      component: <PostChart refScroll={refScroll} />
    },
    {
      path: [PATHS.FEED],
      component: <Feed refScroll={refScroll} />
    },
    {
      path: [PATHS.COMPLAIN],
      component: <Typography>Chưa có dữ liệu</Typography>
    },
    {
      path: [PATHS.REPORT_SYSTEM_ERROR],
      component: <Typography>Chưa có dữ liệu</Typography>
    },
    {
      path: [PATHS.VERIFY, PATHS.VERIFY_SUBJECT],
      component: <Typography>Chưa có dữ liệu</Typography>
    },
    {
      path: [PATHS.ADVERTISING_ACCOUNT],
      component: <Typography>Chưa có dữ liệu</Typography>
    },
    {
      path: [PATHS.FINANCIAL_CONTROL],
      component: <Typography>Chưa có dữ liệu</Typography>
    }
  ];
  return (
    <Switch>
      {routes.map((item, index) => {
        return (
          <AuthenticatedGuard
            key={index}
            path={item.path}
            exact
            component={() => (
              <Suspense fallback={<Loading />}>{item.component}</Suspense>
            )}
          />
        );
      })}
    </Switch>
  );
}

export default memo(Routes);
