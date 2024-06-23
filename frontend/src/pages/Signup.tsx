import React from 'react'
import Quotes from '../components/Quotes'
import Auth from "../components/Auth.jsx"

const Signup = () => {
  return (
    <div className='grid grid-cols-2'>
      <div>
        <Auth/>
      </div>
      <Quotes/>
    </div>
  )
}

export default Signup