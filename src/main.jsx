import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx'
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import { Toaster } from './components/ui/toast';



const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>

  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/dashboard',
    element: <Dashboard/>
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter}/>
    <Toaster/>
  </StrictMode>,
)
