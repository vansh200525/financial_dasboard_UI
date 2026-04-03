#  Zorvyn FinTech Dashboard

A modern, responsive **FinTech dashboard** built to visualize financial data like income, expenses, savings, and insights in a clean and interactive way.

Designed with a focus on **real-world UI/UX**, smooth interactions, and cross-device responsiveness.

---

## Live Demo

 Deployed on Vercel: *(add your link here)*

---

## Features

*  **Balance Trend Visualization** (Income vs Expense vs Balance)
*  **Spending Insights & Analytics**
*  **Transaction Management UI**
*  **Admin / Viewer Mode Toggle**
*  **Category-based Expense Breakdown**
*  **Fully Responsive (Mobile, Tablet, Desktop)**
*  Smooth animations and modern UI design

---

##  Tech Stack

### Frontend

* **React.js** – UI development
* **Vite** – Fast build tool & development server
* **JavaScript (ES6+)**

### UI & Styling

* **CSS (Custom + Variables)**
* **Flexbox & Grid Layout**
* **Responsive Design (Media Queries)**

### Charts & Visualization

* **Recharts** – For graphs and data visualization

### Icons

* **Lucide React** – Modern icon library

### State Management

* **React Context API**

---

##  Project Structure

```
# Project Structure (Zorvyn FinTech Dashboard)

```bash
finance-dashboard/
│
├── node_modules/                   # Installed dependencies (auto-generated)
│
├── public/
│   └── favicon.svg                 # Browser tab icon
│
├── src/
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── BalanceTrendChart.jsx   # Chart for income, expense, balance
│   │   ├── InsightsSection.jsx     # Insights cards section
│   │   ├── Sidebar.jsx             # Sidebar navigation and branding
│   │   ├── SpendingBreakdown.jsx   # Category-wise spending visualization
│   │   ├── SummaryCards.jsx        # Top summary cards (income, savings, etc.)
│   │   ├── TransactionList.jsx     # Transactions list UI
│   │
│   ├── context/                    # Global state management
│   │   └── AppContext.jsx          # Manages state (active tab, role, filters)
│   │
│   ├── data/                       # Static/mock data
│   │   └── data.js                 # Financial data (income, expenses, insights)
│   │
│   ├── App.jsx                     # Main layout (Sidebar + dynamic content)
│   ├── main.jsx                    # Entry point of the React app
│   ├── index.css                   # Global styles (theme, colors, fonts)
│
├── index.html                      # Root HTML file
├── package.json                    # Dependencies and scripts
├── package-lock.json               # Dependency lock file
├── vite.config.js                  # Vite configuration
├── README.md                       # Project documentation
```

---

## How It Works

User interacts with Sidebar
→ AppContext updates state
→ App.jsx switches active view
→ Components render data
→ UI updates

---

## Key Concepts

* Component-based architecture
* Centralized state using Context API
* Data-driven UI using mock data
* Responsive design
* Reusable components




---

##  Installation & Setup

```bash
# Clone the repository
git clone https://github.com/vansh200525/financial_dasboard_UI.git

# Navigate into the project
cd finance-dashboard

# Install dependencies
npm install

# Run development server
npm run dev
```

---

##  Deployment (Vercel)

This project is deployed using **Vercel**.

### Steps to deploy:

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Click **Deploy**

Vercel will automatically:

* Detect **Vite + React**
* Build the project
* Deploy instantly

---

##  Design Highlights

* Clean **FinTech-inspired UI**
* Subtle gradients & glass effects
* Smooth hover and transition animations
* Optimized spacing and typography
* Mobile-first responsive layout

---

##  Future Improvements

*  Backend integration (Node.js / FastAPI)
*  Authentication system
*  Real-time data updates
*  Export reports (PDF/CSV)
*  Mobile app version (React Native / Kivy)

---

##  Author

**Vansh **
Aspiring Full Stack + AI Engineer

---

