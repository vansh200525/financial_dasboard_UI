import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BALANCE_TREND } from "../data/data";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "var(--bg3)",
      border: "1px solid var(--border2)",
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13
    }}>
      <p style={{ color: "var(--text2)", marginBottom: 6, fontWeight: 500 }}>{label} 2025</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: ₹{p.value.toLocaleString("en-IN")}
        </p>
      ))}
    </div>
  );
};

export default function BalanceTrendChart() {
  const [view, setView] = useState("all");
  const data = view === "all" ? BALANCE_TREND : BALANCE_TREND.slice(-3);

  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>
            Balance Trend
          </h3>
          <p style={{ fontSize: 12, color: "var(--text2)" }}>Monthly income vs expense overview</p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["3m", "all"].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "5px 14px", borderRadius: 8, fontSize: 12,
                background: view === v ? "var(--accent)" : "var(--bg3)",
                color: view === v ? "white" : "var(--text2)",
                border: "1px solid",
                borderColor: view === v ? "var(--accent)" : "var(--border)",
                fontWeight: 500
              }}
            >
              {v === "all" ? "6M" : "3M"}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 12, color: "var(--text2)" }}>
        {[
          { color: "#7c6ff7", label: "Balance" },
          { color: "#22c55e", label: "Income" },
          { color: "#ef4444", label: "Expenses" },
        ].map(({ color, label }) => (
          <span key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: color, display: "inline-block" }} />
            {label}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c6ff7" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c6ff7" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: "#9090a8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#9090a8", fontSize: 11 }} axisLine={false} tickLine={false}
            tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} width={50} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="balance" name="Balance" stroke="#7c6ff7" strokeWidth={2.5}
            fill="url(#balGrad)" dot={{ fill: "#7c6ff7", r: 3 }} activeDot={{ r: 5 }} />
          <Area type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={2}
            fill="url(#incGrad)" dot={{ fill: "#22c55e", r: 3 }} activeDot={{ r: 5 }} />
          <Area type="monotone" dataKey="expense" name="Expenses" stroke="#ef4444" strokeWidth={2}
            fill="url(#expGrad)" dot={{ fill: "#ef4444", r: 3 }} activeDot={{ r: 5 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
