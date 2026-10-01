export const SITE = {
  name: 'Sujoy Kumar Paul',
  role: 'Full Stack Web Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://spsujoy.netlify.app',
  description:
    'Portfolio of Sujoy Kumar Paul, a full stack web developer building web applications with React, Next.js, Node.js, Express and MongoDB. Based in Vadodara, India.',
  phone: '+91 9558792672',
  phoneHref: 'tel:+919558792672',
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
    name: 'HelloTalk', meta: 'Team project · Backend', label: 'Stack',
    text: ['An online English learning platform, built as a team project.'],
    contribution: "I worked as the backend developer and built the entire backend, with a scalable architecture that lets the application's components communicate seamlessly.",
    tags: ['Next.js', 'Tailwind CSS', 'DaisyUI', 'Firebase', 'React Firebase Hooks', 'Axios', 'React Query', 'Express.js', 'Node.js', 'MongoDB', 'Swiper', 'Vercel'],
  },
  {
    name: 'MyPaste', meta: 'Notepad web app', label: 'Features',
    text: [
      'A user-friendly notepad website. Users sign in with Google, customize themes with search keywords and manage notes with ease.',
      'Notes can be pinned, and each note card makes copying simple. Smart sorting prioritizes the notes you copy most often.',
    ],
    tags: ['Google sign-in', 'Keyword themes', 'Pinned notes', 'One-click copy', 'Smart sorting'],
  },
  {
    name: 'Profile-View', meta: 'Profile sharing', label: 'Purpose',
    text: ['One link to share your social media, problem-solving and professional profiles with HR, recruiters and others.'],
    tags: ['Social links', 'Problem-solving profiles', 'Professional profiles'],
  },
];

export const skills = [
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'React', 'Next.js', 'Tailwind CSS', 'DaisyUI', 'Bootstrap / React Bootstrap', 'MUI', 'GSAP'] },
  { title: 'Backend & data', items: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST APIs', 'Firebase', 'JWT'] },
  { title: 'Tools & deployment', items: ['VS Code', 'Git & GitHub', 'Figma', 'Vercel', 'Netlify', 'React Helmet'] },
];

/* Add your photos to /public/stories and list them here.
   w/h = the image's real pixel size (keeps layout stable). */
export const stories = [1500, 1200, 900, 900, 1500, 1200].map((h, i) => ({
  src: `/stories/story-0${i + 1}.svg`, w: 1200, h,
  title: `Your story 0${i + 1}`,
  caption: 'Placeholder. Replace this tile with your own photo and a short caption.',
  alt: `Placeholder story image 0${i + 1}`,
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
