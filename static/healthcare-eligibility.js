// --- Healthcare Eligibility Data ---
        // IMPORTANT: This data is simplified and MUST be verified with official provincial sources.
        // Waiting periods and specific permit requirements are complex.
        // 'waitTimeMonths' indicates the typical wait AFTER establishing residency. 0 means generally from arrival/registration.
        const healthcareData = {
            AB: { // Alberta
                name: "Alberta Health Care Insurance Plan (AHCIP)",
                applyLink: "https://www.alberta.ca/ahcip-apply.aspx",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Must intend to reside in AB for 12+ months." }, // Generally upon establishing residency
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 6+ months (verify exact rules)." }, // Check permit duration
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months (verify exact rules)." }, // Check permit duration
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Coverage often starts sooner, check with AHCIP/IFHP." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                covered: ["Doctor visits", "Hospital stays", "Medically required surgery", "Diagnostic services (X-rays, labs)"],
                notCovered: ["Prescription drugs", "Dental care", "Vision care (eye exams, glasses)", "Ambulance services", "Physiotherapy, chiropractic (except limited circumstances)"]
            },
            BC: { // British Columbia
                name: "Medical Services Plan (MSP)",
                applyLink: "https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/eligibility-and-enrolment/how-to-enrol",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 3, note: "Wait is month of arrival + 2 full months." },
                    work_permit: { eligible: true, waitTimeMonths: 3, note: "Permit must be valid for 6+ months. Wait period applies." },
                    study_permit: { eligible: true, waitTimeMonths: 3, note: "Permit must be valid for 6+ months. Wait period applies." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply for MSP." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                covered: ["Doctor visits", "Hospital stays", "Medically required surgery", "Diagnostic services", "Maternity care"],
                notCovered: ["Prescription drugs (Fair PharmaCare may help)", "Dental care", "Vision care", "Ambulance services", "Physiotherapy, massage therapy"]
            },
            MB: { // Manitoba
                name: "Manitoba Health, Seniors and Long-Term Care",
                applyLink: "https://www.gov.mb.ca/health/mhsip/forms.html",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Coverage typically starts the first day of the third month after arrival, but apply upon arrival." }, // Clarified timing
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Coverage starts ~3 months after arrival." }, // Check permit duration
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 6+ months. Coverage starts ~3 months after arrival." }, // Check permit duration
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                covered: ["Doctor visits", "Hospital stays", "Surgery", "X-rays, lab tests", "Eye exams (limited)"],
                notCovered: ["Prescription drugs (Pharmacare program may help)", "Dental care", "Glasses/contacts", "Ambulance fees", "Physiotherapy (most cases)"]
            },
             NB: { // New Brunswick
                name: "New Brunswick Medicare",
                applyLink: "https://www2.gnb.ca/content/gnb/en/departments/health/MedicarePrescriptionDrugPlan/content/medicare/ApplyingforCard.html",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Apply upon arrival to establish residency." },
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Must be enrolled full-time for a year. Apply upon arrival." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                covered: ["Doctor visits", "Hospital services", "Surgical procedures", "Certain diagnostic services"],
                notCovered: ["Prescription drugs (Drug plan available)", "Dental care", "Vision care", "Ambulance fees", "Most therapies"]
            },
             NL: { // Newfoundland and Labrador
                name: "Medical Care Plan (MCP)",
                applyLink: "https://www.gov.nl.ca/hcs/mcp/obtaincard/",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Apply upon arrival." },
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                covered: ["Doctor visits", "Hospital accommodation", "Surgical, diagnostic, therapeutic procedures"],
                notCovered: ["Prescription drugs (Drug plan available)", "Dental care", "Vision care", "Ambulance services", "Most therapies"]
            },
            NT: { // Northwest Territories
                name: "NWT Health Care Plan",
                applyLink: "https://www.hss.gov.nt.ca/en/services/nwt-health-care-plan/apply-health-care",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Apply upon establishing residency." },
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                 covered: ["Doctor visits", "Hospital services", "Diagnostics", "Some travel assistance for medical care"],
                 notCovered: ["Prescription drugs (Extended Health Benefits may cover)", "Dental care", "Vision care", "Ambulance fees"]
            },
             NS: { // Nova Scotia
                name: "Nova Scotia Health Card (MSI)",
                applyLink: "https://novascotia.ca/dhw/msi/apply_for_health_card.asp",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Coverage starts 1st day of 3rd month after arrival, apply early." }, // Clarified timing
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Coverage starts ~3 months after arrival." },
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Coverage starts ~3 months after arrival." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                covered: ["Doctor visits", "Hospital care", "Some dental/vision for children/seniors", "Diagnostics"],
                notCovered: ["Prescription drugs (Pharmacare programs exist)", "Most dental/vision care", "Ambulance fees", "Physiotherapy"]
            },
             NU: { // Nunavut
                name: "Nunavut Health Care Plan",
                applyLink: "https://www.gov.nu.ca/health/information/nunavut-health-care-plan",
                 statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Apply upon establishing residency." },
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                 covered: ["Doctor visits", "Hospital services", "Diagnostics", "Medical travel assistance"],
                 notCovered: ["Prescription drugs (NIHB or Extended Health Benefits may cover)", "Dental care", "Vision care", "Ambulance fees"]
            },
            ON: { // Ontario
                name: "Ontario Health Insurance Plan (OHIP)",
                applyLink: "https://www.ontario.ca/page/apply-ohip-and-get-health-card",
                statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 3, note: "Typically a 3-month wait after establishing residency." },
                    work_permit: { eligible: true, waitTimeMonths: 3, note: "Must have full-time job offer (6+ months) & valid work permit. Wait period applies." }, // More specific
                    study_permit: { eligible: false, message: "International students are generally NOT eligible for OHIP. Must have private insurance (e.g., UHIP, guard.me)." }, // Clarified student ineligibility
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply for OHIP." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                covered: ["Doctor visits", "Hospital stays", "Emergency care", "Medically necessary surgery", "Lab tests, X-rays"],
                notCovered: ["Prescription drugs (Trillium Drug Program may help)", "Dental care", "Vision care (eye exams covered only for specific ages/conditions)", "Ambulance services", "Physiotherapy (except after hospital stay or for specific groups)"]
            },
             PE: { // Prince Edward Island
                name: "PEI Health Card",
                applyLink: "https://www.princeedwardisland.ca/en/service/apply-for-pei-health-card",
                 statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Apply upon arrival." },
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 6+ months. Apply upon arrival." },
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 6+ months. Apply upon arrival." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                 covered: ["Doctor visits", "Hospital services", "Surgery", "Diagnostics"],
                 notCovered: ["Prescription drugs (Drug cost programs exist)", "Dental care", "Vision care", "Ambulance services", "Most therapies"]
            },
             QC: { // Quebec
                name: "Régie de l'assurance maladie du Québec (RAMQ)",
                applyLink: "https://www.ramq.gouv.qc.ca/en/citizens/health-insurance/register",
                 statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 3, note: "Wait is up to 3 months after registration." },
                    work_permit: { eligible: true, waitTimeMonths: 3, note: "Permit must be valid for 6+ months. Wait period applies." },
                    study_permit: { eligible: true, waitTimeMonths: 3, note: "Eligibility depends on country agreement or program duration. Check RAMQ. Wait period applies." }, // More nuanced
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply for RAMQ." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                 covered: ["Doctor visits", "Hospital care", "Surgery", "Diagnostics", "Optometry (limited)"],
                 notCovered: ["Prescription drugs (Public drug plan mandatory if no private plan)", "Most dental care", "Most vision care (glasses)", "Ambulance", "Physiotherapy"]
            },
             SK: { // Saskatchewan
                name: "Saskatchewan Health Card",
                applyLink: "https://www.ehealthsask.ca/residents/health-cards/Pages/Apply-for-a-Health-Card.aspx",
                 statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 3, note: "Coverage starts ~3 months after establishing residency." },
                    work_permit: { eligible: true, waitTimeMonths: 3, note: "Permit must be valid for 12+ months. Wait period applies." },
                    study_permit: { eligible: true, waitTimeMonths: 3, note: "Permit must be valid for 6+ months. Wait period applies." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                 covered: ["Doctor visits", "Hospital services", "Diagnostics", "Surgery"],
                 notCovered: ["Prescription drugs (Drug plan available)", "Dental care", "Vision care", "Ambulance fees", "Most therapies"]
            },
             YT: { // Yukon
                name: "Yukon Health Care Insurance Plan (YHCIP)",
                applyLink: "https://yukon.ca/en/health-and-wellness/yukon-health-care-card/apply-yukon-health-care-card",
                 statuses: {
                    permanent_resident: { eligible: true, waitTimeMonths: 0, note: "Apply upon establishing residency." }, // Typically no wait
                    work_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    study_permit: { eligible: true, waitTimeMonths: 0, note: "Permit must be valid for 12+ months. Apply upon arrival." },
                    refugee: { eligible: true, waitTimeMonths: 0, note: "Check IFHP coverage initially, then apply." },
                    visitor_record: { eligible: false, message: "Visitors and those with Visitor Records are generally not eligible." },
                    visitor: { eligible: false, message: "Visitors/Tourists are not eligible." }
                },
                 covered: ["Doctor visits", "Hospital services", "Surgery", "Diagnostics", "Medical travel assistance"],
                 notCovered: ["Prescription drugs (Pharmacare program exists)", "Dental care", "Vision care", "Ambulance services", "Most therapies"]
            }
        };

        // --- DOM Elements ---
        const provinceSelect = document.getElementById('province');
        const statusSelect = document.getElementById('status');
        const dependentsCheckbox = document.getElementById('hasDependents');
        const form = document.getElementById('eligibilityForm');
        const resultsDiv = document.getElementById('results');
        const eligibilityStatusDiv = document.getElementById('eligibilityStatus');
        const coverageDetailsDiv = document.getElementById('coverageDetails');
        const coverageContentDiv = document.getElementById('coverageContent'); // Target for details
        const applicationLinkContainer = document.getElementById('applicationLinkContainer');
        const dependentsNoteDiv = document.getElementById('dependentsNote');
        const privateInsuranceNoteDiv = document.getElementById('privateInsuranceNote');
        const errorContainer = document.getElementById('errorContainer');


        // --- Helper Functions ---

        /** Creates an HTML list item for coverage details. */
        function createCoverageListItem(text, isCovered = true) {
            const iconClass = isCovered ? 'fa-check text-green-600' : 'fa-times text-red-600';
            return `
                <li class="flex items-start">
                    <i class="fas ${iconClass} fa-fw mt-1 mr-2"></i>
                    <span>${text}</span>
                </li>`;
        }

         /** Shows an error message. */
        function showError(message) {
            errorContainer.innerHTML = `
                <div class="error-box">
                    <p><i class="fas fa-exclamation-circle mr-2"></i>${message}</p>
                </div>
            `;
             resultsDiv.classList.add('hidden'); // Hide results on error
        }

        /** Clears any displayed error message. */
        function clearError() {
            errorContainer.innerHTML = '';
        }

        // --- Main Display Logic ---
        function displayResults(provinceCode, statusKey, hasDependents) {
            clearError();
            const provinceData = healthcareData[provinceCode];

            if (!provinceData) {
                showError(`Data for province code "${provinceCode}" not found.`);
                return;
            }
            const data = provinceData.statuses[statusKey];

            if (!data) {
                 showError(`Eligibility data for status "${statusKey}" in province "${provinceCode}" not found.`);
                 return;
            }

            // Clear previous results
            eligibilityStatusDiv.innerHTML = '';
            coverageContentDiv.innerHTML = '';
            applicationLinkContainer.innerHTML = '';
            dependentsNoteDiv.classList.add('hidden');
            privateInsuranceNoteDiv.classList.add('hidden');

            // Display Eligibility Status & Waiting Period Info
            let waitMessage = '';
            let needsPrivateInsurance = false;

            if (data.eligible) {
                eligibilityStatusDiv.className = 'result-box bg-green-50 text-green-800 border border-green-200'; // Green theme
                eligibilityStatusDiv.innerHTML = `<h3 class="text-green-800"><i class="fas fa-check-circle mr-2"></i>Eligible for ${provinceData.name}</h3>`;

                if (data.waitTimeMonths > 0) {
                    waitMessage = `There is typically a waiting period of approximately <strong>${data.waitTimeMonths} months</strong> after establishing residency before coverage begins.`;
                    needsPrivateInsurance = true;
                } else if (data.waitTimeMonths === 0 && statusKey !== 'refugee') {
                     // Handle cases like MB/NS where coverage starts later but no explicit wait *after* residency
                     waitMessage = `Apply upon arrival. Coverage usually starts on the first day of the <strong>third month</strong> after arrival/establishing residency.`;
                     needsPrivateInsurance = true; // Still need coverage for the first ~3 months
                } else if (statusKey === 'refugee') {
                    waitMessage = `Refugees and protected persons may be eligible for coverage sooner or initially covered by the Interim Federal Health Program (IFHP). Apply for provincial coverage as soon as possible.`;
                } else {
                     waitMessage = `Coverage generally begins soon after successful registration upon establishing residency.`;
                }
                eligibilityStatusDiv.innerHTML += `<p>${waitMessage}</p>`;
                 if(data.note) {
                     eligibilityStatusDiv.innerHTML += `<p class="text-xs mt-2 italic">${data.note}</p>`;
                 }

            } else { // Not Eligible
                eligibilityStatusDiv.className = 'result-box bg-red-50 text-red-800 border border-red-200'; // Red theme
                eligibilityStatusDiv.innerHTML = `<h3 class="text-red-800"><i class="fas fa-times-circle mr-2"></i>Likely Not Eligible</h3>`;
                eligibilityStatusDiv.innerHTML += `<p>${data.message || 'Based on the selected status, you are likely not eligible for provincial health coverage.'}</p>`;
                needsPrivateInsurance = true; // Definitely need private if ineligible
            }

            // Display Coverage Details (only if eligible)
            if (data.eligible) {
                coverageContentDiv.innerHTML = `
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 class="font-semibold text-gray-700 mb-2">Generally Covered:</h4>
                            <ul class="space-y-1">
                                ${provinceData.covered.map(item => createCoverageListItem(item, true)).join('')}
                            </ul>
                        </div>
                        <div>
                             <h4 class="font-semibold text-gray-700 mb-2">Generally NOT Covered:</h4>
                             <ul class="space-y-1">
                                ${provinceData.notCovered.map(item => createCoverageListItem(item, false)).join('')}
                                <li><span>(Coverage varies, check official plan details)</span></li>
                             </ul>
                        </div>
                    </div>`;

                // Display Application Link
                if (provinceData.applyLink) {
                    applicationLinkContainer.innerHTML = `
                        <a href="${provinceData.applyLink}" target="_blank" rel="noopener noreferrer"
                           class="inline-block mt-4 bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                            <i class="fas fa-file-alt mr-2"></i> How to Apply for ${provinceData.name}
                        </a>
                    `;
                }
            } else {
                 coverageContentDiv.innerHTML = '<p class="text-center text-gray-500 italic">Coverage details not applicable.</p>';
            }

             // Show Dependents Note if checked
             if (hasDependents) {
                 dependentsNoteDiv.classList.remove('hidden');
             }

             // Show Private Insurance Note if needed
             if (needsPrivateInsurance) {
                 privateInsuranceNoteDiv.classList.remove('hidden');
             }


            // Show the results container
            resultsDiv.classList.remove('hidden');
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // --- Event Listener ---
        document.addEventListener('DOMContentLoaded', () => {
            if (!form) {
                console.error("Form element not found");
                return;
            }
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                clearError(); // Clear previous errors

                const province = provinceSelect.value;
                const status = statusSelect.value;
                const hasDependents = dependentsCheckbox.checked;

                if (!province || !status) {
                    showError('Please select both a province/territory and your immigration status.');
                    return;
                }

                try {
                    displayResults(province, status, hasDependents);
                } catch (error) {
                     console.error("Display Error:", error);
                     showError("An error occurred while retrieving eligibility information. Please ensure valid selections.");
                }
            });

             // Hide results if inputs change
             [provinceSelect, statusSelect, dependentsCheckbox].forEach(el => {
                 el.addEventListener('change', () => {
                     resultsDiv.classList.add('hidden');
                     clearError();
                 });
             });
        });

