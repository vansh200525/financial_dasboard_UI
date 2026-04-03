import { useApp } from "../context/AppContext";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { useEffect, useState } from "react";

function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = Math.abs(target);
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return count;
}

function SummaryCard({ title, value, subtitle, icon: Icon, color, gradient, delay = 0, trend, isPercent = false }) {
  const count = useCountUp(Math.abs(value));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const formatted = isPercent
    ? `${count}%`
    : new Intl.NumberFormat("en-IN", {
        style: "currency", currency: "INR", maximumFractionDigits: 0
      }).format(count);

  return (
    <div style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-lg)",
      padding: "20px 22px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, box-shadow 0.2s",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "var(--border2)";
      e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "var(--border)";
      e.currentTarget.style.boxShadow = "none";
    }}
    >
      <div style={{
        position: "absolute", right: -20, top: -20,
        width: 100, height: 100, borderRadius: "50%",
        background: gradient, filter: "blur(40px)", opacity: 0.3, pointerEvents: "none"
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <p style={{ fontSize: 11, color: "var(--text2)", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</p>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: color + "18", border: "1px solid " + color + "30",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          <Icon size={16} color={color} />
        </div>
      </div>

      <p style={{
        fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)",
        color: "var(--text)", letterSpacing: "-0.03em",
        marginBottom: 8, lineHeight: 1,
      }}>
        {formatted}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
        {trend && (
          <span className={"badge badge-" + (trend.positive ? "green" : "red")} style={{ fontSize: 10 }}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
        <p style={{ fontSize: 11, color: "var(--text2)" }}>{subtitle}</p>
      </div>
    </div>
  );
}

export default function SummaryCards() {
  const { totalIncome, totalExpense, balance, savingsRate } = useApp();

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 16
    }}>
      <SummaryCard
        title="Total Balance"
        value={balance}
        subtitle="Available funds"
        icon={Wallet}
        color="#7c6ff7"
        gradient="radial-gradient(circle, #7c6ff7, transparent)"
        delay={0}
        trend={{ positive: true, value: "12% vs last month" }}
      />
      <SummaryCard
        title="Total Income"
        value={totalIncome}
        subtitle="This period"
        icon={TrendingUp}
        color="#22c55e"
        gradient="radial-gradient(circle, #22c55e, transparent)"
        delay={80}
        trend={{ positive: true, value: "8.3% growth" }}
      />
      <SummaryCard
        title="Total Expenses"
        value={totalExpense}
        subtitle="This period"
        icon={TrendingDown}
        color="#ef4444"
        gradient="radial-gradient(circle, #ef4444, transparent)"
        delay={160}
        trend={{ positive: false, value: "3.1% increase" }}
      />
      <SummaryCard
        title="Savings Rate"
        value={savingsRate}
        subtitle="Of total income"
        icon={PiggyBank}
        color="#f59e0b"
        gradient="radial-gradient(circle, #f59e0b, transparent)"
        delay={240}
        isPercent={true}
        trend={{ positive: true, value: "Above 20% goal" }}
      />
    </div>
  );
}
