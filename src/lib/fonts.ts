import localFont from "next/font/local";

// IBM Plex (SIL Open Font License 1.1) from the Fontsource npm packages, pinned in package-lock.json.
// Local files instead of next/font/google: the build never calls Google Fonts, whose occasional
// /l/font?kit= responses break `next build` (vercel/next.js#99114), and visitors load fonts only from
// kumokage.com. The latin subset covers English, German and Italian, including ä ö ü ß à è é ì ò ù and ’ – —.
// next/font needs literal arguments, hence the repeated paths.

export const plexSans = localFont({
  variable: "--font-plex-sans",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const plexMono = localFont({
  variable: "--font-plex-mono",
  display: "swap",
  src: [
    { path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../../node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

export const fontVariables = `${plexSans.variable} ${plexMono.variable}`;
