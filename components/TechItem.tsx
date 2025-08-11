import React from "react";
import { SimpleIcon } from "simple-icons";

interface TechItemProps {
  name: string;
  icon: SimpleIcon | React.ReactNode;
  index: number;
}

export function TechItem({ name, icon, index }: TechItemProps) {
  const renderIcon = () => {
    // If it's a React component, render it directly
    if (React.isValidElement(icon)) {
      return icon;
    }
    
    // If it's a SimpleIcon object, render as SVG
    if (typeof icon === 'object' && icon && 'path' in icon && 'hex' in icon) {
      const { path, hex } = icon as SimpleIcon;
      const lightColor = `#${hex}`;
      const darkColor = getDarkModeColor(hex);
      
      return (
        <div 
          className="w-5 h-5 flex items-center justify-center"
          style={{
            '--icon-color': lightColor,
            '--icon-color-dark': darkColor,
          } as React.CSSProperties}
        >
          <svg 
            className="w-10 h-10 text-[var(--icon-color)] dark:text-[var(--icon-color-dark)]" 
            viewBox="0 0 24 24"
            data-icon={name.toLowerCase()}
          >
            <path d={path} fill="currentColor" />
          </svg>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div
      key={index}
      className="tech-card group relative overflow-hidden rounded-xl border border-transparent bg-transparent transition-all duration-300 hover:bg-white/20 dark:hover:bg-gray-800/30 hover:shadow-md hover:backdrop-blur-sm"
      style={{
        '--hover-border-color': (typeof icon === 'object' && icon && 'hex' in icon) ? `#${(icon as SimpleIcon).hex}` : 'transparent',
        '--hover-border-color-dark': (typeof icon === 'object' && icon && 'hex' in icon) ? getDarkModeColor((icon as SimpleIcon).hex) : 'transparent',
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
        if (iconContainer && typeof icon === 'object' && icon && 'hex' in icon) {
          const isDark = document.documentElement.classList.contains('dark');
          const color = isDark ? getDarkModeColor((icon as SimpleIcon).hex) : `#${(icon as SimpleIcon).hex}`;
          iconContainer.style.borderColor = color;
        }
      }}
      onMouseLeave={(e) => {
        const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
        if (iconContainer) {
          iconContainer.style.borderColor = 'transparent';
        }
      }}
    >
      <div className="p-3">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="icon-container w-10 h-10 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 border border-transparent bg-transparent group-hover:scale-110 transition-all duration-300 group-hover:bg-white/50 group-hover:backdrop-blur-sm group-hover:shadow-sm dark:group-hover:bg-gray-800/40">
            {renderIcon()}
          </div>
          <h4 className="font-semibold text-xs text-gray-900 dark:text-custom_dark group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors leading-tight">
            {name}
          </h4>
        </div>
      </div>
    </div>
  );
}

// Helper function to get dark mode colors
function getDarkModeColor(hex: string): string {
  const colorMap: Record<string, string> = {
    '000000': '#FFFFFF', // Express - white in dark mode
    '000': '#FFFFFF', // Next.js - white in dark mode  
    '092E20': '#FFFFFF', // Django - white in dark mode
  };
  
  return colorMap[hex] || `#${hex}`;
}