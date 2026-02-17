import React from "react";
import { colors, typography, borders, shadows } from "@neo-brutal/tokens";

export interface BadgeProps {
  label:      string;
  /** Background color — use a token or any CSS color */
  color?:     string;
  textColor?: string;
  style?:     React.CSSProperties;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color     = colors.pink,
  textColor = colors.black,
  style,
  className,
}) => (
  <span
    className={className}
    style={{
      display:       "inline-flex",
      alignItems:    "center",
      padding:       "3px 10px",
      background:    color,
      color:         textColor,
      fontFamily:    typography.fonts.body,
      fontSize:      typography.fontSizes.xs,
      fontWeight:    typography.fontWeights.bold,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      border:        `${borders.width.base} solid ${borders.color}`,
      borderRadius:  borders.radii.pill,
      boxShadow:     shadows.sm,
      whiteSpace:    "nowrap",
      ...style,
    }}
  >
    {label}
  </span>
);

Badge.displayName = "Badge";
