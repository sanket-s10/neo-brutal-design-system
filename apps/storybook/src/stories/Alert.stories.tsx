import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Alert } from "@neo-brutal/react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["info", "success", "warning", "error"] },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    type: "info",
    title: "New release available",
    message: "A new single just dropped.",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    title: "Song added to playlist!",
    message: "Saved to Liked Songs.",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    title: "Premium feature",
    message: "Unlimited skips require Premium.",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    title: "Playback failed",
    message: "Unable to connect. Check your internet connection.",
  },
};

export const All: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "360px" }}>
      <Alert type="success" title="Song added!" message="Saved to Liked Songs." />
      <Alert type="warning" title="Premium feature" message="Upgrade to skip unlimited tracks." />
      <Alert type="error" title="Playback failed" message="Check your connection." />
      <Alert type="info" title="New release" message="A new single just dropped." />
    </div>
  ),
};
