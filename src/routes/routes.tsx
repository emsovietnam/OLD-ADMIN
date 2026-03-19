import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import Login from 'src/pages/Login/Login';
import Test from 'src/pages/Test';
import MainRoutes from './MainRoutes';
import NoMatch from './NoMatchRoutes';

import { PATHS } from 'src/constants/paths';
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={[PATHS.LOGIN]}>
          <Login />
        </Route>
        <Route
          exact
          path={[
            PATHS.HOME,
            PATHS.PROJECT,
            PATHS.PROJECT_MINE,
            PATHS.REPORT,
            PATHS.REPORT_MINE,
            PATHS.CAMPAIGNS,
            PATHS.CAMPAIGNS_CREATE,
            PATHS.PRODUCT,
            PATHS.POST_CHART,
            PATHS.FEED,
            PATHS.COMPLAIN,
            PATHS.REPORT_SYSTEM_ERROR,
            PATHS.VERIFY,
            PATHS.VERIFY_SUBJECT,
            PATHS.ADVERTISING_ACCOUNT,
            PATHS.FINANCIAL_CONTROL
          ]}
        >
          {/* <ThemeContextProvider> */}
          <MainLayout>
            <MainRoutes />
          </MainLayout>
          {/* </ThemeContextProvider> */}
        </Route>
        <Route path={[PATHS.TEST]}>
          <Test />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
