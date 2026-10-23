/* eslint-disable @next/next/no-img-element -- static export serves the SVG as-is */

/** The Kumokage mark (the designer's "Wolke F"), served from /kumokage-mark.svg (1448 × 913). */
export function Mark({ alt = "", className = "" }: { alt?: string; className?: string }) {
  return (
    <img
      src="/kumokage-mark.svg"
      alt={alt}
      width={1448}
      height={913}
      className={className}
      decoding="async"
    />
  );
}

/** Mark plus the letter-spaced wordmark, as on the LinkedIn cover and the capability statement. */
export function Logo({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-3" aria-label={label}>
      <Mark className="h-7 w-auto" />
      <span className="text-[0.82rem] font-semibold tracking-[0.28em] text-sumi">KUMOKAGE</span>
    </span>
  );
}
