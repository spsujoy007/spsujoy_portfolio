import { ImageResponse } from 'next/og';

export const alt = 'Sujoy Kumar Paul — Full Stack Web Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0a0a0a', color: '#fafafa', padding: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28 }}>
          <div style={{ width: 18, height: 18, background: '#ff6a1f' }} />
          <div>Sujoy Paul</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>Sujoy Kumar Paul<span style={{ color: '#ff6a1f' }}>.</span></div>
          <div style={{ fontSize: 36, color: '#9b9b9b', marginTop: 26 }}>Full Stack Web Developer · React · Next.js · Node.js</div>
        </div>
        <div style={{ fontSize: 26, color: '#9b9b9b' }}>Vadodara, India</div>
      </div>
    ),
    size
  );
}
