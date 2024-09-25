import axios from 'axios'
import React, { useState } from 'react'
import { BACKEND_URL } from '../../config'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Editor = () => {
  const [userForm,setUserForn]=useState({
    title:"",
    content:"",
  })
  
  const handleChange =(e)=>{
     const {name,value}=e.target
      setUserForn({
        ...userForm,
        [name]:value
      })
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data={
      ...userForm,
      authorId:localStorage.getItem('userId'),
      published:true

    }
    postBlog(data)
  }
  
  const postBlog =async(body)=>{
    const token=localStorage.getItem('token')
    try{
       const res= await axios.post(`${BACKEND_URL}/blogs`,body,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )
      toast.success('Sussess  '+ res.data['Post created'].title)
    }catch(error){
        toast.error('Error submitting blog post: ' + error.message);

    }
  }
  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Create a New Blog Post</h2>
        
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={userForm.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the title"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Content Description</label>
          <textarea
            name="content"
            value={userForm.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the content description"
            rows={8}
            required
          ></textarea>
        </div>
        
        <button
          type="submit" onClick={handleSubmit}
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}

export default Editor