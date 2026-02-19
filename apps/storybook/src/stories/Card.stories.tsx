import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card } from "@neo-brutal/react";
import { colors } from "@neo-brutal/tokens";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <p style={{ fontFamily: "'DM Sans', sans-serif" }}>Card content goes here.</p>,
  },
};

export const Colored: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", width: "400px" }}>
      {[
        [colors.mint, "Mint"],
        [colors.lavender, "Lavender"],
        [colors.yellow, "Yellow"],
        [colors.pinkLight, "Pink Light"],
        [colors.blueLight, "Blue Light"],
        [colors.coralLight, "Coral Light"],
      ].map(([bg, label]) => (
        <Card key={label as string} bg={bg as string} padding="16px">
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>{label}</span>
        </Card>
      ))}
    </div>
  ),
};
