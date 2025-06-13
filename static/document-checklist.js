// --- Checklist Data Structure ---
// Data is illustrative. Needs comprehensive research for accuracy.
const checklistData = {
    // Items relevant based on immigration status
    statusSpecific: {
        permanent_resident: [
            { label: "Confirm PR status & get PR Card (if applicable)", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/pr-card.html" },
            { label: "Attend landing interview (if required)", link: "#" },
        ],
        work_permit: [
            { label: "Ensure Work Permit validity and conditions", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit.html" },
            { label: "Understand employer obligations", link: "#" },
        ],
        study_permit: [
            { label: "Ensure Study Permit validity and conditions", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit.html" },
            { label: "Register for courses at Designated Learning Institution (DLI)", link: "#" },
            { label: "Understand rules for working while studying", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work.html" },
        ],
        refugee: [
            { label: "Connect with settlement agency for support", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-within-canada.html" },
            { label: "Attend Refugee Hearing (if applicable)", link: "https://irb.gc.ca/en/claiming-protection/Pages/index.aspx" },
            { label: "Apply for Work Permit / Study Permit (if eligible)", link: "#" },
        ],
        visitor_record: [
            { label: "Understand conditions and expiry date of Visitor Record", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/visitor-record.html" },
            { label: "Apply to extend stay before expiry (if needed)", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/extend-stay.html" },
        ],
        family_sponsor: [
            { label: "Confirm sponsored family member's status (PR/Permit)", link: "#" },
            { label: "Understand sponsor obligations", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship.html" },
        ]
    },
    // General items for most newcomers
    general: {
        arrival: [
            { label: "Valid Passport (check expiry date)", link: "#" },
            { label: "Declare goods to customs (CBSA)", link: "https://www.cbsa-asfc.gc.ca/travel-voyage/declare-eng.html" },
            { label: "Have temporary accommodation arranged", link: "#" },
            { label: "Have access to sufficient funds (as declared)", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/documents/proof-funds.html" },
        ],
        services: [
            { label: "Apply for Social Insurance Number (SIN)", link: "https://www.canada.ca/en/employment-social-development/services/sin/apply.html", statuses: ['permanent_resident', 'work_permit', 'study_permit', 'refugee', 'family_sponsor'] },
            { label: "Open a Canadian Bank Account", link: "#" },
            { label: "Get a Canadian Phone Number / SIM Card", link: "#" },
        ]
    },
    // Province-specific items (Illustrative - needs expansion)
    provinces: {
        ab: {
            health: [{ label: "Register for Alberta Health Care Insurance Plan (AHCIP)", link: "https://www.alberta.ca/ahcip.aspx" }],
            id: [{ label: "Get Alberta Identification Card or Driver's Licence", link: "https://www.alberta.ca/get-id-card.aspx" }],
        },
        bc: {
            health: [{ label: "Apply for Medical Services Plan (MSP)", link: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/how-to-enrol" }],
            id: [{ label: "Get BC Services Card (includes Photo ID / combines with Driver's Licence)", link: "https://www2.gov.bc.ca/gov/content/governments/government-id/bc-services-card" }],
        },
        mb: {
            health: [{ label: "Register for Manitoba Health Card", link: "https://www.gov.mb.ca/health/mhsip/forms.html" }],
            id: [{ label: "Get Manitoba Identification Card or Driver's Licence", link: "https://mpi.mb.ca/Pages/get-an-id-card.aspx" }],
        },
        nb: {
            health: [{ label: "Apply for New Brunswick Medicare Card", link: "https://www2.gnb.ca/content/gnb/en/departments/health/MedicarePrescriptionDrugPlan/medicare.html" }],
            id: [{ label: "Get New Brunswick Photo ID Card or Driver's Licence", link: "https://www2.gnb.ca/content/gnb/en/services/services_renderer.201170.Photo_ID_Card.html" }],
        },
        nl: {
            health: [{ label: "Apply for MCP Card (Newfoundland and Labrador)", link: "https://www.gov.nl.ca/hcs/mcp/obtaincard/" }],
            id: [{ label: "Get Newfoundland and Labrador Photo ID or Driver's Licence", link: "https://www.gov.nl.ca/motorregistration/drivers/photoids/" }],
        },
        nt: {
            health: [{ label: "Apply for NWT Health Care Card", link: "https://www.hss.gov.nt.ca/en/services/nwt-health-care-plan" }],
            id: [{ label: "Get NWT General Identification Card or Driver's Licence", link: "https://www.gov.nt.ca/services/apply-general-identification-card" }],
        },
        ns: {
            health: [{ label: "Apply for Nova Scotia Health Card (MSI)", link: "https://novascotia.ca/dhw/msi/health_cards.asp" }],
            id: [{ label: "Get Nova Scotia Photo Identification Card or Driver's Licence", link: "https://novascotia.ca/sns/access/drivers/photo-identification-cards.asp" }],
        },
        nu: {
             health: [{ label: "Apply for Nunavut Health Care Card", link: "https://www.gov.nu.ca/health/information/nunavut-health-care-plan" }],
             id: [{ label: "Get Nunavut General Identification Card or Driver's Licence", link: "https://www.gov.nu.ca/motorvehicles/information/general-identification-card" }],
        },
        on: {
            health: [{ label: "Apply for OHIP (Ontario Health Card)", link: "https://www.ontario.ca/page/apply-ohip-and-get-health-card" }],
            id: [{ label: "Get Ontario Photo Card or Driver's Licence", link: "https://www.ontario.ca/page/ontario-photo-card" }],
            other: [{ label: "Find a family doctor (Health Care Connect)", link: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner" }]
        },
        pe: {
            health: [{ label: "Apply for PEI Health Card", link: "https://www.princeedwardisland.ca/en/service/apply-for-pei-health-card" }],
            id: [{ label: "Get PEI Photo ID Card or Driver's Licence", link: "https://www.princeedwardisland.ca/en/service/apply-voluntary-photo-id-card" }],
        },
        qc: {
            health: [{ label: "Register for RAMQ (Quebec Health Insurance Card)", link: "https://www.ramq.gouv.qc.ca/en/citizens/health-insurance/register" }],
            language: [{ label: "Consider French Courses (Francisation Québec)", link: "https://www.quebec.ca/en/education/learn-french" }],
            id: [{ label: "Apply for Quebec Driver's License (SAAQ)", link: "https://saaq.gouv.qc.ca/en/drivers-licences/obtaining-licence" }],
            other: [{ label: "Find a family doctor (Québec Family Doctor Finder)", link: "https://www.quebec.ca/en/health/finding-a-resource/registering-with-a-family-doctor" }]
        },
        sk: {
             health: [{ label: "Apply for Saskatchewan Health Card", link: "https://www.ehealthsask.ca/residents/health-cards" }],
             id: [{ label: "Get Saskatchewan Photo ID or Driver's Licence (SGI)", link: "https://sgi.sk.ca/photo-id" }],
        },
        yt: {
            health: [{ label: "Apply for Yukon Health Care Card", link: "https://yukon.ca/en/health-and-wellness/yukon-health-care-card/apply-yukon-health-care-card" }],
            id: [{ label: "Get Yukon General Identification Card or Driver's Licence", link: "https://yukon.ca/en/driving-and-transportation/driver-licensing/get-general-identification-card" }],
        }
    },
    // Children-specific items
    children: [
        { label: "Register children for local school / Check eligibility", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/new-life-canada/enrol-school.html" },
        { label: "Obtain/Translate immunization records for school", link: "https://www.canada.ca/en/public-health/services/vaccination-children.html" },
        { label: "Apply for Canada Child Benefit (CCB) if eligible", link: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit-overview/canada-child-benefit-apply.html" },
        { label: "Research child care options & potential subsidies", link: "https://www.canada.ca/en/employment-social-development/services/child-care.html" },
        { label: "Obtain provincial health card for children", link: "#" }
    ]
};

// --- Helper Functions ---
function createChecklistItem(item) {
    const div = document.createElement('div');
    div.className = 'checklist-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `item-${Math.random().toString(36).substring(2, 9)}`;
    checkbox.className = 'h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0 mt-1 mr-3';
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.className = 'flex-grow text-gray-700 text-sm';
    if (item.link && item.link !== "#") {
        const link = document.createElement('a');
        link.href = item.link;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'text-blue-600 hover:text-blue-800 hover:underline';
        link.textContent = item.label;
        label.appendChild(link);
    } else {
        label.textContent = item.label;
    }
    div.appendChild(checkbox);
    div.appendChild(label);
    return div;
}
function clearChecklists() {
    document.getElementById('statusChecklist').innerHTML = '';
    document.getElementById('arrivalChecklist').innerHTML = '';
    document.getElementById('servicesChecklist').innerHTML = '';
    document.getElementById('provinceChecklist').innerHTML = '';
    document.getElementById('childrenChecklist').innerHTML = '';
    document.getElementById('statusSection').classList.add('hidden');
    document.getElementById('childrenSection').classList.add('hidden');
}
function generateChecklist(status, provinceCode, hasChildren) {
    clearChecklists();
    const statusListDiv = document.getElementById('statusChecklist');
    const arrivalListDiv = document.getElementById('arrivalChecklist');
    const servicesListDiv = document.getElementById('servicesChecklist');
    const provinceListDiv = document.getElementById('provinceChecklist');
    const childrenListDiv = document.getElementById('childrenChecklist');
    if (checklistData.statusSpecific[status]) {
        document.getElementById('statusSection').classList.remove('hidden');
        checklistData.statusSpecific[status].forEach(item => {
            statusListDiv.appendChild(createChecklistItem(item));
        });
    }
    checklistData.general.arrival.forEach(item => {
        arrivalListDiv.appendChild(createChecklistItem(item));
    });
    checklistData.general.services.forEach(item => {
        if (!item.statuses || item.statuses.includes(status)) {
            servicesListDiv.appendChild(createChecklistItem(item));
        }
    });
    if (checklistData.provinces[provinceCode]) {
        provinceListDiv.innerHTML = '';
        Object.entries(checklistData.provinces[provinceCode]).forEach(([category, items]) => {
            const header = document.createElement('h3');
            header.textContent = category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1').trim();
            header.className = 'text-base font-semibold text-gray-600 mb-3 mt-4';
            provinceListDiv.appendChild(header);
            items.forEach(item => {
                provinceListDiv.appendChild(createChecklistItem(item));
            });
        });
    } else {
        provinceListDiv.innerHTML = '<p class="text-sm text-gray-500">No specific provincial tasks listed for this selection. Please check the official government website.</p>';
    }
    if (hasChildren) {
        document.getElementById('childrenSection').classList.remove('hidden');
        checklistData.children.forEach(item => {
            childrenListDiv.appendChild(createChecklistItem(item));
        });
    }
    document.getElementById('checklistResults').classList.remove('hidden');
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checklistForm');
    const printBtn = document.getElementById('printChecklist');
    const downloadBtn = document.getElementById('downloadPDF');
    const languageSwitcher = document.getElementById('languageSwitcher');
    const languageDropdown = document.getElementById('languageDropdown');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.getElementById('status').value;
            const province = document.getElementById('province').value;
            const hasChildren = document.getElementById('hasChildren').checked;
            if (!status || !province) {
                alert('Please select both your immigration status and destination.');
                return;
            }
            generateChecklist(status, province, hasChildren);
            document.getElementById('checklistResults').scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }
    if (downloadBtn) {
        downloadBtn.disabled = false;
        downloadBtn.classList.remove('cursor-not-allowed', 'opacity-50');
        downloadBtn.addEventListener('click', async () => {
            const checklistDiv = document.getElementById('checklistResults');
            if (!checklistDiv || checklistDiv.classList.contains('hidden')) {
                alert('Please generate your checklist first.');
                return;
            }
            // Hide print/download buttons for PDF
            const printBtn = document.getElementById('printChecklist');
            const downloadBtn = document.getElementById('downloadPDF');
            if (printBtn) printBtn.style.display = 'none';
            if (downloadBtn) downloadBtn.style.display = 'none';
            // Use html2canvas to capture checklist
            await html2canvas(checklistDiv, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new window.jspdf.jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });
                const pageWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                // Calculate image dimensions to fit A4
                const imgWidth = pageWidth - 40;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let position = 20;
                // Multi-page logic
                let remainingHeight = imgHeight;
                let imgY = position;
                let pageNum = 0;
                while (remainingHeight > 0) {
                    const renderHeight = Math.min(remainingHeight, pageHeight - position * 2);
                    pdf.addImage(
                        imgData,
                        'PNG',
                        20,
                        imgY,
                        imgWidth,
                        imgHeight,
                        undefined,
                        'FAST'
                    );
                    remainingHeight -= (pageHeight - position * 2);
                    if (remainingHeight > 0) {
                        pdf.addPage();
                        imgY = -remainingHeight + position; // Move up for next page
                    }
                }
                pdf.save('document-checklist.pdf');
            });
            // Restore print/download buttons
            if (printBtn) printBtn.style.display = '';
            if (downloadBtn) downloadBtn.style.display = '';
        });
    }
    if (languageSwitcher && languageDropdown) {
        languageSwitcher.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('hidden');
        });
    }
    document.addEventListener('click', (e) => {
        if (languageDropdown && !languageDropdown.classList.contains('hidden')) {
            if (!languageSwitcher.contains(e.target) && !languageDropdown.contains(e.target)) {
                languageDropdown.classList.add('hidden');
            }
        }
    });
}); 