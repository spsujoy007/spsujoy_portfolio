import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Effects from '../components/Effects';
import Loader from '../components/Loader';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { SITE } from '../lib/data';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] });

const title = `${SITE.name} | ${SITE.role}`;

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: `${SITE.name} Portfolio`,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  keywords: [
    'Sujoy Kumar Paul', 'Full Stack Web Developer', 'MERN stack developer', 'React developer', 'Next.js developer',
    'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'web developer portfolio', 'Vadodara', 'Bangladesh',
  ],
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', siteName: `${SITE.name} Portfolio`, title, description: SITE.description, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  category: 'technology',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "var r=document.documentElement;r.classList.add('js');setTimeout(function(){if(!r.classList.contains('gs'))r.classList.remove('js')},5000);try{if(sessionStorage.getItem('ld'))r.classList.add('ld-done')}catch(e){}setTimeout(function(){r.classList.add('ld-done')},7000);try{var t=localStorage.getItem('theme');if(t)r.dataset.theme=t}catch(e){}" }} />
        <noscript><style>{'.rv,.rl{opacity:1!important;transform:none!important}h1 .ln>span{transform:none!important}.ld{display:none!important}html:not(.ld-done) body{overflow:auto!important}'}</style></noscript>
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <div id="sp" aria-hidden="true" />
        <Effects />
        <Loader />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
