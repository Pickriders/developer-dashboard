import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

/** A token from globals.css, with Tailwind's opacity modifier (bg-brand/10). */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

/** A status or brand colour: solid (dots, fills), fg (text), subtle (tinted background), line (its border). */
const tone = (name: string) => ({
  DEFAULT: token(name),
  fg: token(`${name}-fg`),
  subtle: token(`${name}-subtle`),
  line: token(`${name}-line`),
});

/** The design system in DESIGN.md: neutral surfaces, one accent, hairlines, Geist. */
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
          muted: token("fg-muted"),
          subtle: token("fg-subtle"),
          inverse: token("fg-inverse"),
        },
        brand: tone("brand"),
        success: tone("success"),
        warning: tone("warning"),
        danger: tone("danger"),
        info: tone("info"),

        // shadcn/ui's names (components/ui) resolve to the same tokens.
        background: token("background"),
        foreground: token("foreground"),
        card: { DEFAULT: token("card"), foreground: token("card-foreground") },
        popover: { DEFAULT: token("popover"), foreground: token("popover-foreground") },
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        secondary: { DEFAULT: token("secondary"), foreground: token("secondary-foreground") },
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        accent: { DEFAULT: token("accent"), foreground: token("accent-foreground") },
        destructive: { DEFAULT: token("destructive"), foreground: token("destructive-foreground") },
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        chart: {
          "1": token("chart-1"),
          "2": token("chart-2"),
          "3": token("chart-3"),
          "4": token("chart-4"),
          "5": token("chart-5"),
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      // A dense UI scale: 13px is the default control and table text, 14px reading text.
      // Headings tighten as they grow; nothing above 600 weight.
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }], // 11
        xs: ["0.75rem", { lineHeight: "1rem" }], // 12
        sm: ["0.8125rem", { lineHeight: "1.25rem" }], // 13
        base: ["0.875rem", { lineHeight: "1.375rem" }], // 14
        lg: ["1rem", { lineHeight: "1.5rem", letterSpacing: "-0.005em" }], // 16
        xl: ["1.125rem", { lineHeight: "1.625rem", letterSpacing: "-0.01em" }], // 18
        "2xl": ["1.375rem", { lineHeight: "1.875rem", letterSpacing: "-0.015em" }], // 22
        "3xl": ["1.75rem", { lineHeight: "2.25rem", letterSpacing: "-0.02em" }], // 28
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.025em" }], // 36
      },
      borderRadius: {
        lg: "var(--radius)", // 8: cards, dialogs
        md: "calc(var(--radius) - 2px)", // 6: buttons, inputs
        sm: "calc(var(--radius) - 4px)", // 4: badges, chips
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        popover: "var(--shadow-popover)",
        dialog: "var(--shadow-dialog)",
      },
      spacing: {
        header: "var(--header-height)",
        sidebar: "var(--sidebar-width)",
      },
      transitionTimingFunction: { out: "var(--ease-out)" },
      transitionDuration: { fast: "120ms", base: "200ms" },
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "none" } },
        shimmer: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        "fade-in": "fade-in 200ms var(--ease-out)",
        "slide-up": "slide-up 200ms var(--ease-out)",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
