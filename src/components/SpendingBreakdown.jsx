import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { SPENDING_BREAKDOWN } from "../data/data";
import { useState } from "react";

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: "var(--bg3)", border: "1px solid var(--border2)",
      borderRadius: 10, padding: "10px 14px", fontSize: 13
    }}>
      <p style={{ color: d.color, fontWeight: 600 }}>{d.name}</p>
      <p style={{ color: "var(--text)", marginTop: 3 }}>₹{d.value.toLocaleString("en-IN")}</p>
      <p style={{ color: "var(--text2)", fontSize: 11 }}>{d.percent}% of spending</p>
    </div>
  );
};

export default function SpendingBreakdown() {
  const [active, setActive] = useState(null);
  const total = SPENDING_BREAKDOWN.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 3 }}>
          Spending Breakdown
        </h3>
        <p style={{ fontSize: 12, color: "var(--text2)" }}>Categories this month</p>
      </div>

      {/* Donut chart */}
      <div style={{ position: "relative", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={SPENDING_BREAKDOWN}
              cx="50%" cy="50%"
              innerRadius={65} outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              onMouseEnter={(_, idx) => setActive(idx)}
              onMouseLeave={() => setActive(null)}
              animationBegin={200}
              animationDuration={1000}
            >
              {SPENDING_BREAKDOWN.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.color}
                  opacity={active === null || active === i ? 1 : 0.4}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center text */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center", pointerEvents: "none"
        }}>
          {active !== null ? (
            <>
              <p style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-display)", color: SPENDING_BREAKDOWN[active].color }}>
                {SPENDING_BREAKDOWN[active].percent}%
              </p>
              <p style={{ fontSize: 11, color: "var(--text2)" }}>{SPENDING_BREAKDOWN[active].name}</p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)" }}>
                ₹{(total/1000).toFixed(1)}k
              </p>
              <p style={{ fontSize: 11, color: "var(--text2)" }}>Total spent</p>
            </>
          )}
        </div>
      </div>

      {/* Category bars */}
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {SPENDING_BREAKDOWN.map((cat, i) => (
          <div key={i}
            style={{ cursor: "default", opacity: active === null || active === i ? 1 : 0.5, transition: "opacity 0.2s" }}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
              <span style={{ color: "var(--text)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, display: "inline-block" }} />
                {cat.name}
              </span>
              <span style={{ color: "var(--text2)" }}>
                ₹{cat.value.toLocaleString("en-IN")} <span style={{ color: cat.color }}>({cat.percent}%)</span>
              </span>
            </div>
            <div style={{ height: 4, background: "var(--bg4)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${cat.percent}%`,
                background: cat.color,
                borderRadius: 4,
                animation: "barGrow 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
                animationDelay: `${i * 0.1}s`,
                transformOrigin: "left"
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
