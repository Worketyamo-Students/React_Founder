import './App.css'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router'
import axios from 'axios'
import {ClipLoader} from 'react-spinners'

//hook 


function App(){
const [perso, setPerso] = useState([])
const [chargement, setChargement]= useState(true)
// const [erreur, setErreur] = useState(null)

useEffect(()=>{
  const fetchDBZ = async ()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/auth/users')
      console.log(res);
      

      // console.log(data);
      // setPerso(data)
      
      
    } catch (error) {
      console.log(error);
      
      // setErreur(`impossible de charger les personnages`)
    }finally{
      setChargement(false)
    }
  }

  fetchDBZ()
  
}, [])

if(chargement){
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <ClipLoader
        size={95}
        color='#f59e0b'
        speedMultiplier={1}
      />
      <p>Chargement des pokemeons...</p>
    </div>
  )
}
// if(erreur) return <p>{erreur}</p>

//affichge
  return (
    <>
   
      <div  className='flex flex-wrap gap-18'>
        <h1>Users</h1>
        {/* {
        perso.map((p)=>(
          <div key={p.id} className='p-4 rounded'>
            <img src={p.image} alt="logo" className='w-60 h-60'/>
            <h3>{p.name}</h3>
            <p className='font-bold'>Race : {p.race}</p>
            <p className='font-bold'>Ki de base : {p.ki}</p>
          </div>
        ))
      } */}
      </div>
        
    </>
  ) 
}



export default App