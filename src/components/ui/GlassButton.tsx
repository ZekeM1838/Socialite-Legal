import React from "react";
import Link from "next/link";

interface GlassButtonProps {
  title: string;
  onPress?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export default function GlassButton({ title, onPress, href, disabled, className }: GlassButtonProps) {
  const classes = `glass-button ${disabled ? 'disabled' : ''} ${className || ''}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {title}
      </Link>
    );
  }

  return (
    <button onClick={onPress} disabled={disabled} className={classes}>
      {title}
    </button>
  );
}
