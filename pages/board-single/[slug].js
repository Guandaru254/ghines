"use client";

import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import Team from "../../api/team";

const BoardSingle = () => {
  const router = useRouter();
  const { slug } = router.query;

  // find member by slug
  const member =
    Array.isArray(Team) && slug
      ? Team.find((m) => m.slug === slug)
      : null;

  if (!member) {
    return (
      <section className="section-padding text-center">
        <div className="container py-5">
          <h3 className="text-danger mb-3">Profile not found</h3>
          <Link href="/#team" className="btn btn-primary rounded-pill">
            Back to Board
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding board-single">
      <div className="container">
        <div className="row align-items-start g-5">
          {/* Image and basic info */}
          <div className="col-lg-4 col-md-5 text-center">
            <div className="profile-card p-4 shadow-sm rounded-4 bg-white">
              <div className="profile-img mb-4">
                <Image
                  src={member.timg}
                  alt={member.title}
                  width={400}
                  height={500}
                  className="rounded-3"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </div>
              <h3 className="fw-bold">{member.title}</h3>
              <p className="text-muted">{member.subtitle}</p>

              <div className="social-links mt-3">
                {member.email && (
                  <p>
                    <a href={`mailto:${member.email}`} className="text-primary">
                      {member.email}
                    </a>
                  </p>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="me-3 text-primary"
                  >
                    <i className="fab fa-linkedin fa-lg"></i>
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    <i className="fab fa-twitter fa-lg"></i>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="col-lg-8 col-md-7">
            <div className="bio-card p-5 rounded-4 shadow-sm bg-light">
              <h2 className="mb-4 text-dark">About {member.title}</h2>
              <p className="lead" style={{ lineHeight: "1.8", color: "#333" }}>
                {member.bio}
              </p>
              <div className="mt-4">
                <Link
                  href="/#team"
                  className="btn btn-outline-primary rounded-pill"
                >
                  ← Back to Board
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .board-single {
          background-color: #f8f9fa;
        }
        .profile-card {
          transition: all 0.3s ease;
        }
        .profile-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        .bio-card {
          background: white;
        }
        @media (max-width: 768px) {
          .bio-card {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default BoardSingle;
