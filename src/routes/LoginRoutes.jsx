// LoginRoutes.js
import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/', // Keep this as root to handle login
  element: <MinimalLayout />,
  children: [
    {
      path: '', // Keep this empty to point to login
      element: <AuthLogin />
    },
    {
      path: '/register',
      element: <AuthRegister />
    }
  ]
};

export default LoginRoutes;
