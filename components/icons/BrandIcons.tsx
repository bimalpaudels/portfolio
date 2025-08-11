import { ThemedIcon } from "./ThemedIcon";

interface BrandIconProps {
  size?: number;
  className?: string;
}

// Custom icons not available in SimpleIcons
export function CursorIcon({ size = 24, className = "" }: BrandIconProps) {
  return <ThemedIcon name="cursor" size={size} className={className} alt="Cursor" />;
}

export function AWSIcon({ size = 24, className = "" }: BrandIconProps) {
  return <ThemedIcon name="aws" size={size} className={className} alt="AWS" />;
}