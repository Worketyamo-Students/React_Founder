import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Home() {
    
    useEffect(()=>{
        const getArticle = async()=>{
            const Token = localStorage.getItem('Token')

            try {
                const res = await axios.get('http://localhost:5000/api/articles', {
                    headers: {Authorization: `Bearer ${Token}`}
                })

                console.log(res.data)
                
            } catch (error) {
                console.log(error.response.data)
                if (error.response.status === 401) {
                    try {
                        const refresh = localStorage.getItem('Refresh')
                        const resRefresh = await axios.post('http://localhost:5000/api/auth/refresh', {refreshToken : refresh})
                        localStorage.setItem('Token', resRefresh.data.accesToken)

                        const resNew = await axios.get('http://localhost:5000/api/articles', {
                                headers: {Authorization: `Bearer ${resRefresh.data.accesToken}`}
                        })
                        console.log(resNew.data);
                        

                    } catch (error) {
                        console.log(error.response.data);
                        localStorage.removeItem('Refresh')
                        localStorage.removeItem('Token')   
                        
                    }
                }

            }
        }

       getArticle() 
    }, [])
   

  return (
    <div>
        hello acceuil <br />

        {/* <p>{value}</p> */}
        <button onClick={()=>setValue(value +1)}>add + </button>
      
    </div>
  )
}

export default Home
