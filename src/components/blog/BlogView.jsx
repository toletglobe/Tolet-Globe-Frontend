import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../config/config'; // Adjust the import path accordingly

const BlogView = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await Service.fetchBlogById(id); // Fetch the blog details
        setBlog(blogData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="bg-black text-white px-10">
      <div className='mb-4 md:mx-10'>
        <h1 className="text-6xl font-bold my-5">{blog.title}</h1>
        <div className='flex flew-row justify-between items-center my-5'>
          <p className="text-gray-400">{new Date(blog.date).toDateString()}</p>
          <div className='text-white'>{blog.author}</div>
        </div>
        <div className=" mx-2">
          <img src={blog.image} alt={blog.title} className="rounded-md w-full h-[50vh] object-cover" />
        </div>

        <div className=''>
          <div className="my-5 text-xl" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      </div>
      {/* Assuming `content` contains HTML formatted string */}
    </div>
  );
};

export default BlogView;
