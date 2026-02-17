import React, { useState } from "react";
import { colors, typography, borders, shadows, animation } from "@neo-brutal/tokens";

export interface TextInputProps {
  placeholder?: string;
  value?:       string;
  defaultValue?: string;
  onChange?:    (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?:     (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?:      (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Icon or element rendered on the left */
  icon?:        React.ReactNode;
  /** Icon or element rendered on the right */
  trailingIcon?: React.ReactNode;
  type?:        "text" | "email" | "password" | "search" | "tel" | "url";
  disabled?:    boolean;
  id?:          string;
  name?:        string;
  label?:       string;
  hint?:        string;
  error?:       string;
  style?:       React.CSSProperties;
  className?:   string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      icon,
      trailingIcon,
      type     = "text",
      disabled = false,
      id,
      name,
      label,
      hint,
      error,
      style,
      className,
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);

    const wrapperStyle: React.CSSProperties = {
      display:      "flex",
      alignItems:   "center",
      gap:          "8px",
      padding:      "10px 14px",
      background:   disabled ? colors.gray100 : (error ? "#FFF0F0" : colors.lavenderLight),
      border:       `${borders.width.base} solid ${error ? colors.pink : borders.color}`,
      borderRadius: borders.radii.md,
      boxShadow:    focused ? shadows.md : shadows.sm,
      cursor:       disabled ? "not-allowed" : "text",
      transition:   `box-shadow ${animation.durations.fast} ${animation.easings.out}`,
      ...style,
    };

    const inputStyle: React.CSSProperties = {
      flex:       1,
      background: "transparent",
      border:     "none",
      outline:    "none",
      fontFamily: typography.fonts.body,
      fontSize:   typography.fontSizes.md,
      fontWeight: typography.fontWeights.medium,
      color:      disabled ? colors.gray400 : colors.black,
      cursor:     disabled ? "not-allowed" : "text",
      minWidth:   0,
    };

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={id}
            style={{
              display:    "block",
              fontFamily: typography.fonts.body,
              fontSize:   typography.fontSizes.sm,
              fontWeight: typography.fontWeights.bold,
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {label}
          </label>
        )}
        <div style={wrapperStyle}>
          {icon && (
            <span aria-hidden="true" style={{ opacity: 0.6, flexShrink: 0 }}>
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            value={value}
            defaultValue={defaultValue}
            placeholder={placeholder}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            onChange={onChange}
            onFocus={(e) => { setFocused(true); onFocus?.(e); }}
            onBlur={(e)  => { setFocused(false); onBlur?.(e); }}
            style={inputStyle}
          />
          {trailingIcon && (
            <span aria-hidden="true" style={{ opacity: 0.6, flexShrink: 0 }}>
              {trailingIcon}
            </span>
          )}
        </div>
        {hint && !error && (
          <p id={`${id}-hint`} style={{ marginTop: "4px", fontSize: typography.fontSizes.xs, opacity: 0.6 }}>
            {hint}
          </p>
        )}
        {error && (
          <p id={`${id}-error`} role="alert" style={{ marginTop: "4px", fontSize: typography.fontSizes.xs, color: colors.pink, fontWeight: typography.fontWeights.bold }}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
