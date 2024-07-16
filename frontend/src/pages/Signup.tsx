import React from 'react'
import Quotes from '../components/Quotes'
import Auth from '../components/Auth'


const Signup = () => {
  return (
    <div className='grid grid-cols-2'>
      <div>
        <Auth type='signup'/>
      </div>
      <Quotes/>
    </div>
  )
}
 
export default Signup