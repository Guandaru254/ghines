// api/causes.js

import Cimg1 from '/public/images/pillars/1.webp';
import Cimg2 from '/public/images/pillars/2.jpg';
import Cimg3 from '/public/images/pillars/3.jpg';

const causes = [
    {
        id: '1',
        title: 'Animal Welfare & Conservation',
        // Update: First card using <br />
        statsText: 'Over 30 million livestock compete with wildlife for resources (water, pasture)<br />More than 70% of livestock and domestic animals in rural areas lack veterinary attention ',
        docomunt: 'Expanding veterinary services, focusing on domestic and street animals, protecting wildlife, addressing human–wildlife conflict through community training, promoting conservation initiatives, and integrating climate change awareness into all programs.',
        slug: 'animal-welfare-conservation',
        Cimg: Cimg1,
        tag: 'Pillar 1',
    },
    {
        id: '2',
        title: 'Social Services & Human Rights',
        // Update: Second card using <br />
        statsText: '65% of women & Girls have experienced GBV <br />40%+ of conflict-affected residents show PTSD symptoms',
        docomunt: 'Providing trauma healing, mental health support, and rights awareness programs that are practical, inclusive, and non-political, helping individuals rebuild trust, resilience, and dignity.',
        slug: 'social-services-human-rights',
        Cimg: Cimg2,
        tag: 'Pillar 2',
    },
    {
        id: '3',
        title: 'Youth, Sports & Culture',
        // ✅ NEW CHANGE: Third card now uses <br />
        statsText: '72% of South Sudan’s population is under 30 <br />5% of secondary schools offer sports or arts education',
        docomunt: 'Promoting sports, creative industries, and heritage preservation as future pathways for youth empowerment, peacebuilding, and economic growth. Focus areas will include research to inform policy decisions and preparation for infrastructure development in sports, culture, and creative sectors to expand skills development and foster community ownership.',
        slug: 'youth-sports-culture',
        Cimg: Cimg3,
        tag: 'Pillar 3',
    },
];

export default causes;