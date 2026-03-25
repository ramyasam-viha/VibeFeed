import { Platform } from 'react-native';

export const theme = {
  // Primary
  primary: '#FE2C55',
  primaryLight: '#FF6B81',
  primaryDark: '#E0264B',

  // Accent
  accent: '#25F4EE',
  accentDark: '#1AD0CB',

  // Backgrounds
  background: '#000000',
  backgroundSecondary: '#0D0D0D',
  surface: '#161616',
  surfaceLight: '#222222',
  surfaceElevated: '#2A2A2A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8E8E93',
  textTertiary: '#636366',
  textMuted: '#48484A',

  // Borders
  border: '#2C2C2E',
  borderLight: '#3A3A3C',

  // Status
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FF9500',
  blue: '#0A84FF',

  // Social
  like: '#FE2C55',
  share: '#0A84FF',

  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },

  // Border Radius
  radius: {
    small: 8,
    medium: 12,
    large: 16,
    xl: 20,
    full: 9999,
  },

  // Typography
  typography: {
    heroUsername: { fontSize: 16, fontWeight: '700' as const, color: '#FFFFFF' },
    description: { fontSize: 14, fontWeight: '400' as const, color: '#FFFFFF' },
    sidebarCount: { fontSize: 12, fontWeight: '600' as const, color: '#FFFFFF' },
    sectionTitle: { fontSize: 18, fontWeight: '700' as const, color: '#FFFFFF' },
    statValue: { fontSize: 20, fontWeight: '700' as const, color: '#FFFFFF' },
    statLabel: { fontSize: 12, fontWeight: '400' as const, color: '#8E8E93' },
    body: { fontSize: 15, fontWeight: '400' as const, color: '#FFFFFF' },
    caption: { fontSize: 13, fontWeight: '400' as const, color: '#8E8E93' },
    tabLabel: { fontSize: 11, fontWeight: '600' as const },
    chipText: { fontSize: 14, fontWeight: '500' as const },
    searchPlaceholder: { fontSize: 16, fontWeight: '400' as const, color: '#636366' },
  },

  // Shadows
  shadows: {
    card: Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 8 },
      android: { elevation: 4 },
      default: {},
    }),
    text: {
      textShadowColor: 'rgba(0,0,0,0.75)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
  },
};
