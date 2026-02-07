import React, { Fragment } from "react";
import BlogList from "../../components/BlogList/BlogList";
import PageTitle from "../../components/PageTitle";
import Scrollbar from "../../components/Scrollbar";
import extractImageUrl from "../../utils/extractImageUrl";

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export default function BlogPageFullwidth({
  posts,
  pagination,
  fetchError,
}) {
  if (fetchError) {
    return (
      <Fragment>
        <PageTitle pageTitle="News & Stories" pagesub="Home" />
        <div className="text-center py-20 min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-700">
            Failed to load articles
          </h2>
          <pre className="mt-4 max-w-3xl mx-auto text-left whitespace-pre-wrap">
            {fetchError}
          </pre>
        </div>
        <Scrollbar />
      </Fragment>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <Fragment>
        <PageTitle pageTitle="News & Stories" pagesub="Home" />
        <div className="text-center py-20 min-h-[400px]">
          <h2 className="text-2xl font-bold text-gray-700">
            No articles found
          </h2>
          <p className="mt-2 text-gray-500">
            Ensure Strapi content is published and the API URL is correct.
          </p>
        </div>
        <Scrollbar />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <PageTitle pageTitle="News & Stories" pagesub="Home" />
      <BlogList posts={posts} pagination={pagination} />
      <Scrollbar />
    </Fragment>
  );
}

/**
 * Fetch posts from Strapi (SSG + ISR)
 */
export async function getStaticProps() {
  if (!STRAPI_API_URL || !/^https?:\/\//.test(STRAPI_API_URL)) {
    return {
      props: {
        posts: [],
        pagination: {},
        fetchError: "Invalid or missing STRAPI API URL",
      },
      revalidate: 60,
    };
  }

  try {
    const base = STRAPI_API_URL.replace(/\/$/, "");
    const res = await fetch(
      `${base}/api/news-stories?populate=*&sort[0]=PublishedDate:desc`
    );

    if (!res.ok) {
      throw new Error(`Strapi error ${res.status}`);
    }

    const json = await res.json();
    const rawPosts = json.data ?? [];

    const posts = rawPosts.map((item) => {
      const attrs = item.attributes ?? {};
      return {
        id: item.id,
        Title: attrs.Title ?? "Untitled",
        Slug: attrs.Slug ?? null,
        Author:
          attrs.Author?.data?.attributes?.name ??
          "The Ghines Foundation",
        PublishedDate: attrs.PublishedDate ?? null,
        Description: attrs.Description ?? "",
        Content: attrs.Content ?? "",
        PhotoCredit: attrs.PhotoCredit ?? "",
        Image: {
          url: extractImageUrl(attrs),
        },
      };
    });

    return {
      props: {
        posts,
        pagination: json.meta?.pagination ?? {},
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: {
        posts: [],
        pagination: {},
        fetchError: err.message,
      },
      revalidate: 60,
    };
  }
}
