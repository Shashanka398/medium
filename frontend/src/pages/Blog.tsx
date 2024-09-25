import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useBlogs } from '../hooks';
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { BlogCard } from '../components/BlogCard';

const Blog = () => {
  const navigate = useNavigate();
  var { isLoading, data, error } = useBlogs();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className='w-full top-0 h-full sticky '>
        <Header  name={localStorage.getItem('userName')}/>
      </div>
      <div className='flex w-50 h-full flex-col justify-center items-center '>
        {data.length > 0 ? (
          data.map((post, index) => (
            <BlogCard
              id={post.authorId}
              key={index}
              authorName={post.author.name}
              content={post.content}
              title={post.title}
              publishedDate={post.publishedDate || ''} // Use actual publishedDate if available
            />
          ))
        ) : (
          <div>No blogs available</div>
        )}
      </div>
    </div>
  );
};

export default Blog;
