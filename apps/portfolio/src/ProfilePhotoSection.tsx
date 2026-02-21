import React from "react";

// Colors - neo brutal palette
const colors = {
  yellow: "#FFE600",
  mint: "#B8F4D4",
  mintDark: "#4ECDC4",
  lavender: "#D4C4F4",
  lavenderDark: "#8B7EC8",
  pink: "#FF6B9D",
  coral: "#FF8B7A",
  black: "#1A1A1A",
  white: "#FFFFFF",
};

const SH = (n = 4, c = colors.black) => `${n}px ${n}px 0px ${c}`;
const BR = (c = colors.black, w = "3px") => `${w} solid ${c}`;

// Dummy profile image
const PROFILE_IMAGE = "./sanket-profile.png";

// Chart Icon (like in reference)
function ChartIcon() {
  return (
    <div style={{
      width: 56,
      height: 56,
      background: colors.mintDark,
      border: BR(),
      borderRadius: 14,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: SH(4),
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/>
        <path d="M7 16l4-4 4 4 5-6"/>
      </svg>
    </div>
  );
}

// Eye Icon (like in reference)
function EyeIcon() {
  return (
    <div style={{
      width: 52,
      height: 52,
      background: colors.yellow,
      border: BR(),
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: SH(4),
    }}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={colors.black} strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
        {/* Radiating lines like in reference */}
        <line x1="12" y1="1" x2="12" y2="5" strokeWidth="2"/>
        <line x1="4.2" y1="4.2" x2="6.8" y2="6.8" strokeWidth="2"/>
        <line x1="19.8" y1="4.2" x2="17.2" y2="6.8" strokeWidth="2"/>
      </svg>
    </div>
  );
}

// Cursor Icon (decorative)
function CursorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.lavenderDark} stroke={colors.black} strokeWidth="2">
      <path d="M4 4l16 6-6 2-2 6z"/>
    </svg>
  );
}

// The Photo Section Component - This is what you'd add to your existing hero
export default function ProfilePhotoSection() {
  return (
    <div style={{
      position: "relative",
      width: 200,
      height: 250,
      float: "right"
    }}>
      {/* Mint/Teal Background Shape (pentagon-like) */}
      <div style={{
        position: "absolute",
        top: 50,
        left: 30,
        width: 280,
        height: 340,
        background: colors.mint,
        border: BR(),
        borderRadius: "20px 20px 20px 60px",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)",
        boxShadow: SH(6),
        zIndex: 0,
      }} />

      {/* Profile Image - B&W with cutout effect */}
      <div style={{
        position: "absolute",
        top: 10,
        left: 20,
        width: 350,
        zIndex: 1,
      }}>
        <img
          src={PROFILE_IMAGE}
          alt="Sanket Sangar"
          style={{
            width: "100%",
            height: "auto",
            filter: "grayscale(100%) contrast(1.1)",
            WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          }}
        />
      </div>

      {/* Chart Icon - Left Side */}
      <div style={{
        position: "absolute",
        top: 160,
        left: -20,
        zIndex: 3,
      }}>
        <ChartIcon />
      </div>

      {/* Eye Icon - Right Side */}
      <div style={{
        position: "absolute",
        top: 240,
        right: 10,
        zIndex: 3,
      }}>
        <EyeIcon />
      </div>

      {/* Cursor Icon - Top Right */}
      <div style={{
        position: "absolute",
        top: 80,
        right: 40,
        zIndex: 3,
      }}>
        <CursorIcon />
      </div>


      {/* Available Badge - Bottom */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 4,
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: colors.white,
        border: BR(),
        borderRadius: 999,
        padding: "8px 16px",
        boxShadow: SH(3),
      }}>
        <div style={{
          width: 10,
          height: 10,
          background: "#22C55E",
          borderRadius: "50%",
        }} />
        <span style={{ fontSize: 12, fontWeight: 700 }}>Available</span>
      </div>
    </div>
  );
}
