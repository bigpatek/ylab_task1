import About from "../pages/About/About"
import Login from "../pages/Login/Login"

export const privateRoutes = [
    {path:'/about', element: <About />},
]

export const publicRoutes = [
    {path:'/login', element: <Login />},
]