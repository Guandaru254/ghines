import React, { Fragment } from "react";
import PageTitle from "../../components/PageTitle/PageTitle";
import TeamSection from "../../components/TeamSection/TeamSection";
import Scrollbar from "../../components/scrollbar/scrollbar";

export default function BoardPage() {
  return (
    <Fragment>
      {/* Page Header */}
      <PageTitle
        pageTitle="Our Leadership"
        pagesub="About"
      />

      {/* Board Members Section */}
      <TeamSection hclass="volunteer-section section-padding" />

      {/* Scroll To Top */}
      <Scrollbar />
    </Fragment>
  );
}
