import React from "react";
import Link from "next/link";
import Teams from "../../api/team";
import Image from "next/image";

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const TeamSection = (props) => {
    // A flexible data structure to dynamically render the cards.
    const boardMembers = [
        Teams[0],
        Teams[1],
        Teams[2],
        {...Teams[0], slug: 'placeholder-1', title: '', subtitle: 'Placeholder Role', timg: Teams[0].timg},
        {...Teams[1], slug: 'placeholder-2', title: '', subtitle: 'Placeholder Role', timg: Teams[1].timg},
        {...Teams[2], slug: 'placeholder-3', title: 'Director 6', subtitle: 'Placeholder Role', timg: Teams[2].timg},
    ];

    return (
        <section className={"" + props.hclass}>
            <div className="container team-board">
                {/* TOP ROW: Intro, Card 1, and Card 2 */}
                <div className="row d-flex align-items-stretch mb-5">
                    {/* Intro Card: Now occupies one-third of the row (col-lg-4) */}
                    <div className="col-lg-4 col-md-12 col-12 d-flex">
                        <div className="vol-card team-board-card h-100 p-4 d-flex flex-column">
                            <div className="section-title text-left team-board-title">
                                <span>Introduction</span>
                                <h6 className="board-intro mt-4">Our Board of Directors oversees the legal and strategic direction of the Ghines Foundation. They are responsible for approving the annual goals, strategy, and operating budgets. The Board ensures the Foundation’s work remains aligned with its mission and values, while maintaining transparency and accountability. The Chair and Directors collaborate across thematic areas: animal welfare, youth development, cultural preservation, and social healing to ensure coherence and long-term vision across all programs.</h6>
                            </div>
                        </div>
                    </div>

                    {/* Team Members 1 and 2: Each now occupies one-third of the row (col-lg-4) */}
                    {boardMembers.slice(0, 2).map((team, index) => (
                        <div className="col-lg-4 col-md-6 col-12 d-flex" key={index}>
                            <div className="vol-card team-board-card card-sizing h-100">
                                <div className="image">
                                    <Image src={team.timg} alt="" width={300} height={400} layout="responsive" />
                                    <ul className="social-icons-default">
                                        <li><Link onClick={ClickHandler} href="#"><i className="flaticon-facebook-app-symbol"></i></Link></li>
                                        <li><Link onClick={ClickHandler} href="#"><i className="flaticon-linkedin"></i></Link></li>
                                        <li><Link onClick={ClickHandler} href="#"><i className="flaticon-twitter"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="text p-3">
                                    <h3><Link onClick={ClickHandler} href={'/volunteer-single/[slug]'} as={`/volunteer-single/${team.slug}`}>{team.title}</Link></h3>
                                    <span>{team.subtitle}</span>
                                    <blockquote className="quote-text mt-3">"We believe in a future where every community thrives with compassion and purpose."</blockquote>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* BOTTOM ROW: Card 3, 4, and 5 */}
                <div className="row d-flex align-items-stretch mt-4">
                    {boardMembers.slice(2, 5).map((team, index) => (
                        <div className="col-lg-4 col-md-6 col-12 d-flex" key={index}>
                            <div className="vol-card team-board-card card-sizing h-100">
                                <div className="image">
                                    <Image src={team.timg} alt="" width={300} height={400} layout="responsive" />
                                    <ul className="social-icons-default">
                                        <li><Link onClick={ClickHandler} href="#"><i className="flaticon-facebook-app-symbol"></i></Link></li>
                                        <li><Link onClick={ClickHandler} href="#"><i className="flaticon-linkedin"></i></Link></li>
                                        <li><Link onClick={ClickHandler} href="#"><i className="flaticon-twitter"></i></Link></li>
                                    </ul>
                                </div>
                                <div className="text p-3">
                                    <h3><Link onClick={ClickHandler} href={'/volunteer-single/[slug]'} as={`/volunteer-single/${team.slug}`}>{team.title}</Link></h3>
                                    <span>{team.subtitle}</span>
                                    <blockquote className="quote-text mt-3">"Our mission is to create lasting positive change for the next generation."</blockquote>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default TeamSection;