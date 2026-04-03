export const TRANSACTIONS = [
  { id: 1, date: "2025-12-15", description: "Netflix Subscription", category: "Entertainment", amount: -649, type: "debit", merchant: "Netflix" },
  { id: 2, date: "2025-12-14", description: "Salary Credit", category: "Income", amount: 85000, type: "credit", merchant: "Zorvyn FinTech" },
  { id: 3, date: "2025-12-13", description: "Grocery Shopping", category: "Food", amount: -3240, type: "debit", merchant: "Big Bazaar" },
  { id: 4, date: "2025-12-12", description: "Uber Ride", category: "Transport", amount: -320, type: "debit", merchant: "Uber" },
  { id: 5, date: "2025-12-11", description: "Amazon Purchase", category: "Shopping", amount: -5499, type: "debit", merchant: "Amazon" },
  { id: 6, date: "2025-12-10", description: "Electricity Bill", category: "Utilities", amount: -2100, type: "debit", merchant: "UPCL" },
  { id: 7, date: "2025-12-09", description: "Restaurant Dinner", category: "Food", amount: -1850, type: "debit", merchant: "Olive Bar" },
  { id: 8, date: "2025-12-08", description: "Freelance Income", category: "Income", amount: 25000, type: "credit", merchant: "Client Payment" },
  { id: 9, date: "2025-12-07", description: "Gym Membership", category: "Health", amount: -2500, type: "debit", merchant: "Cult.fit" },
  { id: 10, date: "2025-12-06", description: "Spotify Premium", category: "Entertainment", amount: -119, type: "debit", merchant: "Spotify" },
  { id: 11, date: "2025-12-05", description: "Medical Checkup", category: "Health", amount: -1500, type: "debit", merchant: "Max Hospital" },
  { id: 12, date: "2025-12-04", description: "Zomato Order", category: "Food", amount: -450, type: "debit", merchant: "Zomato" },
  { id: 13, date: "2025-12-03", description: "Mobile Recharge", category: "Utilities", amount: -599, type: "debit", merchant: "Airtel" },
  { id: 14, date: "2025-12-02", description: "Coffee Shop", category: "Food", amount: -280, type: "debit", merchant: "Third Wave" },
  { id: 15, date: "2025-12-01", description: "Dividends", category: "Income", amount: 4200, type: "credit", merchant: "Zerodha" },
  { id: 16, date: "2025-11-28", description: "Fuel", category: "Transport", amount: -3200, type: "debit", merchant: "HPCL" },
  { id: 17, date: "2025-11-27", description: "Online Course", category: "Education", amount: -2999, type: "debit", merchant: "Udemy" },
  { id: 18, date: "2025-11-26", description: "Insurance Premium", category: "Insurance", amount: -8500, type: "debit", merchant: "LIC" },
  { id: 19, date: "2025-11-25", description: "Book Purchase", category: "Education", amount: -890, type: "debit", merchant: "Amazon Books" },
  { id: 20, date: "2025-11-24", description: "Swiggy Order", category: "Food", amount: -620, type: "debit", merchant: "Swiggy" },
];

export const BALANCE_TREND = [
  { month: "Jul", balance: 42000, income: 89000, expense: 52000 },
  { month: "Aug", balance: 55000, income: 92000, expense: 47000 },
  { month: "Sep", balance: 38000, income: 78000, expense: 61000 },
  { month: "Oct", balance: 61000, income: 95000, expense: 49000 },
  { month: "Nov", balance: 74000, income: 98000, expense: 43000 },
  { month: "Dec", balance: 89000, income: 114200, expense: 34820 },
];

export const SPENDING_BREAKDOWN = [
  { name: "Food", value: 6440, color: "#f97316", percent: 28 },
  { name: "Shopping", value: 5499, color: "#8b5cf6", percent: 24 },
  { name: "Health", value: 4000, color: "#10b981", percent: 17 },
  { name: "Utilities", value: 2699, color: "#3b82f6", percent: 12 },
  { name: "Transport", value: 3520, color: "#f59e0b", percent: 15 },
  { name: "Entertainment", value: 768, color: "#ec4899", percent: 4 },
];

export const INSIGHTS = [
  {
    id: 1,
    type: "warning",
    title: "Food spending up 23%",
    description: "You spent ₹6,440 on food this month — 23% more than your monthly average of ₹5,237.",
    icon: "TrendingUp",
    action: "View food transactions"
  },
  {
    id: 2,
    type: "success",
    title: "Savings goal on track",
    description: "You've saved ₹89,000 this month, putting you ahead of your ₹75,000 monthly savings goal.",
    icon: "Target",
    action: "View savings plan"
  },
  {
    id: 3,
    type: "info",
    title: "3 subscriptions detected",
    description: "Netflix, Spotify, and Gym total ₹3,268/month. Consider reviewing unused subscriptions.",
    icon: "CreditCard",
    action: "Review subscriptions"
  },
  {
    id: 4,
    type: "warning",
    title: "Large transaction alert",
    description: "Insurance premium of ₹8,500 detected. Ensure this aligns with your budget.",
    icon: "AlertTriangle",
    action: "View transaction"
  },
];
