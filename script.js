// ============================================
// BANK STATEMENT DASHBOARD - JAVASCRIPT
// Programming Fundamentals Project 2025
//
// PIPELINE: CSV Upload → Parse → Chart.js API → Dashboard
//
// PROGRAMMING CONCEPTS DEMONSTRATED:
// 1. Variables & Data Types (let, const, string, number, boolean)
// 2. Arrays (creation, .push(), .length, iteration)
// 3. Objects (creation, properties, methods)
// 4. Loops (for loop, forEach)
// 5. Conditionals (if/else, else if)
// 6. Functions (declaration, parameters, return values)
// 7. String Manipulation (.split, .trim, .toLowerCase, .includes)
// 8. API Integration (Chart.js for data visualization)
// 9. DOM Manipulation (getElementById, textContent, style)
// 10. Event Handling (addEventListener, onclick)
// ============================================


// ============================================
// SECTION 1: GLOBAL VARIABLES
// These are accessible by ALL functions in this file
// ============================================

/**
 * Array to store all parsed transactions
 * Each element is an object: {date, description, amount, category}
 *
 * CONCEPT: Arrays hold multiple values in order
 * Example: ["apple", "banana", "cherry"]
 */
let allTransactions = [];

/**
 * Chart.js chart object references
 * We store these so we can destroy and recreate charts
 * when the user uploads new data
 *
 * CONCEPT: Variables can hold any data type, including objects
 */
let pieChart = null;
let barChart = null;

/**
 * Object tracking the current table sort state
 *
 * CONCEPT: Objects group related data with named properties
 */
let currentSort = {
    column: 'date',
    ascending: true
};


// ============================================
// SECTION 2: INITIALIZATION
// Code that runs when the page first loads
// ============================================

/**
 * This event listener waits for the HTML page to fully load,
 * then runs the setup function inside.
 *
 * CONCEPT: Event Listeners - they "listen" for something to happen
 * Think of it like a doorbell: it waits for someone to press it
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Dashboard initialized and ready');

    // Get the file input element from the HTML
    // CONCEPT: document.getElementById() finds an HTML element by its id attribute
    const fileInput = document.getElementById('csvFile');

    // When user selects a file, call handleFileSelect
    // CONCEPT: 'change' event fires when the input value changes
    fileInput.addEventListener('change', handleFileSelect);

    // ---- DRAG AND DROP SETUP ----
    // CONCEPT: Drag-and-drop uses 4 events: dragenter, dragover, dragleave, drop
    // Think of it like catching a ball:
    //   dragenter = you see the ball coming
    //   dragover  = the ball is above your hands (must prevent default to allow drop)
    //   dragleave = the ball moved away
    //   drop      = you caught the ball

    const uploadBox = document.getElementById('uploadSection').querySelector('.upload-box');

    // When a file is dragged OVER the upload box
    // CONCEPT: preventDefault() stops the browser from opening the file itself
    uploadBox.addEventListener('dragover', function(event) {
        event.preventDefault();
        uploadBox.classList.add('drag-over');
    });

    // When a file enters the upload box area
    uploadBox.addEventListener('dragenter', function(event) {
        event.preventDefault();
        uploadBox.classList.add('drag-over');
    });

    // When a file leaves the upload box area
    uploadBox.addEventListener('dragleave', function(event) {
        event.preventDefault();
        uploadBox.classList.remove('drag-over');
    });

    // When a file is DROPPED onto the upload box
    uploadBox.addEventListener('drop', function(event) {
        // Prevent browser from opening the file
        event.preventDefault();

        // Remove the visual highlight
        uploadBox.classList.remove('drag-over');

        // Get the dropped file
        // CONCEPT: event.dataTransfer.files holds files that were dragged in
        const droppedFile = event.dataTransfer.files[0];

        // Check if a file was actually dropped
        if (!droppedFile) {
            return;
        }

        // Validate it's a CSV file
        if (!droppedFile.name.endsWith('.csv')) {
            showError('Please drop a CSV file (.csv extension)');
            return;
        }

        // Put the dropped file into our file input
        // CONCEPT: DataTransfer lets us assign files to an input element
        const fileInput = document.getElementById('csvFile');
        fileInput.files = event.dataTransfer.files;

        // Update the UI (same as if they clicked "Choose File")
        document.getElementById('fileName').textContent = droppedFile.name;
        document.getElementById('parseButton').disabled = false;

        // Visual feedback on the label
        const fileLabel = document.getElementById('fileLabel');
        fileLabel.style.borderColor = '#2ec4a0';
        fileLabel.style.background = '#eefbf6';

        console.log('✅ File dropped:', droppedFile.name);
    });
});


// ============================================
// SECTION 3: FILE HANDLING
// Functions for uploading and reading files
// ============================================

/**
 * Called when user selects a file
 * Updates the UI to show filename and enables the parse button
 *
 * CONCEPT: Functions are reusable blocks of code
 * @param {Event} event - The browser event object
 */
function handleFileSelect(event) {
    // event.target is the element that triggered the event (the file input)
    // .files is an array-like list of selected files
    // [0] gets the first (and only) file
    const file = event.target.files[0];

    // Get references to UI elements
    const fileNameSpan = document.getElementById('fileName');
    const parseButton = document.getElementById('parseButton');
    const fileLabel = document.getElementById('fileLabel');

    // CONCEPT: Conditional - if file exists, update UI
    if (file) {
        // Show the filename to the user
        fileNameSpan.textContent = file.name;

        // Enable the parse button (remove disabled)
        parseButton.disabled = false;

        // Visual feedback - change label style
        fileLabel.style.borderColor = '#2ec4a0';
        fileLabel.style.background = '#eefbf6';

        console.log('✅ File selected:', file.name);
    }
}

/**
 * Main function triggered by "Parse & Visualize" button
 * Reads the CSV file using the FileReader API (built-in browser API)
 *
 * CONCEPT: This demonstrates BUILT-IN API usage (FileReader)
 */
function loadCSV() {
    console.log('🚀 Starting CSV parsing...');

    // Get the file input and the selected file
    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];

    // VALIDATION: Check if file was selected
    // CONCEPT: Defensive programming - check before proceeding
    if (!file) {
        showError('Please select a CSV file first!');
        return; // Exit function early
    }

    // VALIDATION: Check if it's a .csv file
    // CONCEPT: String method .endsWith() checks the end of a string
    if (!file.name.endsWith('.csv')) {
        showError('Please upload a file with .csv extension');
        return;
    }

    // Show loading spinner
    showLoading(true);

    // Hide any previous errors
    hideError();

    // Create a FileReader object (BUILT-IN BROWSER API)
    // CONCEPT: FileReader reads files from the user's computer
    const reader = new FileReader();

    /**
     * This function runs AFTER the file is read successfully
     * CONCEPT: Callback function - code that runs later, when something finishes
     */
    reader.onload = function(event) {
        console.log('📖 File content loaded into memory');

        // event.target.result contains the file content as a string
        const csvContent = event.target.result;

        // Send the content to our parsing function
        parseCSV(csvContent);

        // Hide loading spinner
        showLoading(false);
    };

    /**
     * This function runs if reading the file fails
     */
    reader.onerror = function() {
        console.error('❌ Failed to read file');
        showError('Could not read file. Please try again.');
        showLoading(false);
    };

    // Start reading the file as plain text
    // This triggers the onload callback when done
    reader.readAsText(file);
}


// ============================================
// SECTION 4: CSV PARSING
// The CORE data processing logic
// ============================================

/**
 * Converts raw CSV text into an array of transaction objects
 *
 * CONCEPTS DEMONSTRATED:
 * - String.split() to break text into pieces
 * - For loop to process each line
 * - Object creation with properties
 * - Array.push() to add items
 * - parseFloat() to convert text to numbers
 * - Conditional (if) for validation
 *
 * @param {string} csvText - The raw text content of the CSV file
 */
function parseCSV(csvText) {
    console.log('🔍 Beginning CSV parsing...');

    // STEP 1: Split the entire CSV into individual lines
    // CONCEPT: .split('\n') breaks a string wherever there's a newline character
    // Example: "line1\nline2\nline3" becomes ["line1", "line2", "line3"]
    const lines = csvText.split('\n');
    console.log('Found ' + lines.length + ' lines in CSV');

    // STEP 2: Clear any existing data
    allTransactions = [];

    // Counters for tracking parsing results
    let validCount = 0;
    let errorCount = 0;

    // STEP 3: Loop through each line, starting at 1 to skip the header row
    // CONCEPT: For loop - repeats code a specific number of times
    //   let i = 1        → start at line 1 (skip header at 0)
    //   i < lines.length → keep going while i is less than total lines
    //   i++              → increment i by 1 each time
    for (let i = 1; i < lines.length; i++) {

        // Remove extra whitespace from the line
        // CONCEPT: .trim() removes spaces and newlines from both ends
        const line = lines[i].trim();

        // Skip empty lines
        // CONCEPT: continue skips to the next loop iteration
        if (line === '') {
            continue;
        }

        // STEP 4: Split each line by commas into an array of values
        // Example: "2024-05-01,Starbucks,-5.50,Food" becomes
        //          ["2024-05-01", "Starbucks", "-5.50", "Food"]
        const values = line.split(',');

        // Validate: need at least 3 columns (date, description, amount)
        // CONCEPT: .length gives number of items in array
        if (values.length < 3) {
            console.warn('⚠️ Line ' + i + ': not enough columns');
            errorCount++;
            continue;
        }

        // STEP 5: Create a transaction OBJECT from the values
        // CONCEPT: Objects store related data in key-value pairs
        const transaction = {
            date:        values[0].trim(),
            description: values[1].trim(),
            amount:      parseFloat(values[2].trim()),   // Convert string to number
            category:    values[3] ? values[3].trim() : categorizeTransaction(values[1].trim())
        };

        // Validate the amount is a real number
        // CONCEPT: isNaN() returns true if value is Not a Number
        if (isNaN(transaction.amount)) {
            console.warn('⚠️ Line ' + i + ': invalid amount');
            errorCount++;
            continue;
        }

        // STEP 6: Add the transaction object to our array
        // CONCEPT: .push() adds an item to the END of an array
        allTransactions.push(transaction);
        validCount++;
    }

    console.log('🎉 Parsed ' + validCount + ' transactions (' + errorCount + ' errors)');

    // Check if we got any data
    if (allTransactions.length === 0) {
        showError('No valid transactions found. Please check your CSV format.');
        return;
    }

    // Success! Generate the dashboard
    generateDashboard();
}

/**
 * Automatically assigns a category based on keywords in the description
 *
 * CONCEPTS DEMONSTRATED:
 * - String.toLowerCase() for case-insensitive matching
 * - String.includes() to check if a string contains a word
 * - If/else if/else chain for multiple conditions
 * - Logical OR operator (||)
 *
 * @param {string} description - The transaction description text
 * @returns {string} - The detected category name
 */
function categorizeTransaction(description) {
    // Convert to lowercase so "STARBUCKS" and "starbucks" both match
    // CONCEPT: .toLowerCase() returns a new lowercase string
    const desc = description.toLowerCase();

    // Check keywords using if/else if chain
    // CONCEPT: || means OR - if ANY condition is true, the block runs

    if (desc.includes('salary') || desc.includes('income') ||
        desc.includes('freelance') || desc.includes('bonus') ||
        desc.includes('wages') || desc.includes('payment received')) {
        return 'Income';
    }

    else if (desc.includes('starbucks') || desc.includes('coffee') ||
        desc.includes('mcdonald') || desc.includes('restaurant') ||
        desc.includes('food') || desc.includes('lunch') ||
        desc.includes('dinner') || desc.includes('breakfast') ||
        desc.includes('cafe') || desc.includes('kfc') ||
        desc.includes('subway') || desc.includes('pizza')) {
        return 'Food & Beverage';
    }

    else if (desc.includes('grab') || desc.includes('uber') ||
        desc.includes('taxi') || desc.includes('mrt') ||
        desc.includes('bus') || desc.includes('transport') ||
        desc.includes('gojek') || desc.includes('parking')) {
        return 'Transport';
    }

    else if (desc.includes('netflix') || desc.includes('spotify') ||
        desc.includes('cinema') || desc.includes('movie') ||
        desc.includes('game') || desc.includes('steam') ||
        desc.includes('youtube') || desc.includes('disney')) {
        return 'Entertainment';
    }

    else if (desc.includes('amazon') || desc.includes('lazada') ||
        desc.includes('shopee') || desc.includes('shopping') ||
        desc.includes('taobao') || desc.includes('zalora') ||
        desc.includes('grocery')) {
        return 'Shopping';
    }

    else if (desc.includes('electricity') || desc.includes('water') ||
        desc.includes('internet') || desc.includes('phone bill') ||
        desc.includes('utility')) {
        return 'Utilities';
    }

    // Default: if no keywords match
    else {
        return 'Other';
    }
}


// ============================================
// SECTION 5: DASHBOARD GENERATION
// Orchestrates all display functions
// ============================================

/**
 * Main orchestrator function
 * Calls all the sub-functions to build the dashboard
 *
 * CONCEPT: Breaking a big task into smaller functions (modular programming)
 */
function generateDashboard() {
    console.log('📊 Building dashboard...');

    // Hide the upload section
    document.getElementById('uploadSection').style.display = 'none';

    // Show the dashboard section
    document.getElementById('dashboard').style.display = 'flex';

    // Activate full-screen dashboard layout
    document.body.classList.add('dashboard-active');

    // Update the success message
    document.getElementById('txnCountMsg').textContent = allTransactions.length;

    // Call each display function in order
    calculateAndDisplaySummary();   // Summary cards
    createPieChart();               // Pie chart (Chart.js API)
    createBarChart();               // Bar chart (Chart.js API)
    displayTransactionTable();      // Transaction table

    // Smooth scroll to dashboard
    document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });

    console.log('✅ Dashboard built successfully!');
}


// ============================================
// SECTION 6: CALCULATIONS
// Math and data processing functions
// ============================================

/**
 * Calculates income, expenses, balance and updates the stat cards
 *
 * CONCEPTS: Variables, for loop, conditionals, Math.abs(), DOM update
 */
function calculateAndDisplaySummary() {
    console.log('🧮 Calculating summary...');

    // Initialize counters at zero
    let totalIncome = 0;
    let totalExpenses = 0;

    // Loop through every transaction
    for (let i = 0; i < allTransactions.length; i++) {
        const amount = allTransactions[i].amount;

        // Positive amount = income, negative = expense
        if (amount > 0) {
            totalIncome += amount;
        } else {
            // Math.abs() converts -5.50 to 5.50
            totalExpenses += Math.abs(amount);
        }
    }

    // Calculate net balance
    const netBalance = totalIncome - totalExpenses;

    // Update the HTML elements with calculated values
    // CONCEPT: .textContent changes the text inside an element
    // .toFixed(2) formats a number to 2 decimal places
    document.getElementById('income').textContent = '$' + totalIncome.toFixed(2);
    document.getElementById('expenses').textContent = '$' + totalExpenses.toFixed(2);
    document.getElementById('balance').textContent = '$' + netBalance.toFixed(2);
    document.getElementById('transactionCount').textContent = allTransactions.length;

    // Color the balance green (positive) or red (negative)
    const balanceEl = document.getElementById('balance');
    if (netBalance >= 0) {
        balanceEl.style.color = '#2ec4a0';
    } else {
        balanceEl.style.color = '#e8553d';
    }

    console.log('Income: $' + totalIncome.toFixed(2));
    console.log('Expenses: $' + totalExpenses.toFixed(2));
    console.log('Balance: $' + netBalance.toFixed(2));
}

/**
 * Calculates total spending per category
 * Returns an object like: { "Food & Beverage": 150.50, "Transport": 80.00 }
 *
 * CONCEPT: Using an object as a dictionary/hash map
 *
 * @returns {Object} - Category name → total amount
 */
function calculateCategoryTotals() {
    // Empty object to accumulate totals
    const totals = {};

    for (let i = 0; i < allTransactions.length; i++) {
        const t = allTransactions[i];

        // Only count expenses
        if (t.amount < 0) {
            const cat = t.category;
            const amt = Math.abs(t.amount);

            // If category exists, add to it; otherwise create it
            if (totals[cat]) {
                totals[cat] += amt;
            } else {
                totals[cat] = amt;
            }
        }
    }

    return totals;
}


// ============================================
// SECTION 7: CHART.JS API INTEGRATION
// This is the 3RD-PARTY API component
// ============================================

/**
 * Creates a PIE CHART using Chart.js (3rd-party API)
 *
 * CONCEPT: API = Application Programming Interface
 * Chart.js provides functions we call to create charts
 * We don't need to know HOW it draws the chart, just how to CALL it
 *
 * Chart.js API reference: https://www.chartjs.org/docs/
 */
function createPieChart() {
    console.log('🥧 Creating pie chart...');

    // Get category spending totals
    const categoryTotals = calculateCategoryTotals();

    // Convert object keys and values into separate arrays
    // CONCEPT: Object.keys() returns array of property names
    // CONCEPT: Object.values() returns array of property values
    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    // Color palette for chart slices
    const colors = [
        '#e8553d',   // coral red
        '#4a90d9',   // blue
        '#f0a030',   // amber
        '#2ec4a0',   // mint
        '#8e6abf',   // plum
        '#e85a8a',   // blush
        '#6bc4cf',   // teal
        '#c4c4c4'    // gray
    ];

    // Get the <canvas> element and its 2D drawing context
    // CONCEPT: Chart.js draws onto <canvas> HTML elements
    const ctx = document.getElementById('pieChart').getContext('2d');

    // Destroy existing chart to prevent overlap
    if (pieChart) {
        pieChart.destroy();
    }

    // CREATE THE CHART using Chart.js API
    // This is the main API call
    pieChart = new Chart(ctx, {

        // Chart type
        type: 'pie',

        // Data to display
        data: {
            labels: labels,          // Category names around the chart
            datasets: [{
                data: data,          // Numeric values for each slice
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },

        // Chart configuration options
        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                // Legend (labels below the chart)
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 16,
                        font: { family: "'DM Sans', sans-serif", size: 12 }
                    }
                },

                // Tooltip (popup on hover)
                tooltip: {
                    callbacks: {
                        // Custom formatting for tooltip text
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed || 0;
                            const total = context.dataset.data.reduce(function(a, b) { return a + b; }, 0);
                            const pct = ((value / total) * 100).toFixed(1);
                            return label + ': $' + value.toFixed(2) + ' (' + pct + '%)';
                        }
                    }
                }
            }
        }
    });

    console.log('✅ Pie chart created');
}

/**
 * Creates a BAR CHART comparing income vs expenses using Chart.js API
 */
function createBarChart() {
    console.log('📊 Creating bar chart...');

    // Calculate income and expense totals
    let totalIncome = 0;
    let totalExpenses = 0;

    for (let i = 0; i < allTransactions.length; i++) {
        if (allTransactions[i].amount > 0) {
            totalIncome += allTransactions[i].amount;
        } else {
            totalExpenses += Math.abs(allTransactions[i].amount);
        }
    }

    // Get canvas context
    const ctx = document.getElementById('barChart').getContext('2d');

    // Destroy existing chart
    if (barChart) {
        barChart.destroy();
    }

    // CREATE BAR CHART using Chart.js API
    barChart = new Chart(ctx, {

        type: 'bar',

        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Amount ($)',
                data: [totalIncome, totalExpenses],
                backgroundColor: [
                    'rgba(46, 196, 160, 0.8)',   // Mint green
                    'rgba(232, 85, 61, 0.8)'     // Coral red
                ],
                borderColor: [
                    'rgba(46, 196, 160, 1)',
                    'rgba(232, 85, 61, 1)'
                ],
                borderWidth: 2,
                borderRadius: 6
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // Format y-axis labels as currency
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },

            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            }
        }
    });

    console.log('✅ Bar chart created');
}


// ============================================
// SECTION 8: TRANSACTION TABLE
// Display, sort, and filter functions
// ============================================

/**
 * Renders all transactions into the HTML table
 *
 * CONCEPTS: DOM manipulation, createElement, innerHTML, template literals
 */
function displayTransactionTable() {
    console.log('📋 Building transaction table...');

    // Get table body element
    const tbody = document.getElementById('tableBody');

    // Clear any existing rows
    tbody.innerHTML = '';

    // Create a sorted copy of transactions
    // CONCEPT: [...array] creates a shallow copy (spread operator)
    let sorted = [...allTransactions];

    // Sort the copy
    // CONCEPT: .sort() takes a comparison function
    sorted.sort(function(a, b) {
        let aVal = a[currentSort.column];
        let bVal = b[currentSort.column];

        // Numeric comparison for amount column
        if (currentSort.column === 'amount') {
            aVal = parseFloat(aVal);
            bVal = parseFloat(bVal);
        }

        if (aVal < bVal) return currentSort.ascending ? -1 : 1;
        if (aVal > bVal) return currentSort.ascending ? 1 : -1;
        return 0;
    });

    // Build a table row for each transaction
    for (let i = 0; i < sorted.length; i++) {
        const t = sorted[i];

        // Create a <tr> element
        const row = document.createElement('tr');

        // Determine CSS class and sign for amount
        const amtClass = t.amount > 0 ? 'income' : 'expense';
        const sign = t.amount > 0 ? '+' : '';

        // CONCEPT: Template literals use backticks ` and ${variable} for interpolation
        row.innerHTML = `
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td><span class="category-badge">${t.category}</span></td>
            <td class="${amtClass}">${sign}$${Math.abs(t.amount).toFixed(2)}</td>
        `;

        // Add row to the table body
        tbody.appendChild(row);
    }

    // Update counters
    document.getElementById('totalRows').textContent = allTransactions.length;
    document.getElementById('visibleRows').textContent = allTransactions.length;

    console.log('✅ Table rendered with ' + sorted.length + ' rows');
}

/**
 * Sorts the table when a column header is clicked
 *
 * CONCEPT: Toggle pattern - clicking the same column flips the direction
 *
 * @param {string} column - The column name to sort by
 */
function sortTable(column) {
    // If clicking same column, flip direction
    if (currentSort.column === column) {
        currentSort.ascending = !currentSort.ascending;
    } else {
        currentSort.column = column;
        currentSort.ascending = true;
    }

    // Rebuild the table with new sort
    displayTransactionTable();
}

/**
 * Filters table rows based on search text and category dropdown
 *
 * CONCEPTS: querySelectorAll, forEach, string matching, show/hide
 */
function filterTable() {
    // Get the current filter values
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const catFilter = document.getElementById('categoryFilter').value;

    // Get all table rows
    const rows = document.querySelectorAll('#tableBody tr');

    let visible = 0;

    // Check each row against the filters
    rows.forEach(function(row) {
        const desc = row.children[1].textContent.toLowerCase();
        const cat = row.children[2].textContent.trim();

        // CONCEPT: && means AND - both conditions must be true
        const matchSearch = desc.includes(searchText);
        const matchCat = catFilter === '' || cat === catFilter;

        if (matchSearch && matchCat) {
            row.style.display = '';  // Show row
            visible++;
        } else {
            row.style.display = 'none';  // Hide row
        }
    });

    // Update the counter
    document.getElementById('visibleRows').textContent = visible;
}


// ============================================
// SECTION 9: UTILITY / HELPER FUNCTIONS
// Small functions for common UI tasks
// ============================================

/**
 * Shows or hides the loading spinner
 * @param {boolean} show - true to show, false to hide
 */
function showLoading(show) {
    document.getElementById('loadingIndicator').style.display = show ? 'flex' : 'none';
}

/**
 * Displays an error message to the user
 * @param {string} message - The error text
 */
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    errorText.textContent = message;
    errorDiv.style.display = 'block';
    console.error('❌ ' + message);
}

/**
 * Hides the error message
 */
function hideError() {
    document.getElementById('errorMessage').style.display = 'none';
}

/**
 * Resets everything back to the upload screen
 * Called when user clicks "Upload New Statement"
 */
function resetDashboard() {
    // Clear data
    allTransactions = [];

    // Reset file input
    document.getElementById('csvFile').value = '';
    document.getElementById('fileName').textContent = 'Choose File';
    document.getElementById('parseButton').disabled = true;

    // Reset label style
    const label = document.getElementById('fileLabel');
    label.style.borderColor = '';
    label.style.background = '';

    // Hide dashboard, show upload
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('uploadSection').style.display = 'block';

    // Remove full-screen layout
    document.body.classList.remove('dashboard-active');

    // Clear search/filter
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';

    // Hide any messages
    hideError();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    console.log('🔄 Dashboard reset');
}


// ============================================
// END OF SCRIPT
// ============================================
console.log('📜 script.js loaded — ready for CSV upload');