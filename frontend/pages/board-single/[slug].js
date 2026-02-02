import React from "react";
import Image from "next/image";
import Link from "next/link";
// Assuming the path to your team data module is correct
import RawTeam from "../../api/team";

// Safely access the Team array from the imported module
const Team = Array.isArray(RawTeam) 
    ? RawTeam
    : Array.isArray(RawTeam?.default)
    ? RawTeam.default
    : [];

const BoardSingle = ({ member }) => {
    // If getStaticProps returns notFound: true, the member prop will be null/undefined.
    // This handles the case where the component might be rendered without data (though 
    // Next.js usually handles the 404 page for fallback: false).
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

    // Pre-process bio to handle paragraphs/line breaks if needed
    // Note: The use of <br /> tags is a common pattern for displaying multi-line text 
    // from a data source within React components.
    const formattedBio = member.bio ? member.bio.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
            {index < member.bio.split('\n').length - 1 && <br />}
        </React.Fragment>
    )) : 'Biography coming soon.';


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
                                    priority
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
                                {/* Using formattedBio to respect line breaks from the source data */}
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
                    transition: all 0.3s ease;
                }
                .profile-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
                }
                .bio-card {
                    background: white;
                    min-height: 400px; /* Ensure visual balance with profile card */
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

// -------------------------------------------------------------------
// 🛠️ MANDATORY NEXT.JS DATA FETCHING EXPORTS (THE FIX)
// These exports MUST be present in a dynamic Next.js page that uses SSG 
// to resolve the "TypeError: getStaticPaths is not a function" error.
// -------------------------------------------------------------------

/**
 * 1. getStaticPaths: Generates the list of slugs for pre-rendering.
 * @returns {object} Next.js paths configuration.
 */
export async function getStaticPaths() {
    // Generate paths for all team members who have a slug defined
    const paths = Team.filter(member => member.slug).map((member) => ({
        params: { slug: member.slug },
    }));

    return {
        paths,
        fallback: false, // Ensures a 404 is returned for any path not defined here
    };
}

/**
 * 2. getStaticProps: Fetches the specific data for the page based on the slug.
 * @param {object} context - Contains the `params` object with the resolved slug.
 * @returns {object} Next.js props or notFound configuration.
 */
export async function getStaticProps({ params }) {
    // Find the team member by the slug provided in the URL params
    const member = Team.find((m) => m.slug === params.slug);

    // If no member is found for the slug, Next.js returns a 404 page
    if (!member) {
        return {
            notFound: true,
        };
    }

    // Pass the found member data to the component as props
    return {
        props: {
            member,
        },
    };
}

export default BoardSingle;