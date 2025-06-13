// --- Constants (Approx. 2024 values - MUST BE UPDATED ANNUALLY) ---
const CPP_RATE = 0.0595; // Employee rate
const CPP_MAX_PENSIONABLE = 68500;
const CPP_BASIC_EXEMPTION = 3500;
const CPP_MAX_CONTRIBUTION = (CPP_MAX_PENSIONABLE - CPP_BASIC_EXEMPTION) * CPP_RATE;

const EI_RATE = 0.0166; // Employee rate
const EI_MAX_INSURABLE = 63200;
const EI_MAX_CONTRIBUTION = EI_MAX_INSURABLE * EI_RATE;

// QPP (Quebec Pension Plan) - Simplified using CPP logic for this example
const QPP_RATE = 0.0640;
const QPP_MAX_PENSIONABLE = 68500; // Same as CPP for 2024
const QPP_BASIC_EXEMPTION = 3500;
const QPP_MAX_CONTRIBUTION = (QPP_MAX_PENSIONABLE - QPP_BASIC_EXEMPTION) * QPP_RATE;

// QPIP (Quebec Parental Insurance Plan) - Simplified
const QPIP_RATE = 0.00494;
const QPIP_MAX_INSURABLE = 94000; // 2024 Max
const QPIP_MAX_CONTRIBUTION = QPIP_MAX_INSURABLE * QPIP_RATE;

// --- Tax Brackets (Approx. 2024 - MUST BE UPDATED ANNUALLY) ---
// Format: [limit, rate] - tax is calculated on income *within* this bracket limit
const FED_BPA = 15705; // Basic Personal Amount
const FED_BRACKETS = [
    [55867, 0.15],
    [111733, 0.205],
    [173205, 0.26],
    [246752, 0.29],
    [Infinity, 0.33] // Use Infinity for the top bracket limit
];

const PROV_DATA = {
    AB: { bpa: 21885, brackets: [[148269, 0.10], [177922, 0.12], [237230, 0.13], [355845, 0.14], [Infinity, 0.15]] },
    BC: { bpa: 12580, brackets: [[47937, 0.0506], [95875, 0.077], [110076, 0.105], [133664, 0.1229], [181232, 0.147], [252752, 0.168], [Infinity, 0.205]] },
    MB: { bpa: 15780, brackets: [[47000, 0.108], [100000, 0.1275], [Infinity, 0.174]] }, // Simplified Manitoba brackets for 2024
    NB: { bpa: 13044, brackets: [[50515, 0.094], [101031, 0.14], [187035, 0.16], [Infinity, 0.195]] },
    NL: { bpa: 10818, brackets: [[43664, 0.087], [87329, 0.145], [155896, 0.158], [218251, 0.178], [278810, 0.198], [Infinity, 0.218]] },
    NT: { bpa: 17373, brackets: [[53050, 0.059], [106102, 0.086], [172470, 0.122], [Infinity, 0.1405]] },
    NS: { bpa: 11481, brackets: [[31402, 0.0879], [62804, 0.1495], [99293, 0.1667], [159075, 0.175], [Infinity, 0.21]] }, // BPA is lower, clawed back
    NU: { bpa: 18767, brackets: [[53050, 0.04], [106102, 0.07], [172470, 0.09], [Infinity, 0.115]] },
    ON: { bpa: 12399, brackets: [[51446, 0.0505], [102894, 0.0915], [150000, 0.1116], [220000, 0.1216], [Infinity, 0.1316]] },
    PE: { bpa: 13500, brackets: [[32656, 0.0965], [65313, 0.1363], [Infinity, 0.1665]] },
    QC: { // Quebec - VERY Simplified for demo (uses different BPA, QPP, QPIP)
        bpa: 18056, // Approx 2024 QC BPA
        brackets: [[51780, 0.14], [103545, 0.19], [126000, 0.24], [Infinity, 0.2575]]
    },
    SK: { bpa: 18491, brackets: [[52057, 0.105], [148734, 0.125], [Infinity, 0.145]] },
    YT: { bpa: 15705, brackets: [[55867, 0.064], [111733, 0.09], [173205, 0.109], [500000, 0.128], [Infinity, 0.15]] }
};

// --- Helper Functions ---

/** Formats a number as Canadian currency. */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount);
}

/** Formats a number as a percentage. */
function formatPercentage(amount) {
    if (!isFinite(amount)) return 'N/A';
    return new Intl.NumberFormat('en-CA', { style: 'percent', minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(amount);
}

/** Calculates tax based on marginal brackets. */
function calculateMarginalTax(income, bpa, brackets) {
    let taxableIncome = Math.max(0, income - bpa);
    let totalTax = 0;
    let previousLimit = 0;
    for (const [limit, rate] of brackets) {
        if (taxableIncome <= 0) break;
        const bracketIncome = Math.min(taxableIncome, limit - previousLimit);
        totalTax += bracketIncome * rate;
        taxableIncome -= bracketIncome;
        previousLimit = limit;
        if (taxableIncome <= 0) break;
    }
    return totalTax;
}

/** Calculates CPP contribution. */
function calculateCPP(gross) {
    const pensionableEarnings = Math.max(0, gross - CPP_BASIC_EXEMPTION);
    const contribution = pensionableEarnings * CPP_RATE;
    return Math.min(contribution, CPP_MAX_CONTRIBUTION);
}

/** Calculates EI contribution. */
function calculateEI(gross) {
    const insurableEarnings = Math.min(gross, EI_MAX_INSURABLE);
    const contribution = insurableEarnings * EI_RATE;
    return Math.min(contribution, EI_MAX_CONTRIBUTION);
}

/** Calculates QPP contribution (Simplified). */
function calculateQPP(gross) {
     const pensionableEarnings = Math.max(0, gross - QPP_BASIC_EXEMPTION);
    const contribution = pensionableEarnings * QPP_RATE;
    return Math.min(contribution, QPP_MAX_CONTRIBUTION);
}

/** Calculates QPIP contribution (Simplified). */
function calculateQPIP(gross) {
     const insurableEarnings = Math.min(gross, QPIP_MAX_INSURABLE);
    const contribution = insurableEarnings * QPIP_RATE;
    return Math.min(contribution, QPIP_MAX_CONTRIBUTION);
}

/** Calculates net salary and all deductions. */
function calculateNetSalary(gross, provinceCode) {
    if (!PROV_DATA[provinceCode]) {
        throw new Error("Invalid province selected.");
    }
    const prov = PROV_DATA[provinceCode];
    const federalTax = calculateMarginalTax(gross, FED_BPA, FED_BRACKETS);
    const provincialTax = calculateMarginalTax(gross, prov.bpa, prov.brackets);
    let cppContribution, eiContribution;
    if (provinceCode === 'QC') {
        cppContribution = calculateQPP(gross);
        eiContribution = calculateQPIP(gross);
    } else {
        cppContribution = calculateCPP(gross);
        eiContribution = calculateEI(gross);
    }
    const totalIncomeTax = federalTax + provincialTax;
    const totalDeductions = totalIncomeTax + cppContribution + eiContribution;
    const netAnnual = gross - totalDeductions;
    const netMonthly = netAnnual / 12;
    const averageTaxRate = gross > 0 ? totalIncomeTax / gross : 0;
    const effectiveTotalRate = gross > 0 ? totalDeductions / gross : 0;
    return {
        federalTax,
        provincialTax,
        cpp: cppContribution,
        ei: eiContribution,
        totalDeductions,
        netAnnual,
        netMonthly,
        averageTaxRate,
        effectiveTotalRate
    };
}

// --- DOM Elements ---
const salaryInput = document.getElementById('salary');
const provinceSelect = document.getElementById('province');
const calculateButton = document.getElementById('calculate');
const resultsDiv = document.getElementById('results');
const errorContainer = document.getElementById('errorContainer');
const quebecNote = document.getElementById('quebecNote');
const federalTaxEl = document.getElementById('federalTax');
const provincialTaxEl = document.getElementById('provincialTax');
const cppEl = document.getElementById('cpp');
const eiEl = document.getElementById('ei');
const totalDeductionsEl = document.getElementById('totalDeductions');
const netAnnualEl = document.getElementById('netAnnual');
const netMonthlyEl = document.getElementById('netMonthly');
const grossSalaryDisplay = document.getElementById('grossSalaryDisplay');
const averageTaxRateEl = document.getElementById('averageTaxRate');
const effectiveTotalRateEl = document.getElementById('effectiveTotalRate');

function showError(message) {
    errorContainer.innerHTML = `
        <div class="error-box">
            <p><i class="fas fa-exclamation-circle mr-2"></i>${message}</p>
        </div>
    `;
     resultsDiv.classList.add('hidden');
}

function clearError() {
    errorContainer.innerHTML = '';
}

calculateButton.addEventListener('click', () => {
    clearError();
    const salary = parseFloat(salaryInput.value);
    const province = provinceSelect.value;
    if (isNaN(salary) || salary < 0) {
        showError('Please enter a valid salary amount (0 or greater).');
        return;
    }
    if (!province) {
        showError('Please select a province or territory.');
        return;
    }
    try {
        const results = calculateNetSalary(salary, province);
        grossSalaryDisplay.textContent = formatCurrency(salary);
        federalTaxEl.textContent = formatCurrency(results.federalTax);
        provincialTaxEl.textContent = formatCurrency(results.provincialTax);
        cppEl.textContent = formatCurrency(results.cpp);
        eiEl.textContent = formatCurrency(results.ei);
        totalDeductionsEl.textContent = formatCurrency(results.totalDeductions);
        netAnnualEl.textContent = formatCurrency(results.netAnnual);
        netMonthlyEl.textContent = formatCurrency(results.netMonthly);
        averageTaxRateEl.textContent = formatPercentage(results.averageTaxRate);
        effectiveTotalRateEl.textContent = formatPercentage(results.effectiveTotalRate);
        resultsDiv.classList.remove('hidden');
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
        console.error("Calculation Error:", error);
        showError("An error occurred during calculation. Please check inputs or province data.");
    }
});

provinceSelect.addEventListener('change', () => {
    if (provinceSelect.value === 'QC') {
        quebecNote.classList.remove('hidden');
    } else {
        quebecNote.classList.add('hidden');
    }
     resultsDiv.classList.add('hidden');
     clearError();
});

salaryInput.addEventListener('input', () => {
     resultsDiv.classList.add('hidden');
     clearError();
});

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT')) {
         e.preventDefault();
         calculateButton.click();
    }
}); 