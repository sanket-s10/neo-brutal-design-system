import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Badge } from "@neo-brutal/react";
import { colors } from "@neo-brutal/tokens";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { label: "PLAYLIST" },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      <Badge label="PLAYLIST" color={colors.mint} />
      <Badge label="ALBUM" color={colors.lavender} />
      <Badge label="RADIO" color={colors.coral} />
      <Badge label="LATEST RELEASE" color={colors.yellow} />
      <Badge label="SINGLE" color={colors.pink} />
      <Badge label="NEW" color={colors.blueLight} />
    </div>
  ),
};
