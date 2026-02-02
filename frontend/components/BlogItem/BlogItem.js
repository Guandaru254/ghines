// components/BlogItem/BlogItem.js
import React from 'react';
import Link from 'next/link';

const BlogItem = ({ post }) => {
  const { title, author, publishedDate, imageUrl, photoCredit, slug } = post;

  return (
    <div className="col-lg-4 col-md-6 mb-8">
      <div className="p-4 bg-white shadow-md rounded-2xl hover:shadow-xl transition-all duration-300">
        {imageUrl && (
          <div className="overflow-hidden rounded-2xl mb-4">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="text-sm text-gray-500 mb-2">
          {new Date(publishedDate).toLocaleDateString()} • {author}
        </div>

        <h3 className="text-xl font-semibold mb-3 text-gray-800 hover:text-blue-600 transition">
          <Link href={`/blog-single/${slug}`}>{title}</Link>
        </h3>

        {photoCredit && <p className="text-xs text-gray-400">📸 {photoCredit}</p>}
      </div>
    </div>
  );
};

export default BlogItem;
