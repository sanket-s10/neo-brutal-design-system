import { useState, useCallback } from "react";

export interface PressHandlers {
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onTouchStart: () => void;
  onTouchEnd: () => void;
}

export interface UsePressReturn {
  pressed: boolean;
  handlers: PressHandlers;
}

/**
 * usePress — tracks whether an element is being pressed.
 * Used to apply the neo-brutalist "sink into shadow" effect on click.
 */
export function usePress(): UsePressReturn {
  const [pressed, setPressed] = useState(false);

  const press   = useCallback(() => setPressed(true), []);
  const release = useCallback(() => setPressed(false), []);

  return {
    pressed,
    handlers: {
      onMouseDown:  press,
      onMouseUp:    release,
      onMouseLeave: release,
      onTouchStart: press,
      onTouchEnd:   release,
    },
  };
}
