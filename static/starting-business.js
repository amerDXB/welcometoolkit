// --- Business Data ---
// Links need regular verification. Content is general.
const businessData = {
    // General Steps (Applicable to most)
    generalSteps: [
        { title: "Market Research", desc: "Understand your target market, competition, and industry trends in Canada." },
        { title: "Business Plan", desc: "Develop a solid plan outlining your business goals, strategies, financial projections, and operations. Essential for funding." },
        { title: "Choose Business Structure", desc: "Decide between Sole Proprietorship, Partnership, Corporation, or Cooperative. Each has different legal and tax implications. Seek advice!" },
        { title: "Register Your Business", desc: "Register your business name and structure with the provincial/territorial and potentially federal government." },
        { title: "Licenses and Permits", desc: "Identify and obtain necessary federal, provincial/territorial, and municipal licenses and permits for your specific industry and location." },
        { title: "Tax Information (GST/HST, Payroll)", desc: "Register for a Business Number (BN) with CRA, understand GST/HST requirements, and set up payroll deductions if hiring employees." },
        { title: "Business Bank Account", desc: "Open a separate bank account for your business finances." },
        { title: "Funding (Optional)", desc: "Explore financing options like personal investment, loans (banks, credit unions), government grants/programs, or venture capital." },
        { title: "Insurance", desc: "Get appropriate business insurance (liability, property, etc.)." }
    ],
    // Provincial Resources (Key starting points)
    provincialResources: {
        AB: { name: "Alberta Business Link", link: "https://businesslink.ca/" },
        BC: { name: "Province of BC - Business & Investing", link: "https://www2.gov.bc.ca/gov/content/employment-business/business" },
        MB: { name: "Entrepreneurship Manitoba", link: "https://www.gov.mb.ca/jec/emb/" },
        NB: { name: "Opportunities NB (ONB)", link: "https://onbcanada.ca/" },
        NL: { name: "NL Business - Dept. of Industry, Energy and Technology", link: "https://www.gov.nl.ca/iet/" },
        NT: { name: "NWT Business Development and Investment Corporation (BDIC)", link: "https://www.bdic.ca/" },
        NS: { name: "Nova Scotia Business Inc.", link: "https://www.novascotiabusiness.com/" },
        NU: { name: "Nunavut Business Credit Corporation (NBCC)", link: "https://www.nbcc.nu.ca/" },
        ON: { name: "Business Ontario", link: "https://www.ontario.ca/page/business" },
        PE: { name: "Innovation PEI", link: "https://www.innovationpei.com/" },
        QC: { name: "Entreprises Québec", link: "https://www.quebec.ca/en/businesses-and-self-employed-workers" },
        SK: { name: "Government of Saskatchewan - Business and Industry", link: "https://www.saskatchewan.ca/business" },
        YT: { name: "Yukon Economic Development", link: "https://yukon.ca/en/doing-business" }
    },
    // Federal Resources
    federalResources: [
        { name: "Canada Business Network", link: "https://canadabusiness.ca/starting/", desc: "Government information and services for entrepreneurs." },
        { name: "CRA - Business and self-employed income", link: "https://www.canada.ca/en/revenue-agency/services/tax/businesses.html", desc: "Essential tax information, including registration (BN, GST/HST, Payroll)." },
        { name: "BDC (Business Development Bank of Canada)", link: "https://www.bdc.ca/en", desc: "Financing, advisory services, and capital for entrepreneurs." },
        { name: "Innovation, Science and Economic Development Canada (ISED)", link: "https://ised-isde.canada.ca/site/ised/en", desc: "Programs and services supporting innovation and business growth." },
        { name: "Start-up Visa Program (for specific entrepreneurs)", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html", desc: "Immigration pathway for entrepreneurs with innovative business ideas." }
    ],
    // General Advice
    generalAdvice: [
        "<strong>Seek Professional Advice:</strong> Consult with lawyers and accountants familiar with Canadian business practices early in your planning.",
        "<strong>Understand Regulations:</strong> Research all applicable regulations (federal, provincial, municipal) for your specific industry.",
        "<strong>Networking:</strong> Connect with local business associations, chambers of commerce, and newcomer support organizations.",
        "<strong>Cultural Nuances:</strong> Be aware of Canadian business etiquette and communication styles.",
        "<strong>Patience and Persistence:</strong> Building a successful business takes time and effort."
    ]
};

// --- DOM Elements ---
const form = document.getElementById('businessForm');
const provinceSelect = document.getElementById('province');
const resultsDiv = document.getElementById('results');
const errorContainer = document.getElementById('errorContainer');
const getInfoButton = document.getElementById('getInfoButton');

// --- Helper Functions ---
function clearError() { errorContainer.innerHTML = ''; }
function showError(message) {
    errorContainer.innerHTML = `<div class="error-box"><p><i class="fas fa-exclamation-circle mr-2"></i>${message}</p></div>`;
    resultsDiv.innerHTML = ''; // Clear results on error
    resultsDiv.classList.add('hidden');
    errorContainer.scrollIntoView({ behavior: 'smooth' });
}

function createResultSection(title, iconClass, contentHTML) {
     const section = document.createElement('div');
     section.className = 'result-section';
     section.innerHTML = `
        <h3><i class="fas ${iconClass}"></i>${title}</h3>
        <div>${contentHTML}</div>
     `;
     return section;
}

// --- Main Display Logic ---
function displayBusinessInfo(provinceCode) {
    clearError();
    resultsDiv.innerHTML = ''; // Clear previous results
    resultsDiv.classList.add('hidden'); // Hide initially

    const provData = businessData.provincialResources[provinceCode];

    if (!provData) {
        showError(`Information for province code "${provinceCode}" not found.`);
        return;
    }

    // 1. General Key Steps
    let stepsHTML = '<ul>';
    businessData.generalSteps.forEach((step, index) => {
        // Use checkmark icon for steps
        stepsHTML += `<li><span class="step-icon text-green-500"><i class="fas fa-check"></i></span><div><strong>${step.title}:</strong> ${step.desc}</div></li>`;
    });
    stepsHTML += '</ul>';
    resultsDiv.appendChild(createResultSection("Key Steps to Starting a Business", "fa-list-check text-green-500", stepsHTML));

    // 2. Provincial Resources
    let provHTML = `<p>Each province/territory has specific registration requirements and support services. Here's a key starting point for <strong>${provinceCode}</strong>:</p>`;
    // Updated link display
    provHTML += `<ul><li><i class="fas fa-link link-icon"></i><a href="${provData.link}" target="_blank" rel="noopener noreferrer"><strong>${provData.name}</strong></a> - Official provincial business portal and resources.</li></ul>`;
    provHTML += `<p class="mt-4 text-sm"><strong>Remember:</strong> Also check your specific municipality (city/town) website for local business licenses, zoning bylaws, and additional support programs.</p>`;
    resultsDiv.appendChild(createResultSection("Provincial/Territorial Resources", "fa-map-location-dot text-purple-500", provHTML));

    // 3. Federal Resources
    let fedHTML = '<ul>';
    businessData.federalResources.forEach(res => {
        fedHTML += `<li><i class="fas fa-link link-icon"></i><a href="${res.link}" target="_blank" rel="noopener noreferrer"><strong>${res.name}</strong></a> - ${res.desc}</li>`;
    });
    fedHTML += '</ul>';
    resultsDiv.appendChild(createResultSection("Key Federal Resources", "fa-landmark-flag text-red-500", fedHTML));

     // 4. General Advice
     let adviceHTML = '<ul>';
     businessData.generalAdvice.forEach(advice => {
         adviceHTML += `<li><i class="fas fa-lightbulb step-icon text-yellow-500"></i><div>${advice}</div></li>`;
     });
     adviceHTML += '</ul>';
     resultsDiv.appendChild(createResultSection("General Advice for Newcomer Entrepreneurs", "fa-comments-dollar text-teal-500", adviceHTML));


    // Show results
    resultsDiv.classList.remove('hidden');
    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    if (!form) {
        console.error("Form element not found");
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearError();

        const province = provinceSelect.value;

        if (!province) {
            showError('Please select the province or territory where you plan to operate.');
            return;
        }

        try {
            displayBusinessInfo(province);
        } catch (error) {
             console.error("Display Error:", error);
             showError("An error occurred while retrieving business information.");
        }
    });

     // Hide results if province changes
     provinceSelect.addEventListener('change', () => {
         resultsDiv.classList.add('hidden');
         clearError();
     });

    // Language Switcher Dropdown
    const langBtn = document.getElementById('languageSwitcher');
    const langDropdown = document.getElementById('languageDropdown');
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            langDropdown.classList.toggle('hidden');
        });
        document.addEventListener('click', (e) => {
            if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
                langDropdown.classList.add('hidden');
            }
        });
        langDropdown.querySelectorAll('a[data-lang]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Placeholder: implement language switching logic here
                alert('Language switching coming soon!');
                langDropdown.classList.add('hidden');
            });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('nav button.md\\:hidden');
    let mobileMenuOpen = false;
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('nav .md\\:flex');
            if (navLinks) {
                navLinks.classList.toggle('hidden');
                mobileMenuOpen = !mobileMenuOpen;
            }
        });
    }
}); 