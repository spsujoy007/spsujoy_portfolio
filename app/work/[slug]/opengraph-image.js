import { ImageResponse } from 'next/og';
import { getProject } from '../../../lib/data';

export const alt = 'Project by Sujoy Kumar Paul';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  const stack = p ? [...p.frameworks, ...p.other].slice(0, 5).join('  ·  ') : '';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0a0a0a', color: '#fafafa', padding: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: '#9b9b9b' }}>
          <div style={{ width: 18, height: 18, background: '#ff6a1f' }} />
          <div>Sujoy Paul · Project</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{p ? p.name : 'Project'}<span style={{ color: '#ff6a1f' }}>.</span></div>
          <div style={{ display: 'flex', fontSize: 38, color: '#9b9b9b', marginTop: 22 }}>{p ? p.tagline : ''}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#ff6a1f' }}>{stack}</div>
      </div>
    ),
    size
  );
}
