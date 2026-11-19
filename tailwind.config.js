module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        // Mirrors the CSS custom properties in src/index.css.
        ink: "#16181d",
        "ink-soft": "#353943",
        muted: "#5b606a",
        paper: "#ffffff",
        "paper-alt": "#f0f2f1",
        hair: "#d8dbdc",
        accent: "#b83a1b",
        "accent-deep": "#8f2b12",
        deep: "#0f2f43",
        // Legacy names still referenced by the submission form and admin.
        "oijpcr-blue": "#0f2f43",
        "oijpcr-navy": "#0f2f43",
        "oijpcr-accent": "#b83a1b",
      },
      fontFamily: {
        serif: ["Newsreader", "Georgia", "serif"],
        display: ["Newsreader", "Georgia", "serif"],
        sans: ["'Schibsted Grotesk'", "'Helvetica Neue'", "Arial", "sans-serif"],
        body: ["'Schibsted Grotesk'", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
      height: {
        "8xl": "90rem",
      },
      maxHeight: {
        0: "0",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
    },
  },
};
