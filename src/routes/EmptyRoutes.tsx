import React, { lazy, Suspense } from 'react';
import Loading from 'src/components/Loading/Loading';
import { PATHS } from 'src/constants/paths';
import AuthenticatedGuard from 'src/guards/AuthenticatedGuard';
const Login = lazy(() => import('src/pages/Login/Login'));
const Test = lazy(() => import('src/pages/Test'));
const Home = lazy(() => import('src/pages/Home/Index'));

const routes = [
  {
    path: PATHS.HOME,
    component: <Home />
  },
  {
    path: PATHS.TEST,
    component: <Test />
  },
  {
    path: PATHS.LOGIN,
    component: <Login />
  }
];

export default function Routes() {
  return (
    <>
      {routes.map((item, index) => {
        return (
          <AuthenticatedGuard
            key={index}
            path={item.path}
            component={() => (
              <Suspense fallback={<Loading />}>{item.component}</Suspense>
            )}
          />
        );
      })}
    </>
  );
}
