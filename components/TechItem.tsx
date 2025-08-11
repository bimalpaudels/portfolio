import { SimpleIcon } from "simple-icons";

interface TechItemProps {
  name: string;
  icon: {
    type: 'simple' | 'custom';
    data?: SimpleIcon;
    component?: React.ReactNode;
  };
  index: number;
}

export function TechItem({ name, icon, index }: TechItemProps) {
  const renderIcon = () => {
    if (icon.type === 'custom' && icon.component) {
      return icon.component;
    }
    
    if (icon.type === 'simple' && icon.data) {
      const { path, hex } = icon.data;
      const lightColor = `#${hex}`;
      
      // Special handling for dark mode colors
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
        '--hover-border-color': icon.type === 'simple' && icon.data ? `#${icon.data.hex}` : 'transparent',
        '--hover-border-color-dark': icon.type === 'simple' && icon.data ? getDarkModeColor(icon.data.hex) : 'transparent',
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        const iconContainer = e.currentTarget.querySelector('.icon-container') as HTMLElement;
        if (iconContainer && icon.type === 'simple' && icon.data) {
          const color = getComputedStyle(document.documentElement).getPropertyValue('color-scheme').includes('dark') 
            ? getDarkModeColor(icon.data.hex)
            : `#${icon.data.hex}`;
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