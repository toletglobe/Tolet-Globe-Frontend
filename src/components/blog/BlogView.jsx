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
    <div className="bg-black text-white p-5">
      <h1 className="text-3xl font-semibold mb-4">{blog.title}</h1>
      <div className="mb-4">
        <img src={blog.image} alt={blog.title} className="rounded-md w-full h-60 object-cover" />
      </div>
      <p className="text-gray-400">{new Date(blog.date).toDateString()}</p>
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: blog.content }}></div>
      {/* Assuming `content` contains HTML formatted string */}
    </div>
  );
};

export default BlogView;
