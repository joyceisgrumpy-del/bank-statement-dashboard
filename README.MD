# 🧁 My Spending Diary

> Upload a CSV statement. See where your pennies went~ ✿

**Live Demo**: [https://joyceisgrumpy-del.github.io/bank-statement-dashboard](https://joyceisgrumpy-del.github.io/bank-statement-dashboard)

---

## Overview

My Spending Diary is a cute-themed interactive web application that transforms CSV bank statements into visual dashboards with charts, sortable tables, and gamified manual entry. Built with vanilla JavaScript and Chart.js, it runs entirely in the browser: no backend, no data sent anywhere.

**Theme**: Digital Literacy & Financial Wellness  
**Course**: Programming Fundamentals (2026)

---

## Features

### 📁 CSV Upload & Parsing
- Drag-and-drop or click to upload CSV bank statements
- Smart auto-categorization based on transaction keywords
- Validates file format and skips malformed rows
- Error messages for invalid files

### 📊 Visual Dashboard (Chart.js API)
- **Pie Chart** — Spending breakdown by category with interactive hover pop-out
- **Bar Chart** — Income vs expenses comparison
- Both charts update dynamically when data changes
- Custom pastel color palette matching cute theme

### 📋 Transaction Table
- Sortable columns (click headers to sort ascending/descending)
- Search by description
- Filter by category dropdown
- Scrollable within its panel — no page scrolling

### ✏️ Edit Transactions
- Click the ✏️ button on any row to edit
- Modal pre-fills with existing transaction data
- Save changes to update the dashboard instantly

### 🗑️ Delete Transactions
- Click the 🗑️ button on any row
- Cute confirmation dialog shows transaction details
- Dashboard auto-refreshes after deletion

### 💭 Memo / Notes
- Optional memo field when adding or editing entries
- Displays as italic text under the transaction description
- Great for adding context like "Birthday dinner with friends~"

### 📁 Merge Multiple CSVs
- "Add CSV" button lets you upload additional statements
- Consolidates with existing data automatically
- Duplicate detection skips matching transactions (same date + description + amount)
- Shows count of added entries vs skipped duplicates

### 🎮 Gamified Manual Entry
- Floating "Log Entry" button opens a cute modal form
- **+10 XP** awarded for each transaction logged manually
- **+5 bonus XP** for maintaining a daily streak
- **8 levels** to unlock:

| Level | Badge | Title | XP Required |
|-------|-------|-------|-------------|
| 1 | 🌱 | Seedling | 0 |
| 2 | 🌿 | Sprout | 50 |
| 3 | 🌸 | Blossom | 120 |
| 4 | 🌻 | Sunflower | 200 |
| 5 | 🌺 | Bloom Master | 350 |
| 6 | 🌳 | Money Tree | 500 |
| 7 | 💎 | Diamond Saver | 750 |
| 8 | 👑 | Budget Royalty | 1000 |

- **Streak counter** (fire 🔥) tracks consecutive days of logging
- **XP bar** shows progress to next level
- **Toast notifications** slide in with cute messages
- All progress saved in LocalStorage (persists across sessions)

### 🎨 Cute Design
- Warm pastel color palette (cream, rose, mint, peach, lavender)
- Rounded Nunito typography
- Cute emoji icons throughout
- Subtle dot pattern background
- Smooth hover animations and transitions
- Responsive design — works on desktop, tablet, and mobile

---

## Technologies

| Technology | Type | Purpose |
|------------|------|---------|
| HTML5 | Core | Semantic page structure and accessibility |
| CSS3 | Core | Styling with Grid, Flexbox, animations, CSS variables |
| JavaScript ES6 | Core | Application logic, DOM manipulation, event handling |
| Chart.js 4.x | 3rd-party API | Interactive pie and bar chart creation |
| FileReader API | Built-in API | Client-side CSV file reading |
| LocalStorage API | Built-in API | Persisting XP, streaks, and level progress |
| DOM API | Built-in API | Dynamic page updates and element creation |
| Google Fonts | External | Nunito and Space Mono typefaces |

---

## Installation

### Local
```bash
git clone https://github.com/joyceisgrumpy-del/bank-statement-dashboard.git
cd bank-statement-dashboard
open index.html
```
No build tools or dependencies — just open in a browser.

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
- Category column is optional (auto-detected from keywords)

### 2. Upload & Parse
Click **Choose File** or drag-and-drop a CSV → click **Parse & Visualize**

### 3. Explore Your Dashboard
- View summary cards (Money In, Spent, Left Over, Entries)
- Hover over pie chart slices to see them pop out with percentages
- Sort table columns by clicking headers
- Search or filter transactions
- Edit ✏️ or delete 🗑️ any transaction
- Add memos to entries for context

### 4. Log Entries Manually
Click the floating pink **Log Entry** button → fill in the cute form → earn XP!

### 5. Merge More Data
Click **Add CSV** to upload additional statements — duplicates are automatically skipped

---

## Programming Concepts Demonstrated

| Concept | Where Used |
|---------|-----------|
| Variables & Data Types | Counters, transaction data, XP tracking |
| Arrays | Transaction list, chart labels/data, level thresholds |
| Objects | Transaction structure, category totals, gamification config |
| For Loops | CSV line processing, calculations, duplicate checking |
| Conditionals (if/else) | Categorization, validation, level calculation, streak logic |
| Functions | Parsing, calculations, chart creation, modal handling |
| String Methods | .split(), .trim(), .toLowerCase(), .includes(), .endsWith() |
| DOM Manipulation | Updating cards, building table rows, show/hide sections |
| Event Listeners | File selection, drag-and-drop, button clicks, form submit |
| Chart.js API | Pie chart with hoverOffset, bar chart with custom tooltips |
| LocalStorage API | Saving/loading XP, streak, and level data |
| Array Methods | .push(), .splice(), .sort(), .indexOf(), spread operator |
| JSON Methods | JSON.stringify() and JSON.parse() for data persistence |
| Template Literals | Building HTML strings with backtick syntax |
| Callback Functions | FileReader.onload, Chart.js tooltip formatters |
| Modular Design | Separate functions for each responsibility |

---

## Data Flow

```
                    ┌─────────────┐
                    │  CSV File   │
                    └──────┬──────┘
                           │ FileReader API
                           ▼
                    ┌─────────────┐     ┌──────────────┐
                    │ parseCSV()  │◄────│ Add CSV      │
                    └──────┬──────┘     │ (merge mode) │
                           │            └──────────────┘
                           ▼
               ┌───────────────────────┐
               │  allTransactions []   │◄──── Manual Entry Form
               │  [{date, desc,        │        (+10 XP)
               │    amount, category,  │
               │    memo}]             │◄──── Edit / Delete
               └───────────┬───────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        ┌──────────┐ ┌──────────┐ ┌──────────┐
        │ Summary  │ │ Chart.js │ │  Table   │
        │  Cards   │ │  API     │ │ Display  │
        └──────────┘ └──────────┘ └──────────┘
              │            │            │
              ▼            ▼            ▼
        ┌─────────────────────────────────────┐
        │         Visual Dashboard            │
        │  [Stats] [Pie] [Bar] [Transactions] │
        └─────────────────────────────────────┘
```

---

## Project Structure

```
bank-statement-dashboard/
├── index.html      # Application structure (semantic HTML5)
├── style.css       # cute styling (CSS Grid, Flexbox, animations)
├── script.js       # Application logic (heavily commented, ~1200 lines)
├── sample.csv      # Sample data (30 transactions)
└── README.md       # This file
```

---

## Development Process

### Commit History

| Date | Commit | Description |
|------|--------|-------------|
| Jun 2 | Initial setup | Project structure, CSV parser, Chart.js integration |
| Jun 3 | No-scroll dashboard | Single-screen layout with 3-column grid |
| Jun 3 | Pie chart interactivity | Hover pop-out effect, pastel colors |
| Jun 4 | Major update | cute theme, gamification, edit/delete, memo, CSV merge |

### Key Design Decisions
- **Single-screen layout** — No page scrolling; charts and transactions visible simultaneously
- **Cute aesthetic** — Warm pastels and cute emojis make financial tracking less stressful
- **Gamification** — XP and streaks turn tedious data entry into an engaging activity
- **Client-side only** — All processing in browser; no data leaves the user's device
- **CSV merge with deduplication** — Practical feature for consolidating multiple bank statements

---

## Testing

### Functional Tests
- [x] CSV upload via click and drag-and-drop
- [x] Rejects non-CSV files with error message
- [x] Handles missing category column (auto-categorizes)
- [x] Skips empty lines and invalid rows
- [x] Summary calculations are accurate
- [x] Pie chart shows categories with hover pop-out
- [x] Bar chart shows correct income/expense totals
- [x] Table sorting works on all columns
- [x] Search filters by description
- [x] Category dropdown filters correctly
- [x] Edit transaction opens pre-filled modal
- [x] Delete transaction shows confirmation dialog
- [x] Memo field saves and displays correctly
- [x] Merge CSV adds new entries and skips duplicates
- [x] Manual entry awards XP and updates dashboard
- [x] Streak tracking persists across sessions
- [x] Level-up triggers toast notification
- [x] Reset button clears everything and returns to upload

### Cross-Browser
- [x] Chrome
- [x] Firefox
- [x] Safari
- [x] Edge

### Responsive
- [x] Desktop (1920×1080) — 3-column layout
- [x] Tablet (768×1024) — 2-column, transactions below
- [x] Mobile (375×667) — Single column, stacked

---

## Testing
 
### Test Case Table
 
#### CSV Upload & Parsing
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-01 | Upload valid CSV | sample.csv available | Click "Choose File" → select sample.csv → click "Parse & Visualize" | Dashboard loads with all transactions, charts, and summary cards | ✅ Pass |
| TC-02 | Drag and drop CSV | sample.csv available | Drag sample.csv onto upload box | File name appears, parse button enables, box turns green | ✅ Pass |
| TC-03 | Upload non-CSV file | .txt or .pdf file available | Click "Choose File" → select a .txt file → click "Parse & Visualize" | Error message: "Please upload a file with .csv extension" | ✅ Pass |
| TC-04 | Upload with no file selected | — | Click "Parse & Visualize" without selecting a file | Error message: "Please select a CSV file first!" | ✅ Pass |
| TC-05 | CSV with missing category column | CSV with only Date, Description, Amount | Upload 3-column CSV → parse | Auto-categorizes based on description keywords (e.g. "Starbucks" → Food & Beverage) | ✅ Pass |
| TC-06 | CSV with empty lines | CSV containing blank rows | Upload CSV with empty lines between transactions | Empty lines skipped, valid transactions parsed correctly | ✅ Pass |
| TC-07 | CSV with invalid amount | CSV with "abc" in Amount column | Upload malformed CSV | Invalid rows skipped, valid rows parsed, console warning logged | ✅ Pass |
 
#### Dashboard & Summary
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-08 | Summary card accuracy | CSV loaded with known totals | Upload CSV → check Money In, Spent, Left Over cards | Income, expenses, and balance match manual calculation | ✅ Pass |
| TC-09 | Transaction count | CSV loaded | Upload CSV with 30 rows (excluding header) | Entries card shows "30" | ✅ Pass |
| TC-10 | Balance color coding | CSV loaded | Upload CSV where income > expenses | Left Over value displays in green | ✅ Pass |
| TC-11 | Negative balance color | CSV loaded where expenses > income | Upload expense-heavy CSV | Left Over value displays in red | ✅ Pass |
| TC-12 | Reset dashboard | Dashboard active | Click "New File" button | Returns to upload screen, all data cleared, charts destroyed | ✅ Pass |
 
#### Chart.js API (Pie Chart)
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-13 | Pie chart renders | CSV loaded | Upload CSV with multiple categories | Pie chart displays with colored slices for each expense category | ✅ Pass |
| TC-14 | Pie chart hover pop-out | Pie chart visible | Hover mouse over a pie slice | Slice pops out 15px, tooltip shows category name, dollar amount, and percentage | ✅ Pass |
| TC-15 | Pie chart legend | Pie chart visible | Check legend below chart | All expense categories listed with matching color dots | ✅ Pass |
| TC-16 | Pie chart excludes income | CSV with income + expenses | Upload CSV | Pie chart only shows expense categories, not income | ✅ Pass |
 
#### Chart.js API (Bar Chart)
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-17 | Bar chart renders | CSV loaded | Upload CSV | Bar chart shows two bars: Income (green) and Expenses (coral) | ✅ Pass |
| TC-18 | Bar chart values | CSV with known totals | Upload CSV → hover bars | Tooltip shows correct dollar amounts matching summary cards | ✅ Pass |
| TC-19 | Bar chart Y-axis | Bar chart visible | Check Y-axis labels | Y-axis starts at $0, labels formatted as currency | ✅ Pass |
 
#### Transaction Table
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-20 | Table displays all rows | CSV loaded | Upload CSV with 30 transactions | Table shows all 30 rows, "Showing 30 of 30" displayed | ✅ Pass |
| TC-21 | Sort by date ascending | Table visible | Click "Date" column header once | Rows sorted oldest to newest | ✅ Pass |
| TC-22 | Sort by date descending | Already sorted ascending | Click "Date" column header again | Rows sorted newest to oldest (direction toggles) | ✅ Pass |
| TC-23 | Sort by amount | Table visible | Click "Amount" column header | Rows sorted numerically by amount | ✅ Pass |
| TC-24 | Search filter | Table visible | Type "Grab" in search box | Only rows with "Grab" in description shown, count updates | ✅ Pass |
| TC-25 | Category filter | Table visible | Select "Transport" from dropdown | Only Transport rows shown, count updates | ✅ Pass |
| TC-26 | Combined search + filter | Table visible | Type "Bus" + select "Transport" | Only Transport rows containing "Bus" shown | ✅ Pass |
| TC-27 | Clear search | Search active | Delete search text | All rows visible again | ✅ Pass |
| TC-28 | Income styling | Table visible | Check income transaction amounts | Positive amounts show in green with + prefix | ✅ Pass |
| TC-29 | Expense styling | Table visible | Check expense transaction amounts | Negative amounts show in red | ✅ Pass |
 
#### Edit Transaction
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-30 | Open edit modal | Dashboard active | Click ✏️ on any transaction row | Modal opens with title "Edit Entry", fields pre-filled with transaction data | ✅ Pass |
| TC-31 | Edit description | Edit modal open | Change description → click "Save Changes" | Transaction updates in table, charts refresh | ✅ Pass |
| TC-32 | Edit amount | Edit modal open | Change amount from -5.50 to -10.00 → save | Summary cards recalculate, charts update | ✅ Pass |
| TC-33 | Edit no XP awarded | Edit modal open | Save changes to existing entry | No XP toast appears (XP only for new entries) | ✅ Pass |
| TC-34 | Edit cancel | Edit modal open | Click ✕ or click outside modal | Modal closes, no changes made | ✅ Pass |
 
#### Delete Transaction
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-35 | Delete confirmation | Dashboard active | Click 🗑️ on any transaction | Confirmation dialog appears showing transaction details | ✅ Pass |
| TC-36 | Confirm delete | Confirmation dialog open | Click "Delete" | Transaction removed, table and charts refresh, toast shows "Entry deleted" | ✅ Pass |
| TC-37 | Cancel delete | Confirmation dialog open | Click "Keep it" | Dialog closes, transaction unchanged | ✅ Pass |
| TC-38 | Delete updates totals | Dashboard active | Delete an expense transaction | Summary cards recalculate, pie chart updates, bar chart updates | ✅ Pass |
 
#### Memo Feature
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-39 | Add memo to new entry | Log Entry modal open | Fill all fields + type memo "Birthday treat" → Log It | Memo appears under description as italic "💭 Birthday treat" | ✅ Pass |
| TC-40 | Memo optional | Log Entry modal open | Fill required fields, leave memo blank → Log It | Transaction added successfully without memo text | ✅ Pass |
| TC-41 | Edit existing memo | Edit modal open (entry with memo) | Change memo text → Save Changes | Updated memo displayed in table | ✅ Pass |
 
#### CSV Merge
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-42 | Merge new CSV | Dashboard active with data | Click "Add CSV" → select second CSV file | New transactions added, dashboard refreshes, toast shows count | ✅ Pass |
| TC-43 | Duplicate detection | CSV with overlapping transactions loaded | Merge CSV containing some identical transactions | Duplicates skipped, toast shows "Skipped X duplicates" | ✅ Pass |
| TC-44 | Merge XP bonus | Dashboard active | Merge CSV with new entries | "+5 XP for consolidating" toast appears | ✅ Pass |
| TC-45 | Merge non-CSV | Dashboard active | Click "Add CSV" → select .txt file | Error toast: "Please select a CSV file" | ✅ Pass |
 
#### Gamification
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-46 | XP awarded on entry | Dashboard active | Click "Log Entry" → fill form → submit | Toast: "+10 XP earned!", XP bar updates | ✅ Pass |
| TC-47 | Streak counter | No entry logged today | Log a manual entry | Streak counter increments by 1, shows "🔥 X day streak" | ✅ Pass |
| TC-48 | Streak bonus XP | Streak > 1 day | Log entry on consecutive day | Additional toast: "X-day streak! +5 bonus XP" | ✅ Pass |
| TC-49 | Level up | XP near level threshold | Log entries until XP crosses threshold (e.g. 50 XP) | Toast: "Level Up! 🌿 Sprout", badge updates in XP bar | ✅ Pass |
| TC-50 | XP persists on refresh | XP earned previously | Reload page → upload CSV | XP bar shows previously earned XP (loaded from LocalStorage) | ✅ Pass |
| TC-51 | Motivational quotes | — | Open Log Entry modal multiple times | Different random quote shown each time | ✅ Pass |
 
#### Responsive Design
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-52 | Desktop layout | Browser width > 1100px | Upload CSV → view dashboard | 3-column layout: Pie, Bar, Transactions side by side | ✅ Pass |
| TC-53 | Tablet layout | Browser width 768-1100px | Resize browser to tablet width | Charts side by side, transactions below (2-column) | ✅ Pass |
| TC-54 | Mobile layout | Browser width < 600px | Resize to mobile or use phone | Single column, everything stacked vertically | ✅ Pass |
| TC-55 | Mobile upload | Mobile device | Tap "Choose File" → select CSV | File picker opens, parsing works normally | ✅ Pass |
 
#### Cross-Browser
 
| ID | Title | Preconditions | Steps | Expected Result | Status |
|----|-------|---------------|-------|-----------------|--------|
| TC-56 | Chrome compatibility | Chrome browser | Full workflow: upload → dashboard → edit → delete | All features work correctly | ✅ Pass |
| TC-57 | Firefox compatibility | Firefox browser | Full workflow | All features work correctly | ✅ Pass |
| TC-58 | Safari compatibility | Safari browser | Full workflow | All features work correctly | ✅ Pass |
| TC-59 | Edge compatibility | Edge browser | Full workflow | All features work correctly | ✅ Pass |
 
---
## Future Enhancements

- 📈 Line chart for spending trends over time
- 🎯 Budget goal setting per category
- 📄 Export dashboard as PDF
- 🌓 Dark mode toggle
- 💱 Multi-currency support
- 🏆 Achievement badges for milestones
- 📱 Progressive Web App (PWA) support

---

## Acknowledgments

- [Chart.js](https://www.chartjs.org/) — Visualization library
- [MDN Web Docs](https://developer.mozilla.org/) — JavaScript reference
- [Google Fonts](https://fonts.google.com/) — Nunito and Space Mono
- cute design inspiration from cozy finance apps

---

## Author

**Joyce Gan**  
Programming Fundamentals — Ngee Ann Polytechnic 2026

- GitHub: [@joyceisgrumpy-del](https://github.com/joyceisgrumpy-del)

---

*Built with HTML, CSS, JavaScript, Chart.js, and a sprinkle of ✨*