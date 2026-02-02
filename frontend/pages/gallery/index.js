import React, { Fragment } from 'react';
import Projects from "../../api/projects";
import PageTitle from '../../components/PageTitle/PageTitle'
import Scrollbar from '../../components/scrollbar/scrollbar';
import Image from 'next/image';

const ProjectPage = () => {
    return (
        <Fragment>
            <PageTitle pageTitle={'Gallery'} />
            <section className="project-page section-padding">
                <div className="container">
                    <div className="project-wrap">
                        {Projects.map((project, pitem) => (
                            <div className="project-grid" key={pitem}>
                                <Image
                                    src={project.pimg1}
                                    alt={project.title}
                                    width={400} // Set a fixed width
                                    height={400} // Set a fixed height
                                    style={{ objectFit: 'cover' }} // CSS for the image
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Scrollbar />
        </Fragment>
    )
};

export default ProjectPage;