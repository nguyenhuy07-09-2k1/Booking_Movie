import { lazy } from 'react';

// project imports
import Loadable from '../ui-component/Loadable';
import MinimalLayout from '../layout/MinimalLayout';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(async () =>  ({default: (await import('../views/pages/authentication/authentication3/Login3')).default})));
const AuthRegister3 = Loadable(lazy( async () => ({default: (await import('../views/pages/authentication/authentication3/Register3')).default})));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/login/login3',
            element: <AuthLogin3 />
        },
        {
            path: '/pages/register/register3',
            element: <AuthRegister3 />
        }
    ]
};

export default AuthenticationRoutes;
