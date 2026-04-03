import { useApp } from "../context/AppContext";
import { Search, Filter, SortAsc, SortDesc, Trash2, Plus, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useState } from "react";

const CATEGORY_COLORS = {
  Income: "#22c55e", Food: "#f97316", Shopping: "#8b5cf6",
  Health: "#10b981", Utilities: "#3b82f6", Transport: "#f59e0b",
  Entertainment: "#ec4899", Education: "#06b6d4", Insurance: "#94a3b8"
};

function AddTransactionModal({ onClose }) {
  const { state, dispatch } = useApp();
  const [form, setForm] = useState({ description: "", amount: "", category: "Food", type: "debit", merchant: "" });

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        id: Date.now(), date: new Date().toISOString().split("T")[0],
        description: form.description, category: form.category,
        amount: form.type === "credit" ? Number(form.amount) : -Number(form.amount),
        type: form.type, merchant: form.merchant || form.description
      }
    });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
      backdropFilter: "blur(8px)", padding: 16
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="card animate-fadeUp" style={{ width: "100%", maxWidth: 420, padding: 28, background: "var(--bg2)" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: 20, fontSize: 16 }}>Add Transaction</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Description", key: "description", type: "text", placeholder: "e.g. Coffee at Starbucks" },
            { label: "Amount (₹)", key: "amount", type: "number", placeholder: "0.00" },
            { label: "Merchant", key: "merchant", type: "text", placeholder: "e.g. Starbucks" },
          ].map(({ label, key, type, placeholder }) => (
            <div key={key}>
              <label style={{ fontSize: 12, color: "var(--text2)", marginBottom: 6, display: "block" }}>{label}</label>
              <input
                type={type} placeholder={placeholder}
                value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 10 }}
              />
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: "var(--text2)", marginBottom: 6, display: "block" }}>Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 10 }}>
                <option value="debit">Debit</option>
                <option value="credit">Credit</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "var(--text2)", marginBottom: 6, display: "block" }}>Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                style={{ width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 10 }}>
                {Object.keys(CATEGORY_COLORS).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "10px", borderRadius: 10, background: "var(--bg3)",
            color: "var(--text2)", border: "1px solid var(--border)", fontSize: 14
          }}>Cancel</button>
          <button onClick={handleSubmit} style={{
            flex: 1, padding: "10px", borderRadius: 10,
            background: "linear-gradient(135deg, var(--accent), var(--pink))",
            color: "white", fontSize: 14, fontWeight: 500
          }}>Add Transaction</button>
        </div>
      </div>
    </div>
  );
}

export default function TransactionList() {
  const { state, dispatch, filteredTransactions, categories } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const isAdmin = state.role === "admin";

  return (
    <div className="card" style={{ padding: "22px 24px" }}>
      {showAdd && <AddTransactionModal onClose={() => setShowAdd(false)} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600 }}>TRANSACTIONS</h3>
          <p style={{ fontSize: 12, color: "var(--text2)", marginTop: 2 }}>{filteredTransactions.length} records found</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowAdd(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 500,
            background: "linear-gradient(135deg, var(--accent), var(--pink))",
            color: "white", boxShadow: "0 4px 16px rgba(124,111,247,0.3)"
          }}>
            <Plus size={14} /> Add Transaction
          </button>
        )}
      </div>

      {/* Search + Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text2)" }} />
          <input
            type="text" placeholder="Search transactions..."
            value={state.searchQuery}
            onChange={e => dispatch({ type: "SET_SEARCH", payload: e.target.value })}
            style={{ width: "100%", padding: "9px 12px 9px 34px", fontSize: 13, borderRadius: 10 }}
          />
        </div>

        <select
          value={state.filterCategory}
          onChange={e => dispatch({ type: "SET_FILTER", payload: e.target.value })}
          style={{ padding: "9px 12px", fontSize: 13, borderRadius: 10, minWidth: 130 }}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <div style={{ display: "flex", gap: 6 }}>
          {[["date", "Date"], ["amount", "Amount"], ["description", "Name"]].map(([v, l]) => (
            <button
              key={v}
              onClick={() => {
                if (state.sortBy === v) dispatch({ type: "SET_SORT_ORDER", payload: state.sortOrder === "desc" ? "asc" : "desc" });
                else dispatch({ type: "SET_SORT", payload: v });
              }}
              style={{
                padding: "8px 12px", borderRadius: 10, fontSize: 12, fontWeight: 500,
                background: state.sortBy === v ? "rgba(124,111,247,0.15)" : "var(--bg3)",
                color: state.sortBy === v ? "var(--accent2)" : "var(--text2)",
                border: `1px solid ${state.sortBy === v ? "rgba(124,111,247,0.3)" : "var(--border)"}`,
                display: "flex", alignItems: "center", gap: 4
              }}
            >
              {state.sortBy === v && state.sortOrder === "asc" ? <SortAsc size={12} /> : <SortDesc size={12} />}
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Date", "Description", "Category", "Merchant", "Amount", ...(isAdmin ? ["Action"] : [])].map(h => (
                <th key={h} style={{ padding: "8px 12px", color: "var(--text2)", fontWeight: 500, textAlign: "left", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((t, i) => (
              <tr key={t.id} className="stagger-item"
                style={{ borderBottom: "1px solid var(--border)", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px 12px", color: "var(--text2)", whiteSpace: "nowrap" }}>{t.date}</td>
                <td style={{ padding: "12px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: t.type === "credit" ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      {t.type === "credit"
                        ? <ArrowDownLeft size={12} color="#22c55e" />
                        : <ArrowUpRight size={12} color="#ef4444" />}
                    </span>
                    <span style={{ color: "var(--text)", fontWeight: 500 }}>{t.description}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 12px" }}>
                  <span className="badge" style={{
                    background: `${CATEGORY_COLORS[t.category] || "#888"}18`,
                    color: CATEGORY_COLORS[t.category] || "#888"
                  }}>{t.category}</span>
                </td>
                <td style={{ padding: "12px 12px", color: "var(--text2)" }}>{t.merchant}</td>
                <td style={{ padding: "12px 12px", fontWeight: 600, fontFamily: "var(--font-display)", whiteSpace: "nowrap",
                  color: t.amount > 0 ? "#22c55e" : "#ef4444" }}>
                  {t.amount > 0 ? "+" : ""}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                </td>
                {isAdmin && (
                  <td style={{ padding: "12px 12px" }}>
                    <button
                      onClick={() => dispatch({ type: "DELETE_TRANSACTION", payload: t.id })}
                      style={{
                        background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 8,
                        padding: "5px 8px", color: "#ef4444", display: "flex", alignItems: "center"
                      }}
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTransactions.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text2)" }}>
            <p style={{ fontSize: 14 }}>No transactions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
