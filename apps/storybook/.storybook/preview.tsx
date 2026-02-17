import type { Preview } from "@storybook/react";
import React from "react";

const FONT_IMPORT = `
  @import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap');
`;

const GLOBAL_STYLES = `
  ${FONT_IMPORT}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; color: #1A1A1A; }
  ::selection { background: #F5C518; color: #1A1A1A; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #F5F5F5; }
  ::-webkit-scrollbar-thumb { background: #1A1A1A; border-radius: 4px; }
`;

const preview: Preview = {
  parameters: {
    // Default background matching our yellow brand color
    backgrounds: {
      default: "yellow",
      values: [
        { name: "yellow",   value: "#F5C518" },
        { name: "offwhite", value: "#FAFAFA" },
        { name: "white",    value: "#FFFFFF" },
        { name: "dark",     value: "#1A1A1A" },
      ],
    },
    // Centered layout for components
    layout: "centered",
    // Docs theme
    docs: {
      theme: undefined,
    },
    // Controls defaults
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date:  /Date$/i,
      },
    },
  },
  // Global decorator: inject fonts + base styles
  decorators: [
    (Story) => (
      <>
        <style>{GLOBAL_STYLES}</style>
        <div style={{ padding: "24px" }}>
          <Story />
        </div>
      </>
    ),
  ],
};

export default preview;
