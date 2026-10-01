import Image from 'next/image';
import Projects from '../components/Projects';
import Gallery from '../components/Gallery';
import { SITE, phones, waLink, meta, projects, skills, stories, training, marquee, glance, steps } from '../lib/data';

const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person', '@id': `${SITE.url}/#person`, name: SITE.name, jobTitle: SITE.role, url: SITE.url,
      description: SITE.description, sameAs: [SITE.oldPortfolio],
      homeLocation: { '@type': 'Place', name: 'Panchagarh, Bangladesh' },
      address: { '@type': 'PostalAddress', addressLocality: 'Vadodara', addressRegion: 'Gujarat', addressCountry: 'IN' },
      knowsLanguage: ['Bengali', 'English', 'Hindi'],
      knowsAbout: skills.flatMap((s) => s.items).concat(['Web development', 'Full stack development']),
    },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: `${SITE.name} Portfolio`, inLanguage: 'en', publisher: { '@id': `${SITE.url}/#person` } },
  ],
};

function Sec({ id, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`}>
      <span className="rl" aria-hidden="true" />
      <div className="w">{children}</div>
    </section>
  );
}
function Head({ id, num, label, title, hint }) {
  return (
    <div className="sh">
      <div className="lab rv">{num} — {label}</div>
      <div>
        <h2 className="sp" id={`${id}-h`}>{title}</h2>
        {hint && <p className="d m rv" style={{ fontSize: 13, margin: '18px 0 0' }}>{hint}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <header id="top">
        <div className="shapes" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="w hero">
          <p className="lab hi">{SITE.role}<span className="cur" aria-hidden="true" /></p>
          <h1>
            <span className="ln"><span className="hi">Sujoy Kumar</span></span>{' '}
            <span className="ln"><span className="hi">Paul<em className="pd">.</em></span></span>
            <span className="sr"> — {SITE.role}</span>
          </h1>
          <div className="hg">
            <div>
              <p className="hi">I build web applications end to end: React and Next.js interfaces, backed by Node.js, Express and MongoDB.</p>
              <div className="b hi"><a className="sq f" href="#work">View work</a><a className="sq" href="#contact">Get in touch</a></div>
            </div>
            <dl className="meta">
              {meta.map(([k, v]) => <div className="hi" key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </div>
        </div>
      </header>

      <main id="main">
        <div className="mq" aria-hidden="true">
          {marquee.map((row, r) => (
            <div className={`row${r ? ' o' : ''}`} key={r}>
              {[...row, ...row, ...row, ...row].map((t, i) => <span key={i}>{t}</span>)}
            </div>
          ))}
        </div>

        <section id="about" aria-labelledby="about-h">
          <span className="rl" aria-hidden="true" />
          <div className="w"><div className="ab">
            <div className="lab rv">01 — About</div>
            <div className="rv">
              <h2 className="sr" id="about-h">About Sujoy Kumar Paul</h2>
              <p className="fill">I&apos;m a full stack web developer from Panchagarh, Bangladesh, now living in Vadodara, India. I work across the JavaScript ecosystem, from responsive interfaces in React, Next.js and Tailwind CSS to REST APIs with Node.js, Express and MongoDB.</p>
              <p><span>On HelloTalk, an English learning platform built by a team, I designed and built the entire backend. I also create my own products, like MyPaste and Profile-View. I speak Bangla natively and am comfortable in English and Hindi.</span></p>
            </div>
          </div>
          <ul className="gl">
            {glance.map(([n, l]) => <li className="rv" key={l}><b data-n={n}>{n}</b><span>{l}</span></li>)}
          </ul>
          </div>
        </section>

        <Sec id="work">
          <Head id="work" num="02" label="Selected work" title="Projects I've built." />
          <Projects items={projects} />
        </Sec>

        <Sec id="skills">
          <Head id="skills" num="03" label="Skills" title="Technologies I work with." />
          <div className="sk">
            {skills.map((g, i) => (
              <div className="sc rv" key={g.title} style={{ '--d': `${i * 0.14}s` }}>
                <h3><span>{g.title}</span><span>0{i + 1}</span></h3>
                <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </Sec>

        <section id="process" aria-labelledby="process-h">
          <span className="rl" aria-hidden="true" />
          <div className="w"><Head id="process" num="04" label="Process" title="How I build." /></div>
          <div className="hz">
            <ol className="hz-t">
              {steps.map((s) => (
                <li className="hp" key={s.n}>
                  <span className="nn" aria-hidden="true">{s.n}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <div className="tg">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </li>
              ))}
            </ol>
          </div>
          <div className="w"><div className="hz-bar" aria-hidden="true"><i /></div></div>
        </section>

        <Sec id="stories">
          <Head id="stories" num="05" label="Stories" title="Moments from behind the screen." hint="Click any image to view it larger." />
          <Gallery stories={stories} />
        </Sec>

        <Sec id="training">
          <Head id="training" num="06" label="Training" title="Courses & certifications." />
          <div className="tr">
            {training.map(([a, b, c], i) => (
              <div className="rv" key={b} style={{ '--d': `${i * 0.12}s` }}><span className="m">{a}</span><b>{b}</b><span>{c}</span></div>
            ))}
          </div>
        </Sec>

        <Sec id="contact">
          <div className="lab rv" style={{ marginBottom: 26 }}>07 — Contact</div>
          <h2 className="ct sp" id="contact-h">Let&apos;s work<br />together<em className="pd">.</em></h2>
          <div className="cn rv">
            {phones.map((p) => (
              <div className="cn-r" key={p.tel}>
                <span className="cn-l">{p.label} · WhatsApp</span>
                <span className="cn-n">{p.display}</span>
                <span className="cn-a">
                  <a className="sq" href={`tel:${p.tel}`}>Call</a>
                  <a className="sq f" href={waLink(p)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                </span>
              </div>
            ))}
          </div>
          <div className="cl rv">
            <a href={SITE.oldPortfolio} target="_blank" rel="noopener noreferrer"><span>Old Portfolio</span><span>spsujoy.netlify.app ↗</span></a>
            <div><span>Location</span><span>Vadodara, Gujarat, India</span></div>
          </div>
        </Sec>
      </main>

    </>
  );
}
