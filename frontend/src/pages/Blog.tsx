import React from 'react'
import BlogCard from '../components/BlogCard'

const Blog = () => {
  return (
    <div className='flex justify-center items-center'>
      <BlogCard authorName={"shasha"}
    content={"Written by Urie, Swift, and Joel Little, and produced by the latter two,  is an upbeat bubblegum pop and synth-pop track driven by a marching band drumline"}
    title="Creating the components"
    publishedDate="24/07/02"></BlogCard>
    </div>
  )
}

export default Blog