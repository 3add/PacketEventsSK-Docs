import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PacketEventsSK Docs",
  description: "The docs for the PacketEventsSK Skript addon",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      { text: 'Introduction', link: '/intro' },
      {
        text: 'User Setup',
        items: [
          { text: 'Installation', link: '/user-setup/installation' },
          { text: 'Configuration', link: '/user-setup/configuration' }
        ]
      },
      {
        text: 'Development',
        items: [
          { text: 'Prerequisites', link: '/dev/prerequisites' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/3add/packeteventssk' }
    ]
  }
})
