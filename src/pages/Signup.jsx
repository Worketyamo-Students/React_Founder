import React from 'react'
import { SignupForm } from '@/composants/SignupForm'
import { useState } from 'react'
import axios from 'axios'

function Signup() {



  return (
    <div className='w-screen p-10 h-screen flex justify-center items-center flex-wrap gap-15'>
        <SignupForm />
    </div>
  )
}

export default Signup
