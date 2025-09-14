// api/causes.js

import Cimg1 from '/public/images/mission-vission/1.jpg';
import Cimg2 from '/public/images/mission-vission/2.jpg';
import Cimg3 from '/public/images/mission-vission/3.jpg';

const causes = [
    {
        id: '1',
        title: 'Animal Welfare & Conservation',
        statsText: '70% of animals lack veterinary care',
        docomunt: 'We aim to establish mobile veterinary services, animal shelters, and a rescue centre to support rural livestock keepers and respond to the needs of injured, abandoned, or at-risk animals. Guided by One Health principles, our vision includes protecting biodiversity and building community-led research partnerships.',
        slug: 'animal-welfare-conservation',
        Cimg: Cimg1,
        tag: 'Pillar 1',
    },
    {
        id: '2',
        title: 'Social Services & Human Rights',
        statsText: '65% of women & Girls have experienced GBV / 40%+ of conflict-affected residents show PTSD symptoms',
        docomunt: 'We envision access to psychosocial support, justice, and healing. Our programs include training local trauma counsellors, community resilience circles, mobile legal clinics, GBV response units, and peacebuilding platforms.',
        slug: 'social-services-human-rights',
        Cimg: Cimg2,
        tag: 'Pillar 2',
    },
    {
        id: '3',
        title: 'Youth, Sports & Culture',
        statsText: '72% of South Sudan’s population is under 30 / 5% of secondary schools offer sports or arts education',
        docomunt: 'Young people are at the heart of our mission. We support youth-led heritage programs, life skills training, music and storytelling labs, cultural spaces, and sports that foster leadership, inclusion, and creative entrepreneurship.',
        slug: 'youth-sports-culture',
        Cimg: Cimg3,
        tag: 'Pillar 3',
    },
];

export default causes;