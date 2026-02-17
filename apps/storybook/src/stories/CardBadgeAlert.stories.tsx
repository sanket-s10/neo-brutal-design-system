import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card, Badge, Alert } from "@neo-brutal/react";
import { colors } from "@neo-brutal/tokens";

// ─────────────────────────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────────────────────────

export const CardMeta: Meta<typeof Card> = {
  title:     "Components/Card",
  component: Card,
  tags:      ["autodocs"],
};
export default CardMeta;

type CardStory = StoryObj<typeof Card>;

export const Default: CardStory = {
  args: {
    children: <p style={{ fontFamily: "'DM Sans', sans-serif" }}>Card content goes here.</p>,
  },
};

export const Colored: CardStory = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "400px" }}>
      {[
        [colors.mint,       "Mint"],
        [colors.lavender,   "Lavender"],
        [colors.yellow,     "Yellow"],
        [colors.pinkLight,  "Pink Light"],
        [colors.blueLight,  "Blue Light"],
        [colors.coralLight, "Coral Light"],
      ].map(([bg, label]) => (
        <Card key={label as string} bg={bg as string} padding="16px">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{label}</span>
        </Card>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────
// Badge
// ─────────────────────────────────────────────────────────────────

const BadgeMeta: Meta<typeof Badge> = {
  title:     "Components/Badge",
  component: Badge,
  tags:      ["autodocs"],
};

type BadgeStory = StoryObj<typeof Badge>;

export const BadgeDefault: BadgeStory = {
  args: { label: "PLAYLIST" },
};

export const BadgeVariants: BadgeStory = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <Badge label="PLAYLIST"       color={colors.mint} />
      <Badge label="ALBUM"          color={colors.lavender} />
      <Badge label="RADIO"          color={colors.coral} />
      <Badge label="LATEST RELEASE" color={colors.yellow} />
      <Badge label="SINGLE"         color={colors.pink} />
      <Badge label="NEW"            color={colors.blueLight} />
    </div>
  ),
};

// ─────────────────────────────────────────────────────────────────
// Alert
// ─────────────────────────────────────────────────────────────────

const AlertMeta: Meta<typeof Alert> = {
  title:     "Components/Alert",
  component: Alert,
  tags:      ["autodocs"],
  argTypes: {
    type: {
      control:  "radio",
      options:  ["info", "success", "warning", "error"],
    },
  },
};

type AlertStory = StoryObj<typeof Alert>;

export const AlertInfo: AlertStory = {
  args: {
    type:    "info",
    title:   "New release available",
    message: "Pink Floyd dropped a new single — Hey Hey Rise Up.",
  },
};

export const AlertSuccess: AlertStory = {
  args: {
    type:    "success",
    title:   "Song added to playlist!",
    message: "Being For The Benefit was saved to Liked Songs.",
  },
};

export const AlertWarning: AlertStory = {
  args: {
    type:    "warning",
    title:   "Premium feature",
    message: "Unlimited skips require a Premium subscription.",
  },
};

export const AlertError: AlertStory = {
  args: {
    type:    "error",
    title:   "Playback failed",
    message: "Unable to connect. Check your internet connection.",
  },
};

export const AllAlerts: AlertStory = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "360px" }}>
      <Alert type="success" title="Song added!" message="Saved to Liked Songs." />
      <Alert type="warning" title="Premium feature" message="Upgrade to skip unlimited tracks." />
      <Alert type="error"   title="Playback failed" message="Check your connection." />
      <Alert type="info"    title="New release" message="Pink Floyd just dropped a single." />
    </div>
  ),
};
