import { useEffect } from 'react';
import { LandingPageData } from '../hooks/useLandingPageData';

interface DynamicColorsProps {
  colors: LandingPageData['colors'];
}

export default function DynamicColors({ colors }: DynamicColorsProps) {
  useEffect(() => {
    if (!colors) return;

    // Apply section background colors directly to CSS variables
    const root = document.documentElement;

    // Apply section background colors
    if (colors.hero) {
      root.style.setProperty('--section-hero-bg', colors.hero);
    }

    if (colors.form) {
      root.style.setProperty('--section-form-bg', colors.form);
    }

    if (colors.gallery) {
      root.style.setProperty('--section-gallery-bg', colors.gallery);
    }

    if (colors.showroom) {
      root.style.setProperty('--section-showroom-bg', colors.showroom);
    }

    if (colors.testimonials) {
      root.style.setProperty('--section-testimonials-bg', colors.testimonials);
    }

    if (colors.history) {
      root.style.setProperty('--section-history-bg', colors.history);
    }

    if (colors.faq) {
      root.style.setProperty('--section-faq-bg', colors.faq);
    }

    if (colors.footer) {
      root.style.setProperty('--section-footer-bg', colors.footer);
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
