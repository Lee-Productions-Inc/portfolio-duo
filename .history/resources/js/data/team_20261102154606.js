// Edit the content here. Portrait files can be replaced in public/assets/images/.
// Only the Projects section is database-driven as required by the assignment.
export const team = [
  {
    id: '01',
    name: 'Lee Bron Godoy',
    role: 'Web Developer',
    photo: '/assets/images/801822187_1536449821587499_8509382648599056605_n.jpg', // change to your own photo path
    summary: 'Exploring web development, responsive interfaces, and thoughtful digital experiences.',
    skills: {
      Languages: ['HTML5', 'CSS3', 'JavaScript', 'SQL', 'PHP', 'Python', 'C++', 'Java'],
      Frameworks: ['Tailwind CSS', 'Laravel'],
      Tools: ['Git / GitHub', 'Figma', 'VS Code'],
      'Soft skills': ['Problem Solving', 'Collaboration', 'Adaptability', 'Communication'],
    },
    education: [
      {
        dates: '2024 — Present', title: 'Bachelor of Science in Information Technology',
        school: 'Urdaneta City University',
        detail: 'Programming, web development, and software engineering foundations.',
      },
      {
        dates: '2023 — 2024', title: 'Information and Communications Technology (ICT)',
        school: 'St. Camillus College of Manaoag',
        detail: 'Programming, web development, and networking fundamentals.',
      },
    ],
  },

  //partner profile
  {
    id: '02',
    name: 'Reynel Clark Esquivel', 
    role: 'Developer / Designer',
    photo: '/assets/images/494820221_1867069257382203_473742242489479199_n.jpg', 
    summary: 'Hi, I\'m Reynel, a third-year BS Information Technology student who loves building tidy, accessible websites. I started with school activities and now build small projects on weekends. I like turning a messy idea into something people can actually use.',
    skills: {
      Languages: ['HTML5', 'CSS3', 'JavaScript', 'SQL', 'Dart', 'Java'],
      Frameworks: ['React', 'Tailwind CSS'],
      Tools: ['Figma', 'VS Code', 'Git / GitHub'],
      'Soft skills': ['Teamwork', 'Communication', 'Planning', 'Problem Solving', 'Time Management'],
    },
    education: [
      {
        dates: '2024 — Present', title: 'Bachelor of Science in Information Technology',
        school: 'Urdaneta City University',
        detail: 'Focuses on web development and networking.',
      },
      {
        dates: '2020 — 2022', title: 'Senior High School',
        school: 'Carthel Science Educational Foundation Inc.',
        detail: 'Learned programming basics and computer systems servicing',
      },
    ],
  },
];
