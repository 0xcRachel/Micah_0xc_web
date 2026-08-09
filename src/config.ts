/**
 * Site configuration — edit these placeholders to wire up real links.
 */
export const config = {
  /** Primary download URL for the Micah .exe — bundled with the site (Vercel static). */
  DOWNLOAD_URL: '/downloads/Micah_0xC_0.6.0_x64_en-US.msi',

  /** Filename used for the browser `download` attribute. */
  DOWNLOAD_FILE: 'Micah_0xC_0.6.0_x64_en-US.msi',

  /** Discord invite URL for the "Join Discord" CTA. */
  DISCORD_URL: '#',

  /** GitHub repository link (footer + source). */
  REPO_URL: 'https://github.com/0xcRachel/Micah_0xC',

  /** GitHub issues link (report an issue). */
  ISSUE_URL: 'https://github.com/0xcRachel/Micah_0xC/issues',

  /** Show a "coming soon" badge on download buttons while DOWNLOAD_URL is '#'. */
  DOWNLOAD_COMING_SOON: false,

  /** Latest version label shown on download buttons. */
  VERSION: '0.6.0',
} as const
