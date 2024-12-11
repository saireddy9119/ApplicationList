import React from 'react'
import Login from './Login'
import Home from './Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ApplicationScreen from './ApplicationScreen'


const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />
        },
        {
            path: "/home",
            element: <Home />
        },
        {
            path: "/app/:appId",
            element: <ApplicationScreen />
        },
    ]);
    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    )
}



export default Body