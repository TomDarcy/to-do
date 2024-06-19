import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';
import { Link } from 'react-router-dom';

// Define the Blog type
type Blog = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  date: string;
  author: { name: string };
};

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blog')
          .select('*');

        if (error) {
          throw error;
        }

        setBlogs(data as Blog[]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError('Failed to fetch blogs: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="py-12 sm:py-16" id="blog">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-100 sm:text-4xl">From the blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-200">Jodie's latest thoughts.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article
                key={blog.id}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
              >
                <img src={blog.image_url} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-200">
                  <time dateTime={blog.date} className="mr-8">{blog.date}</time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg viewBox="0 0 2 2" className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="flex gap-x-2.5">{blog.author.name}</div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <Link to={`/blog/${blog.id}`} className="text-white hover:text-yellow">
                    <span className="absolute inset-0 text-white" />
                    {blog.title}
                  </Link>
                </h3>
              </article>
            ))
          ) : (
            <div>No blog posts available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
