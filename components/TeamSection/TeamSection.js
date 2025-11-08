"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
// 🎯 FIX: Ensure 'motion' is destructured and imported correctly.
import { motion } from "framer-motion";
import RawTeam from "../../api/team";

const ClickHandler = () => {
    if (typeof window !== "undefined") window.scrollTo(0, 0);
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
};

const TeamSection = ({ hclass }) => {
    const Team = Array.isArray(RawTeam)
        ? RawTeam
        : Array.isArray(RawTeam?.default)
        ? RawTeam.default
        : [];

    if (!Array.isArray(Team) || Team.length === 0) {
        return (
            <section className={hclass || "volunteer-section section-padding"}>
                <div className="container text-center py-5">
                    <h3 className="text-danger mb-2">No Team Members Found</h3>
                </div>
            </section>
        );
    }

    // 🚩 ADJUSTMENT: Board now includes members IDs 1, 2, 3 (The first 3 members)
    const boardOfDirectors = Team.slice(0, 3);
    
    // 🚩 ADJUSTMENT: Operational Team now includes members IDs 4 (Lucy) through 8 (all remaining 5 members)
    const operationalTeam = Team.slice(3); // Starts at index 3 (ID 4 is at index 3)

    // Split the Board of Directors for the 3 + 2 layout
    const boardRow1 = boardOfDirectors; // Only 3 members remain for the Board
    // const boardRow2 is now redundant and removed from logic

    // Function to render a group of team members
    const renderTeamGroup = (members, startIndex) => {
        return members.map((member, i) => {
            
            const actualIndex = startIndex + i;
            
            // 1. Name Link: Active if member.slug is present (all 8 members)
            const hasLink = member.slug && member.slug.trim() !== "";
            
            // 2. Snippet/View Profile Link: Active ONLY if member.snippet is non-empty (Cards 1-3 only).
            // NOTE: The Snippet logic only applies to the original cards 1-3 since members 4+ have empty snippets in the data.
            const showSnippetAndLink = member.snippet && member.snippet.trim() !== "";
            const snippet = showSnippetAndLink ? member.snippet : "";


            return (
                <motion.div
                    className="col-lg-4 col-md-6 col-12"
                    key={member.id}
                    custom={actualIndex}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <div className="vol-card team-board-card">
                        <div className="image">
                            <Image
                                src={member.timg}
                                alt={member.title}
                                width={400}
                                height={500}
                                priority
                                style={{
                                    objectFit: "cover",
                                    objectPosition: "center top",
                                }}
                            />
                        </div>
                        <div className="text">
                            <h3 className="member-name">
                                {/* All names are linked to ensure consistent styling */}
                                {hasLink ? ( 
                                    <Link
                                        href={`/board-single/${member.slug}`}
                                        onClick={ClickHandler}
                                    >
                                        {member.title}
                                    </Link>
                                ) : (
                                    <span>{member.title}</span>
                                )}
                            </h3>
                            <span className="member-role">{member.subtitle}</span>
                            
                            {/* Snippet display controlled by member.snippet (Cards 1-3 only) */}
                            {snippet && <div className="quote-text">{snippet}</div>}
                            
                            {/* "View Full Profile" link controlled by member.snippet (Cards 1-3 only) */}
                            {showSnippetAndLink && (
                                <Link
                                    href={`/board-single/${member.slug}`}
                                    onClick={ClickHandler}
                                    className="read-more-btn"
                                >
                                    View Full Profile <i className="fa fa-long-arrow-right"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>
            );
        });
    };

    return (
        <section
            className={hclass || "volunteer-section section-padding"}
            style={{ overflow: "hidden" }}
        >
            <div className="container">
                {/* SECTION 1 TITLE: OUR BOARD OF DIRECTORS (Now only 3 members) */}
                <motion.div
                    className="row mb-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <div className="col-lg-12">
                        <div className="section-title section-title-mobile-center">
                            <span>Our Board</span>
                        </div>
                    </div>
                </motion.div>

                {/* Board Row 1: 3 Cards (IDs 1, 2, 3) - Centered */}
                <div className="row team-board mb-5 pb-4 justify-content-center"> 
                    {renderTeamGroup(boardRow1, 0)}
                </div>

                {/* * Board Row 2 (the original 2 cards for Lucy and William) has been removed 
                  * by deleting the original <div> block, as they are now in the section below. 
                  */}

                {/* SECTION 2 TITLE: OUR TEAM (Now 5 members: IDs 4, 5, 6, 7, 8) */}
                <motion.div
                    className="row mb-5 mt-5 pt-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <div className="col-lg-12">
                        <div className="section-title section-title-mobile-center">
                            <span>Our Team</span>
                        </div>
                    </div>
                </motion.div>

                {/* Team Row: 5 Cards, Centered. This will automatically split into a 3-card row and a 2-card centered row based on col-lg-4. */}
                <div className="row team-board justify-content-center"> 
                    {renderTeamGroup(operationalTeam, boardOfDirectors.length)} 
                </div>

            </div>
        </section>
    );
};

export default TeamSection;