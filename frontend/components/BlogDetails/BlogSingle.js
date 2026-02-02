import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import blogs from '../../api/blogs';
import logo2 from '/public/images/logo-2.svg';

const BlogSingle = ({ post, ...props }) => {
  const ClickHandler = () => window.scrollTo(10, 0);
  const router = useRouter();
  const BlogDetails = blogs.find((item) => item.slug === router.query.slug);

  // Comment form state + validator
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    comment: '',
    insuranceb: false,
  });
  const [validator] = useState(new SimpleReactValidator());

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    validator.showMessageFor(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        website: '',
        comment: '',
        insuranceb: false,
      });
      validator.hideMessages();
    } else {
      validator.showMessages();
    }
  };

  // ✅ Convert rich-text JSON array from Strapi to readable paragraphs
  const renderContent = () => {
    const content = post?.Content || post?.content || post?.Description || post?.description;

    if (Array.isArray(content)) {
      return content
        .filter(
          (block) =>
            block.type === 'paragraph' &&
            block.children &&
            block.children.some((child) => child.text && child.text.trim() !== '')
        )
        .map((block, i) => {
          const text = block.children.map((child) => child.text).join(' ');
          return <p key={i}>{text}</p>;
        });
    }

    if (typeof content === 'string') {
      try {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed
            .filter(
              (block) =>
                block.type === 'paragraph' &&
                block.children &&
                block.children.some((child) => child.text && child.text.trim() !== '')
            )
            .map((block, i) => {
              const text = block.children.map((child) => child.text).join(' ');
              return <p key={i}>{text}</p>;
            });
        }
      } catch {
        // not JSON — treat as plain text or HTML
      }

      if (content.includes('<p') || content.includes('<div')) {
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
      }

      return <p>{content}</p>;
    }

    return <p>{BlogDetails?.description || 'No content available.'}</p>;
  };

  const tagsFromPost = (() => {
    const t = post?.Tags || post?.tags;
    if (!t) return ['General'];
    if (Array.isArray(t)) return t.map((x) => (x.name || x.Name || x.title || x).toString());
    return [t.name || t.Name || t.title || t];
  })();

  const featuredImage = post?.Image?.url || BlogDetails?.blogSingleImg || null;

  return (
    <section className={`blog-single-section section-padding ${props.blSclass || ''}`}>
      <div className="container">
        <div className="row">
          {/* Main content */}
          <div className={`col col-lg-8 col-12 ${props.blRight || ''}`}>
            <div className="blog-content">
              <div className="post format-standard-image">
                {featuredImage && (
                  <div className="entry-media">
                    <Image src={featuredImage} alt={post?.Title || 'blog image'} width={1200} height={600} />
                  </div>
                )}

                <div className="entry-meta">
                  <ul>
                    <li>
                      <i className="fi flaticon-calendar"></i>
                      <span>{post?.PublishedDate || post?.publishedAt || BlogDetails?.date || '—'}</span>
                    </li>
                    <li>
                      <i className="fi flaticon-user"></i>
                      <span>{post?.Author || 'Ghines Foundation'}</span>
                    </li>
                    <li>
                      <i className="fi flaticon-comments"></i>
                      <Link onClick={ClickHandler} href="#comments">
                        0 Comments so far
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="entry-details">{renderContent()}</div>
              </div>

              {/* Tags */}
              <div className="tag-share-wrap">
                <div className="row">
                  <div className="col-12">
                    <div className="tag-share clearfix">
                      <div className="tag">
                        <span>Tags: </span>
                        <ul>
                          {tagsFromPost.map((t, i) => (
                            <li key={i}>
                              <Link href={`/tags/${encodeURIComponent(t.toLowerCase())}`}>{t}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment section */}
              <div id="comments" className="comments-area">
                <h3 className="comments-title">0 Comments so far</h3>

                <div className="comment-respond">
                  <h3 className="comment-reply-title">Leave a Comment</h3>
                  <form id="commentForm" className="comment-form" onSubmit={handleSubmit}>
                    <div className="form-inputs">
                      <input
                        id="name"
                        name="name"
                        placeholder="Enter your name*"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      {validator.message('name', formData.name, 'required|alpha')}
                      <input
                        id="email"
                        name="email"
                        placeholder="Enter your email*"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {validator.message('email', formData.email, 'required|email')}
                    </div>

                    <div className="form-textarea">
                      <textarea
                        id="comment"
                        name="comment"
                        placeholder="Enter your Message*"
                        value={formData.comment}
                        onChange={handleChange}
                        required
                      />
                      {validator.message('comment', formData.comment, 'required')}
                    </div>

                    <div className="form-submit">
                      <input className="theme-btn" id="submit" value="Send Message" type="submit" />
                    </div>
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
                <div className="social">
                  <ul>
                    <li>
                      <Link href={post?.facebook || '#'}>
                        <i className="flaticon-facebook-app-symbol"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href={post?.linkedin || '#'}>
                        <i className="flaticon-linkedin"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSingle;
