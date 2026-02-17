import React from "react";
import { colors, typography, borders, shadows, animation } from "@neo-brutal/tokens";
import { usePress } from "../hooks/usePress";

// ── Types ─────────────────────────────────────────────────────────

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "yellow" | "coral";
export type ButtonSize    = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label text */
  label:      string;
  /** Visual variant */
  variant?:   ButtonVariant;
  /** Size preset */
  size?:      ButtonSize;
  /** Icon rendered before label */
  icon?:      React.ReactNode;
  /** Icon rendered after label */
  trailingIcon?: React.ReactNode;
  /** Stretch to fill container width */
  fullWidth?: boolean;
  /** Shows a spinner and disables interaction */
  loading?:   boolean;
}

// ── Style maps ────────────────────────────────────────────────────

const VARIANT_BG: Record<ButtonVariant, string> = {
  primary:   colors.mint,
  secondary: colors.lavender,
  danger:    colors.pink,
  ghost:     "transparent",
  yellow:    colors.yellow,
  coral:     colors.coral,
};

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: "6px 14px",  fontSize: typography.fontSizes.sm,   borderRadius: borders.radii.sm },
  md: { padding: "10px 20px", fontSize: typography.fontSizes.md,   borderRadius: borders.radii.md },
  lg: { padding: "14px 28px", fontSize: typography.fontSizes.base, borderRadius: borders.radii.lg },
};

// ── Component ─────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      variant    = "primary",
      size       = "md",
      icon,
      trailingIcon,
      fullWidth  = false,
      loading    = false,
      disabled,
      onClick,
      style,
      ...rest
    },
    ref,
  ) => {
    const { pressed, handlers } = usePress();
    const isDisabled = disabled || loading;
    const bg = VARIANT_BG[variant];

    const baseStyle: React.CSSProperties = {
      // Layout
      display:        "inline-flex",
      alignItems:     "center",
      justifyContent: "center",
      gap:            "8px",
      width:          fullWidth ? "100%" : undefined,
      // Typography
      fontFamily:     typography.fonts.body,
      fontWeight:     typography.fontWeights.bold,
      color:          colors.black,
      whiteSpace:     "nowrap",
      textDecoration: "none",
      // Neo-brutalist chrome
      background:     isDisabled ? colors.gray200 : bg,
      border:         `${borders.width.base} solid ${isDisabled ? colors.gray400 : colors.black}`,
      boxShadow:      isDisabled ? shadows.none
                    : pressed    ? shadows.none
                    : variant === "ghost" ? shadows.none
                    : shadows.sm,
      // Press animation
      transform:      pressed && !isDisabled ? `translate(2px, 2px)` : "none",
      // States
      cursor:         isDisabled ? "not-allowed" : "pointer",
      userSelect:     "none",
      opacity:        isDisabled ? 0.65 : 1,
      // Transition
      transition:     `transform ${animation.durations.instant} ${animation.easings.out},
                       box-shadow ${animation.durations.instant} ${animation.easings.out}`,
      // Size
      ...SIZE_STYLES[size],
      // Consumer overrides
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        onClick={isDisabled ? undefined : onClick}
        style={baseStyle}
        {...handlers}
        {...rest}
      >
        {loading ? (
          <LoadingSpinner size={size} />
        ) : (
          <>
            {icon && <span aria-hidden="true">{icon}</span>}
            {label}
            {trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

// ── Loading spinner ───────────────────────────────────────────────

function LoadingSpinner({ size }: { size: ButtonSize }) {
  const s = size === "sm" ? 12 : size === "lg" ? 18 : 14;
  return (
    <span
      aria-label="Loading"
      role="status"
      style={{
        display:      "inline-block",
        width:        s,
        height:       s,
        border:       `2px solid ${colors.black}`,
        borderTop:    `2px solid transparent`,
        borderRadius: "50%",
        animation:    "nb-spin 0.6s linear infinite",
      }}
    />
  );
}
