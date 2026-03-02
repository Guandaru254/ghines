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

    const boardOfDirectors = Team.slice(0, 3);
    const operationalTeam = Team.slice(3);
    const boardRow1 = boardOfDirectors;

    const renderTeamGroup = (members, startIndex) => {
        return members.map((member, i) => {
            const actualIndex = startIndex + i;
            const hasLink = member.slug && member.slug.trim() !== "";
            const showSnippetAndLink = member.snippet && member.snippet.trim() !== "";
            const snippet = showSnippetAndLink ? member.snippet : "";

            // 🎯 THE LOGIC: If index is 0, 1, or 2 (The Board), we use "contain" to see the full image.
            const isTopThree = actualIndex < 3;

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
                                    // 🎯 THE FIX: "contain" ensures the full portrait is visible
                                    objectFit: isTopThree ? "contain" : "cover",
                                    objectPosition: "center top",
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </div>
                        <div className="text" style={{ backgroundColor: "#fff", textAlign: "center", padding: "15px 10px" }}>
                            <h3 className="member-name">
                                {hasLink ? ( 
                                    <Link href={`/board-single/${member.slug}`} onClick={ClickHandler}>
                                        {member.title}
                                    </Link>
                                ) : (
                                    <span>{member.title}</span>
                                )}
                            </h3>
                            <span className="member-role">{member.subtitle}</span>
                            {snippet && <div className="quote-text">{snippet}</div>}
                            {showSnippetAndLink && (
                                <Link href={`/board-single/${member.slug}`} onClick={ClickHandler} className="read-more-btn">
                                    View Full Profile <i className="fa fa-long-arrow-right"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.div>
            );
        });
    };
// ... keep everything at the top the same ...

    return (
        <section className={hclass || "volunteer-section section-padding"} style={{ overflow: "hidden" }}>
            <div className="container">
                {/* SECTION 1: OUR BOARD */}
                <div className="row team-board mb-5 pb-4 justify-content-center"> 
                    {renderTeamGroup(boardRow1, 0)}
                </div>

                {/* SECTION 2: OUR PARTNERS */}
                {/* 🎯 Added 'partners-row' here to separate it from the board logic */}
                <div className="row team-board justify-content-center partners-row"> 
                    {renderTeamGroup(operationalTeam, boardOfDirectors.length)} 
                </div>
            </div>
        </section>
    );
};

export default TeamSection;