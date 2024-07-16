import React from 'react'
interface BlogCardProps{
    authorName :string,
    title:string,
    content:string,
    publishedDate:string
}
const BlogCard = ({
    authorName,
    content,
    title,
    publishedDate
}) => {
  return (
    <div className='grid gap-1 border-b-2 ml-1' >
      <div className='flex text-center items-center  '>
           <Avathar authorName={authorName}/>
         <div>
        <span className='text-xl font-medium text-slate-600'>{authorName}</span>. <span className='text-l text-slate-600 font-thin '>{publishedDate}</span>
        </div>
      </div>
      <div className=' text-xl font-bold text-slate-700 '>
        {title}
      </div>
      <div className='text-md font-thin'>
        {content.slice(0,100)+"..."}
      </div>
      <div className='text-sm font-mono '>
        {`${Math.ceil(content.length/100)} minutes`}
      </div>

    </div>
  )
}


const Avathar=({authorName})=>{
  return (<div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-1">
          <span className="font-medium text-gray-600 dark:text-gray-300">{authorName.slice(0,2)}</span>
        </div>)
}
export default BlogCard