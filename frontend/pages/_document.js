import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const { pageProps } = this.props.__NEXT_DATA__.props;
    const post = pageProps?.post;
    const seoImageUrl = pageProps?.seoImageUrl;

    const title = post?.title ? `${post.title} | Ghines Foundation` : 'Ghines Foundation | Every Action Counts';
    const description = post?.description || 'Ghines Foundation works to create impact across South Sudan and Africa. Every Action, Big or Small, Counts.';
    const image = seoImageUrl || 'https://ghinesfoundation.org/og-image.jpg';
    const url = post?.slug ? `https://ghinesfoundation.org/blog-single/${post.slug}` : 'https://ghinesfoundation.org/';

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/images/favicon3.png" type="image/png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Hand:wght@400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet" />

          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Ghines Foundation" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={image} />
          <meta property="og:image:secure_url" content={image} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:alt" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={image} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;