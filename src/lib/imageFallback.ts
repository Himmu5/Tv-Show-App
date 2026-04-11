/** Remote fallback when API omits art (also used in SafeImage chain before SVG). */
export const placeholderImage =
  "https://wikitechlibrary.com/ezoimgfmt/i0.wp.com/wikitechlibrary.com/hub/wp-content/uploads/2022/11/entertainment-hub.webp?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-2&ssl=1&w=771";

/** Always-loads 2:3 poster placeholder (theme zinc). */
export const FALLBACK_SVG_POSTER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#27272a"/><stop offset="1" stop-color="#18181b"/>
      </linearGradient></defs>
      <rect width="400" height="600" fill="url(#g)"/>
      <g fill="#52525b" opacity="0.9">
        <rect x="140" y="260" width="120" height="10" rx="3"/>
        <rect x="120" y="285" width="160" height="8" rx="3"/>
        <rect x="160" y="308" width="80" height="8" rx="3"/>
      </g>
    </svg>`
  );

/** Square / headshot placeholder for cast & people. */
export const FALLBACK_SVG_PERSON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="p" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3f3f46"/><stop offset="1" stop-color="#18181b"/>
      </linearGradient></defs>
      <rect width="160" height="200" fill="url(#p)"/>
      <circle cx="80" cy="72" r="28" fill="#52525b"/>
      <path fill="#52525b" d="M32 178c4-36 28-58 48-58s44 22 48 58H32z"/>
    </svg>`
  );
