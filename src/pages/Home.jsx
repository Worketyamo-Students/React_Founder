import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    const [error, setError]=useState('')
    const [value, setValue] = useState(0)

    useEffect(()=>{

        const fetchArticle = async()=>{
            const Token = localStorage.getItem('Token')

            try {

            const res  = await axios.get('http://localhost:5000/api/articles', {
                headers: {Authorization: `Bearer ${Token}`}
            })

            console.log(res);

            } catch (error) {
                console.error(error.response.data)
                setError(error.response.data.message)
            }
        }

        fetchArticle()
            


        
    }, [])


  return (
    <div>
        hello acceuil

        <p>{value}</p>
        <button onClick={()=>setValue(value +1)}>add + </button>
      
    </div>
  )
}

export default Home
