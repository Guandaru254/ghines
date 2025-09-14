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
                                <div className="project-grid-inner">
                                    <Image src={project.pimg1} alt={project.title} />
                                </div>
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