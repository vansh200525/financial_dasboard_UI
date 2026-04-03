import { useApp } from "../context/AppContext";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, LogOut, TrendingUp, Shield, Eye, Menu } from "lucide-react";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowLeftRight },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export default function Sidebar({ onClose, isOpen }) {
  const { state, dispatch } = useApp();

  const toggleRole = () => {
    dispatch({ type: "SET_ROLE", payload: state.role === "admin" ? "viewer" : "admin" });
  };

  return (
    <>
      {isOpen && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 40, backdropFilter: "blur(4px)" }}
          onClick={onClose}
          className="animate-fadeIn"
        />
      )}
      <aside style={{
        position: "fixed",
        left: 0, top: 0, bottom: 0,
        width: 240,
        background: "var(--bg2)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 16px",
        zIndex: 50,
        transform: isOpen ? "translateX(0)" : undefined,
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }} className="sidebar">

        {/* Logo */}
<div style={{
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 32,
  paddingLeft: 6
}}>
  {/* Logo Icon */}
  <div style={{
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "linear-gradient(135deg, #7c6ff7, #a855f7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(124,111,247,0.35)"
  }}>
    <TrendingUp size={18} color="white" />
  </div>

  {/* Text */}
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
    <span style={{
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 600,
      color: "var(--text)"
    }}>
      Zorvyn
    </span>

    <span style={{
      fontSize: 11,
      letterSpacing: "1.5px",
      color: "var(--text2)",
      fontWeight: 500
    }}>
      FINTECH
    </span>
  </div>
</div>
<button
  onClick={() => dispatch({ type: "TOGGLE_THEME" })}
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 12px",
    borderRadius: 10,
    background: "var(--bg3)",
    color: "var(--text)",
    border: "1px solid var(--border)",
    marginBottom: 16
  }}
>
  {state.theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
  <span>
    {state.theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
  </span>
</button>

        {/* Role badge */}
        <button
          onClick={toggleRole}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: state.role === "admin" ? "rgba(124,111,247,0.12)" : "rgba(144,144,168,0.08)",
            border: `1px solid ${state.role === "admin" ? "rgba(124,111,247,0.3)" : "var(--border)"}`,
            borderRadius: 10, padding: "8px 12px",
            color: state.role === "admin" ? "var(--accent2)" : "var(--text2)",
            fontSize: 12, fontWeight: 500, marginBottom: 24,
            transition: "all 0.2s"
          }}
        >
          {state.role === "admin" ? <Shield size={14} /> : <Eye size={14} />}
          <span>{state.role === "admin" ? "Admin Mode" : "Viewer Mode"}</span>
          <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.6 }}>Switch</span>
        </button>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map(({ id, label, icon: Icon }) => {
            const active = state.activeTab === id;
            return (
              <button
                key={id}
                onClick={() => { dispatch({ type: "SET_ACTIVE_TAB", payload: id }); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 12px", borderRadius: 10,
                  background: active ? "rgba(124,111,247,0.15)" : "transparent",
                  color: active ? "var(--accent2)" : "var(--text2)",
                  fontSize: 14, fontWeight: active ? 500 : 400,
                  border: active ? "1px solid rgba(124,111,247,0.2)" : "1px solid transparent",
                  textAlign: "left", transition: "all 0.15s",
                  position: "relative"
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--text)"; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = active ? "var(--accent2)" : "var(--text2)"; }}
              >
                {active && (
                  <span style={{
                    position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                    width: 3, height: 20, borderRadius: "0 3px 3px 0",
                    background: "var(--accent)"
                  }} />
                )}
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px" }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent), var(--teal))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 600, color: "white"
            }}>V</div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)" }}>Vansh</p>
              <p style={{ fontSize: 11, color: "var(--text2)" }}>vanshkrishali25@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>

      <style>{`
        @media (max-width: 768px) {
          .sidebar {
            transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
          }
        }
        @media (min-width: 769px) {
          .sidebar { transform: translateX(0) !important; }
        }
        .sidebar-close {
  display: none;
}

@media (max-width: 768px) {
  .sidebar-close {
    display: block;
  }
}
      `}</style>
    </>
  );
}
