// ─────────────────────────────────────────────────────────────────
// @neo-brutal/react — public API
// ─────────────────────────────────────────────────────────────────

// Components
export { Button }        from "./components/Button";
export { Card }          from "./components/Card";
export { Badge }         from "./components/Badge";
export { TextInput }     from "./components/TextInput";
export { Alert }         from "./components/Alert";
export { Avatar, AvatarGroup } from "./components/Avatar";
export { Toggle, Checkbox, Slider } from "./components/FormControls";

// Hooks
export { usePress }      from "./hooks/usePress";

// Re-export tokens and core utils so consumers only need one package
export * from "@neo-brutal/core";

// Types
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";
export type { CardProps }       from "./components/Card";
export type { BadgeProps }      from "./components/Badge";
export type { TextInputProps }  from "./components/TextInput";
export type { AlertProps, AlertType } from "./components/Alert";
export type { AvatarProps, AvatarGroupProps } from "./components/Avatar";
export type { ToggleProps, CheckboxProps, SliderProps } from "./components/FormControls";
