# 💰 Bank Statement Dashboard

> Upload a CSV bank statement. See where your money goes.

**Live Demo**: [https://joyceisgrumpy-del.github.io/bank-statement-dashboard](https://yourusername.github.io/bank-statement-dashboard)

---

## Overview

Bank Statement Dashboard is a web application that parses CSV bank statements and transforms them into interactive visual dashboards. Built with vanilla JavaScript and Chart.js, it runs entirely in the browser with no backend required.

**Theme**: Digital Literacy & Financial Wellness  
**Course**: Programming Fundamentals (2025)

---

## Features

- **CSV Upload & Parsing** — Reads `.csv` files using the FileReader API
- **Auto-Categorization** — Detects transaction categories from keywords
- **Summary Statistics** — Total income, expenses, net balance, transaction count
- **Pie Chart** — Expense distribution by category (Chart.js API)
- **Bar Chart** — Income vs expenses comparison (Chart.js API)
- **Sortable Table** — Click column headers to sort ascending/descending
- **Search & Filter** — Find transactions by text or filter by category
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Error Handling** — Validates file format and shows user-friendly messages

---

## Technologies

| Technology | Type | Purpose |
|------------|------|---------|
| HTML5 | Core | Page structure and semantics |
| CSS3 | Core | Styling, Grid, Flexbox, animations |
| JavaScript ES6 | Core | Application logic and interactivity |
| Chart.js 4.x | 3rd-party API | Interactive chart creation |
| FileReader API | Built-in API | Client-side file reading |
| DOM API | Built-in API | Dynamic page updates |
| Google Fonts | External | Typography (DM Sans, Space Mono) |

---

## Installation

### Local
```bash
git clone https://github.com/yourusername/bank-statement-dashboard.git
cd bank-statement-dashboard
open index.html
```
No build tools or dependencies to install — just open in a browser.

### GitHub Pages
1. Fork this repository
2. Settings → Pages → Deploy from `main` branch
3. Visit `https://yourusername.github.io/bank-statement-dashboard`

---

## Usage

### 1. Prepare CSV
```csv
Date,Description,Amount,Category
2024-05-01,Starbucks Coffee,-5.50,Food & Beverage
2024-05-02,Monthly Salary,3500.00,Income
```
- Negative amounts = expenses
- Positive amounts = income
- Category column is optional (auto-detected)

### 2. Upload & Parse
Click **Choose File** → select CSV → click **Parse & Visualize**

### 3. Explore
- View summary cards
- Hover over charts for details
- Sort table by clicking column headers
- Search or filter transactions

---

## Programming Concepts Demonstrated

| Concept | Where Used |
|---------|-----------|
| Variables & Data Types | Counters, transaction data, chart config |
| Arrays | Transaction list, chart labels/data |
| Objects | Transaction structure, category totals |
| For Loops | CSV line processing, calculations |
| Conditionals (if/else) | Categorization, validation, income vs expense |
| Functions | Parsing, calculations, chart creation, display |
| String Methods | .split(), .trim(), .toLowerCase(), .includes() |
| DOM Manipulation | Updating cards, building table rows, show/hide |
| Event Listeners | File selection, button clicks, search input |
| API Integration | Chart.js for pie and bar charts |

---

## Data Flow

```
CSV File
  ↓  FileReader API reads file as text
Raw Text
  ↓  parseCSV() splits lines and commas
Array of Objects
  ↓  calculateAndDisplaySummary()
  ↓  calculateCategoryTotals()
Processed Data
  ↓  Chart.js API creates pie + bar charts
  ↓  displayTransactionTable() builds HTML
Visual Dashboard
```

---

## Project Structure

```
bank-statement-dashboard/
├── index.html      # Application structure
├── style.css       # All styling and responsive design
├── script.js       # Application logic (heavily commented)
├── sample.csv      # Test data (30 transactions)
└── README.md       # This file
```

---

## Testing

### Functional Tests
- [x] CSV upload accepts .csv files
- [x] Rejects non-CSV files with error message
- [x] Handles missing category column
- [x] Skips empty lines and invalid rows
- [x] Summary calculations are accurate
- [x] Pie chart shows all expense categories
- [x] Bar chart shows correct income/expense totals
- [x] Table sorting works on all columns
- [x] Search filters by description
- [x] Category dropdown filters correctly
- [x] Reset button returns to upload screen

### Cross-Browser
- [x] Chrome
- [x] Firefox
- [x] Safari
- [x] Edge

### Responsive
- [x] Desktop (1920×1080)
- [x] Tablet (768×1024)
- [x] Mobile (375×667)

---

## Future Enhancements

- Line chart for spending trends over time
- Budget goal setting
- Export dashboard as PDF
- Multi-currency support
- Dark mode toggle
- LocalStorage for saving previous sessions

---

## Acknowledgments

- [Chart.js](https://www.chartjs.org/) — Visualization library
- [MDN Web Docs](https://developer.mozilla.org/) — JavaScript reference
- [Google Fonts](https://fonts.google.com/) — DM Sans and Space Mono typefaces

---

## Author

**Your Name**  
Programming Fundamentals — 2025

---

*Built with HTML, CSS, JavaScript, and Chart.js*
