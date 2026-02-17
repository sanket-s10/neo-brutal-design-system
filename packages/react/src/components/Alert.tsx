import React from "react";
import { colors, typography, borders, shadows } from "@neo-brutal/tokens";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps {
  type?:      AlertType;
  title:      string;
  message?:   string;
  onDismiss?: () => void;
  icon?:      React.ReactNode;
  style?:     React.CSSProperties;
  className?: string;
}

const ALERT_CONFIG: Record<AlertType, { bg: string; icon: string }> = {
  info:    { bg: colors.blueLight,  icon: "ℹ" },
  success: { bg: colors.mint,       icon: "✓" },
  warning: { bg: colors.yellow,     icon: "⚠" },
  error:   { bg: colors.pinkLight,  icon: "✕" },
};

export const Alert: React.FC<AlertProps> = ({
  type    = "info",
  title,
  message,
  onDismiss,
  icon,
  style,
  className,
}) => {
  const config = ALERT_CONFIG[type];

  return (
    <div
      role="alert"
      aria-live={type === "error" ? "assertive" : "polite"}
      className={className}
      style={{
        display:      "flex",
        gap:          "12px",
        alignItems:   "flex-start",
        background:   config.bg,
        border:       `${borders.width.base} solid ${borders.color}`,
        borderRadius: borders.radii.lg,
        boxShadow:    shadows.md,
        padding:      "12px 16px",
        ...style,
      }}
    >
      {/* Icon */}
      <div
        aria-hidden="true"
        style={{
          width:          28,
          height:         28,
          background:     colors.black,
          borderRadius:   borders.radii.sm,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          color:          colors.white,
          fontSize:       typography.fontSizes.md,
          flexShrink:     0,
          fontWeight:     typography.fontWeights.bold,
        }}
      >
        {icon ?? config.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily:  typography.fonts.body,
          fontSize:    typography.fontSizes.sm,
          fontWeight:  typography.fontWeights.bold,
          lineHeight:  typography.lineHeights.snug,
          margin:      0,
        }}>
          {title}
        </p>
        {message && (
          <p style={{
            fontFamily: typography.fonts.body,
            fontSize:   typography.fontSizes.xs,
            opacity:    0.75,
            marginTop:  "3px",
            lineHeight: typography.lineHeights.normal,
          }}>
            {message}
          </p>
        )}
      </div>

      {/* Dismiss */}
      {onDismiss && (
        <button
          aria-label="Dismiss"
          onClick={onDismiss}
          style={{
            background:  "transparent",
            border:      "none",
            cursor:      "pointer",
            fontSize:    "18px",
            lineHeight:  1,
            padding:     "0 2px",
            flexShrink:  0,
            opacity:     0.6,
            fontWeight:  typography.fontWeights.bold,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";
