import React from "react";
import { colors, borders, shadows } from "@neo-brutal/tokens";

export interface AvatarProps {
  /** Emoji or single character to display */
  emoji?:     string;
  /** Image src URL */
  src?:       string;
  /** Alt text for image */
  alt?:       string;
  /** Size in px */
  size?:      number;
  /** Background color */
  color?:     string;
  style?:     React.CSSProperties;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  emoji,
  src,
  alt    = "",
  size   = 40,
  color  = colors.coral,
  style,
  className,
}) => (
  <div
    className={className}
    style={{
      width:          size,
      height:         size,
      background:     src ? "transparent" : color,
      border:         `${borders.width.base} solid ${borders.color}`,
      borderRadius:   borders.radii.full,
      boxShadow:      shadows.sm,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      fontSize:       size * 0.5,
      overflow:       "hidden",
      flexShrink:     0,
      ...style,
    }}
  >
    {src ? (
      <img src={src} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      emoji
    )}
  </div>
);

Avatar.displayName = "Avatar";

// ── AvatarGroup ────────────────────────────────────────────────────

export interface AvatarGroupProps {
  avatars: Array<Pick<AvatarProps, "emoji" | "src" | "alt" | "color">>;
  size?:   number;
  max?:    number;
}

const GROUP_COLORS = [colors.coral, colors.mint, colors.lavender, colors.yellow, colors.pink];

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size  = 36,
  max   = 4,
}) => {
  const visible  = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div style={{ display: "flex" }}>
      {visible.map((a, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -(size * 0.3), zIndex: visible.length - i }}>
          <Avatar
            {...a}
            size={size}
            color={a.color ?? GROUP_COLORS[i % GROUP_COLORS.length]}
          />
        </div>
      ))}
      {overflow > 0 && (
        <div style={{ marginLeft: -(size * 0.3), zIndex: 0 }}>
          <Avatar
            emoji={`+${overflow}`}
            size={size}
            color={colors.gray200}
            style={{ fontSize: size * 0.32 }}
          />
        </div>
      )}
    </div>
  );
};

AvatarGroup.displayName = "AvatarGroup";
