module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Academic palette tokens (used in components and overrides)
        "oijpcr-blue": "#1b3a5c",
        "oijpcr-navy": "#1b3a5c",
        "oijpcr-navy-dark": "#142d48",
        "oijpcr-accent": "#8a6a2b",
        "oijpcr-accent-light": "#f5edd8",
        "oijpcr-bg": "#f8f7f4",
        "oijpcr-surface": "#ffffff",
        "oijpcr-surface-2": "#f2f1ee",
        "oijpcr-text": "#1a1916",
        "oijpcr-text-muted": "#5a5854",
        "oijpcr-border": "rgba(30, 28, 20, 0.12)",
        "oijpcr-footer-text": "#d6d3cd",
        "oijpcr-footer-link": "#c9b88a",
      },
      fontFamily: {
        serif: ["'Libre Baskerville'", "Georgia", "serif"],
        sans: ["'Source Sans 3'", "'Helvetica Neue'", "Arial", "sans-serif"],
        display: ["'Libre Baskerville'", "Georgia", "serif"],
        body: ["'Source Sans 3'", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
      fontSize: {
        prose: ["1.0625rem", { lineHeight: "1.75" }],
      },
      letterSpacing: {
        nav: "0.05em",
        "section-label": "0.04em",
      },
      maxWidth: {
        prose: "720px",
      },
      borderRadius: {
        sharp: "3px",
      },
      height: {
        "8xl": "90rem",
      },
      maxHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "full": "100%",
      },
    },
  },
};
