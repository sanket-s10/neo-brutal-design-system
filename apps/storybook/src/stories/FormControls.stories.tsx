import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Toggle, Checkbox, Slider, TextInput } from "@neo-brutal/react";
import { colors } from "@neo-brutal/tokens";

// ─────────────────────────────────────────────────────────────────
// Toggle
// ─────────────────────────────────────────────────────────────────

const ToggleMeta: Meta<typeof Toggle> = {
  title:     "Components/Toggle",
  component: Toggle,
  tags:      ["autodocs"],
};
export default ToggleMeta;

export const ToggleDefault: StoryObj<typeof Toggle> = {
  render: () => {
    const [on, setOn] = useState(true);
    return <Toggle checked={on} onChange={setOn} label="Autoplay" />;
  },
};

export const ToggleAll: StoryObj<typeof Toggle> = {
  render: () => {
    const [states, setStates] = useState({ notifications: true, darkMode: false, shuffle: true });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Toggle label="Notifications" checked={states.notifications}
          onChange={(v) => setStates((p) => ({ ...p, notifications: v }))} />
        <Toggle label="Dark Mode" checked={states.darkMode}
          activeColor={colors.lavender}
          onChange={(v) => setStates((p) => ({ ...p, darkMode: v }))} />
        <Toggle label="Shuffle" checked={states.shuffle}
          activeColor={colors.coral}
          onChange={(v) => setStates((p) => ({ ...p, shuffle: v }))} />
        <Toggle label="Disabled (on)" checked={true} onChange={() => {}} disabled />
        <Toggle label="Disabled (off)" checked={false} onChange={() => {}} disabled />
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────
// Checkbox
// ─────────────────────────────────────────────────────────────────

const CheckboxMeta: Meta<typeof Checkbox> = {
  title:     "Components/Checkbox",
  component: Checkbox,
  tags:      ["autodocs"],
};

export const CheckboxDefault: StoryObj<typeof Checkbox> = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return <Checkbox checked={checked} onChange={setChecked} label="Add to Liked Songs" />;
  },
};

export const CheckboxAll: StoryObj<typeof Checkbox> = {
  render: () => {
    const [state, setState] = useState({ liked: true, shuffle: false, repeat: false });
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Checkbox label="Liked Songs" checked={state.liked}
          activeColor={colors.pink}
          onChange={(v) => setState((p) => ({ ...p, liked: v }))} />
        <Checkbox label="Enable Shuffle" checked={state.shuffle}
          activeColor={colors.mint}
          onChange={(v) => setState((p) => ({ ...p, shuffle: v }))} />
        <Checkbox label="Repeat Queue" checked={state.repeat}
          activeColor={colors.lavender}
          onChange={(v) => setState((p) => ({ ...p, repeat: v }))} />
        <Checkbox label="Indeterminate" checked={false} onChange={() => {}} indeterminate />
        <Checkbox label="Disabled" checked={true} onChange={() => {}} disabled />
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────
// Slider
// ─────────────────────────────────────────────────────────────────

const SliderMeta: Meta<typeof Slider> = {
  title:     "Components/Slider",
  component: Slider,
  tags:      ["autodocs"],
};

export const SliderDefault: StoryObj<typeof Slider> = {
  render: () => {
    const [val, setVal] = useState(60);
    return (
      <div style={{ width: "280px" }}>
        <Slider value={val} onChange={setVal} label="Volume" showValue />
      </div>
    );
  },
};

export const SliderAll: StoryObj<typeof Slider> = {
  render: () => {
    const [vals, setVals] = useState({ volume: 70, treble: 45, bass: 60 });
    return (
      <div style={{ width: "280px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <Slider label="Volume" value={vals.volume} showValue color={colors.coral}
          onChange={(v) => setVals((p) => ({ ...p, volume: v }))} />
        <Slider label="Treble" value={vals.treble} showValue color={colors.mint}
          onChange={(v) => setVals((p) => ({ ...p, treble: v }))} />
        <Slider label="Bass" value={vals.bass} showValue color={colors.lavender}
          onChange={(v) => setVals((p) => ({ ...p, bass: v }))} />
        <Slider label="Disabled" value={40} onChange={() => {}} disabled showValue />
      </div>
    );
  },
};

// ─────────────────────────────────────────────────────────────────
// TextInput
// ─────────────────────────────────────────────────────────────────

const TextInputMeta: Meta<typeof TextInput> = {
  title:     "Components/TextInput",
  component: TextInput,
  tags:      ["autodocs"],
};

export const TextInputDefault: StoryObj<typeof TextInput> = {
  args: { placeholder: "Search artists, songs, or podcasts...", icon: "🔍" },
};

export const TextInputWithLabel: StoryObj<typeof TextInput> = {
  args: {
    label:       "Playlist Name",
    placeholder: "My Awesome Playlist",
    hint:        "Choose a name that reflects the vibe.",
    id:          "playlist-name",
  },
};

export const TextInputError: StoryObj<typeof TextInput> = {
  args: {
    label: "Email",
    placeholder: "you@example.com",
    error: "Please enter a valid email address.",
    id:    "email",
    type:  "email",
  },
};

export const TextInputDisabled: StoryObj<typeof TextInput> = {
  args: {
    label:       "Username",
    value:       "dj_brutal_99",
    disabled:    true,
    id:          "username",
  },
};
