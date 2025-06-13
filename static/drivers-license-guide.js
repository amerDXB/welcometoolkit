// Province-specific driver's license data
const licenseData = {
    "Ontario": {
        steps: [
            "Step 1: Get your G1 license (written knowledge test)",
            "Step 2: Practice driving for 8–12 months",
            "Step 3: Take your G2 road test",
            "Step 4: After 1 year, take the full G road test"
        ],
        documents: [
            "Passport or immigration documents",
            "Proof of Ontario residency",
            "Pass an eye test"
        ],
        cost: "~$159.75 (covers G1 and G2 tests)",
        link: "https://drivetest.ca/"
    },
    "British Columbia": {
        steps: [
            "Step 1: Get your L (Learner's) license (written test)",
            "Step 2: Practice for 12 months",
            "Step 3: Take N (Novice) road test",
            "Step 4: After 24 months, take the full Class 5 road test"
        ],
        documents: [
            "Passport or immigration documents",
            "Proof of BC residency",
            "ID Card if available"
        ],
        cost: "~$35 knowledge test + ~$50 road test",
        link: "https://www.icbc.com/driver-licensing/"
    },
    "Alberta": {
        steps: [
            "Step 1: Get your Class 7 learner's license",
            "Step 2: Practice for 12 months",
            "Step 3: Take Class 5 GDL road test",
            "Step 4: Qualify for full Class 5 after 2 years"
        ],
        documents: [
            "Passport or immigration papers",
            "Proof of Alberta address",
            "Complete vision test"
        ],
        cost: "~$85 knowledge + ~$150 road test",
        link: "https://www.alberta.ca/get-drivers-licence.aspx"
    },
    "Quebec": {
        steps: [
            "Step 1: Enroll in a certified driving school",
            "Step 2: Get a learner's permit (after 4 theory modules)",
            "Step 3: Hold for 10 months minimum",
            "Step 4: Take the probationary driving license test"
        ],
        documents: [
            "Passport/immigration papers",
            "Proof of Quebec residency",
            "Health Insurance Card (if available)"
        ],
        cost: "~$75 learner's permit + ~$30 probationary license",
        link: "https://saaq.gouv.qc.ca/en/"
    },
    "Manitoba": {
        steps: [
            "Step 1: Pass Class 5 knowledge test",
            "Step 2: Get a Learner Stage License (9 months minimum)",
            "Step 3: Take Intermediate Stage License test",
            "Step 4: Graduate to Full Stage License after 15 months"
        ],
        documents: [
            "Passport or immigration papers",
            "Proof of residency",
            "Manitoba Health Card"
        ],
        cost: "~$10 knowledge test + ~$30 road test",
        link: "https://www.mpi.mb.ca/Pages/driver-licensing.aspx"
    },
    USA: {
        canExchange: true,
        requiredTests: "None",
        translationReq: "No translation needed",
        processSteps: [
            "Visit a ServiceOntario center",
            "Bring your valid US license",
            "Complete the application form",
            "Pay the exchange fee",
            "Receive your Ontario license"
        ],
        requiredDocuments: [
            "Valid US driver's license",
            "Proof of identity",
            "Proof of residency in Ontario",
            "Application fee"
        ]
    },
    UAE: {
        canExchange: false,
        requiredTests: "Knowledge, Road, Vision",
        translationReq: "Yes, certified translation required",
        processSteps: [
            "Get your license translated by an approved translator",
            "Visit a DriveTest center",
            "Pass the knowledge test",
            "Pass the vision test",
            "Complete the G1 exit test",
            "Complete the G2 exit test",
            "Receive your full license"
        ],
        requiredDocuments: [
            "Original UAE license",
            "Certified translation of license",
            "Proof of identity",
            "Proof of residency in Ontario",
            "Application fee"
        ]
    },
    India: {
        canExchange: false,
        requiredTests: "Knowledge, Road, Vision",
        translationReq: "Yes, certified translation required",
        processSteps: [
            "Get your license translated by an approved translator",
            "Visit a DriveTest center",
            "Pass the knowledge test",
            "Pass the vision test",
            "Complete the G1 exit test",
            "Complete the G2 exit test",
            "Receive your full license"
        ],
        requiredDocuments: [
            "Original Indian license",
            "Certified translation of license",
            "Proof of identity",
            "Proof of residency in Ontario",
            "Application fee"
        ]
    },
    France: {
        canExchange: true,
        requiredTests: "None",
        translationReq: "No translation needed",
        processSteps: [
            "Visit a ServiceOntario center",
            "Bring your valid French license",
            "Complete the application form",
            "Pay the exchange fee",
            "Receive your Ontario license"
        ],
        requiredDocuments: [
            "Valid French driver's license",
            "Proof of identity",
            "Proof of residency in Ontario",
            "Application fee"
        ]
    },
    Philippines: {
        canExchange: false,
        requiredTests: "Knowledge, Road, Vision",
        translationReq: "Yes, certified translation required",
        processSteps: [
            "Get your license translated by an approved translator",
            "Visit a DriveTest center",
            "Pass the knowledge test",
            "Pass the vision test",
            "Complete the G1 exit test",
            "Complete the G2 exit test",
            "Receive your full license"
        ],
        requiredDocuments: [
            "Original Philippine license",
            "Certified translation of license",
            "Proof of identity",
            "Proof of residency in Ontario",
            "Application fee"
        ]
    },
    other: {
        canExchange: false,
        requiredTests: "Knowledge, Road, Vision",
        translationReq: "Yes, certified translation required",
        processSteps: [
            "Get your license translated by an approved translator",
            "Visit a DriveTest center",
            "Pass the knowledge test",
            "Pass the vision test",
            "Complete the G1 exit test",
            "Complete the G2 exit test",
            "Receive your full license"
        ],
        requiredDocuments: [
            "Original driver's license",
            "Certified translation of license",
            "Proof of identity",
            "Proof of residency in Ontario",
            "Application fee"
        ]
    }
};

// Driving schools data
const drivingSchools = {
    Ontario: [
        {
            name: "ABC Driving School",
            location: "Downtown Toronto",
            offer: "5 lessons + 1 free",
            website: "https://www.abc-driving.com"
        },
        {
            name: "QuickStart Academy",
            location: "Scarborough",
            offer: "Newcomer Discount",
            website: "https://www.quickstart-driving.com"
        }
    ],
    "British Columbia": [
        {
            name: "BC Driving School",
            location: "Vancouver",
            offer: "Package deals available",
            website: "https://www.bc-driving.com"
        },
        {
            name: "Pacific Driving Academy",
            location: "Surrey",
            offer: "Newcomer Special",
            website: "https://www.pacific-driving.com"
        }
    ]
};

// DOM Elements
const provinceSelect = document.getElementById('provinceSelect');
const countrySelect = document.getElementById('countrySelect');
const licenseInfo = document.getElementById("licenseInfo");
const drivingSchoolsContainer = document.getElementById('drivingSchools');

// Event Listeners
provinceSelect.addEventListener('change', updateResults);
countrySelect.addEventListener('change', updateResults);

// Display province information
function displayProvinceInfo(data, provinceName) {
    // Update driving schools display
    if (drivingSchools[provinceName]) {
        const schoolsHtml = drivingSchools[provinceName].map(school => `
            <div class="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 class="text-lg font-semibold text-blue-800">${school.name}</h3>
                <p class="text-gray-600">Location: ${school.location}</p>
                <p class="text-green-600">${school.offer}</p>
                <a href="${school.website}" 
                   class="text-blue-600 hover:text-blue-800 inline-flex items-center"
                   target="_blank">
                    Visit Website
                    <i class="fas fa-external-link-alt ml-2"></i>
                </a>
            </div>
        `).join('');

        drivingSchoolsContainer.innerHTML = `
            <h2 class="text-xl font-semibold mb-4">Recommended Driving Schools</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${schoolsHtml}
            </div>
        `;
        drivingSchoolsContainer.classList.add('visible');
    } else {
        drivingSchoolsContainer.classList.remove('visible');
    }
}

// Update results based on selections
function updateResults() {
    const province = provinceSelect.value;
    const country = countrySelect.value;

    if (!province || !country) {
        resetResults();
        return;
    }

    const data = licenseData[province][country];

    // Update exchange information
    canExchange.textContent = data.canExchange ? "Yes" : "No";
    requiredTests.textContent = data.requiredTests;
    translationReq.textContent = data.translationReq;

    // Update process steps
    processSteps.innerHTML = data.processSteps.map((step, index) => `
        <div class="flex items-start">
            <span class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">${index + 1}</span>
            <p class="text-gray-700">${step}</p>
            </div>
    `).join('');

    // Update required documents
    requiredDocuments.innerHTML = data.requiredDocuments.map(doc => `
        <div class="flex items-center">
            <i class="fas fa-check text-green-500 mr-2"></i>
            <span class="text-gray-700">${doc}</span>
        </div>
    `).join('');

    // Update driving schools
    if (drivingSchools[province]) {
        drivingSchoolsContainer.innerHTML = drivingSchools[province].map(school => `
            <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold text-gray-800 mb-2">${school.name}</h3>
                <p class="text-gray-600 mb-2"><i class="fas fa-map-marker-alt mr-2"></i>${school.location}</p>
                <p class="text-gray-600 mb-2"><i class="fas fa-gift mr-2"></i>${school.offer}</p>
                <a href="${school.website}" target="_blank" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-external-link-alt mr-1"></i>Visit Website
                </a>
            </div>
        `).join('');
    } else {
        drivingSchoolsContainer.innerHTML = `
            <div class="text-center text-gray-500">
                <p>No driving schools listed for this province yet.</p>
            </div>
        `;
    }
}

// Reset results to initial state
function resetResults() {
    canExchange.textContent = "Select province and country";
    requiredTests.textContent = "Select province and country";
    translationReq.textContent = "Select province and country";
    processSteps.innerHTML = "";
    requiredDocuments.innerHTML = "";
    drivingSchoolsContainer.innerHTML = "";
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        animation: fadeIn 0.3s ease-in;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 