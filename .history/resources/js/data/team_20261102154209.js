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
    name: 'Reynel Clark Esquivel', // REPLACE with your partner's actual name
    role: 'Developer / Designer',
    photo: '/assets/images/portrait-placeholder.svg', // REPLACE with your partner's photo
    summary: 'Hi, I\'m Reynel, a third-year BS Information Technology student who loves building tidy, accessible websites. I started with school activities and now build small projects on weekends. I like turning a messy idea into something people can actually use.',
    skills: {
      Languages: ['HTML5', 'CSS3', 'JavaScript', 'SQl', 'Dart'],
      Frameworks: ['React', 'Tailwind CSS'],
      Tools: ['Figma', 'VS Code', 'Git / GitHub'],
      'Soft skills': ['Teamwork', 'Communication', 'Planning'],
    },
    education: [
      {
        dates: '2024 — Present', title: 'Bachelor of Science in Information Technology',
        school: 'Urdaneta City University',
        detail: 'Sample coursework and academic background. Replace with real information.',
      },
      {
        dates: '2022 — 2024', title: 'Senior High School',
        school: 'School Name — Replace Me',
        detail: 'Sample track and achievements. Replace with real information.',
      },
    ],
  },
];
