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
          <h3 className="text-danger mb-2">No Board Members Found</h3>
        </div>
      </section>
    );
  }

  return (
    <section
      className={hclass || "volunteer-section section-padding"}
      style={{ overflow: "hidden" }}
    >
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="row mb-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="col-lg-12">
            <div className="section-title text-left">
              <span>Our Board of Directors</span>
            </div>
          </div>
        </motion.div>

        {/* Board Cards */}
        <div className="row team-board">
          {Team.map((member, i) => {
            let snippet = "";
            if (member.slug === "george-n-ghines") {
              snippet =
                "George N. Ghines, 58, is a South Sudan–born entrepreneur with more than three decades of leadership experience across Africa, the Middle East, and the Balkans. He began his career with multinational corporations, holding senior managerial positions at Heineken, Coca-Cola International, Sony Ericsson, and Reckitt Benckiser.";
            } else if (member.slug === "george-a-miriyannis") {
              snippet =
                "George A. Miriyannis is a career diplomat with a long record of service in international affairs, media, and cultural relations. He has served as Ambassador-at-Large for the European Organisation of Public Law, Officer of the Order of St. Gabriel, and Minister Plenipotentiary of Bolivia during the country’s entry into MERCOSUR.";
            } else if (member.slug === "jawahir-yusuf-haji-adam") {
              snippet =
                "Jawahir Yusuf Haji Adam is a Somali diplomat and humanitarian with extensive experience in refugee affairs, international development, and human rights. She holds a Master’s in Forced Migration from the University of Oxford, a BA in Public Relations from George Mason University, and a Diploma in Events Management from George Washington University.";
            }

            return (
              <motion.div
                className="col-lg-4 col-md-6 col-12"
                key={member.id}
                custom={i}
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
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
