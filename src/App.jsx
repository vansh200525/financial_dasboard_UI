import { useState, useRef, useEffect } from "react";
import { useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import BalanceTrendChart from "./components/BalanceTrendChart";
import SpendingBreakdown from "./components/SpendingBreakdown";
import TransactionList from "./components/TransactionList";
import InsightsSection from "./components/InsightsSection";
import { Menu, Bell, Shield, Eye, X, TrendingUp, AlertTriangle, CreditCard, Target } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1, icon: TrendingUp, color: "#f59e0b", title: "Food spending up 23%", time: "2 hrs ago", read: false },
  { id: 2, icon: Target, color: "#22c55e", title: "Savings goal reached!", time: "5 hrs ago", read: false },
  { id: 3, icon: CreditCard, color: "#3b82f6", title: "3 subscriptions detected", time: "1 day ago", read: true },
  { id: 4, icon: AlertTriangle, color: "#ef4444", title: "Large transaction: ₹8,500", time: "2 days ago", read: true },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "GOOD MORNING ";
  if (hour < 17) return "GOOD AFTERNOON ";
  return "GOOD EVENING ";
}

function NotificationPanel({ onClose }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div style={{
      position: "absolute", top: "calc(100% + 10px)", right: 0,
      width: 320, background: "var(--bg2)",
      border: "1px solid var(--border2)", borderRadius: 16,
      boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
      zIndex: 200, overflow: "hidden",
    }} className="animate-fadeUp">
      <div style={{
        padding: "14px 16px", borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "var(--font-display)" }}>Notifications</span>
          {unread > 0 && (
            <span className="badge badge-red" style={{ fontSize: 10, padding: "2px 7px" }}>{unread} new</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {unread > 0 && (
            <button onClick={markAllRead} style={{
              fontSize: 11, color: "var(--accent2)", background: "none", padding: 0
            }}>Mark all read</button>
          )}
          <button onClick={onClose} style={{ background: "none", color: "var(--text2)", padding: 2 }}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div>
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={n.id}
              onClick={() => setNotifications(prev => prev.map(p => p.id === n.id ? { ...p, read: true } : p))}
              style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 16px",
                borderBottom: i < notifications.length - 1 ? "1px solid var(--border)" : "none",
                background: n.read ? "transparent" : "rgba(124,111,247,0.04)",
                cursor: "pointer",
                transition: "background 0.15s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
              onMouseLeave={e => e.currentTarget.style.background = n.read ? "transparent" : "rgba(124,111,247,0.04)"}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: n.color + "18", border: "1px solid " + n.color + "30",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Icon size={14} color={n.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, color: n.read ? "var(--text2)" : "var(--text)", fontWeight: n.read ? 400 : 500 }}>
                  {n.title}
                </p>
                <p style={{ fontSize: 11, color: "var(--text2)", marginTop: 2 }}>{n.time}</p>
              </div>
              {!n.read && (
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: 4 }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function RecentTransactionsMini() {
  const { filteredTransactions } = useApp();
  const recent = filteredTransactions.slice(0, 5);

  return (
    <div className="card" style={{ padding: "20px 22px" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, marginBottom: 16 }}>Recent Activity</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {recent.map((t, i) => (
          <div key={t.id} className="stagger-item" style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 0",
            borderBottom: i < recent.length - 1 ? "1px solid var(--border)" : "none"
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: 9, flexShrink: 0,
              background: t.type === "credit" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
            }}>
              {t.type === "credit" ? "↓" : "↑"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.description}</p>
              <p style={{ fontSize: 11, color: "var(--text2)" }}>{t.date}</p>
            </div>
            <span style={{
              fontSize: 13, fontWeight: 600, fontFamily: "var(--font-display)",
              color: t.amount > 0 ? "#22c55e" : "#ef4444", flexShrink: 0
            }}>
              {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
          {getGreeting()} 
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 13 }}>Here's your financial overview dashboard</p>
      </div>
      <SummaryCards />
      <BalanceTrendChart />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <SpendingBreakdown />
        <RecentTransactionsMini />
      </div>
    </div>
  );
}

export default function App() {
  const { state, dispatch } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  // Close notification panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <Sidebar onClose={() => setSidebarOpen(false)} isOpen={sidebarOpen} />

      <div style={{ flex: 1, marginLeft: 0, display: "flex", flexDirection: "column", minHeight: "100vh", background: "transparent" }} className="main-content">

        {/* Top bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          background: "var(--bg)", backdropFilter: state.theme === "dark" ? "blur(16px)" : "none",
          borderBottom: "1px solid var(--border)",
          padding: "14px 24px",
          display: "flex", alignItems: "center", gap: 16
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: "none", color: "var(--text2)", padding: 4, display: "none", border: "none" }}
            className="menu-btn"
          >
            <Menu size={22} />
          </button>

          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, textTransform: "capitalize", lineHeight: "1.5",paddingBottom: "8px",display: "inline-block",overflow: "visible"
          }}>
            {state.activeTab === "dashboard" ? "Overview" : state.activeTab}
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
            {/* Role badge */}
            <span style={{
              display: "flex", alignItems: "center", gap: 6, fontSize: 12,
              padding: "5px 12px", borderRadius: 100,
              background: state.role === "admin" ? "rgba(124,111,247,0.12)" : "rgba(144,144,168,0.08)",
              color: state.role === "admin" ? "var(--accent2)" : "var(--text2)",
              border: "1px solid " + (state.role === "admin" ? "rgba(124,111,247,0.2)" : "var(--border)"),
            }}>
              {state.role === "admin" ? <Shield size={12} /> : <Eye size={12} />}
              {state.role === "admin" ? "Admin" : "Viewer"}
            </span>

            {/* Notification bell */}
            <div style={{ position: "relative" }} ref={notifRef}>
              <button
                onClick={() => setNotifOpen(o => !o)}
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: "1px solid " + (notifOpen ? "var(--border2)" : "var(--border)"),
                  background: notifOpen ? "var(--bg3)" : "var(--bg2)",
                  color: "var(--text2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", transition: "all 0.15s"
                }}
                title="Notifications"
              >
                <Bell size={16} />
                {unreadCount > 0 && (
                  <span style={{
                    position: "absolute", top: 6, right: 6,
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#ef4444", border: "1.5px solid var(--bg)"
                  }} />
                )}
              </button>
              {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} />}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "24px", maxWidth: 1200, width: "100%", margin: "0 auto" }} className="animate-fadeIn" key={state.activeTab}>
          {state.activeTab === "dashboard" && <DashboardPage />}
          {state.activeTab === "transactions" && <TransactionList />}
          {state.activeTab === "insights" && <InsightsSection />}
        </main>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .main-content { margin-left: 240px !important; }
          .menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .main-content { margin-left: 0 !important; }
          .menu-btn { display: flex !important; }
          main { padding: 16px !important; }
        }
      `}</style>
    </div>
  );
}
