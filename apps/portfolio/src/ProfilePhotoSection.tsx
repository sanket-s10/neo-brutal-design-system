import React from "react";

// Colors - should match your main portfolio colors
const colors = {
  yellow: "#FFE600",
  mint: "#B8F4D4",
  coral: "#FF6B4A",
  black: "#1A1A1A",
  white: "#FFFFFF",
  cream: "#FFF8E7",
};

const SH = (n = 4, c = colors.black) => `${n}px ${n}px 0px ${c}`;
const BR = (c = colors.black, w = "2.5px") => `${w} solid ${c}`;

// Replace with your actual image path
const PROFILE_IMAGE = "/sanket-profile.png";

// Star/Burst Badge
function StarBurst() {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        background: colors.coral,
        border: BR(),
        boxShadow: SH(3),
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      }}
    />
  );
}

interface ProfilePhotoSectionProps {
  bgColor?: string;
  name?: string;
  size?: number;
}

export default function ProfilePhotoSection({
  bgColor = colors.mint,
  name = "@sanket",
  size = 220,
}: ProfilePhotoSectionProps) {
  return (
    <div
      className="profile-card-wrapper"
      style={{
        position: "absolute",
        right: 0,
        top: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          background: colors.cream,
          border: BR(),
          borderRadius: 20,
          padding: "clamp(12px, 2vw, 18px)",
          boxShadow: SH(6),
          width: "fit-content",
        }}
      >
        {/* Inner Frame with colored background - SQUARE */}
        <div
          style={{
            width: size,
            height: size,
            background: bgColor,
            border: BR(),
            borderRadius: 12,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={PROFILE_IMAGE}
            alt="Sanket Sangar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Name */}
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 800,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {name}
        </div>

        {/* Star Burst Badge */}
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -8,
          }}
        >
          <StarBurst />
        </div>
      </div>
    </div>
  );
}