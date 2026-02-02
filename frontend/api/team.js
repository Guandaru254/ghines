// src/api/team.js
// -----------------------------------------------------------------------------
// The Ghines Foundation - Board of Directors Data Module
// -----------------------------------------------------------------------------

const Team = [
    {
        id: "1",
        title: "George N. Ghines",
        subtitle: "Founder & Visionary",
        slug: "george-n-ghines",
        timg: "/images/volunteer/10.png",
        // SHORT SNIPPET (For display)
        snippet: "George N. Ghines, 58, is a South Sudan–born entrepreneur with more than three decades of leadership experience across Africa, the Middle East, and the Balkans. He began his career with multinational corporations, holding senior managerial positions at Heineken, Coca-Cola International, Sony Ericsson, and Reckitt Benckiser.",
        // FULL BIO (For single profile page only)
        bio: `George N. Ghines, 58, is a South Sudan–born entrepreneur with more than three decades of leadership experience across Africa, the Middle East, and the Balkans. He began his career with multinational corporations, holding senior managerial positions at Heineken, Coca-Cola International, Sony Ericsson, and Reckitt Benckiser. In 2004, after 17 years in the corporate world, he founded Allied Expertise FZE, a consulting firm specialising in governance and fraud prevention. In 2005, shortly after the signing of the Comprehensive Peace Agreement, Ghines returned to Juba. There, he established Equatoria Holding Company Ltd, which has since grown into South Sudan's largest facilities management company. In 2008, he launched Notos Café-Restaurants, the country's first homegrown restaurant chain, later expanding to Uganda and Kenya. Through Equatoria Holding's CSR programs, he has directed resources toward trauma healing, youth empowerment, and animal conservation, continuing a family tradition of public service in South Sudan spanning more than 130 years. He has also served as Honorary Consul for Canada and is a founding member of the Rotary Club of Juba. As a founding member of the Ghines Foundation, his vision is to harness the energy and creativity of South Sudan's youthful population and channel it toward building a nation defined by opportunity, stability, and renewal.`,
    },
    {
        id: "2",
        title: "George A. Miriyannis",
        subtitle: "Board Member",
        slug: "george-a-miriyannis",
        timg: "/images/volunteer/2.png",
        // SHORT SNIPPET (For display)
        snippet: "George A. Miriyannis is an ambassador with a long and distinguished career in international affairs, media, and cultural relations. He is currently serving as Ambassador-at-Large for the European Organisation of Public Law. He has previously been honoured as Officer of the Order of St. Gabriel and Minister Plenipotentiary of Bolivia during the country's entry into MERCOSUR.",
        // FULL BIO (For single profile page only)
        bio: `George A. Miriyannis is an ambassador with a long and distinguished career in international affairs, media, and cultural relations. He is currently serving as Ambassador-at-Large for the European Organisation of Public Law. He has previously been honoured as Officer of the Order of St. Gabriel and Minister Plenipotentiary of Bolivia during the country's entry into MERCOSUR.

Over the years, Mr Miriyannis has held several key positions, including Director of the Bolivian Institute of Tourism in Greece, Honorary Consul of Bolivia in Greece, Foreign Press Correspondent for El Diario (La Paz), and Special Diplomatic Correspondent for CNN-Greece. He also co-founded Miriyannis-Fourrieres Deluxe, a boutique corporate advisory firm that supported clients in cross-border business and public affairs.

Respected for his calm leadership and sharp understanding of global affairs, Mr Miriyannis brings to the Ghines Foundation a broad international outlook and decades of experience connecting people and ideas across continents. His insight and steady presence continue to enrich the work of the Board and the Foundation as a whole.`,
    },
    {
        id: "3",
        title: "Jawahir Yusuf Haji Adam",
        subtitle: "Board Member",
        slug: "jawahir-yusuf-haji-adam",
        timg: "/images/volunteer/3.png",
        // SHORT SNIPPET (For display)
        snippet: "Jawahir Yusuf Haji Adam is a Somali diplomat and humanitarian with extensive experience in refugee affairs, international development, and human rights. She holds a Master's in Forced Migration from the University of Oxford, a BA in Public Relations from George Mason University, and a Diploma in Events Management from George Washington University.",
        // FULL BIO (For single profile page only)
        bio: `Jawahir Yusuf Haji Adam is a Somali diplomat and humanitarian with extensive experience in refugee affairs, international development, and human rights. She holds a Master's in Forced Migration from the University of Oxford, a BA in Public Relations from George Mason University, and a Diploma in Events Management from George Washington University. Appointed Somalia's Ambassador to China in 2016, Jawahir was later shortlisted for the UN Secretary-General's High-Level Panel on Internally Displaced Persons. She previously served as Senior Advisor on Refugees and IDPs to Somalia's Minister of Interior, where she helped negotiate the Tripartite Agreement between Somalia, Kenya, and UNHCR governing the voluntary return of Somali refugees. A former World Bank staff member for sixteen years, she has also worked with UNHCR, UNDP, the EU, DFID, and IOM in over a dozen countries. Her work has focused on displacement, conflict, women's rights, and migration policy. Between 2013 and 2023, she sat on the Executive Board of the University of Reading's Henley Business School and continues to write and speak on Somalia's peace process and governance. Fluent in English, Arabic, and Somali, Jawahir brings to the Ghines Foundation a wealth of international experience and a strong voice for justice and inclusion.`,
    },
    // --- BOARD MEMBERS 4 & 5: NO SNIPPET, LINKED NAME ---
    {
        id: "4",
        title: "Asma-Lucy Ilado",
        subtitle: "Co-founder and Executive Director",
        slug: "asma-lucy-ilado",
        timg: "/images/volunteer/4.jpg", 
        // Non-empty bio to enable full profile page logic (Link ON, Snippet OFF, Button OFF)
        bio: `Asma-Lucy Ilado is the Co-founder and Executive Director... (Full bio content for single page)`, 
    },
    {
        id: "5",
        title: "William Amoko",
        subtitle: "Co-founder and Director of Operations",
        slug: "william-amoko",
        timg: "/images/volunteer/5.jpeg", 
        // Non-empty bio to enable full profile page logic (Link ON, Snippet OFF, Button OFF)
        bio: `William Amoko is the Co-founder and Director of Operations... (Full bio content for single page)`, 
    },
    // --- OPERATIONAL TEAM 6, 7, 8: NO SNIPPET, LINKED NAME ---
    // The name is now linked via `member.slug` in the component to fix styling.
    {
        id: "6",
        title: "Sarah Osman Ghandi",
        subtitle: "Project Coordinator",
        slug: "sarah-osman-ghandi",
        timg: "/images/volunteer/6.JPG", 
        bio: "", // Bio remains empty to ensure no button/snippet shows
    },
    {
        id: "7",
        title: "Zakia Khemis",
        subtitle: "People and Culture Officer",
        slug: "zakia-khenis",
        timg: "/images/volunteer/7.jpeg", 
        bio: "", // Bio remains empty
    },
    {
        id: "8",
        title: "Tihl Abdallah",
        subtitle: "Digital & ICT Officer",
        slug: "tihl-abdallah",
        timg: "/images/volunteer/8.jpeg", 
        bio: "", // Bio remains empty
    },
];

// -----------------------------------------------------------------------------
// ✅ Exports
// -----------------------------------------------------------------------------

export default Team;

// CommonJS compatibility safeguard (for legacy imports)
if (typeof module !== "undefined") {
    module.exports = Team;
}