// src/styles/theme.ts

export const COLORS = {
  primary: "#FF7A3D",        // orange
  secondary: "#FFD6C9",      // peach
  background: "#FFF8F5",     // light cream
  card: "#FFFFFF",
  text: "#1A1A1A",
  muted: "#777",
  border: "#E5E5E5",
};

export const SIZES = {
  padding: 16,
  radius: 12,
};

export const FONTS = {
  title: {
    fontSize: 24,
    fontWeight: "bold" as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 14,
  },
};