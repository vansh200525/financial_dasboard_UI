import { createContext, useContext, useReducer, useEffect } from "react";
import { TRANSACTIONS } from "../data/data";

const AppContext = createContext(null);

const initialState = {
  role: localStorage.getItem("finvault_role") || "viewer",
  transactions: TRANSACTIONS,
  searchQuery: "",
  filterCategory: "All",
  sortBy: "date",
  sortOrder: "desc",
  activeTab: "dashboard",
  notifications: [],
  theme: "dark",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      localStorage.setItem("finvault_role", action.payload);
      return { ...state, role: action.payload };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_FILTER":
      return { ...state, filterCategory: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_SORT_ORDER":
      return { ...state, sortOrder: action.payload };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "ADD_TRANSACTION":
      const updated = [action.payload, ...state.transactions];
      return { ...state, transactions: updated };
    case "DELETE_TRANSACTION":
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [action.payload, ...state.notifications].slice(0, 5) };
    case "TOGGLE_THEME":
      return { ...state,theme: state.theme === "dark" ? "light" : "dark"};
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
  document.body.setAttribute("data-theme", state.theme);
}, [state.theme]);

  const filteredTransactions = state.transactions
    .filter(t => {
      const matchSearch = t.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        t.merchant.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(state.searchQuery.toLowerCase());
      const matchCategory = state.filterCategory === "All" || t.category === state.filterCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      let valA, valB;
      if (state.sortBy === "date") { valA = new Date(a.date); valB = new Date(b.date); }
      else if (state.sortBy === "amount") { valA = Math.abs(a.amount); valB = Math.abs(b.amount); }
      else { valA = a.description; valB = b.description; }
      if (state.sortOrder === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

  const categories = ["All", ...new Set(state.transactions.map(t => t.category))];

  const totalIncome = state.transactions.filter(t => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalExpense = Math.abs(state.transactions.filter(t => t.type === "debit").reduce((s, t) => s + t.amount, 0));
  const balance = totalIncome - totalExpense;
  const savingsRate = Math.round((balance / totalIncome) * 100);

  return (
    <AppContext.Provider value={{ state, dispatch, filteredTransactions, categories, totalIncome, totalExpense, balance, savingsRate }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
