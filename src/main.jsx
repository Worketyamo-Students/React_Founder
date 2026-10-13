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
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter}/>
  </StrictMode>,
)
