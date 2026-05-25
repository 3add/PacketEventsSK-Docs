import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "PacketEventsSK",
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
          { text: 'Prerequisites', link: '/dev/prerequisites' },
          { text: 'Packet Listening', link: '/dev/packet-listening' },
          { text: 'Packet Creation', link: '/dev/packet-creation' },
          { text: 'Fake Entities', link: '/dev/fake-entities' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Debug Screen', link: '/examples/debug-screen'},
          { text: 'Mod Detection', link: '/examples/mod-detection' },
          { text: 'Scrollable GUI', link: '/examples/scrollable-gui' },
          { text: 'Welcome Display', link: '/examples/welcome-display' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/3add/packeteventssk' },
      { icon: 'discord', link: 'https://discord.gg/CzQ863nxDB' }
    ]
  }
})
