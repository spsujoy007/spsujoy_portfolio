/* Decorative outlined lettering. Purely visual: hidden from assistive tech and never interactive. */
export default function Gap({ className = '' }) {
  return (
    <span className={`gp ${className}`} aria-hidden="true"><b>G</b><b>A</b><b>P</b></span>
  );
}
