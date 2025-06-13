// --- Cost Data (Illustrative Estimates - Needs Regular Updates & Verification) ---
// All figures are rough monthly estimates in CAD for 2024.
const cityData = {
    toronto: {
        name: "Toronto",
        rent: { shared: 950, "1br": 2400, "2br": 3200, "3br": 4000 },
        groceries: { basic: 300, average: 400, premium: 550 },
        transportation: { transit: 156, car: 650 },
        utilities: { basic: 180, average: 230, premium: 300 },
        phone: { basic: 50, average: 70, premium: 110 },
        internet: { basic: 60, average: 80, premium: 120 },
        entertainment: { basic: 120, average: 200, premium: 400 },
        pet: { none: 0, cat: 110, dog: 170, other: 60 }
    },
    vancouver: {
        name: "Vancouver",
        rent: { shared: 1000, "1br": 2500, "2br": 3400, "3br": 4300 },
        groceries: { basic: 320, average: 420, premium: 600 },
        transportation: { transit: 105, car: 700 },
        utilities: { basic: 160, average: 210, premium: 280 },
        phone: { basic: 50, average: 70, premium: 110 },
        internet: { basic: 65, average: 85, premium: 125 },
        entertainment: { basic: 140, average: 220, premium: 450 },
        pet: { none: 0, cat: 120, dog: 180, other: 65 }
    },
    calgary: {
        name: "Calgary",
        rent: { shared: 750, "1br": 1600, "2br": 2100, "3br": 2600 },
        groceries: { basic: 280, average: 380, premium: 500 },
        transportation: { transit: 115, car: 600 },
        utilities: { basic: 200, average: 260, premium: 340 },
        phone: { basic: 50, average: 70, premium: 110 },
        internet: { basic: 60, average: 80, premium: 120 },
        entertainment: { basic: 110, average: 180, premium: 350 },
        pet: { none: 0, cat: 100, dog: 150, other: 55 }
    },
    montreal: {
        name: "Montreal",
        rent: { shared: 700, "1br": 1500, "2br": 1900, "3br": 2400 },
        groceries: { basic: 260, average: 360, premium: 480 },
        transportation: { transit: 97, car: 550 },
        utilities: { basic: 130, average: 180, premium: 240 },
        phone: { basic: 45, average: 65, premium: 105 },
        internet: { basic: 55, average: 75, premium: 110 },
        entertainment: { basic: 100, average: 160, premium: 300 },
        pet: { none: 0, cat: 95, dog: 140, other: 50 }
    },
    halifax: {
        name: "Halifax",
        rent: { shared: 700, "1br": 1500, "2br": 1900, "3br": 2400 },
        groceries: { basic: 270, average: 370, premium: 490 },
        transportation: { transit: 82.50, car: 500 },
        utilities: { basic: 180, average: 240, premium: 310 },
        phone: { basic: 50, average: 70, premium: 110 },
        internet: { basic: 65, average: 85, premium: 125 },
        entertainment: { basic: 90, average: 150, premium: 280 },
        pet: { none: 0, cat: 90, dog: 130, other: 45 }
    },
    ottawa: {
        name: "Ottawa",
        rent: { shared: 800, "1br": 1800, "2br": 2300, "3br": 2900 },
        groceries: { basic: 290, average: 390, premium: 520 },
        transportation: { transit: 128.75, car: 620 },
        utilities: { basic: 170, average: 220, premium: 290 },
        phone: { basic: 50, average: 70, premium: 110 },
        internet: { basic: 60, average: 80, premium: 120 },
        entertainment: { basic: 110, average: 190, premium: 380 },
        pet: { none: 0, cat: 105, dog: 160, other: 58 }
    },
    edmonton: {
        name: "Edmonton",
        rent: { shared: 700, "1br": 1400, "2br": 1800, "3br": 2300 },
        groceries: { basic: 270, average: 370, premium: 490 },
        transportation: { transit: 100, car: 580 },
        utilities: { basic: 190, average: 250, premium: 330 },
        phone: { basic: 50, average: 70, premium: 110 },
        internet: { basic: 60, average: 80, premium: 120 },
        entertainment: { basic: 100, average: 170, premium: 330 },
        pet: { none: 0, cat: 95, dog: 145, other: 52 }
    },
    winnipeg: {
        name: "Winnipeg",
        rent: { shared: 650, "1br": 1300, "2br": 1700, "3br": 2100 },
        groceries: { basic: 260, average: 360, premium: 480 },
        transportation: { transit: 113.30, car: 560 },
        utilities: { basic: 160, average: 210, premium: 280 },
        phone: { basic: 50, average: 70, premium: 110 },
        internet: { basic: 60, average: 80, premium: 120 },
        entertainment: { basic: 90, average: 150, premium: 290 },
        pet: { none: 0, cat: 90, dog: 135, other: 48 }
    }
};

// --- DOM Elements ---
const citySelect = document.getElementById('city');
const householdSelect = document.getElementById('householdSize');
const housingSelect = document.getElementById('housing');
const transportSelect = document.getElementById('transportation');
const lifestyleSelect = document.getElementById('lifestyle');
const petSelect = document.getElementById('pet');
const calculateButton = document.getElementById('calculate');
const resultsDiv = document.getElementById('results');
const initialStateDiv = document.getElementById('initialState');
const errorContainer = document.getElementById('errorContainer');
// Result display elements
const totalExpensesEl = document.getElementById('totalExpenses');
const recommendedIncomeEl = document.getElementById('recommendedIncome');
const detailedBreakdownDiv = document.getElementById('detailedBreakdown');
let expenseChart = null; // To hold the chart instance

// --- Helper Functions ---

/** Formats a number as Canadian currency. */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
}

/** Calculates household multiplier (adjust logic as needed). */
function getHouseholdMultiplier(size) {
    // Simple multiplier - real costs don't scale linearly
    const multipliers = { "1": 1, "2": 1.6, "3": 1.9, "4": 2.2 };
    return multipliers[size] || 1;
}

/** Calculates lifestyle multiplier. */
function getLifestyleMultiplier(lifestyle) {
    const multipliers = { "basic": 0.85, "average": 1, "premium": 1.3 };
    return multipliers[lifestyle] || 1;
}

/** Calculates total estimated expenses. */
function calculateExpenses(city, householdSize, housing, transportation, lifestyle, pet) {
    const data = cityData[city];
    if (!data) throw new Error(`Data not found for city: ${city}`);

    // Validate selections against available data keys
    if (!data.rent[housing]) throw new Error(`Invalid housing selection: ${housing}`);
    if (!data.transportation[transportation]) throw new Error(`Invalid transportation selection: ${transportation}`);
    if (!data.groceries[lifestyle] || !data.utilities[lifestyle] || !data.phone[lifestyle] || !data.internet[lifestyle] || !data.entertainment[lifestyle]) throw new Error(`Invalid lifestyle selection: ${lifestyle}`);
    if (pet !== 'none' && !data.pet[pet]) throw new Error(`Invalid pet selection: ${pet}`);

    const householdMultiplier = getHouseholdMultiplier(householdSize);
    const lifestyleMultiplier = getLifestyleMultiplier(lifestyle);
    const adults = parseInt(householdSize) <= 2 ? parseInt(householdSize) : 2; // Assume 2 adults for families > 2 for phone cost

    // --- Calculate individual costs ---
    // Rent: Not typically scaled by household size in this simple model, depends on apt size selected
    const rent = data.rent[housing];

    // Groceries: Scale by household and lifestyle
    const groceries = data.groceries[lifestyle] * householdMultiplier;

    // Transportation: Use base cost (transit pass or car cost) - potentially scale car cost slightly? For now, keep simple.
    const transport = data.transportation[transportation];

    // Utilities & Internet: Scale by household (more people use more) and lifestyle (nicer plans)
    // Combine utilities and internet for simplicity in this version
    const utilities = (data.utilities[lifestyle] + data.internet[lifestyle]) * householdMultiplier;

    // Phone: Scale by number of adults (assume kids might not have plans initially)
    const phone = data.phone[lifestyle] * adults;

    // Entertainment: Scale by household and lifestyle
    const entertainment = data.entertainment[lifestyle] * householdMultiplier;

    // Pet: Direct cost based on selection
    const petCost = data.pet[pet];

    // Total
    const total = rent + groceries + transport + utilities + phone + entertainment + petCost;

    return {
        rent, groceries, transport, utilities, phone, entertainment, pet: petCost, total
    };
}

/** Updates the expense breakdown chart. */
function updateChart(expenses) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    const chartData = {
        // Excluding health now
        labels: ['Rent', 'Groceries', 'Transportation', 'Utilities & Internet', 'Phone', 'Entertainment', 'Pet Care'],
        datasets: [{
            data: [
                expenses.rent,
                expenses.groceries,
                expenses.transport,
                expenses.utilities, // Combined Utilities & Internet
                expenses.phone,
                expenses.entertainment,
                expenses.pet
            ],
            backgroundColor: [
                '#3B82F6', // blue-500
                '#10B981', // green-500
                '#8B5CF6', // purple-500
                '#F59E0B', // amber-500
                '#EF4444', // red-500
                '#6366F1', // indigo-500
                '#14B8A6'  // teal-500
            ],
            borderColor: '#ffffff', // White border for segments
            borderWidth: 2
        }]
    };

    if (expenseChart) {
        expenseChart.destroy(); // Destroy previous chart instance
    }

    expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom', // Move legend below chart
                     labels: {
                        padding: 15, // Add padding to legend items
                        font: { size: 11 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += formatCurrency(context.parsed);
                            }
                            return label;
                        }
                    }
                }
            },
             cutout: '60%' // Make doughnut hole smaller/larger
        }
    });
}

 /** Creates a detail row element for the breakdown list. */
 function createDetailRow(iconClass, colorClass, label, value) {
     const div = document.createElement('div');
     div.className = 'detail-row';
     div.innerHTML = `
        <div class="label">
            <i class="fas ${iconClass} ${colorClass} mr-3"></i>
            <span>${label}</span>
        </div>
        <span class="cost">${formatCurrency(value)}</span>
     `;
     return div;
 }

/** Updates the UI with calculated results. */
function updateUI(expenses) {
    clearError(); // Clear any previous errors
    // Update Summary
    totalExpensesEl.textContent = formatCurrency(expenses.total);
    // Recommended income (e.g., total + 30% buffer)
    recommendedIncomeEl.textContent = formatCurrency(expenses.total * 1.3);

    // Update Detailed Breakdown List
    detailedBreakdownDiv.innerHTML = ''; // Clear previous breakdown
    detailedBreakdownDiv.appendChild(createDetailRow('fa-home', 'text-blue-500', 'Rent', expenses.rent));
    detailedBreakdownDiv.appendChild(createDetailRow('fa-utensils', 'text-green-500', 'Groceries', expenses.groceries));
    detailedBreakdownDiv.appendChild(createDetailRow('fa-bus', 'text-purple-500', 'Transportation', expenses.transport));
    detailedBreakdownDiv.appendChild(createDetailRow('fa-bolt', 'text-amber-500', 'Utilities & Internet', expenses.utilities)); // Combined label
    detailedBreakdownDiv.appendChild(createDetailRow('fa-mobile-alt', 'text-red-500', 'Cell Phone', expenses.phone));
    detailedBreakdownDiv.appendChild(createDetailRow('fa-film', 'text-indigo-500', 'Entertainment/Misc.', expenses.entertainment)); // Added Misc.
    if (expenses.pet > 0) { // Only show pet cost if applicable
         detailedBreakdownDiv.appendChild(createDetailRow('fa-paw', 'text-teal-500', 'Pet Care', expenses.pet));
    }

    // Update Chart
    updateChart(expenses);

    // Show results and hide initial message
    resultsDiv.classList.remove('hidden');
    initialStateDiv.classList.add('hidden');
}

 /** Shows an error message. */
function showError(message) {
    errorContainer.innerHTML = `
        <div class="error-box">
            <p><i class="fas fa-exclamation-circle mr-2"></i>${message}</p>
        </div>
    `;
     resultsDiv.classList.add('hidden'); // Hide results on error
     initialStateDiv.classList.remove('hidden'); // Show initial state message
}

/** Clears any displayed error message. */
function clearError() {
    errorContainer.innerHTML = '';
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', function() {
    if (!calculateButton) {
        console.error('Calculate button not found');
        return;
    }

    calculateButton.addEventListener('click', function() {
        clearError(); // Clear previous errors
        try {
            const city = citySelect.value;
            const householdSize = householdSelect.value;
            const housing = housingSelect.value;
            const transportation = transportSelect.value;
            const lifestyle = lifestyleSelect.value;
            const pet = petSelect.value;

            // Basic Validation
            if (!city) {
                showError('Please select a city.');
                return;
            }

            const expenses = calculateExpenses(city, householdSize, housing, transportation, lifestyle, pet);
            updateUI(expenses);
             // Scroll to results after calculation
             resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error('Calculation error:', error);
            showError(error.message || 'An error occurred. Please check your selections.');
        }
    });

     // Hide results and clear errors if inputs change
     [citySelect, householdSelect, housingSelect, transportSelect, lifestyleSelect, petSelect].forEach(select => {
         select.addEventListener('change', () => {
             resultsDiv.classList.add('hidden');
             initialStateDiv.classList.remove('hidden');
             clearError();
         });
     });

}); 