import React from "react";
import { colors, borders, shadows } from "@neo-brutal/tokens";
import type { RadiusToken, ShadowToken } from "@neo-brutal/tokens";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Background color */
  bg?:      string;
  /** Border radius token */
  radius?:  RadiusToken;
  /** Shadow token */
  shadow?:  ShadowToken;
  /** Inner padding */
  padding?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, bg = colors.white, radius = "lg", shadow = "md", padding = "16px", style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        background:   bg,
        border:       `${borders.width.base} solid ${borders.color}`,
        borderRadius: borders.radii[radius],
        boxShadow:    shadows[shadow],
        padding,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  ),
);

Card.displayName = "Card";
