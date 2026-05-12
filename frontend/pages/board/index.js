import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import TeamSection from "../../components/TeamSection/TeamSection";
import Scrollbar from "../../components/scrollbar/scrollbar";

export default function BoardPage() {
  return (
    <Fragment>
      <PageTitle 
        pageTitle="Our Leadership" 
        pagesub="About Us" 
      />

      <main style={{ backgroundColor: "#fff" }}>
        <TeamSection hclass="volunteer-section section-padding" />
      </main>

      <Scrollbar />
    </Fragment>
  );
}