// config/theme.ts
// ✅ ALL color/font/spacing changes happen HERE only
// Design system adapted from Stitch project: Ascent Educational System
// Never hardcode colors in components

export const theme = {
  colors: {
    // Primary brand — Vibrant Indigo
    primary: "#3525cd",
    primaryContainer: "#4f46e5",
    primaryLight: "#e2dfff",
    primaryDim: "#c3c0ff",
    onPrimary: "#ffffff",
    onPrimaryContainer: "#dad7ff",

    // Secondary — Deep violet
    secondary: "#5b598c",
    secondaryContainer: "#c7c3fe",
    onSecondary: "#ffffff",
    onSecondaryContainer: "#514f81",

    // Tertiary — Neutral dark
    tertiary: "#46494a",
    tertiaryContainer: "#5e6061",
    onTertiary: "#ffffff",
    onTertiaryContainer: "#dadbdc",

    // Surfaces
    background: "#f9f9ff",
    surface: "#f9f9ff",
    surfaceBright: "#f9f9ff",
    surfaceContainer: "#e7eefe",
    surfaceContainerHigh: "#e2e8f8",
    surfaceContainerHighest: "#dce2f3",
    surfaceContainerLow: "#f0f3ff",
    surfaceContainerLowest: "#ffffff",
    surfaceDim: "#d3daea",
    surfaceTint: "#4d44e3",
    surfaceVariant: "#dce2f3",

    // On-surface
    onSurface: "#151c27",
    onSurfaceVariant: "#464555",
    onBackground: "#151c27",

    // Inverse
    inverseSurface: "#2a313d",
    inverseOnSurface: "#ebf1ff",
    inversePrimary: "#c3c0ff",

    // Outline
    outline: "#777587",
    outlineVariant: "#c7c4d8",

    // Semantic
    error: "#ba1a1a",
    errorContainer: "#ffdad6",
    onError: "#ffffff",
    onErrorContainer: "#93000a",
    success: "#16a34a",
    warning: "#d97706",
    info: "#0284c7",
  },

  fonts: {
    heading: "var(--font-heading)", // Plus Jakarta Sans
    body: "var(--font-body)", // Inter
  },

  typography: {
    displayLg: {
      fontFamily: "var(--font-heading)",
      fontSize: "48px",
      fontWeight: "800",
      lineHeight: "1.1",
      letterSpacing: "-0.02em",
    },
    displayLgMobile: {
      fontFamily: "var(--font-heading)",
      fontSize: "32px",
      fontWeight: "800",
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
    },
    headlineMd: {
      fontFamily: "var(--font-heading)",
      fontSize: "30px",
      fontWeight: "700",
      lineHeight: "1.3",
    },
    headlineSm: {
      fontFamily: "var(--font-heading)",
      fontSize: "24px",
      fontWeight: "700",
      lineHeight: "1.4",
    },
    bodyLg: {
      fontFamily: "var(--font-body)",
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.6",
    },
    bodyMd: {
      fontFamily: "var(--font-body)",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    labelMd: {
      fontFamily: "var(--font-body)",
      fontSize: "14px",
      fontWeight: "600",
      lineHeight: "1",
      letterSpacing: "0.01em",
    },
    labelSm: {
      fontFamily: "var(--font-body)",
      fontSize: "12px",
      fontWeight: "500",
      lineHeight: "1",
    },
  },

  borderRadius: {
    sm: "0.25rem",
    DEFAULT: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },

  spacing: {
    base: "4px",
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
    marginMobile: "16px",
    marginDesktop: "64px",
    gutter: "24px",
    sectionY: "py-20 lg:py-28",
    containerX: "px-4 sm:px-6 lg:px-8",
    maxWidth: "max-w-7xl mx-auto",
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(30, 27, 75, 0.05)",
    md: "0 4px 6px -2px rgba(30, 27, 75, 0.03), 0 10px 15px -3px rgba(30, 27, 75, 0.05)",
    lg: "0 10px 15px -3px rgba(30, 27, 75, 0.08), 0 4px 6px -2px rgba(30, 27, 75, 0.04)",
    xl: "0 20px 25px -5px rgba(30, 27, 75, 0.1), 0 10px 10px -5px rgba(30, 27, 75, 0.04)",
    glass: "0 8px 32px rgba(30, 27, 75, 0.12)",
  },
} as const;

export type Theme = typeof theme;
