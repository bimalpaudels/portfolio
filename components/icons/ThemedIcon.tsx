import Image from "next/image";

type IconFormat = "webp" | "png";

interface ThemedIconProps {
  /** Icon name (e.g., 'openai', 'github') */
  name: string;
  /** Icon size in pixels */
  size?: number;
  /** Additional CSS classes */
  className?: string;
  /** Force specific format (auto-detected by default) */
  format?: IconFormat;
  /** Alt text for accessibility */
  alt?: string;
}

// Icons that are smaller as PNG than WebP
const PNG_OPTIMIZED_ICONS = new Set(["cursor"]);

const CDN_BASE = "https://unpkg.com/@lobehub/icons-static-";

export function ThemedIcon({ 
  name, 
  size = 24, 
  className = "", 
  format,
  alt
}: ThemedIconProps) {
  // Auto-detect best format
  const useFormat: IconFormat = format || (PNG_OPTIMIZED_ICONS.has(name) ? "png" : "webp");
  
  const lightSrc = `${CDN_BASE}${useFormat}@latest/light/${name}.${useFormat}`;
  const darkSrc = `${CDN_BASE}${useFormat}@latest/dark/${name}.${useFormat}`;
  
  const altText = alt || `${name.charAt(0).toUpperCase() + name.slice(1)} icon`;

  return (
    <picture className={className}>
      {/* Dark mode - WebP with PNG fallback */}
      <source 
        media="(prefers-color-scheme: dark)" 
        srcSet={darkSrc}
      />
      {/* Light mode - WebP with PNG fallback */}
      <Image
        src={lightSrc}
        alt={altText}
        width={size}
        height={size}
        className="w-full h-full"
        priority
      />
    </picture>
  );
}