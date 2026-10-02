import Link from 'next/link';
import Gap from './Gap';
import { SITE, phones, waLink } from '../lib/data';

const words = ['Thanks for visiting', 'See you soon', "Let's build together", 'Full Stack Web Developer'];

export default function Footer() {
  return (
    <footer>
      <div className="fsh" aria-hidden="true"><i /><i /><i /><Gap className="gp-foot" /></div>
      <div className="w ft-top">
        <p className="lab">end of page · <span className="ft-pc">100</span>% explored</p>
        <h2 className="ft-h sp">Thanks for<br />visiting<em className="pd">.</em></h2>
        <p className="ft-p">You made it to the end. If something here sparked an idea, let&apos;s build it together.</p>
        <div className="ft-b">
          <a className="sq f" href={waLink(phones[0])} target="_blank" rel="noopener noreferrer">WhatsApp {phones[0].display}</a>
          <a className="sq" href={`tel:${phones[0].tel}`}>Call</a>
          <button type="button" className="sq" id="party">Celebrate</button>
          <a className="sq" id="totop" href="#">Back to top ↑</a>
        </div>
      </div>
      <div className="ft-mq" aria-hidden="true">
        <div className="row">{[0, 1, 2, 3].flatMap(() => words).map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>
      <div className="big" aria-hidden="true">SUJOY PAUL</div>
      <div className="w">
        <span>© {new Date().getFullYear()} {SITE.name} · Built with Next.js &amp; GSAP</span>
        <span className="fl">
          <Link href="/blog">Blog</Link>
          <a href="/blog/feed.xml">RSS</a>
        </span>
      </div>
    </footer>
  );
}
