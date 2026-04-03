import { INSIGHTS } from "../data/data";
import { TrendingUp, Target, CreditCard, AlertTriangle, ArrowRight, Lightbulb } from "lucide-react";
import { useApp } from "../context/AppContext";
import { SPENDING_BREAKDOWN, BALANCE_TREND } from "../data/data";

const ICON_MAP = { TrendingUp, Target, CreditCard, AlertTriangle };

const TYPE_STYLES = {
  warning: { border: "rgba(245,158,11,0.3)", bg: "rgba(245,158,11,0.08)", icon: "#f59e0b", badge: "badge-amber" },
  success: { border: "rgba(34,197,94,0.3)", bg: "rgba(34,197,94,0.08)", icon: "#22c55e", badge: "badge-green" },
  info:    { border: "rgba(59,130,246,0.3)",  bg: "rgba(59,130,246,0.08)",  icon: "#3b82f6", badge: "badge-blue" },
};

// Maps each insight action to a tab + optional category filter
const ACTION_NAV = {
  1: { tab: "transactions", filter: "Food" },       // "View food transactions"
  2: { tab: "transactions", filter: "Income" },     // "View savings plan"
  3: { tab: "transactions", filter: "Entertainment" }, // "Review subscriptions"
  4: { tab: "transactions", filter: "Insurance" },  // "View transaction"
};

export default function InsightsSection() {
  const { totalIncome, totalExpense, savingsRate, balance, dispatch } = useApp();

  const topCategory = [...SPENDING_BREAKDOWN].sort((a, b) => b.value - a.value)[0];
  const lastMonth = BALANCE_TREND[BALANCE_TREND.length - 2];
  const thisMonth = BALANCE_TREND[BALANCE_TREND.length - 1];
  const incomeGrowth = Math.round(((thisMonth.income - lastMonth.income) / lastMonth.income) * 100);

  const handleAction = (insightId) => {
    const nav = ACTION_NAV[insightId];
    if (!nav) return;
    if (nav.filter) dispatch({ type: "SET_FILTER", payload: nav.filter });
    dispatch({ type: "SET_ACTIVE_TAB", payload: nav.tab });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 4, lineHeight: "1.4",paddingBottom: 2}}>SPENDING INSIGHTS</h2>
        <p style={{ color: "var(--text2)", fontSize: 13 }}>Analysis of your financial patterns</p>
      </div>

      {/* Stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        {[
          { label: "Income Growth", value: "+" + incomeGrowth + "%", color: "#22c55e", sub: "vs last month" },
          { label: "Top Expense", value: topCategory.name, color: "#f97316", sub: "₹" + topCategory.value.toLocaleString("en-IN") },
          { label: "Savings Rate", value: savingsRate + "%", color: "#7c6ff7", sub: "of total income" },
          { label: "Net Balance", value: "₹" + (balance / 1000).toFixed(1) + "k", color: "#14b8a6", sub: "total available" },
        ].map((s, i) => (
          <div key={i} className="stagger-item card" style={{ padding: "16px 18px", textAlign: "center" }}>
            <p style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", color: s.color }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--text)", fontWeight: 500, margin: "4px 0 2px" }}>{s.label}</p>
            <p style={{ fontSize: 11, color: "var(--text2)" }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Insight cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {INSIGHTS.map((insight, i) => {
          const Icon = ICON_MAP[insight.icon];
          const style = TYPE_STYLES[insight.type];
          return (
            <div key={insight.id} className="stagger-item" style={{
              background: style.bg,
              border: "1px solid " + style.border,
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: style.icon + "20",
                  border: "1px solid " + style.icon + "40",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {Icon && <Icon size={16} color={style.icon} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{insight.title}</h4>
                    <span className={"badge " + style.badge}>{insight.type}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--text2)", lineHeight: 1.6, marginBottom: 10 }}>
                    {insight.description}
                  </p>
                  <button
                    onClick={() => handleAction(insight.id)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      fontSize: 12, color: style.icon, background: "none",
                      fontWeight: 500, padding: "5px 10px",
                      border: "1px solid " + style.icon + "40",
                      borderRadius: 8,
                      transition: "all 0.15s",
                      cursor: "pointer"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = style.icon + "15";
                      e.currentTarget.style.gap = "8px";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.gap = "5px";
                    }}
                  >
                    {insight.action} <ArrowRight size={11} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spending velocity */}
      <div className="card" style={{ padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Lightbulb size={16} color="#f59e0b" />
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>Monthly Spending Velocity</h3>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SPENDING_BREAKDOWN.map((cat, i) => {
            const pct = Math.round((cat.value / totalExpense) * 100);
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button
                  onClick={() => {
                    dispatch({ type: "SET_FILTER", payload: cat.name });
                    dispatch({ type: "SET_ACTIVE_TAB", payload: "transactions" });
                  }}
                  style={{
                    width: 90, fontSize: 12, color: cat.color, flexShrink: 0,
                    background: "none", padding: 0, textAlign: "left",
                    fontWeight: 500, transition: "opacity 0.15s", cursor: "pointer"
                  }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
                  title={"View " + cat.name + " transactions"}
                >
                  {cat.name}
                </button>
                <div style={{ flex: 1, height: 8, background: "var(--bg4)", borderRadius: 4, overflow: "hidden", cursor: "pointer" }}
                  onClick={() => {
                    dispatch({ type: "SET_FILTER", payload: cat.name });
                    dispatch({ type: "SET_ACTIVE_TAB", payload: "transactions" });
                  }}
                >
                  <div style={{
                    height: "100%", width: pct + "%", background: cat.color, borderRadius: 4,
                    animation: "barGrow 1s cubic-bezier(0.22,1,0.36,1) forwards",
                    animationDelay: (i * 0.1) + "s", transformOrigin: "left"
                  }} />
                </div>
                <span style={{ width: 36, fontSize: 12, color: "var(--text2)", textAlign: "right" }}>{pct}%</span>
                <span style={{ width: 70, fontSize: 12, color: cat.color, textAlign: "right" }}>
                  ₹{cat.value.toLocaleString("en-IN")}
                </span>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 11, color: "var(--text2)", marginTop: 12 }}>
          Click any category to view its transactions →
        </p>
      </div>
    </div>
  );
}
