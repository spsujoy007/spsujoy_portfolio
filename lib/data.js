export const SITE = {
  name: 'Sujoy Kumar Paul',
  role: 'Full Stack Web Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://spsujoy.netlify.app',
  description:
    'Portfolio of Sujoy Kumar Paul, a full stack web developer building web applications with React, Next.js, Node.js, Express and MongoDB. Based in Vadodara, India.',
  oldPortfolio: 'https://spsujoy.netlify.app/',
};

export const nav = [
  ['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Process', '#process'], ['Stories', '#stories'], ['Training', '#training'],
];

export const meta = [
  ['Based in', 'Vadodara, Gujarat, India'],
  ['From', 'Panchagarh, Bangladesh'],
  ['Focus', 'MERN · Next.js · Tailwind'],
  ['Languages', 'Bangla · English · Hindi'],
];

export const projects = [
  {
    slug: 'hellotalk',
    name: 'HelloTalk',
    type: 'Team project · Backend',
    tagline: 'An online platform for learning English.',
    summary: 'An online English learning platform built as a team project, where I built the entire backend.',
    role: 'Backend developer (team project)',
    thumb: { src: '/work/hellotalk/thumb.svg', w: 1600, h: 900, alt: 'HelloTalk project preview' },
    languages: ['JavaScript', 'HTML', 'CSS'],
    frameworks: ['Next.js', 'React', 'Express.js', 'Tailwind CSS', 'DaisyUI'],
    other: ['Node.js', 'MongoDB', 'Firebase', 'React Firebase Hooks', 'Axios', 'React Query', 'Swiper', 'Vercel'],
    overview: [
      'HelloTalk is an online English learning platform, built as a team project.',
      "I worked as the backend developer and created the whole backend, with a scalable architecture that lets the different components of the application communicate seamlessly.",
    ],
    contribution: 'I owned the backend end to end, and my teammates helped whenever I ran into an issue.',
    how: [
      { t: 'A modern interface', d: 'The front end is built with Next.js and styled with Tailwind CSS and DaisyUI, with Swiper for sliders.' },
      { t: 'Connected to Firebase', d: 'Firebase and React Firebase Hooks connect the client to Firebase.' },
      { t: 'Talking to the server', d: 'Axios sends requests to the backend, and React Query manages and caches that data on the client.' },
      { t: 'The backend', d: 'Express.js on Node.js provides the API, with MongoDB as the database, organized in a scalable architecture.' },
      { t: 'Going live', d: 'The project is deployed on Vercel.' },
    ],
    links: [], // e.g. { label: 'Live site', href: 'https://...' }, { label: 'Client repo', href: '...' }, { label: 'Server repo', href: '...' }
  },
  {
    slug: 'mypaste',
    name: 'MyPaste',
    type: 'Full-stack notepad',
    tagline: 'A notepad that learns which notes you copy most.',
    summary: 'A user-friendly notepad website with Google sign-in, keyword-based themes, pinned notes and smart sorting.',
    role: 'Developer',
    thumb: { src: '/work/mypaste/thumb.svg', w: 1600, h: 900, alt: 'MyPaste project preview' },
    languages: ['JavaScript'], // TODO: add the exact languages, frameworks and tools used for MyPaste
    frameworks: [],
    other: [],
    overview: [
      'MyPaste simplifies note-taking with customizable themes and smart note management, including pinning, copying and an intelligent sorting system.',
      'It is a user-friendly notepad website: sign up with Google, customize the look with search keywords and manage your notes with ease.',
    ],
    how: [
      { t: 'Sign in with Google', d: 'Users sign up and log in with their Google account.' },
      { t: 'Pick a theme', d: 'Customize the look of the notepad by searching with keywords.' },
      { t: 'Write and manage notes', d: 'Notes live on user-friendly cards that are easy to scan and manage.' },
      { t: 'Pin what matters', d: 'Important notes can be pinned so they stay within reach.' },
      { t: 'Copy in one click', d: 'Each note card is designed for easy copying.' },
      { t: 'Smart sorting', d: 'Notes you copy most often are prioritized, so your most-used notes rise to the top.' },
    ],
    links: [],
  },
  {
    slug: 'profile-view',
    name: 'Profile-View',
    type: 'Profile sharing',
    tagline: 'All your profiles behind one link.',
    summary: 'Share your social media links, problem-solving profiles and professional profiles with HR, recruiters and others using a single link.',
    role: 'Developer',
    thumb: { src: '/work/profile-view/thumb.svg', w: 1600, h: 900, alt: 'Profile-View project preview' },
    languages: ['JavaScript'], // TODO: add the exact languages, frameworks and tools used for Profile-View
    frameworks: [],
    other: [],
    overview: [
      'Profile-View lets you share your social media links and professional profiles from one place.',
      'With a single link you can share your social profiles, problem-solving profiles and professional profiles with HR, recruiters and others.',
    ],
    how: [
      { t: 'Add your profiles', d: 'Gather your social media, problem-solving and professional profiles in one place.' },
      { t: 'Get one link', d: 'Everything is available behind a single shareable link.' },
      { t: 'Share it', d: 'Send the link to HR, recruiters and anyone else who wants to know more about you.' },
    ],
    links: [],
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);

export const skills = [
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'React', 'Next.js', 'Tailwind CSS', 'DaisyUI', 'Bootstrap / React Bootstrap', 'MUI', 'GSAP'] },
  { title: 'Backend & data', items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'Firebase', 'JWT'] },
  { title: 'Tools & deployment', items: ['VS Code', 'Git & GitHub', 'Figma', 'Vercel', 'Netlify', 'React Helmet'] },
];

/* Add your photos to /public/stories and list them here.
   w/h = the image's real pixel size (keeps layout stable). */
export const stories = [1500, 1200, 900, 900, 1500, 1200].map((h, i) => ({
  src: i === 0
    ? 'https://res.cloudinary.com/cloudinarybysp/image/upload/v1790874806/Portfolio/784232188_1094752379661894_8404295017138247379_n_xa83fv.jpg'
    : i === 1
      ? 'https://res.cloudinary.com/cloudinarybysp/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Programming%20Hero,w_0.5,y_0.18/v1790874140/Portfolio/470230728-1269133004211711-9192103425127239074-n_cu9xnl.jpg'
    : i === 2
      ? 'https://res.cloudinary.com/cloudinarybysp/image/upload/v1790874592/Portfolio/504169315_738636768606792_3752983015738684501_n_ktevrq.jpg'
    : i === 3
      ? 'https://res.cloudinary.com/cloudinarybysp/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1790875889/Portfolio/b08e1be0-c933-4a88-ae5f-9bfba8f069f6.png'
    : i === 4
      ? 'https://res.cloudinary.com/cloudinarybysp/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1790876289/Portfolio/60aa4360-88c9-42cd-9021-b7b0548d3793_roe3ui.png'
    : i === 5
      ? 'https://res.cloudinary.com/cloudinarybysp/image/upload/v1790967820/Portfolio/484308958_678991171238019_3577821054078712979_n_uu0rqb.jpg'
    : `/stories/story-0${i + 1}.svg`, w: 1200, h,
  title: i === 0 ? 'A moment behind the screen' : i === 1 ? 'Another moment behind the screen' : i === 2 ? 'Bro code base' : i === 3 ? 'SIH (Smart India Hackathon) Participation 2026' : i === 4 ? 'Achivement (End Game)' : i === 5 ? 'Met a true genius' : `Your story 0${i + 1}`,
  caption:
    i === 1 ? 'A glimpse from behind the screen.'
      : i === 2 ? 'Just enjoying the moment with friends, surrounded by screens, ideas, and a little bit of chaos. Working together, sharing thoughts, solving problems, and enjoying the process along the way. Sometimes it’s not just about the work — it’s about the people, the vibe, and the memories we create while doing it.'
        : i === 3 ? 'Proud to have participated in the Smart India Hackathon 2026 - Institute-Level Internal Hackathon at Parul University. It was a great experience of working with a team, exploring ideas, solving real-world problems, and turning concepts into something meaningful. More than just a certificate, it’s a memory of collaboration, learning, and building something together.'
          : i === 4 ? 'One of my early milestones with Programming Hero — winning the End Game Hackathon and being selected among the Top 2 teams out of 46 participating teams. It was an incredible experience of building, competing, solving problems, and working together as a team. More than the achievement itself, it gave me confidence in my ability to turn ideas into real solutions.'
            : i === 5 ? 'A memorable moment with Rahat Khan Pathan Sir — a truly remarkable teacher with an exceptional approach to problem-solving. His ability to break down complex problems, find practical solutions, and share knowledge makes every interaction a learning experience. Grateful to have met a mentor who inspires us to think differently and look at problems from a new perspective.'
              : 'Behind the screen, where ideas come alive.',
  alt: i === 0 ? 'Sujoy Kumar Paul' : i === 1 ? 'A moment from behind the screen' : `Placeholder story image 0${i + 1}`,
}));

export const training = [
  ['Web development', 'Programming Hero', 'Completed'],
  ['Office Application', 'Daffodil Information Technology Foundation (DITF)', 'Completed'],
];

export const marquee = [
  ['React', 'Next.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JavaScript', 'Firebase', 'GSAP'],
  ['Full Stack', 'MERN', 'REST APIs', 'JWT', 'Figma', 'Vercel', 'Netlify', 'GitHub'],
];

export const glance = [
  ['3', 'Projects built'],
  ['3', 'Languages spoken'],
  [String(skills.reduce((n, g) => n + g.items.length, 0)), 'Skills & tools listed'],
  ['2', 'Courses & training'],
];

export const steps = [
  { n: '01', t: 'Design', d: 'Layouts and interface ideas are shaped in Figma before any code is written.', tags: ['Figma'] },
  { n: '02', t: 'Build the interface', d: 'Responsive, component-based UIs with the React ecosystem, styled with utility-first CSS and brought to life with GSAP.', tags: ['React', 'Next.js', 'Tailwind CSS', 'DaisyUI', 'GSAP'] },
  { n: '03', t: 'Build the backend', d: 'APIs, data models and authentication that the interface can rely on.', tags: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Firebase'] },
  { n: '04', t: 'Ship', d: 'Code lives on GitHub and goes live through modern hosting.', tags: ['GitHub', 'Vercel', 'Netlify'] },
];

/* Phone numbers (both are on WhatsApp). wa = number with country code, digits only. */
export const phones = [
  { label: 'India', display: '+91 9558792672', tel: '+919558792672', wa: '919558792672' },
  { label: 'Bangladesh', display: '+880 1859 342364', tel: '+8801859342364', wa: '8801859342364' },
];
export const waLink = (p) => `https://wa.me/${p.wa}?text=${encodeURIComponent('Hi Sujoy, I found your portfolio.')}`;
