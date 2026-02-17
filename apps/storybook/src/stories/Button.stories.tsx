import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@neo-brutal/react";

const meta: Meta<typeof Button> = {
  title:     "Components/Button",
  component: Button,
  tags:      ["autodocs"],
  argTypes: {
    variant: {
      control:     "select",
      options:     ["primary", "secondary", "danger", "ghost", "yellow", "coral"],
      description: "Visual style variant",
    },
    size: {
      control:     "radio",
      options:     ["sm", "md", "lg"],
      description: "Size preset",
    },
    label:     { control: "text" },
    fullWidth: { control: "boolean" },
    loading:   { control: "boolean" },
    disabled:  { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { label: "Play Song", variant: "primary" },
};

export const Secondary: Story = {
  args: { label: "Add to Playlist", variant: "secondary" },
};

export const Danger: Story = {
  args: { label: "Remove", variant: "danger" },
};

export const Yellow: Story = {
  args: { label: "Upgrade to Premium", variant: "yellow", icon: "★" },
};

export const Ghost: Story = {
  args: { label: "See All", variant: "ghost" },
};

export const WithIcon: Story = {
  args: { label: "Play", variant: "primary", icon: "▶" },
};

export const Loading: Story = {
  args: { label: "Loading...", variant: "primary", loading: true },
};

export const Disabled: Story = {
  args: { label: "Unavailable", variant: "primary", disabled: true },
};

export const Small: Story = {
  args: { label: "Small", variant: "secondary", size: "sm" },
};

export const Large: Story = {
  args: { label: "Large CTA", variant: "yellow", size: "lg", icon: "★" },
};

export const FullWidth: Story = {
  args:       { label: "Subscribe Now", variant: "primary", fullWidth: true },
  decorators: [(Story) => <div style={{ width: "320px" }}><Story /></div>],
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", padding: "8px" }}>
      <Button label="Primary"   variant="primary" />
      <Button label="Secondary" variant="secondary" />
      <Button label="Danger"    variant="danger" />
      <Button label="Yellow"    variant="yellow" />
      <Button label="Coral"     variant="coral" />
      <Button label="Ghost"     variant="ghost" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
      <Button label="Small"  size="sm" variant="primary" />
      <Button label="Medium" size="md" variant="primary" />
      <Button label="Large"  size="lg" variant="primary" />
    </div>
  ),
};
