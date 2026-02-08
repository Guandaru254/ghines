import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import PageTitle from "../../components/PageTitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Team from "../../api/team";

export default function BoardSinglePage({ member }) {
  if (!member) {
    return (
      <Fragment>
        <PageTitle pageTitle="Board Member" pagesub="About" />
        <div className="container text-center py-5">
          <h2>Profile not found</h2>
          <Link href="/board" className="btn btn-primary mt-3">
            Back to Board
          </Link>
        </div>
        <Scrollbar />
      </Fragment>
    );
  }

  const formattedBio = member.bio
    ? member.bio.split("\n").map((line, i) => (
        <p key={i} style={{ lineHeight: 1.8 }}>
          {line}
        </p>
      ))
    : <p>Biography coming soon.</p>;

  return (
    <Fragment>
      <PageTitle pageTitle={member.title} pagesub="Leadership" />

      <section className="section-padding">
        <div className="container">
          <div className="row align-items-start g-5">
            {/* Profile Image */}
            <div className="col-lg-4 col-md-5 text-center">
              <Image
                src={member.timg}
                alt={member.title}
                width={400}
                height={500}
                className="rounded"
                priority
                style={{ objectFit: "cover" }}
              />
              <h3 className="mt-4">{member.title}</h3>
              <p className="text-muted">{member.subtitle}</p>
            </div>

            {/* Bio */}
            <div className="col-lg-8 col-md-7">
              {formattedBio}

              <Link
                href="/board"
                className="btn btn-outline-primary mt-4"
              >
                ← Back to Board
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Scrollbar />
    </Fragment>
  );
}

/* ---------------- SSG ---------------- */

export async function getStaticPaths() {
  const paths = Team
    .filter((m) => m.slug)
    .map((m) => ({
      params: { slug: m.slug },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const member = Team.find((m) => m.slug === params.slug);

  if (!member) {
    return { notFound: true };
  }

  return {
    props: { member },
  };
}
