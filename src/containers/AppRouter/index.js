import React from 'react';
import Home from '../../components/Home';

const AppRouter = [
    {
        path: "/login",
        exact: false,
        // main: () => <LoginPage />,
    },
    {
        path: "/",
        exact: true,
        main: () => <Home />,
    },
]

export default AppRouter;