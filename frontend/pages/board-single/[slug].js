"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import PageTitle from "../../components/PageTitle/PageTitle";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Team from "../../api/team";

/**
 * Smart Text Splitter
 * Detects natural transition points (Years, 'Through', 'Since') 
 * to break a massive block into readable editorial sections.
 */
const smartSplitBio = (text) => {
  if (!text) return [<p key="empty">Biography coming soon.</p>];

  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
  const paragraphs = [];
  let currentParagraph = [];

  sentences.forEach((sentence, index) => {
    currentParagraph.push(sentence);

    const hasYearTransition = /(In\s\d{4}|Since\s\d{4}|By\s\d{4}|Throughout)/.test(sentence);
    const isMidLength = currentParagraph.length >= 4;
    const isLastSentence = index === sentences.length - 1;

    if ((hasYearTransition && isMidLength) || (currentParagraph.length >= 6) || isLastSentence) {
      paragraphs.push(currentParagraph.join(" "));
      currentParagraph = [];
    }
  });

  return paragraphs.map((para, i) => (
    <p 
      key={i} 
      style={{ 
        lineHeight: "1.9", 
        fontSize: "1.08rem", 
        color: "#333",
        textAlign: "justify",
        textJustify: "inter-word",
        marginBottom: "25px",
        fontWeight: "400"
      }}
    >
      {para.trim()}
    </p>
  ));
};

export default function BoardSinglePage({ member }) {
  if (!member) {
    return (
      <Fragment>
        <PageTitle pageTitle="Board Member" pagesub="About" />
        <div className="container text-center py-5">
          <h2>Profile not found</h2>
          <Link href="/board" className="btn btn-primary mt-3">Back to Board</Link>
        </div>
        <Scrollbar />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <PageTitle pageTitle={member.title} pagesub="Leadership" />

      <section className="section-padding" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="row align-items-start g-5">
            {/* Sidebar: Profile Photo */}
            <div className="col-lg-4 col-md-5">
              <div className="sticky-top" style={{ top: "120px" }}>
                <div style={{ 
                  borderRadius: "16px", 
                  overflow: "hidden", 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  border: "1px solid #eee"
                }}>
                  <Image
                    src={member.timg}
                    alt={member.title}
                    width={500}
                    height={620}
                    layout="responsive"
                    className="img-fluid"
                    priority
                    style={{ objectFit: "cover", objectPosition: "top" }}
                  />
                </div>
                
                <div className="mt-4 ps-2">
                  <h3 style={{ fontWeight: "800", color: "#1a1a1a", fontSize: "1.8rem" }}>
                    {member.title}
                  </h3>
                  <div style={{ width: "40px", height: "3px", background: "#5dade2", margin: "12px 0" }}></div>
                  <p style={{ 
                    color: "#5dade2", 
                    fontWeight: "700", 
                    textTransform: "uppercase", 
                    letterSpacing: "1.5px",
                    fontSize: "0.85rem"
                  }}>
                    {member.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content: Bio sections */}
            <div className="col-lg-8 col-md-7">
              <div className="bio-container px-lg-4">
                <div style={{ marginBottom: "30px" }}>
                  <span style={{ 
                    fontSize: "0.85rem", 
                    fontWeight: "800", 
                    color: "#5dade2", 
                    textTransform: "uppercase", 
                    letterSpacing: "2px" 
                  }}>
                    Profile Overview
                  </span>
                  {/* 🎯 "Biography" H2 Removed for a cleaner start */}
                </div>
                
                <div className="editorial-content">
                  {/* 🎯 Smart Splitter generates the paragraphs */}
                  {smartSplitBio(member.bio)}
                </div>

                {/* 🎯 Footer Action: Simplified Link instead of the large grey box */}
                <div style={{ marginTop: "50px", paddingTop: "30px", borderTop: "1px solid #eee" }}>
                  <Link
                    href="/board"
                    style={{ 
                      color: "#5dade2", 
                      fontWeight: "700", 
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px"
                    }}
                  >
                    <i className="fa fa-long-arrow-left"></i> Back to Leadership Team
                  </Link>
                </div>
              </div>
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
  const paths = Team.filter((m) => m.slug).map((m) => ({ params: { slug: m.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const member = Team.find((m) => m.slug === params.slug);
  return member ? { props: { member } } : { notFound: true };
}