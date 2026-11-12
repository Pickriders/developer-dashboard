import type { Config } from "tailwindcss";

/** A token from globals.css, with Tailwind's opacity modifier (bg-brand/10). */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

/** A status or brand colour: solid (dots, fills), fg (text), subtle (tinted background), line (its border). */
const tone = (name: string) => ({
  DEFAULT: token(name),
  fg: token(`${name}-fg`),
  subtle: token(`${name}-subtle`),
  line: token(`${name}-line`),
});

/** The design system in DESIGN.md: the Pickriders storefront dashboard's look, in light and dark. */
const config: Config = {
  darkMode: ["class"],
  content: ["./src/components/**/*.{ts,tsx}", "./src/app/**/*.{ts,tsx}", "./src/lib/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        canvas: token("canvas"),
        surface: {
          DEFAULT: token("surface"),
          raised: token("surface-raised"),
          subtle: token("surface-subtle"),
          muted: token("surface-muted"),
        },
        line: { DEFAULT: token("line"), strong: token("line-strong") },
        fg: {
          DEFAULT: token("fg"),
          heading: token("fg-heading"),
          muted: token("fg-muted"),
          subtle: token("fg-subtle"),
          inverse: token("fg-inverse"),
        },
        brand: {
          ...tone("brand"),
          solid: token("brand-solid"),
          "solid-hover": token("brand-solid-hover"),
          ink: token("brand-ink"),
        },
        success: tone("success"),
        warning: tone("warning"),
        danger: tone("danger"),
        info: tone("info"),
        plum: { DEFAULT: token("plum"), mid: token("plum-mid") },
      },
      fontFamily: {
        sans: ["var(--font-urbanist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }], // 11
      },
      boxShadow: {
        card: "var(--shadow-card)",
        pop: "var(--shadow-pop)",
        button: "var(--shadow-button)",
      },
      spacing: {
        header: "var(--header-height)",
        sidebar: "var(--sidebar-width)",
      },
      transitionTimingFunction: { out: "var(--ease-out)" },
      transitionDuration: { fast: "120ms", base: "200ms" },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(6px)" }, to: { opacity: "1", transform: "none" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
        shake: {
          "0%, 100%": { transform: "none" },
          "20%, 60%": { transform: "translateX(-4px)" },
          "40%, 80%": { transform: "translateX(4px)" },
        },
        rise: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
        draw: { from: { strokeDashoffset: "var(--path-length, 40)" }, to: { strokeDashoffset: "0" } },
        blink: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        "pop-in": { from: { opacity: "0", transform: "scale(0.96)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: {
        "fade-in": "fade-in 200ms var(--ease-out)",
        "slide-up": "slide-up 200ms var(--ease-out)",
        shimmer: "shimmer 1.6s linear infinite",
        shake: "shake 320ms var(--ease-out)",
        rise: "rise 480ms var(--ease-out) both",
        draw: "draw 520ms var(--ease-out) 120ms both",
        blink: "blink 1s step-end infinite",
        float: "float 6s ease-in-out infinite",
        "pop-in": "pop-in 200ms var(--ease-out)",
      },
    },
  },
  plugins: [],
};

export default config;
