// --- Assessment Data ---
// Data is illustrative and needs verification with official sources.
const assessmentData = {
    // IRCC Designated ECA Organizations (for Immigration)
    ecaOrganizations: [
        { name: "World Education Services (WES)", link: "https://www.wes.org/ca/", notes: "Popular choice, processes many countries." },
        { name: "International Credential Assessment Service of Canada (ICAS)", link: "https://www.icascanada.ca/", notes: "Handles various credential types." },
        { name: "Comparative Education Service (CES) - University of Toronto", link: "https://learn.utoronto.ca/ces", notes: "Part of U of T." },
        { name: "International Qualifications Assessment Service (IQAS) - Alberta", link: "https://www.alberta.ca/iqas", notes: "Alberta government service, assesses for immigration/general purposes." },
        { name: "International Credential Evaluation Service (ICES) - BCIT", link: "https://www.bcit.ca/ices/", notes: "Based in British Columbia." }
        // MCC and PEBC handled separately under professions
    ],
    // Specific bodies for certain professions (often needed for licensing IN ADDITION to or INSTEAD OF general ECA)
    professionalBodies: {
        doctor: { name: "Medical Council of Canada (MCC)", link: "https://mcc.ca/", purpose: "licensing", notes: "Required first step for licensing as a physician. They perform source verification and exams (MCCQE). You may also need an ECA from WES/etc. for immigration." },
        pharmacist: { name: "Pharmacy Examining Board of Canada (PEBC)", link: "https://www.pebc.ca/", purpose: "licensing", notes: "Required for licensing as a pharmacist. They assess credentials and administer exams. An ECA (e.g., WES) is ALSO needed for immigration." },
        engineer: { name: "Engineers Canada / Provincial Associations", link: "https://engineerscanada.ca/regulatory-excellence/engineering-regulators", purpose: "licensing", notes: "Assessment is done by the provincial/territorial engineering association where you plan to work. Requirements vary. Start with Engineers Canada website." },
        nurse: { name: "National Nursing Assessment Service (NNAS)", link: "https://www.nnas.ca/", purpose: "licensing", notes: "Required first step for internationally educated nurses (IENs) applying for registration in most Canadian provinces (except QC/Territories). NNAS assesses credentials, then you apply to the provincial nursing college." },
        teacher: { name: "Provincial Teacher Certification Branch", link: "https://www.cicic.ca/1374/obtain_a_teaching_certificate.canada?search=&prov=", purpose: "licensing", notes: "Assessment and certification are handled by the Ministry of Education or Teacher's College in the province where you want to teach. Requirements vary significantly." },
        architect: { name: "Canadian Architectural Certification Board (CACB)", link: "https://cacb.ca/certification/", purpose: "licensing", notes: "CACB assesses academic qualifications for architects. Further requirements set by provincial associations." },
         lawyer: { name: "National Committee on Accreditation (NCA) - Federation of Law Societies", link: "https://nca.legal/", purpose: "licensing", notes: "NCA assesses legal education for internationally trained lawyers. You must pass NCA exams before applying to a provincial law society bar admission program." },
        // Add more as needed...
    },
    // General process steps
    generalProcess: [
        "<strong>Choose the Right Organization:</strong> Select based on your purpose (immigration vs. licensing) and profession.",
        "<strong>Check Requirements:</strong> Visit the organization's website for specific document requirements based on your country of education.",
        "<strong>Gather Documents:</strong> Obtain official transcripts, degree certificates, etc. Often, these must be sent DIRECTLY from your institution.",
        "<strong>Translations:</strong> Documents not in English or French usually require certified translation.",
        "<strong>Submit Application & Fees:</strong> Complete the online application and pay the required fees.",
        "<strong>Wait for Assessment:</strong> Processing times vary significantly (weeks to several months).",
        "<strong>Receive Report:</strong> You'll get an ECA report comparing your credential to Canadian standards."
    ],
     // Links
     links: {
         irccECA: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/education-assessed.html",
         cicicRegBodies: "https://www.cicic.ca/1374/obtain_a_licence_to_practise_a_regulated_profession.canada" // Canadian Information Centre for International Credentials
     }
};

// --- DOM Elements ---
const form = document.getElementById('assessmentForm');
const purposeSelect = document.getElementById('purpose');
const professionSelect = document.getElementById('profession');
const provinceSelect = document.getElementById('province');
const provinceDiv = document.getElementById('provinceDiv');
const resultsDiv = document.getElementById('results');
const errorContainer = document.getElementById('errorContainer');

// --- Helper Functions ---
function clearError() { errorContainer.innerHTML = ''; }
function showError(message) {
    errorContainer.innerHTML = `<div class="error-box"><p><i class="fas fa-exclamation-circle mr-2"></i>${message}</p></div>`;
    resultsDiv.innerHTML = ''; // Clear results on error
    resultsDiv.classList.add('hidden');
    errorContainer.scrollIntoView({ behavior: 'smooth' });
}

function createResultBox(title, iconClass, contentHTML) {
     const box = document.createElement('div');
     box.className = 'result-box';
     box.innerHTML = `
        <h3><i class="fas ${iconClass} mr-3"></i>${title}</h3>
        <div>${contentHTML}</div>
     `;
     return box;
}

// --- Main Display Logic ---
function displayAssessmentInfo(purpose, profession, provinceCode) {
    clearError();
    resultsDiv.innerHTML = ''; // Clear previous results
    resultsDiv.classList.add('hidden'); // Hide initially

    let content = '';
    let needsProvincialInfo = false;

    // 1. Determine Primary Assessment Path based on Purpose & Profession
    const profBody = assessmentData.professionalBodies[profession];

    if (purpose === 'immigration') {
        content = `<p>For immigration purposes like Express Entry, you typically need an Educational Credential Assessment (ECA) report from an organization designated by IRCC.</p>`;
        content += `<p><strong>Designated Organizations for Immigration ECAs:</strong></p><ul>`;
        assessmentData.ecaOrganizations.forEach(org => {
            content += `<li><a href="${org.link}" target="_blank" rel="noopener noreferrer">${org.name}</a> - ${org.notes}</li>`;
        });
        // Add specific notes for MCC/PEBC if relevant profession selected
         if (profession === 'doctor') {
             content += `<li><a href="${assessmentData.professionalBodies.doctor.link}" target="_blank" rel="noopener noreferrer">${assessmentData.professionalBodies.doctor.name}</a> - Required for physicians (must select MCC when applying for ECA for immigration).</li>`;
         } else if (profession === 'pharmacist') {
             content += `<li><a href="${assessmentData.professionalBodies.pharmacist.link}" target="_blank" rel="noopener noreferrer">${assessmentData.professionalBodies.pharmacist.name}</a> - Required for pharmacists (must select PEBC when applying for ECA for immigration).</li>`;
         }
        content += `</ul>`;
        content += `<p class="mt-4">Choose one organization based on their processing times, costs, and requirements for your country of education. Visit the official IRCC website for the definitive list: <a href="${assessmentData.links.irccECA}" target="_blank" rel="noopener noreferrer">IRCC ECA Information</a>.</p>`;
        resultsDiv.appendChild(createResultBox("Assessment for Immigration", "fa-passport text-blue-500", content));

    } else if (purpose === 'licensing') {
        needsProvincialInfo = true; // Need province for licensing
        if (!provinceCode) {
             showError("Please select the province/territory where you intend to get licensed.");
             return; // Stop processing if province needed but not selected
        }

        content = `<p>Getting licensed in a regulated profession in Canada is complex and primarily managed at the <strong>provincial/territorial level</strong>.</p>`;
        if (profBody && profBody.purpose === 'licensing') {
            // Specific body identified
            content += `<p>For <strong>${profession.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}s</strong>, the key organization is typically the <strong><a href="${profBody.link}" target="_blank" rel="noopener noreferrer">${profBody.name}</a></strong>.</p>`;
            content += `<p>${profBody.notes}</p>`;
            content += `<p>You will likely need to contact both this body AND the specific regulatory authority in <strong>${provinceCode}</strong>.</p>`;
        } else if (['technologist', 'trades', 'finance', 'social_work'].includes(profession)) {
             // Professions usually regulated provincially without a single national body first step
             content += `<p>For professions like <strong>${profession.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</strong>, licensing is handled directly by the <strong>regulatory body in ${provinceCode}</strong>.</p>`;
             content += `<p>They will assess your credentials and outline all requirements (exams, experience, etc.). They may require you to get an ECA from an IRCC-designated organization as part of their process.</p>`;
        } else {
            // General case for other regulated or potentially regulated fields
            content += `<p>For many professions, licensing is handled by a specific <strong>regulatory body in ${provinceCode}</strong>. You MUST contact them directly.</p>`;
             content += `<p>They will determine the assessment process, which may involve evaluating your credentials directly or requiring an ECA from an IRCC-designated organization (like WES, ICAS, etc.) as a first step.</p>`;
        }
        content += `<p class="mt-4"><strong>Next Steps:</strong></p>
                   <ul>
                        <li>Identify the specific regulatory body for your profession in ${provinceCode}. Use this resource: <a href="${assessmentData.links.cicicRegBodies}" target="_blank" rel="noopener noreferrer">Find Your Regulatory Body (CICIC)</a>.</li>
                        <li>Visit their website and contact them for detailed requirements.</li>
                   </ul>`;
         resultsDiv.appendChild(createResultBox(`Assessment for Licensing in ${provinceCode}`, "fa-gavel text-red-500", content));

    } else if (purpose === 'education') {
        content = `<p>Requirements for further education (e.g., university, college) vary greatly by institution and program.</p>
                   <ul>
                        <li>Some institutions may require an ECA report from an organization like WES, ICAS, CES, IQAS, or ICES.</li>
                        <li>Others may assess your foreign credentials directly as part of the admission process.</li>
                        <li>Some programs, especially graduate studies or professional programs, might have very specific assessment needs.</li>
                   </ul>
                   <p class="mt-4"><strong>Next Step:</strong> You MUST check the admission requirements for the specific institution(s) and program(s) you are interested in. Look for sections related to "International Applicants" or "Admission Requirements for Foreign Credentials".</p>`;
        resultsDiv.appendChild(createResultBox("Assessment for Further Education", "fa-user-graduate text-green-500", content));

    } else if (purpose === 'employment') {
         content = `<p>For general employment in non-regulated professions, a formal ECA is often <strong>not mandatory</strong> but can be helpful.</p>
                    <ul>
                        <li>Some employers may ask for an ECA to better understand your qualifications.</li>
                        <li>It can be useful for your resume to state the Canadian equivalency of your degree (e.g., "Bachelor's Degree equivalent").</li>
                        <li>If an employer requests an assessment, they usually accept reports from IRCC-designated organizations (WES, ICAS, etc.).</li>
                    </ul>
                     <p class="mt-4"><strong>Recommendation:</strong> Focus on tailoring your resume to highlight skills and experience relevant to Canadian jobs. Consider getting an ECA if employers in your field frequently ask for it or if you want a formal equivalency statement.</p>`;
         resultsDiv.appendChild(createResultBox("Assessment for General Employment", "fa-briefcase text-purple-500", content));
    }

    // 2. Add General Process Steps (if applicable)
    if (purpose === 'immigration' || purpose === 'licensing' || purpose === 'education') {
         let processContent = `<p>While the exact process varies, here are the general steps typically involved in getting an ECA:</p><ul>`;
         assessmentData.generalProcess.forEach(step => {
             processContent += `<li>${step}</li>`;
         });
         processContent += `</ul><p class="mt-4"><strong>Important:</strong> Start early! Gathering documents and processing can take significant time.</p>`;
         resultsDiv.appendChild(createResultBox("General ECA Process Overview", "fa-list-check text-gray-500", processContent));
    }


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

    // Show/hide province selector based on purpose
    purposeSelect.addEventListener('change', () => {
        if (purposeSelect.value === 'licensing') {
            provinceDiv.classList.remove('hidden');
        } else {
            provinceDiv.classList.add('hidden');
            provinceSelect.value = ''; // Reset province if purpose changes
        }
         resultsDiv.classList.add('hidden'); // Hide results on change
         clearError();
    });

     // Hide results if other inputs change
     [professionSelect, provinceSelect].forEach(el => {
         el.addEventListener('change', () => {
             resultsDiv.classList.add('hidden');
             clearError();
         });
     });


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearError();

        const purpose = purposeSelect.value;
        const profession = professionSelect.value;
        const province = provinceSelect.value;

        // Validation
        if (!purpose || !profession) {
            showError('Please select both your purpose and your profession/field.');
            return;
        }
         if (purpose === 'licensing' && !province) {
            showError('Please select the province/territory where you intend to get licensed.');
            return;
        }

        try {
            displayAssessmentInfo(purpose, profession, province);
        } catch (error) {
             console.error("Display Error:", error);
             showError("An error occurred while retrieving assessment information.");
        }
    });
}); 