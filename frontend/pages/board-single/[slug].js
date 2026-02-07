import React from "react";
import Image from "next/image";
import Link from "next/link";
import RawTeam from "../../api/team";

/**
 * Normalize team data to a plain array regardless of export style
 */
const Team = Array.isArray(RawTeam)
  ? RawTeam
  : Array.isArray(RawTeam?.default)
  ? RawTeam.default
  : [];

export default function BoardSingle({ member }) {
  if (!member) {
    return (
      <section className="section-padding text-center">
        <div className="container py-5">
          <h3 className="text-danger mb-3">Profile not found</h3>
          <Link href="/board" className="btn btn-primary rounded-pill">
            Back to Board
          </Link>
        </div>
      </section>
    );
  }

  const formattedBio = member.bio
    ? member.bio.split("\n").map((line, i, arr) => (
        <React.Fragment key={i}>
          {line}
          {i < arr.length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </React.Fragment>
      ))
    : "Biography coming soon.";

  return (
    <section className="section-padding board-single">
      <div className="container">
        <div className="row align-items-start g-5">
          {/* Profile */}
          <div className="col-lg-4 col-md-5 text-center">
            <div className="profile-card p-4 shadow-sm rounded-4 bg-white">
              <div className="profile-img mb-4">
                <Image
                  src={member.timg}
                  alt={member.title}
                  width={400}
                  height={500}
                  priority
                  className="rounded-3"
                  style={{ objectFit: "cover", objectPosition: "center top" }}
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
                    <i className="fab fa-linkedin fa-lg" />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={`https://twitter.com/${member.twitter.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    <i className="fab fa-twitter fa-lg" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="col-lg-8 col-md-7">
            <div className="bio-card p-5 rounded-4 shadow-sm bg-white">
              <h2 className="mb-4">About {member.title}</h2>
              <p className="lead" style={{ lineHeight: 1.8 }}>
                {formattedBio}
              </p>
              <div className="mt-4">
                <Link
                  href="/board"
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
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .profile-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        .bio-card {
          min-height: 400px;
        }
        @media (max-width: 768px) {
          .bio-card {
            padding: 2rem;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Static paths for all board members
 */
export async function getStaticPaths() {
  const paths = Team.filter((m) => m.slug).map((m) => ({
    params: { slug: m.slug },
  }));

  return { paths, fallback: false };
}

/**
 * Static props per board member
 */
export async function getStaticProps({ params }) {
  const member = Team.find((m) => m.slug === params.slug);

  if (!member) {
    return { notFound: true };
  }

  return {
    props: { member },
  };
}
