// api/blogs.js

// images
import blogImg1 from "/public/images/blog/img-1.jpg";
import blogImg2 from "/public/images/blog/img-2.jpg";
import blogImg3 from "/public/images/blog/img-3.jpg";

import blogSingleImg1 from "/public/images/blog-details/1.png";
import blogSingleImg2 from "/public/images/blog-details/2.png";
import blogSingleImg3 from "/public/images/blog-details/3.webp";

import recent1 from "/public/images/recent-posts/img-1.jpg";
import recent2 from "/public/images/recent-posts/img-2.jpg";
import recent3 from "/public/images/recent-posts/img-3.jpg";

const blogs = [
    {
        id: '1',
        title: 'Youth Voices',
        title2: 'A New Generation Speaks: The Voices of Juba’s Youth',
        subtitle: 'Guandaru Kimathi',
        slug: 'a-new-generation-speaks-youth-voices',
        screens: blogImg1,
        link: 'READ MORE',
        description: 'An inspiring look into how young South Sudanese leaders are using digital storytelling to shape their future and preserve cultural heritage.',
        author: 'Guandaru Kimathi',
        date: "2025-08-15",
        blogSingleImg: blogSingleImg1,
        recent: recent1,
        comment: '12',
        day: '15',
        month: 'AUG',
        blClass: 'format-standard-image',
        category: 'Youth Voices',
        animation: '1200',
    },
    {
        id: '2',
        title: 'Project Spotlight',
        title2: 'Healing with Animals: The First Mobile Veterinary Clinic',
        subtitle: 'Jane Smith',
        slug: 'healing-with-animals-veterinary-clinic',
        screens: blogImg2,
        link: 'READ MORE',
        description: 'Our pilot mobile veterinary clinic is bringing essential care to rural communities, promoting animal welfare and public health through a "One Health" approach.',
        author: 'Jane Smith',
        date: "2025-09-05",
        blogSingleImg: blogSingleImg2,
        recent: recent2,
        comment: '8',
        day: '05',
        month: 'SEPT',
        blClass: 'format-standard-image',
        category: 'Project Spotlight',
        animation: '1200',
    },
    {
        id: '3',
        title: 'Cultural Snapshot',
        title2: 'The Rhythm of the Nile: Celebrating South Sudanese Culture',
        subtitle: 'Lucy Ghines',
        slug: 'rhythm-of-the-nile-cultural-snapshot',
        screens: blogImg3,
        link: 'READ MORE',
        description: 'A look at how traditional music and dance are helping communities reconnect and heal from the scars of conflict. This is a story of resilience.',
        author: 'Lucy Asma',
        date: "2025-06-10",
        blogSingleImg: blogSingleImg3,
        recent: recent3,
        comment: '22',
        day: '10',
        month: 'JUNE',
        blClass: 'format-standard-image',
        category: 'Cultural Snapshot',
        animation: '1200',
    }
];

export default blogs;