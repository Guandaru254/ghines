// Replace getStaticPaths + getStaticProps with this single function
export async function getServerSideProps({ params }) {
  const query = `*[_type == "newsStory" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    image,
    content,
    author
  }`;

  const post = await client.fetch(query, { slug: params.slug });
  if (!post) return { notFound: true };

  let seoImageUrl = 'https://ghinesfoundation.org/og-image.jpg';

  if (post?.image?.asset?._ref) {
    try {
      const url = builder.image(post.image).width(1200).height(630).fit('crop').url();
      if (url) seoImageUrl = url;
    } catch (e) {
      console.error('[SEO] Builder failed:', e.message);
    }
  }

  return {
    props: { post, seoImageUrl },
  };
}