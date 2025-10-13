// Create this as: pages/test-images.js
// Access at: http://localhost:3000/test-images

import React, { useEffect, useState } from 'react';

const TestImagesPage = ({ posts }) => {
    const [imageStatuses, setImageStatuses] = useState({});

    useEffect(() => {
        // Test each image URL
        posts.forEach(post => {
            if (post.Image?.url) {
                const img = new Image();
                const url = post.Image.url;
                
                img.onload = () => {
                    console.log(`✅ Image loaded successfully: ${url}`);
                    setImageStatuses(prev => ({
                        ...prev,
                        [post.id]: { status: 'success', url, dimensions: `${img.width}x${img.height}` }
                    }));
                };
                
                img.onerror = (e) => {
                    console.error(`❌ Image failed to load: ${url}`);
                    console.error('Error:', e);
                    setImageStatuses(prev => ({
                        ...prev,
                        [post.id]: { status: 'error', url, error: 'Failed to load' }
                    }));
                };
                
                img.src = url;
            }
        });
    }, [posts]);

    return (
        <div style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#1e1e1e', color: '#d4d4d4', minHeight: '100vh' }}>
            <h1 style={{ color: '#4ec9b0', marginBottom: '30px' }}>🔬 Image Loading Diagnostic Page</h1>
            
            <div style={{ backgroundColor: '#252526', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <h2 style={{ color: '#dcdcaa', marginTop: 0 }}>📊 Summary</h2>
                <p>Total Posts: <strong style={{ color: '#4fc1ff' }}>{posts.length}</strong></p>
                <p>Posts with Images: <strong style={{ color: '#4fc1ff' }}>{posts.filter(p => p.Image?.url).length}</strong></p>
                <p>Images Tested: <strong style={{ color: '#4fc1ff' }}>{Object.keys(imageStatuses).length}</strong></p>
            </div>

            {posts.map(post => {
                const imageUrl = post.Image?.url;
                const status = imageStatuses[post.id];

                return (
                    <div key={post.id} style={{ 
                        backgroundColor: '#252526', 
                        padding: '20px', 
                        marginBottom: '20px', 
                        borderRadius: '8px',
                        borderLeft: `4px solid ${status?.status === 'success' ? '#4ec9b0' : status?.status === 'error' ? '#f48771' : '#858585'}`
                    }}>
                        <h3 style={{ color: '#569cd6', marginTop: 0 }}>
                            Post #{post.id}: {post.Title}
                        </h3>

                        <div style={{ marginBottom: '15px' }}>
                            <strong style={{ color: '#9cdcfe' }}>Published:</strong>{' '}
                            <span style={{ color: '#ce9178' }}>{post.PublishedDate}</span>
                        </div>

                        {imageUrl ? (
                            <>
                                <div style={{ marginBottom: '15px' }}>
                                    <strong style={{ color: '#9cdcfe' }}>Image URL:</strong>{' '}
                                    <a href={imageUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#4fc1ff', wordBreak: 'break-all' }}>
                                        {imageUrl}
                                    </a>
                                </div>

                                {status && (
                                    <div style={{ 
                                        padding: '10px', 
                                        backgroundColor: status.status === 'success' ? '#1e3a1e' : '#3a1e1e',
                                        borderRadius: '4px',
                                        marginBottom: '15px'
                                    }}>
                                        <strong style={{ color: status.status === 'success' ? '#4ec9b0' : '#f48771' }}>
                                            {status.status === 'success' ? '✅ SUCCESS' : '❌ FAILED'}
                                        </strong>
                                        {status.dimensions && (
                                            <span style={{ marginLeft: '10px', color: '#858585' }}>
                                                Dimensions: {status.dimensions}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div style={{ 
                                    border: '2px dashed #3e3e42', 
                                    padding: '10px',
                                    borderRadius: '4px',
                                    backgroundColor: '#1e1e1e',
                                    maxWidth: '600px'
                                }}>
                                    <p style={{ margin: '0 0 10px 0', color: '#858585', fontSize: '12px' }}>
                                        Rendered Image:
                                    </p>
                                    <img 
                                        src={imageUrl}
                                        alt={post.Title}
                                        style={{ 
                                            maxWidth: '100%',
                                            height: 'auto',
                                            display: 'block',
                                            border: '1px solid #3e3e42'
                                        }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML += `
                                                <div style="padding: 40px; text-align: center; background: #3a1e1e; color: #f48771;">
                                                    <div style="font-size: 48px;">⚠️</div>
                                                    <div style="margin-top: 10px;">Failed to render image</div>
                                                </div>
                                            `;
                                        }}
                                    />
                                </div>

                                {/* Test with different attributes */}
                                <details style={{ marginTop: '15px', cursor: 'pointer' }}>
                                    <summary style={{ color: '#dcdcaa', padding: '5px 0' }}>
                                        🧪 Advanced Tests
                                    </summary>
                                    <div style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                        <p style={{ color: '#858585', fontSize: '12px' }}>
                                            Test 1: With crossOrigin="anonymous"
                                        </p>
                                        <img 
                                            src={imageUrl}
                                            crossOrigin="anonymous"
                                            style={{ maxWidth: '200px', border: '1px solid #3e3e42' }}
                                            onLoad={() => console.log('✅ Test 1 passed')}
                                            onError={() => console.log('❌ Test 1 failed')}
                                        />
                                        
                                        <p style={{ color: '#858585', fontSize: '12px', marginTop: '10px' }}>
                                            Test 2: Without crossOrigin
                                        </p>
                                        <img 
                                            src={imageUrl}
                                            style={{ maxWidth: '200px', border: '1px solid #3e3e42' }}
                                            onLoad={() => console.log('✅ Test 2 passed')}
                                            onError={() => console.log('❌ Test 2 failed')}
                                        />
                                    </div>
                                </details>
                            </>
                        ) : (
                            <div style={{ 
                                padding: '20px', 
                                backgroundColor: '#3a3a1e',
                                borderRadius: '4px',
                                color: '#dcdcaa'
                            }}>
                                ⚠️ No image URL available for this post
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default TestImagesPage;

// Fetch posts using the same logic as the blog page
export async function getStaticProps() {
    const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    
    try {
        const apiPath = `/api/news-stories?populate=Image`;
        const fetchBaseUrl = STRAPI_BASE_URL.startsWith('//') ? `https:${STRAPI_BASE_URL}` : STRAPI_BASE_URL;
        const cleanedBaseUrl = fetchBaseUrl.replace(/\/$/, '');
        const fetchUrl = `${cleanedBaseUrl}${apiPath}`;
        
        const res = await fetch(fetchUrl);
        const data = await res.json();
        const rawPosts = data.data || [];

        const formattedPosts = rawPosts.map(item => {
            const attributes = item.attributes;
            const imageUrl = attributes.Image?.data?.attributes?.url || null;

            return {
                id: item.id,
                Title: attributes.Title ?? null,
                PublishedDate: attributes.PublishedDate ?? null,
                Image: {
                    url: imageUrl ? (imageUrl.startsWith('http') ? imageUrl : `${cleanedBaseUrl}${imageUrl}`) : null
                }
            };
        });

        return {
            props: { posts: formattedPosts },
            revalidate: 60
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            props: { posts: [] },
            revalidate: 60
        };
    }
}