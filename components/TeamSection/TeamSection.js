"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
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

    // --- CRITICAL CHANGE 1: Define the new member groups ---
    // The Board now includes members with IDs 1, 2, 3, 4, 5 (Total 5 members)
    const boardOfDirectors = Team.slice(0, 5);
    // The Operational Team includes members with IDs 6, 7, 8 (Total 3 members)
    const operationalTeam = Team.slice(5);

    // Split the Board of Directors for the 3 + 2 layout
    const boardRow1 = boardOfDirectors.slice(0, 3);
    const boardRow2 = boardOfDirectors.slice(3, 5); // Lucy and William

    // Function to render a group of team members
    const renderTeamGroup = (members, startIndex) => {
        return members.map((member, i) => {
            // Initialize snippet as empty.
            let snippet = "";
            
            // Only set the snippet for the original three board members by checking their slug.
            if (member.slug === "george-n-ghines") {
                snippet = "Providing strategic leadership and direction for the organization's mission and growth..."; // Simplified snippet
            } else if (member.slug === "george-a-miriyannis") {
                snippet = "Ensuring efficient governance, compliance, and accurate record-keeping for all board proceedings..."; // Simplified snippet
            } else if (member.slug === "jawahir-yusuf-haji-adam") {
                snippet = "Overseeing financial health, budgeting, and accountability to safeguard organizational assets..."; // Simplified snippet
            }
            // Add snippets for Lucy and William
            else if (member.slug === "asma-lucy-ilado") {
                snippet = "Responsible for the daily operations and implementation of the board's strategic vision...";
            }
            else if (member.slug === "william-amoko") {
                snippet = "Driving key initiatives and managing high-level organizational projects and partnerships...";
            }
            // For the rest of the team (IDs 6, 7, 8), 'snippet' remains the default empty string.

            // Use the index offset by the start index for unique 'key' and 'custom' values
            const actualIndex = startIndex + i;

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
                            <h3>
                                <Link
                                    href={`/board-single/${member.slug}`}
                                    onClick={ClickHandler}
                                >
                                    {member.title}
                                </Link>
                            </h3>
                            <span>{member.subtitle}</span>
                            {/* Display snippet if it exists, otherwise it's empty */}
                            <div className="quote-text">{snippet}</div>
                            <Link
                                href={`/board-single/${member.slug}`}
                                onClick={ClickHandler}
                                className="read-more-btn"
                            >
                                View Full Profile <i className="fa fa-long-arrow-right"></i>
                            </Link>
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
                {/* --- SECTION 1 TITLE: OUR BOARD OF DIRECTORS --- */}
                <motion.div
                    className="row mb-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <div className="col-lg-12">
                        <div className="section-title section-title-mobile-center">
                            <span>Our Board of Directors</span>
                        </div>
                    </div>
                </motion.div>

                {/* --- Board Row 1: 3 Cards --- */}
                <div className="row team-board mb-4">
                    {renderTeamGroup(boardRow1, 0)}
                </div>

                {/* --- CRITICAL CHANGE 2: Board Row 2: 2 Cards, Centered --- */}
                {/* Use Bootstrap utility `justify-content-center` on the row */}
                <div className="row team-board mb-5 pb-4 justify-content-center"> 
                    {renderTeamGroup(boardRow2, boardRow1.length)} 
                </div>

                {/* --- SECTION 2 TITLE: OUR TEAM --- */}
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

                {/* --- Team Row: 3 Cards, Centered --- */}
                {/* Use Bootstrap utility `justify-content-center` on the row */}
                <div className="row team-board justify-content-center"> 
                    {renderTeamGroup(operationalTeam, boardOfDirectors.length)} 
                </div>

            </div>
        </section>
    );
};

export default TeamSection;