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

    const root = document.documentElement;

    // Apply main colors for Tailwind CSS variables
    if (colors.main?.primary) {
      root.style.setProperty('--primary', hexToHsl(colors.main.primary));
      root.style.setProperty('--primary-foreground', hexToHsl('#ffffff'));
      root.style.setProperty('--ring', hexToHsl(colors.main.primary));
      // For Onbongo compatibility
      root.style.setProperty('--onbongo-primary', colors.main.primary);
      root.style.setProperty('--onbongo-500', colors.main.primary);
    }

    if (colors.main?.secondary) {
      root.style.setProperty('--secondary', hexToHsl(colors.main.secondary));
      root.style.setProperty('--secondary-foreground', hexToHsl('#ffffff'));
    }

    if (colors.main?.tertiary) {
      root.style.setProperty('--accent', hexToHsl(colors.main.tertiary));
      root.style.setProperty('--accent-foreground', hexToHsl('#ffffff'));
    }

    if (colors.main?.quaternary) {
      root.style.setProperty('--muted', hexToHsl(colors.main.quaternary));
      root.style.setProperty('--muted-foreground', hexToHsl('#000000'));
    }

    // Apply section background colors
    if (colors.sections?.hero) {
      root.style.setProperty('--section-hero-bg', colors.sections.hero);
    }

    if (colors.sections?.form) {
      root.style.setProperty('--section-form-bg', colors.sections.form);
    }

    if (colors.sections?.gallery) {
      root.style.setProperty('--section-gallery-bg', colors.sections.gallery);
    }

    if (colors.sections?.showroom) {
      root.style.setProperty('--section-showroom-bg', colors.sections.showroom);
    }

    if (colors.sections?.testimonials) {
      root.style.setProperty('--section-testimonials-bg', colors.sections.testimonials);
    }

    if (colors.sections?.history) {
      root.style.setProperty('--section-history-bg', colors.sections.history);
    }

    if (colors.sections?.faq) {
      root.style.setProperty('--section-faq-bg', colors.sections.faq);
    }

    if (colors.sections?.footer) {
      root.style.setProperty('--section-footer-bg', colors.sections.footer);
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
