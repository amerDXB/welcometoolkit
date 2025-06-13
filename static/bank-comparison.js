// Bank products data
const bankProducts = [
    // RBC
    {
        bankName: "RBC",
        productType: "Bank Account",
        productName: "RBC Advantage Banking for Newcomers",
        features: [
            "No monthly fee for 12 months",
            "Unlimited debit transactions",
            "Free credit card option",
            "Access to newcomer mortgage advisors"
        ],
        monthlyFee: "$0 (first 12 months)",
        newcomerFriendly: true,
        link: "https://www.rbc.com/newcomers"
    },
    {
        bankName: "RBC",
        productType: "Credit Card",
        productName: "RBC Cash Back Mastercard for Newcomers",
        features: [
            "No credit history required",
            "Earn cashback on grocery purchases",
            "No annual fee",
            "Build Canadian credit history"
        ],
        annualFee: "$0",
        newcomerFriendly: true,
        link: "https://www.rbcroyalbank.com/credit-cards/no-credit-history.html"
    },

    // Scotiabank
    {
        bankName: "Scotiabank",
        productType: "Bank Account",
        productName: "Scotiabank StartRight Program",
        features: [
            "No monthly fee for 1 year",
            "Unlimited Interac e-Transfers",
            "Credit card and car loan options without credit history"
        ],
        monthlyFee: "$0 (first year)",
        newcomerFriendly: true,
        link: "https://www.scotiabank.com/startright"
    },
    {
        bankName: "Scotiabank",
        productType: "Credit Card",
        productName: "Scotiabank StartRight Credit Card",
        features: [
            "Earn Scene+ points",
            "No credit history required",
            "No annual fee for the first year",
            "Easy approval for newcomers"
        ],
        annualFee: "$0 (first year)",
        newcomerFriendly: true,
        link: "https://www.scotiabank.com/startright-credit"
    },

    // TD
    {
        bankName: "TD Canada Trust",
        productType: "Bank Account",
        productName: "TD New to Canada Banking Package",
        features: [
            "No monthly fee for 6 months",
            "No-fee international money transfers",
            "Free safety deposit box for 1 year"
        ],
        monthlyFee: "$0 (first 6 months)",
        newcomerFriendly: true,
        link: "https://www.td.com/ca/en/personal-banking/new-to-canada/"
    },
    {
        bankName: "TD Canada Trust",
        productType: "Credit Card",
        productName: "TD Rewards Visa Card",
        features: [
            "Earn rewards on everyday purchases",
            "No annual fee",
            "No Canadian credit history needed"
        ],
        annualFee: "$0",
        newcomerFriendly: true,
        link: "https://www.td.com/ca/en/personal-banking/products/credit-cards/td-rewards-visa-card/"
    },

    // CIBC
    {
        bankName: "CIBC",
        productType: "Bank Account",
        productName: "CIBC Smart Account for Newcomers",
        features: [
            "No monthly fee for 2 years",
            "Unlimited transactions",
            "Credit card and mortgage solutions"
        ],
        monthlyFee: "$0 (2 years)",
        newcomerFriendly: true,
        link: "https://www.cibc.com/en/personal-banking/newcomers.html"
    },
    {
        bankName: "CIBC",
        productType: "Credit Card",
        productName: "CIBC Dividend Visa Card for Newcomers",
        features: [
            "Cash back on groceries and gas",
            "No credit history needed",
            "No annual fee"
        ],
        annualFee: "$0",
        newcomerFriendly: true,
        link: "https://www.cibc.com/en/personal-banking/credit-cards/dividend-visa-card.html"
    },

    // BMO
    {
        bankName: "BMO Bank of Montreal",
        productType: "Bank Account",
        productName: "BMO NewStart Program",
        features: [
            "No fee banking for 1 year",
            "Unlimited everyday banking transactions",
            "Free credit card with no Canadian credit history"
        ],
        monthlyFee: "$0 (first year)",
        newcomerFriendly: true,
        link: "https://www.bmo.com/main/personal/newcomers/"
    },
    {
        bankName: "BMO Bank of Montreal",
        productType: "Credit Card",
        productName: "BMO CashBack Mastercard",
        features: [
            "Cash back rewards",
            "No annual fee",
            "No Canadian credit history required"
        ],
        annualFee: "$0",
        newcomerFriendly: true,
        link: "https://www.bmo.com/main/personal/credit-cards/cashback-mastercard/"
    }
];

// Bank brand colors for button backgrounds
const bankColors = {
    "RBC": "#1A1E9A", // Royal blue
    "Scotiabank": "#D9072D", // Red
    "TD Canada Trust": "#008A4D", // Green
    "CIBC": "#B71C1C", // Deep red
    "BMO Bank of Montreal": "#0066B3" // Blue
};

// Utility to darken a hex color
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R<255)?R:255;  G = (G<255)?G:255;  B = (B<255)?B:255;
    const RR = ((R.toString(16).length==1)?"0":"") + R.toString(16);
    const GG = ((G.toString(16).length==1)?"0":"") + G.toString(16);
    const BB = ((B.toString(16).length==1)?"0":"") + B.toString(16);
    return "#" + RR + GG + BB;
}

// DOM Elements
const productTypeSelect = document.getElementById('productType');
const feeTypeSelect = document.getElementById('feeType');
const featuresSelect = document.getElementById('features');
const resultsContainer = document.getElementById('results');

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow-md overflow-hidden';

    // Bank logo and name section
    const bankHeader = document.createElement('div');
    bankHeader.className = 'p-4 bg-gray-50 border-b flex items-center justify-between';
    bankHeader.innerHTML = `
        <div class="flex items-center">
            <img src="static/images/banks/${product.bankName.toLowerCase().replace(/\s+/g, '-')}-logo.svg" 
                 alt="${product.bankName} logo" 
                 class="h-12 max-w-[160px] w-auto">
        </div>
    `;
    card.appendChild(bankHeader);

    // Product details
    const details = document.createElement('div');
    details.className = 'p-4 space-y-4';
    const bankColor = bankColors[product.bankName] || "#2563eb";
    const buttonStyle = `background-color: ${bankColor}; border: none;`;
    const buttonHoverStyle = shadeColor(bankColor, -20);
    details.innerHTML = `
        <div>
            <h3 class="text-lg font-semibold text-gray-900">${product.productName}</h3>
            <p class="text-sm text-gray-600">${product.productType}</p>
        </div>
        <div>
            <p class="text-sm font-medium text-gray-900 mb-2">Features:</p>
            <ul class="text-sm text-gray-600 space-y-1">
                ${product.features.map(feature => `<li class="flex items-start">
                    <span class="text-green-500 mr-2">✓</span>
                    ${feature}
                </li>`).join('')}
            </ul>
        </div>
        <div class="flex items-center justify-between">
            <div>
                <p class="text-sm text-gray-600">
                    ${product.monthlyFee ? `Monthly Fee: ${product.monthlyFee}` : 
                        product.annualFee ? `Annual Fee: ${product.annualFee}` : ''}
                </p>
            </div>
            <a href="${product.link}" 
               target="_blank" 
               class="inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
               style="${buttonStyle}"
               onmouseover="this.style.backgroundColor='${buttonHoverStyle}'"
               onmouseout="this.style.backgroundColor='${bankColor}'"
            >
                Learn More
            </a>
        </div>
    `;
    card.appendChild(details);

    return card;
}

// Filter products based on selected options
function filterProducts() {
    const productType = productTypeSelect.value;
    const feeType = feeTypeSelect.value;
    const feature = featuresSelect.value;

    return bankProducts.filter(product => {
        // Filter by product type
        if (productType !== 'all') {
            if (productType === 'account' && product.productType !== 'Bank Account') return false;
            if (productType === 'credit' && product.productType !== 'Credit Card') return false;
        }

        // Filter by fee type
        if (feeType === 'free' && !product.monthlyFee?.includes('$0')) {
            return false;
        }
        if (feeType === 'paid' && product.monthlyFee?.includes('$0')) {
            return false;
        }

        // Filter by feature
        if (feature !== 'all') {
            if (feature === 'newcomer' && !product.newcomerFriendly) {
                return false;
            }
            if (feature === 'rewards' && !product.features.some(f => 
                f.toLowerCase().includes('reward') || 
                f.toLowerCase().includes('cash back') || 
                f.toLowerCase().includes('points'))) {
                return false;
            }
            if (feature === 'international' && !product.features.some(f => 
                f.toLowerCase().includes('international') || 
                f.toLowerCase().includes('transfer') || 
                f.toLowerCase().includes('remit'))) {
                return false;
            }
        }

        return true;
    });
}

// Display filtered products
function displayProducts() {
    const filteredProducts = filterProducts();
    resultsContainer.innerHTML = '';

    filteredProducts.forEach(product => {
        resultsContainer.appendChild(createProductCard(product));
    });

    if (filteredProducts.length === 0) {
        resultsContainer.innerHTML = `
            <div class="col-span-full text-center py-8 text-gray-500">
                No products match your selected filters. Try adjusting your criteria.
            </div>
        `;
    }
}

// Event listeners
productTypeSelect.addEventListener('change', displayProducts);
feeTypeSelect.addEventListener('change', displayProducts);
featuresSelect.addEventListener('change', displayProducts);

// Initial display
document.addEventListener('DOMContentLoaded', displayProducts);

// Print styles
const style = document.createElement('style');
style.textContent = `
    @media print {
        nav, form, #printComparison {
            display: none !important;
        }
        #comparisonResults {
            display: block !important;
        }
        .container {
            max-width: none !important;
            padding: 0 !important;
        }
        @page {
            margin: 2cm;
        }
    }
`;
document.head.appendChild(style); 
