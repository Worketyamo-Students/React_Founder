import './App.css'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'
import { Button } from './components/ui/button'
import { SignupForm } from './composants/SignupForm'
import { Link } from 'react-router'

//hook 


function App(){

// const [erreur, setErreur] = useState(null)
const [val, setVal] = useState(0)
const [perso, setPerso] = useState([])

useEffect(()=>{
  const fetchDragon = async()=>{
    const res = await axios.get('https://dragonball-api.com/api/characters?limit=58')
    console.log(res)
    const data = res.data.items
    
    
    
    console.log(data)
    setPerso(data)
    
    
  }
fetchDragon()
 
  
}, [])

 


//affichge
  return (
    <>

    
     <div className='w-screen p-10 h-screen flex justify-center items-center flex-wrap gap-15'>
        <Link to={'/login'}><Button variant='destructive'>Se connecter</Button></Link>
      {/* {
      perso.map((p)=>(
        <div key={p.id} className='w-70 h-80'>
          <img src={p.image} alt="perso"  className='w-full h-full'/>
          <p>Nom : {p.name}</p>
          <p>Ki : {p.ki}</p>
          <p>Max ki : {p.maxKi}</p>
        </div>
      ))
     } */}
     </div>
   
     
        
    </>
  ) 
}



export default App