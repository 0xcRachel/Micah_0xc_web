/**
 * Site configuration — edit these placeholders to wire up real links.
 */
export const config = {
  /** Primary download URL for the Micah .exe. Set to GitHub Releases when published. */
  DOWNLOAD_URL: './Micah_0xC_0.5.0_x64-setup.exe',

  /** Discord invite URL for the "Join Discord" CTA. */
  DISCORD_URL: '#',

  /** GitHub repository link (footer + source). */
  REPO_URL: 'https://github.com/0xcRachel/Micah_0xC',

  /** Show a "coming soon" badge on download buttons while DOWNLOAD_URL is '#'. */
  DOWNLOAD_COMING_SOON: true,

  /** Latest version label shown on download buttons. */
  VERSION: '0.5.0',
} as const
