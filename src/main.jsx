import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from './App.jsx'
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';



const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>

  },
  {
    path: '/contact',
    element: <Contact/>
  },
  {
    path: '/about',
    element: <About/>
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter}/>
  </StrictMode>,
)
