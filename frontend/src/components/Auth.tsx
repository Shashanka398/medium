import { useState } from "react"
import {SignInInput} from "medium-common-shash"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {BACKEND_URL} from '../../config.ts'
const Auth = ({type}:{type: 'signin' | 'signup' }) => {
  const navigate=useNavigate()
  const [postInputs,setPostInputs]=useState<SignInInput>({
    name:"",
    email:"",
    password:""
  })
  const sendRequest=async()=>{
    try{
      const res= await axios.post(
        `${BACKEND_URL}/users/${type==='signup'?'signup':'signin'}`,postInputs
      )
      const jwt=res.data
      console.log(jwt)
      localStorage.setItem('token',jwt)
      navigate('/blogs')
    }catch(e){
      alert('User')
       
    }
  }
  return (
    <div className='flex h-screen text-center justify-center'>
        <div className='flex flex-col justify-center'>
          <div className='font-extrabold text-3xl' >{type==='signup'?'Create an account':'Sign in to account'}</div>
            <div >{type === "signup"? "Already have account ?" : "Not have account ." }<Link className="l-2 underline" to={type === "signup"? "/signin" : "/signup"}>{type === "signup"? "Login" : "Signup"}</Link></div>
            <div className="flex text-left mt-5 gap-5 flex-col">
            {type==='signup'&&(
                  <LabeledInput 
              label={"User Name"} 
              placeholder={"Enter User Name"} 
              onChange={(e) => {
              setPostInputs((postInputs) => ({
              ...postInputs,
              name: e.target.value
            }));
           }} 
          />
            ) 
              }
        
            
           <LabeledInput 
              label={"Email"} 
              placeholder={"Enter Email"} 
              onChange={(e) => {
              setPostInputs((postInputs) => ({
              ...postInputs,
              email: e.target.value
            }));
           }} 
          />
         <LabeledInput 
              label={"Password"} 
              placeholder={"Enter Passowrd"} 
              onChange={(e) => {
              setPostInputs((postInputs) => ({
              ...postInputs,
              password: e.target.value
            }));
           }} 
           type="password"
          />
          <button type="button" onClick={sendRequest} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign Up" : "Sign In"}</button>
            </div>
         

        </div>
    </div>
  )
}
interface LabeledInput{
  label:string,
  placeholder:string,
  onChange:(e:any )=>void,
  type?:string
}
const LabeledInput=({label,onChange,placeholder,type}:LabeledInput)=>{
  return  <div>
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">{label}</label>
            <input type={type || "text"} id={label} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
  </div>
  
}

export default Auth