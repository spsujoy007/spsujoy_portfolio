import { ImageResponse } from 'next/og';
import { getPost } from '../../../lib/posts';

export const alt = 'Blog post by Sujoy Kumar Paul';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  const title = p ? p.title : 'Blog';
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0a0a0a', color: '#fafafa', padding: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: '#9b9b9b' }}>
          <div style={{ width: 18, height: 18, background: '#ff6a1f' }} />
          <div>Sujoy Paul · Blog</div>
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 62 : 80, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>{title}</div>
        <div style={{ display: 'flex', gap: 12, fontSize: 26, color: '#ff6a1f' }}>{p ? p.tags.join('  ·  ') : ''}</div>
      </div>
    ),
    size
  );
}
