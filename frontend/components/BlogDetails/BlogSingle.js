import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import logo2 from '/public/images/logo-2.svg';

const BlogSingle = ({ post, ...props }) => {
  const ClickHandler = () => window.scrollTo(10, 0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [validator] = useState(new SimpleReactValidator());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validator.showMessageFor(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      setFormData({ name: '', email: '', comment: '' });
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  if (!post) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>No post found</div>;
  }

  return (
    <section className={`blog-single-section section-padding ${props.blSclass || ''}`}>
      <div className="container">
        <div className="row">

          <div className={`col col-lg-8 col-12 ${props.blRight || ''}`}>
            <div className="blog-content">

              {/* Featured Image */}
              <div className="entry-media">
                {post.image && (
                  <img 
                    src={post.image}
                    alt={post.title}
                    style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                )}
              </div>

              {/* Meta */}
              <div className="entry-meta">
                <ul>
                  <li>
                    <i className="fi flaticon-user"></i>
                    <span>{post.author || 'Ghines Foundation'}</span>
                  </li>
                  <li>
                    <i className="fi flaticon-comments"></i>
                    <Link onClick={ClickHandler} href="#comments">
                      0 Comments so far
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '20px' }}>
                {post.title}
              </h1>

              {/* Description */}
              {post.description && (
                <div style={{ 
                  fontSize: '18px', 
                  fontStyle: 'italic', 
                  borderLeft: '4px solid #4a9fda', 
                  paddingLeft: '20px', 
                  marginBottom: '30px',
                  color: '#555' 
                }}>
                  {post.description}
                </div>
              )}

              {/* Content */}
              <div className="entry-details">
                {post.content && post.content.length > 0 ? (
                  <PortableText value={post.content} />
                ) : (
                  <p style={{ padding: '40px', textAlign: 'center', background: '#f5f5f5', borderRadius: '8px' }}>
                    No content available. Add content in Sanity Studio.
                  </p>
                )}
              </div>

              {/* Comments */}
              <div id="comments" className="comments-area">
                <h3 className="comments-title">0 Comments so far</h3>

                <div className="comment-respond">
                  <h3 className="comment-reply-title">Leave a Comment</h3>

                  <form className="comment-form" onSubmit={handleSubmit}>
                    <input
                      name="name"
                      placeholder="Your name*"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {validator.message('name', formData.name, 'required|alpha')}

                    <input
                      name="email"
                      placeholder="Your email*"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {validator.message('email', formData.email, 'required|email')}

                    <textarea
                      name="comment"
                      placeholder="Your comment*"
                      value={formData.comment}
                      onChange={handleChange}
                    />
                    {validator.message('comment', formData.comment, 'required')}

                    <button className="theme-btn" type="submit">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar */}
          <div className="col col-lg-4 col-12">
            <aside className="blog-sidebar">
              <div className="widget about-widget">
                <div className="author-img">
                  <Image src={logo2} alt="Ghines Foundation" width={110} height={110} />
                </div>
                <h4>AUTHOR : Ghines Foundation</h4>
              </div>
            </aside>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogSingle;