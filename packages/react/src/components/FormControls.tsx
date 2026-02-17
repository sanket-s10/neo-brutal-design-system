import React from "react";
import { colors, typography, borders, shadows, animation } from "@neo-brutal/tokens";

// ─────────────────────────────────────────────────────────────────
// Toggle
// ─────────────────────────────────────────────────────────────────

export interface ToggleProps {
  checked:    boolean;
  onChange:   (checked: boolean) => void;
  label?:     string;
  /** Color of the track when checked */
  activeColor?: string;
  disabled?:  boolean;
  id?:        string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  label,
  activeColor = colors.mint,
  disabled    = false,
  id,
}) => {
  const handleChange = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <label
      htmlFor={id}
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        "10px",
        cursor:     disabled ? "not-allowed" : "pointer",
        opacity:    disabled ? 0.65 : 1,
      }}
    >
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        id={id}
        onClick={handleChange}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && handleChange()}
        style={{
          position:     "relative",
          width:        44,
          height:       26,
          background:   checked ? activeColor : colors.gray200,
          border:       `${borders.width.base} solid ${borders.color}`,
          borderRadius: borders.radii.pill,
          boxShadow:    shadows.sm,
          transition:   `background ${animation.durations.normal} ${animation.easings.out}`,
          cursor:       disabled ? "not-allowed" : "pointer",
          flexShrink:   0,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position:     "absolute",
            top:          3,
            left:         checked ? 18 : 3,
            width:        16,
            height:       16,
            background:   colors.black,
            borderRadius: "50%",
            transition:   `left ${animation.durations.normal} ${animation.easings.bounce}`,
          }}
        />
      </div>
      {label && (
        <span style={{ fontFamily: typography.fonts.body, fontWeight: typography.fontWeights.semibold, fontSize: typography.fontSizes.md }}>
          {label}
        </span>
      )}
    </label>
  );
};

Toggle.displayName = "Toggle";

// ─────────────────────────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────────────────────────

export interface CheckboxProps {
  checked:    boolean;
  onChange:   (checked: boolean) => void;
  label?:     string;
  /** Color of the checkbox when checked */
  activeColor?: string;
  disabled?:  boolean;
  id?:        string;
  indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  activeColor = colors.mint,
  disabled    = false,
  id,
  indeterminate = false,
}) => {
  const handleChange = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <label
      htmlFor={id}
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        "10px",
        cursor:     disabled ? "not-allowed" : "pointer",
        opacity:    disabled ? 0.65 : 1,
      }}
    >
      <div
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        tabIndex={0}
        id={id}
        onClick={handleChange}
        onKeyDown={(e) => (e.key === " " || e.key === "Enter") && handleChange()}
        style={{
          width:          22,
          height:         22,
          background:     checked || indeterminate ? activeColor : colors.white,
          border:         `${borders.width.base} solid ${disabled ? colors.gray400 : borders.color}`,
          borderRadius:   borders.radii.sm,
          boxShadow:      disabled ? shadows.none : shadows.sm,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
          fontSize:       "13px",
          fontWeight:     900,
          transition:     `background ${animation.durations.fast} ${animation.easings.out}`,
          cursor:         disabled ? "not-allowed" : "pointer",
        }}
      >
        {indeterminate ? "−" : checked ? "✓" : null}
      </div>
      {label && (
        <span style={{ fontFamily: typography.fonts.body, fontWeight: typography.fontWeights.semibold, fontSize: typography.fontSizes.md }}>
          {label}
        </span>
      )}
    </label>
  );
};

Checkbox.displayName = "Checkbox";

// ─────────────────────────────────────────────────────────────────
// Slider
// ─────────────────────────────────────────────────────────────────

export interface SliderProps {
  value:    number;
  onChange: (value: number) => void;
  min?:     number;
  max?:     number;
  step?:    number;
  color?:   string;
  label?:   string;
  showValue?: boolean;
  disabled?: boolean;
  id?:      string;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  onChange,
  min      = 0,
  max      = 100,
  step     = 1,
  color    = colors.pink,
  label,
  showValue = false,
  disabled  = false,
  id,
}) => {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div>
      {(label || showValue) && (
        <div style={{
          display:        "flex",
          justifyContent: "space-between",
          marginBottom:   "8px",
          fontFamily:     typography.fonts.body,
          fontSize:       typography.fontSizes.sm,
          fontWeight:     typography.fontWeights.bold,
        }}>
          {label && <span>{label}</span>}
          {showValue && <span>{value}</span>}
        </div>
      )}
      <div style={{ position: "relative", height: "24px", display: "flex", alignItems: "center" }}>
        {/* Track */}
        <div style={{
          position:     "relative",
          height:       "8px",
          background:   disabled ? colors.gray200 : colors.gray200,
          border:       `2px solid ${disabled ? colors.gray400 : borders.color}`,
          borderRadius: borders.radii.pill,
          flex:         1,
          overflow:     "hidden",
        }}>
          {/* Fill */}
          <div style={{
            position:     "absolute",
            left:         0, top: 0, bottom: 0,
            width:        `${pct}%`,
            background:   disabled ? colors.gray400 : color,
            transition:   `width ${animation.durations.instant}`,
          }} />
        </div>
        {/* Native input (invisible, positioned over track for interaction) */}
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            inset:    0,
            opacity:  0,
            cursor:   disabled ? "not-allowed" : "pointer",
            width:    "100%",
            margin:   0,
          }}
        />
      </div>
    </div>
  );
};

Slider.displayName = "Slider";
