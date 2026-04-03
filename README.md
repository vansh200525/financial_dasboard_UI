# Zorvyn FinTech Dashboard

A modern, feature-rich **financial management dashboard** that provides comprehensive insights into personal finances. Built with React and Vite, this dashboard enables users to track income, expenses, savings, and spending patterns with beautiful visualizations and real-time analytics.

Designed with **professional UI/UX**, smooth animations, and full cross-device responsiveness.

---

## 🎯 Live Demo

**Deployed on Vercel:** *(add your deployment link here)*

---

## ✨ Key Features

### 📊 **Financial Visualization**
- **Balance Trend Chart** – Interactive line chart showing Income vs Expense vs Balance trends over months
- **Spending Breakdown** – Pie chart visualization of expenses across different categories
- **Summary Cards** – Real-time display of Total Income, Total Expense, Current Balance, and Savings Rate with animated counting
- **Transaction History** – Searchable, filterable transaction list with sorting options

### 💡 **Smart Insights & Analytics**
- **Spending Alerts** – Get notified when spending in a category exceeds monthly averages
- **Savings Tracking** – Monitor progress toward savings goals
- **Subscription Detection** – Identify recurring subscription services
- **Anomaly Detection** – Alerts for large transactions

### 🎛️ **Advanced Controls**
- **Role-Based Access** – Toggle between Admin (edit/delete) and Viewer (read-only) modes
- **Dynamic Filtering** – Filter transactions by category (Food, Shopping, Health, Entertainment, etc.)
- **Smart Search** – Search transactions by merchant name, description, or category
- **Multi-Sort Options** – Sort by date, amount, or description in ascending/descending order

### 🔔 **User Experience Features**
- **Notification Panel** – Real-time notifications for important financial events
- **Time-Based Greetings** – Personalized greeting (Good morning/afternoon/evening)
- **Responsive Sidebar** – Mobile-friendly navigation menu
- **Smooth Animations** – Fade-in effects and interactive hover states
- **Dark/Modern Theme** – Custom CSS variables for a polished, professional look

### 📱 **Cross-Device Responsive**
- Fully optimized for desktop, tablet, and mobile devices
- Flexible layouts using Flexbox and CSS Grid
- Media queries for seamless scaling

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend Framework** | React.js 18.2 |
| **Build Tool** | Vite 5.0 |
| **Language** | JavaScript (ES6+) |
| **Charts & Graphs** | Recharts 2.10 |
| **UI Icons** | Lucide React 0.383 |
| **State Management** | React Context API |
| **Styling** | Custom CSS with Variables |
| **Layout** | Flexbox & CSS Grid |
| **Responsive Design** | Media Queries |
| **Package Manager** | npm |

---

## 📁 Project Structure

```
finance-dashboard/
│
├── public/                    # Static assets
├── src/
│   ├── components/            # Reusable React components
│   │   ├── BalanceTrendChart.jsx    # Monthly balance trend visualization
│   │   ├── InsightsSection.jsx      # Displaying financial insights/alerts
│   │   ├── Sidebar.jsx              # Navigation sidebar component
│   │   ├── SpendingBreakdown.jsx    # Expense category pie chart
│   │   ├── SummaryCards.jsx         # Key metric cards (Income, Expense, Balance, Savings Rate)
│   │   └── TransactionList.jsx      # Searchable, filterable transaction history
│   │
│   ├── context/
│   │   └── AppContext.jsx           # Global state management (useReducer + Context)
│   │
│   ├── data/
│   │   └── data.js                  # Mock transaction data, balance trends, insights
│   │
│   ├── App.jsx                # Root component with notification system
│   ├── main.jsx               # React DOM render entry point
│   ├── index.css              # Global styles and CSS variables
│   │
│   ├── vite.config.js         # Vite configuration
│   ├── package.json           # Dependencies and scripts
│   └── index.html             # HTML entry point
│
└── README.md                  # This file

```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/zorvyn-fintech-dashboard.git

# 2. Navigate to the project directory
cd finance-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

---

## 📜 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production (optimized)
npm run build

# Preview production build locally
npm run preview
```

---

## 💡 How to Use

### Dashboard Overview
1. **Launch the app** – You'll see a greeting and the main dashboard
2. **Top Navigation Bar** – Access notifications and toggle between Admin/Viewer modes using the Notification bell and Shield icons
3. **Sidebar** – Navigate between different sections

### Key Sections

#### 1. **Summary Cards**
- View your financial summary at a glance
- Cards animate in with counting effects when the page loads
- Shows: Total Income, Total Expenses, Current Balance, Savings Rate (%)

#### 2. **Balance Trend Chart**
- Monthly comparison of Income vs Expenses vs Balance
- Hover over data points to see exact values
- Identify months with good vs. poor financial health

#### 3. **Spending Breakdown**
- Visualize expense distribution across categories
- See percentage and absolute amount for each category
- Top categories: Food (28%), Shopping (24%), Health (17%)

#### 4. **Transactions List**
- View all transactions with date, merchant, amount, and category
- **Search** – Type merchant name, description, or category
- **Filter by Category** – Select specific categories (All, Food, Shopping, Health, etc.)
- **Sort** – Sort by Date, Amount, or Description
- **View Toggle** – Switch between Admin (with delete buttons) and Viewer mode

#### 5. **Insights Section**
- Smart alerts and recommendations
- Examples: Spending alerts, savings goals, subscription detection, anomalies
- Color-coded by type (warning, success, info)

#### 6. **Notifications Panel**
- Click the bell icon to see real-time financial alerts
- Mark notifications as read
- Shows badge with unread count

---

## 🔐 Admin vs Viewer Modes

### Admin Mode (Edit/Delete Access)
- Can delete transactions
- See edit options in transaction list
- Better for financial managers/administrators

### Viewer Mode (Read-Only)
- Can view all data and insights
- Cannot delete or modify transactions
- Ideal for stakeholders and family members

**Toggle your role:** Click the Shield icon in the top bar

---

## 📊 Data Overview

### Sample Transactions
The app comes with 20 sample transactions including:
- Salary & Freelance Income
- Subscriptions (Netflix, Spotify, Gym)
- Groceries & Dining
- Shopping & Entertainment
- Utilities & Bills
- Transport & Healthcare
- Education & Books

### Balance Trend Data
Historical data for 6 months (July - December) showing income, expenses, and balance trends.

### Spending Categories
- 🍕 Food
- 🛍️ Shopping
- ❤️ Health
- 💡 Utilities
- 🚗 Transport
- 🎬 Entertainment
- 📚 Education
- 🏥 Insurance

---

## 🌐 Deployment (Vercel)

### Quick Deploy Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [https://vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Click **"Deploy"**

### Automatic Features
✓ Automatic deployments on every push to main  
✓ Preview deployments for pull requests  
✓ Environment variables support  
✓ No configuration needed (Vite auto-detected)

### Alternative Deployment Platforms
- **Netlify** – Drag and drop build or connect GitHub
- **GitHub Pages** – Free static hosting
- **Railway/Render** – Server-based deployments

---

## 🎨 Customization

### Styling
- Static CSS variables defined in `src/index.css`
- Easy to customize colors, fonts, and spacing
- Modify theme variables for dark/light mode

### Adding Transactions
Edit `src/data/data.js` to add more mock transactions:
```javascript
{
  id: 21,
  date: "2025-12-16",
  description: "Shopping",
  category: "Shopping",
  amount: -2000,
  type: "debit",
  merchant: "H&M"
}
```

### Adding Insights
Add new insights to the `INSIGHTS` array in `src/data/data.js` for alerts and recommendations.

---

## 🔧 State Management

The app uses **React Context API** with `useReducer` for global state:

```javascript
// Available actions:
SET_ROLE              // Toggle Admin/Viewer mode
SET_SEARCH            // Update search query
SET_FILTER            // Filter by category
SET_SORT              // Change sort field
SET_SORT_ORDER        // Asc/Desc
SET_ACTIVE_TAB        // Tab navigation
ADD_TRANSACTION       // Add new transaction
DELETE_TRANSACTION    // Remove transaction
ADD_NOTIFICATION      // Add alert
```

Access the context anywhere with:
```javascript
const { state, dispatch, filteredTransactions } = useApp();
```

---

## 📱 Responsive Breakpoints

- **Desktop** (1024px+) – Full layout with all features
- **Tablet** (768px - 1023px) – Optimized grid, stacked cards
- **Mobile** (< 768px) – Single column, hamburger menu, touch-friendly

---

## 🚀 Future Enhancements

- [ ] Backend integration (Node.js/Express API)
- [ ] User authentication & multi-user support
- [ ] Real data from bank APIs
- [ ] Budget planning & goal tracking
- [ ] Export reports (PDF/CSV)
- [ ] Dark/Light theme toggle
- [ ] Multi-currency support
- [ ] Mobile app (React Native)
- [ ] Real-time notifications

---

## 📄 License

This project is open source and available under the **MIT License**.

---

## 👨‍💻 Author

Created by **Vansh** – A FinTech Dashboard for Personal Finance Management

---

## 📞 Support & Feedback

Have questions or suggestions? Feel free to:
- Open an **Issue** on GitHub
- Create a **Discussion** for feature requests
- Reach out via email

---

## ✅ Checklist for Getting Started

- [ ] Clone the repository
- [ ] Install dependencies (`npm install`)
- [ ] Run dev server (`npm run dev`)
- [ ] Explore the dashboard
- [ ] Try filtering and searching transactions
- [ ] Toggle between Admin/Viewer modes
- [ ] Check notifications panel
- [ ] Deploy to Vercel (optional)

Happy financial tracking! 💰📊
