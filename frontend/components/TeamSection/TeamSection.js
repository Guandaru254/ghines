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
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
};

const TeamSection = ({ hclass }) => {
    const Team = Array.isArray(RawTeam) ? RawTeam : RawTeam?.default || [];

    if (Team.length === 0) return null;

    const boardMembers = Team.slice(0, 4); 
    const partners = Team.slice(4);

    const renderCard = (member, index) => {
        const isPartner = index >= 4; 
        const hasLink = member.slug && member.slug.trim() !== "";
        
        return (
            <motion.div
                className="col-lg-4 col-md-6 col-sm-12 mb-5 d-flex" 
                key={member.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
            >
                <div className="vol-card shadow-sm w-100" style={{ 
                    border: "none", 
                    borderRadius: "12px", 
                    overflow: "hidden", 
                    display: "flex", 
                    flexDirection: "column",
                    background: "#fff" 
                }}>
                    <div className="image-container" style={{ 
                        height: "400px", 
                        width: "100%",
                        overflow: 'hidden', 
                        backgroundColor: '#f4f4f4',
                        position: 'relative' 
                    }}>
                        <Image
                            src={member.timg}
                            alt={member.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={index < 3}
                            style={{
                                objectFit: isPartner ? "contain" : "cover",
                                objectPosition: "top center", 
                                padding: isPartner ? "50px" : "0", 
                            }}
                        />
                    </div>
                    
                    <div className="text-content" style={{ 
                        padding: "35px 30px", 
                        textAlign: "center",
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between" // 🎯 Ensures footer stays at the bottom
                    }}>
                        <div style={{ width: "100%" }}>
                            {/* 🎯 TITLES: Fixed height ensures roles start at the same line */}
                            <div style={{ minHeight: "60px", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                <h3 style={{ margin: 0, fontSize: "1.35rem", lineHeight: "1.2", textAlign: "center" }}>
                                    {hasLink ? (
                                        <Link href={`/board-single/${member.slug}`} onClick={ClickHandler} style={{ color: "#222", textDecoration: "none", fontWeight: "700" }}>
                                            {member.title}
                                        </Link>
                                    ) : (
                                        <span style={{ fontWeight: "700", color: "#222" }}>{member.title}</span>
                                    )}
                                </h3>
                            </div>
                            
                            {/* 🎯 ROLES: Fixed height ensures paragraphs start at the same line */}
                            <div style={{ minHeight: "40px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                                <p style={{ 
                                    color: "#5dade2", 
                                    fontSize: "0.85rem", 
                                    fontWeight: "700",
                                    textTransform: "uppercase", 
                                    letterSpacing: "1.2px",
                                    margin: 0,
                                    textAlign: "center"
                                }}>
                                    {member.subtitle || "Strategic Partner"}
                                </p>
                            </div>
                            
                            {/* 🎯 PARAGRAPHS: Justified alignment to fix "rugged" edges */}
                            <div style={{ flexGrow: 1, width: "100%" }}>
                                {member.snippet && (
                                    <p style={{ 
                                        fontSize: "0.95rem", 
                                        color: "#555", 
                                        lineHeight: "1.7", 
                                        textAlign: "justify", // 🎯 FIX: Removes rugged right edges
                                        textJustify: "inter-word",
                                        margin: "0 auto",
                                        maxWidth: "100%",
                                        hyphens: "auto"
                                    }}>
                                        {member.snippet}
                                    </p>
                                )}
                            </div>
                        </div>

                        {hasLink && (
                            <div style={{ marginTop: "25px", borderTop: "1px solid #eee", paddingTop: "20px", width: "100%" }}>
                                <Link 
                                    href={`/board-single/${member.slug}`} 
                                    onClick={ClickHandler} 
                                    style={{ 
                                        color: "#5dade2", 
                                        textDecoration: "none", 
                                        fontWeight: "700",
                                        fontSize: "0.9rem",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px"
                                    }}
                                >
                                    View Full Profile <i className="fa fa-long-arrow-right"></i>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section className={hclass || "section-padding"} style={{ backgroundColor: "#fafafa" }}>
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-12 text-center mb-5">
                        <h2 style={{ fontWeight: "900", fontSize: "2.8rem", color: "#1a1a1a", letterSpacing: "-1px" }}>Our Board</h2>
                        <div style={{ width: "60px", height: "4px", background: "#5dade2", margin: "15px auto" }}></div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {boardMembers.map((m, i) => renderCard(m, i))}
                    </div>
                </div>

                <div className="row justify-content-center mt-5">
                    <div className="col-12 text-center mb-5">
                        <h2 style={{ fontWeight: "900", fontSize: "2.8rem", color: "#1a1a1a", letterSpacing: "-1px" }}>Our Partners</h2>
                        <div style={{ width: "60px", height: "4px", background: "#5dade2", margin: "15px auto" }}></div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {partners.map((m, i) => renderCard(m, i + 4))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;