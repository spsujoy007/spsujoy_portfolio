'use client';

export default function ThemeToggle() {
  const toggle = () => {
    const d = document.documentElement;
    const cur = d.dataset.theme || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    d.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  };
  return (
    <button className="sq ic" onClick={toggle} aria-label="Toggle light and dark theme" title="Toggle theme">
      <svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" /><path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" /></svg>
    </button>
  );
}
