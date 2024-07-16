import React from 'react'
import Quotes from '../components/Quotes'
import Auth from '../components/Auth'


const Signin = () => {
  return (
    <div className='grid grid-cols-2'>
    <div>
        <Auth type={'signin'}/>
      </div>
      <Quotes/>
    </div>
  )
}

export default Signin