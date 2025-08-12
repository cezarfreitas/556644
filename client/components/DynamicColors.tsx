import { useEffect } from 'react';
import { LandingPageData } from '../hooks/useLandingPageData';

interface DynamicColorsProps {
  colors: LandingPageData['colors'];
}

export default function DynamicColors({ colors }: DynamicColorsProps) {
  useEffect(() => {
    if (!colors) return;

    // Helper function to convert hex to HSL
    const hexToHsl = (hex: string) => {
      if (!hex || !hex.startsWith('#')) return '0 0% 0%';
      
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
          default: h = 0;
        }
        h /= 6;
      }

      return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
    };

    // Apply CSS custom properties to the document root
    const root = document.documentElement;

    // Primary colors
    if (colors.primary) {
      root.style.setProperty('--primary', hexToHsl(colors.primary));
      root.style.setProperty('--primary-foreground', hexToHsl(colors.text?.inverse || '#ffffff'));
    }

    if (colors.primaryDark) {
      root.style.setProperty('--primary-dark', hexToHsl(colors.primaryDark));
    }

    if (colors.primaryLight) {
      root.style.setProperty('--primary-light', hexToHsl(colors.primaryLight));
    }

    // Secondary colors
    if (colors.secondary) {
      root.style.setProperty('--secondary', hexToHsl(colors.secondary));
      root.style.setProperty('--secondary-foreground', hexToHsl(colors.text?.inverse || '#ffffff'));
    }

    if (colors.accent) {
      root.style.setProperty('--accent', hexToHsl(colors.accent));
      root.style.setProperty('--accent-foreground', hexToHsl(colors.text?.inverse || '#ffffff'));
    }

    // Background colors
    if (colors.background) {
      root.style.setProperty('--background', hexToHsl(colors.background));
    }

    if (colors.surface) {
      root.style.setProperty('--card', hexToHsl(colors.surface));
      root.style.setProperty('--card-foreground', hexToHsl(colors.text?.primary || '#000000'));
    }

    // Text colors
    if (colors.text?.primary) {
      root.style.setProperty('--foreground', hexToHsl(colors.text.primary));
    }

    if (colors.text?.secondary) {
      root.style.setProperty('--muted-foreground', hexToHsl(colors.text.secondary));
      root.style.setProperty('--muted', hexToHsl(colors.surface || '#f8f9fa'));
    }

    // Border colors
    if (colors.border) {
      root.style.setProperty('--border', hexToHsl(colors.border));
      root.style.setProperty('--input', hexToHsl(colors.border));
    }

    // Ring (focus) color
    if (colors.primary) {
      root.style.setProperty('--ring', hexToHsl(colors.primary));
    }

    // Custom CSS variables for components
    if (colors.button?.primary) {
      root.style.setProperty('--button-primary', colors.button.primary);
    }

    if (colors.button?.primaryHover) {
      root.style.setProperty('--button-primary-hover', colors.button.primaryHover);
    }

    if (colors.button?.secondary) {
      root.style.setProperty('--button-secondary', colors.button.secondary);
    }

    if (colors.button?.secondaryHover) {
      root.style.setProperty('--button-secondary-hover', colors.button.secondaryHover);
    }

    if (colors.overlay) {
      root.style.setProperty('--overlay', colors.overlay);
    }

    // Apply Onbongo specific colors (for compatibility with existing classes)
    if (colors.primary) {
      root.style.setProperty('--onbongo-primary', colors.primary);
      root.style.setProperty('--onbongo-500', colors.primary);
    }

    if (colors.primaryDark) {
      root.style.setProperty('--onbongo-600', colors.primaryDark);
      root.style.setProperty('--onbongo-700', colors.primaryDark);
    }

    if (colors.primaryLight) {
      root.style.setProperty('--onbongo-400', colors.primaryLight);
      root.style.setProperty('--onbongo-300', colors.primaryLight);
    }

  }, [colors]);

  return null; // This component doesn't render anything
}

// Export function to get current color values
export const getCurrentColors = (): LandingPageData['colors'] | null => {
  if (typeof window === 'undefined') return null;
  
  const savedData = localStorage.getItem('landingPageData');
  if (!savedData) return null;
  
  try {
    const parsedData = JSON.parse(savedData);
    return parsedData.colors || null;
  } catch {
    return null;
  }
};

// Export function to apply a color theme
export const applyColorTheme = (theme: 'default' | 'dark' | 'blue' | 'green') => {
  const themes = {
    default: {
      primary: '#e86001',
      primaryDark: '#d35400',
      primaryLight: '#f39c12',
      secondary: '#2c3e50',
      accent: '#3498db',
    },
    dark: {
      primary: '#f39c12',
      primaryDark: '#e67e22',
      primaryLight: '#f1c40f',
      secondary: '#34495e',
      accent: '#9b59b6',
    },
    blue: {
      primary: '#3498db',
      primaryDark: '#2980b9',
      primaryLight: '#5dade2',
      secondary: '#2c3e50',
      accent: '#e74c3c',
    },
    green: {
      primary: '#27ae60',
      primaryDark: '#229954',
      primaryLight: '#58d68d',
      secondary: '#2c3e50',
      accent: '#f39c12',
    },
  };

  return themes[theme] || themes.default;
};
