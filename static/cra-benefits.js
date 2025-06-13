// --- Constants (Approx. 2024 values - MUST BE UPDATED ANNUALLY) ---
        // CCB Amounts per child
        const CCB_MAX_UNDER_6 = 7437;
        const CCB_MAX_6_TO_17 = 6275;
        // CCB Income Thresholds & Reduction Rates (Simplified Example - Real calculation is more complex)
        const CCB_THRESH_1 = 34863; // First threshold
        const CCB_THRESH_2 = 75537; // Second threshold
        const CCB_REDUCE_RATE_1_SINGLE = 0.07; // 7% for 1 child below THRESH_2
        const CCB_REDUCE_RATE_2_SINGLE = 0.032; // 3.2% for 1 child above THRESH_2
        const CCB_REDUCE_RATE_1_MULTI = 0.135; // 13.5% for 2 children below THRESH_2
        const CCB_REDUCE_RATE_2_MULTI = 0.057; // 5.7% for 2 children above THRESH_2
        // Note: Rates increase slightly for 3+ children

        // GST/HST Credit Amounts
        const GST_BASE_SINGLE = 519;
        const GST_BASE_MARRIED = 680; // Base for couple OR single parent
        const GST_PER_CHILD = 179;
        // GST Income Thresholds & Reduction Rate
        const GST_THRESH_SINGLE = 44343; // Approx threshold where reduction starts for single
        const GST_THRESH_FAMILY = 44343; // Approx threshold where reduction starts for families
        const GST_REDUCE_RATE = 0.05; // 5% reduction rate

        // Canada Workers Benefit (CWB) Amounts (Simplified - Max amounts & thresholds vary slightly by province & family type)
        const CWB_MAX_SINGLE = 1428;
        const CWB_MAX_FAMILY = 2461;
        const CWB_THRESH_SINGLE_START_REDUCE = 23495; // Income where reduction starts
        const CWB_THRESH_SINGLE_END = 33015; // Income where benefit becomes 0
        const CWB_THRESH_FAMILY_START_REDUCE = 26805;
        const CWB_THRESH_FAMILY_END = 43212;
        const CWB_REDUCE_RATE = 0.12; // Reduction rate (12% or 15% depending on income/family) - using 12%

        // CAIP Provinces (Check annually)
        const CAIP_PROVINCES = ["AB", "SK", "MB", "ON", "NL", "NS", "PE", "NB"];

        // --- DOM Elements ---
        const benefitsForm = document.getElementById('benefitsForm');
        const childrenDetailsDiv = document.getElementById('childrenDetails');
        const childrenAgesDiv = document.getElementById('childrenAges');
        const numChildrenInput = document.getElementById('numChildren');
        const resultsDiv = document.getElementById('results');
        const errorContainer = document.getElementById('errorContainer');
        // Result display elements
        const ccbResultAmount = document.querySelector('#ccbResult .amount');
        const ccbNoteEl = document.getElementById('ccbNote');
        const gstResultAmount = document.querySelector('#gstResult .amount');
        const gstNoteEl = document.getElementById('gstNote');
        const cwbResultAmount = document.querySelector('#cwbResult .amount');
        const cwbNoteEl = document.getElementById('cwbNote');
        const totalResultAmount = document.getElementById('totalResult');
        const caipProvinceSpan = document.getElementById('caipProvince');


        // --- Helper Functions ---

        /** Formats a number as Canadian currency (no cents). */
        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(amount);
        }

        /** Clears any displayed error message. */
        function clearError() {
            errorContainer.innerHTML = '';
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

        /** Dynamically generates age input fields for children. */
        function generateAgeInputs(num) {
            childrenAgesDiv.innerHTML = ''; // Clear previous inputs
            if (num > 0) {
                const label = document.createElement('label');
                label.className = 'block text-sm font-medium text-gray-700 mb-1';
                label.textContent = `Age of each child (0-17)`;
                childrenAgesDiv.appendChild(label);
            }
            for (let i = 1; i <= num; i++) {
                const input = document.createElement('input');
                input.type = 'number';
                input.id = `childAge${i}`;
                input.name = `childAge${i}`;
                input.min = "0";
                input.max = "17";
                input.required = true;
                input.placeholder = `Child ${i} Age`;
                input.className = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm mb-2';
                childrenAgesDiv.appendChild(input);
            }
        }

        /** Gets the ages entered for children. */
        function getChildrenAges(num) {
            const ages = [];
            for (let i = 1; i <= num; i++) {
                const input = document.getElementById(`childAge${i}`);
                if (input) {
                    const age = parseInt(input.value);
                    if (!isNaN(age) && age >= 0 && age <= 17) {
                        ages.push(age);
                    } else {
                        // Handle invalid age input if needed, maybe throw error
                        console.warn(`Invalid age entered for child ${i}`);
                    }
                }
            }
            return ages;
        }


        // --- Benefit Calculation Logic (Improved Estimates) ---

        function calculateCCB(afni, maritalStatus, childrenAges) {
            if (childrenAges.length === 0) return 0;

            let maxBenefit = 0;
            childrenAges.forEach(age => {
                maxBenefit += (age < 6) ? CCB_MAX_UNDER_6 : CCB_MAX_6_TO_17;
            });

            let reduction = 0;
            const numChildren = childrenAges.length;

            // Determine reduction rates based on number of children (simplified)
            const rate1 = (numChildren === 1) ? CCB_REDUCE_RATE_1_SINGLE : CCB_REDUCE_RATE_1_MULTI; // Use multi-child rate for 2+
            const rate2 = (numChildren === 1) ? CCB_REDUCE_RATE_2_SINGLE : CCB_REDUCE_RATE_2_MULTI; // Use multi-child rate for 2+

            if (afni > CCB_THRESH_1) {
                const incomeOverFirstThresh = Math.min(afni, CCB_THRESH_2) - CCB_THRESH_1;
                reduction += incomeOverFirstThresh * rate1;
            }
            if (afni > CCB_THRESH_2) {
                const incomeOverSecondThresh = afni - CCB_THRESH_2;
                reduction += incomeOverSecondThresh * rate2;
            }

            return Math.max(0, maxBenefit - reduction);
        }

        function calculateGstCredit(afni, maritalStatus, numChildren) {
             let baseAmount = (maritalStatus === 'single' && numChildren === 0) ? GST_BASE_SINGLE : GST_BASE_MARRIED; // Married or single parent use higher base
             let credit = baseAmount + (numChildren * GST_PER_CHILD);

             // Determine threshold based on status/children (simplified)
             const threshold = GST_THRESH_FAMILY; // Using family threshold as a simplification

             if (afni > threshold) {
                 const incomeOverThresh = afni - threshold;
                 const reduction = incomeOverThresh * GST_REDUCE_RATE;
                 credit = Math.max(0, credit - reduction);
             }

             return credit;
        }

        function calculateCWB(afni, maritalStatus) {
            // CWB eligibility requires *working* income, which we don't ask for.
            // This calculation assumes AFNI is primarily working income for simplicity.
            let maxBenefit, startReduce, endBenefit;

            if (maritalStatus === 'single') {
                maxBenefit = CWB_MAX_SINGLE;
                startReduce = CWB_THRESH_SINGLE_START_REDUCE;
                endBenefit = CWB_THRESH_SINGLE_END;
            } else { // married/common-law
                maxBenefit = CWB_MAX_FAMILY;
                startReduce = CWB_THRESH_FAMILY_START_REDUCE;
                endBenefit = CWB_THRESH_FAMILY_END;
            }

            if (afni < 3000 || afni > endBenefit) { // Basic income check (Need some working income, phase out)
                return 0;
            }

            let benefit = maxBenefit;
            if (afni > startReduce) {
                const incomeOverThresh = afni - startReduce;
                const reduction = incomeOverThresh * CWB_REDUCE_RATE;
                benefit = Math.max(0, benefit - reduction);
            }

            return benefit;
        }


        // --- Main Calculation Function ---
        function estimateBenefits(formData) {
            const { immigrationStatus, province, hasChildren, numChildren, income, maritalStatus } = formData;
            let results = { ccb: 0, gst: 0, cwb: 0, total: 0, notes: { ccb: '', gst: '', cwb: '' } };

            // Basic Eligibility Check (Simplified)
            if (immigrationStatus === 'other') {
                results.notes = { ccb: 'Generally ineligible', gst: 'Generally ineligible', cwb: 'Generally ineligible' };
                return results;
            }
             if (immigrationStatus === 'temp_resident') {
                 results.notes = { ccb: 'Likely ineligible (residency requirement)', gst: 'Likely ineligible (residency requirement)', cwb: 'Check eligibility' };
                  // CWB might be possible sooner based on work
                  results.cwb = calculateCWB(income, maritalStatus);
                  if (results.cwb === 0 && income > 3000) results.notes.cwb = 'Income likely too high';
                  else if (results.cwb === 0) results.notes.cwb = 'Check eligibility';
                  else results.notes.cwb = ''; // Clear note if calculated
                  results.total = results.cwb; // Only CWB potentially applicable early
                 return results;
            }

            // Calculations for Residents (PR, Citizen, Refugee etc.)
            const childrenAges = (hasChildren === 'yes') ? getChildrenAges(numChildren) : [];

            results.ccb = calculateCCB(income, maritalStatus, childrenAges);
            results.gst = calculateGstCredit(income, maritalStatus, childrenAges.length);
            results.cwb = calculateCWB(income, maritalStatus);

            // Add notes based on calculation results
            if (hasChildren !== 'yes') results.notes.ccb = 'No eligible children selected';
            else if (results.ccb === 0) results.notes.ccb = 'Income may be too high';

            if (results.gst === 0 && income > 3000) results.notes.gst = 'Income likely too high'; // Avoid note if income is 0

            if (results.cwb === 0 && income > 3000) results.notes.cwb = 'Income likely too high or no working income'; // CWB requires working income
            else if (results.cwb === 0) results.notes.cwb = 'Requires working income';


            results.total = results.ccb + results.gst + results.cwb;
            return results;
        }

        // --- Event Listeners ---
        document.addEventListener('DOMContentLoaded', () => {
            // Show/hide children details
            document.querySelectorAll('input[name="hasChildren"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    if (e.target.value === 'yes') {
                        childrenDetailsDiv.classList.remove('hidden');
                        // Optionally default to 1 child if none entered
                        if (numChildrenInput.value === "0") {
                           // numChildrenInput.value = "1";
                           // generateAgeInputs(1);
                        } else {
                             generateAgeInputs(parseInt(numChildrenInput.value) || 0);
                        }
                    } else {
                        childrenDetailsDiv.classList.add('hidden');
                        numChildrenInput.value = "0"; // Reset hidden field
                        childrenAgesDiv.innerHTML = ''; // Clear age inputs
                    }
                     resultsDiv.classList.add('hidden'); // Hide results on change
                     clearError();
                });
            });

            // Add age inputs when number of children changes
            numChildrenInput.addEventListener('input', (e) => { // Use input for immediate feedback
                 const num = parseInt(e.target.value) || 0;
                 generateAgeInputs(num);
                 resultsDiv.classList.add('hidden'); // Hide results on change
                 clearError();
            });

            // Handle form submission
            benefitsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                clearError();

                // Collect form data
                const hasChildrenValue = document.querySelector('input[name="hasChildren"]:checked')?.value;
                const numChildrenValue = parseInt(numChildrenInput.value) || 0;
                const incomeValue = parseFloat(document.getElementById('income').value); // Use parseFloat

                // Validation
                if (!document.getElementById('immigrationStatus').value) return showError("Please select your immigration status.");
                if (!document.getElementById('province').value) return showError("Please select your province/territory.");
                 if (!document.getElementById('maritalStatus').value) return showError("Please select your marital status.");
                if (hasChildrenValue === 'yes' && numChildrenValue <= 0) return showError("Please enter the number of children.");
                if (hasChildrenValue === 'yes' && getChildrenAges(numChildrenValue).length !== numChildrenValue) return showError("Please enter a valid age (0-17) for each child.");
                if (isNaN(incomeValue) || incomeValue < 0) return showError("Please enter a valid non-negative household income.");


                const formData = {
                    immigrationStatus: document.getElementById('immigrationStatus').value,
                    province: document.getElementById('province').value,
                    hasChildren: hasChildrenValue,
                    numChildren: numChildrenValue,
                    income: incomeValue,
                    maritalStatus: document.getElementById('maritalStatus').value
                };

                try {
                    const benefits = estimateBenefits(formData);

                    // Update UI
                    ccbResultAmount.textContent = formatCurrency(benefits.ccb);
                    ccbNoteEl.textContent = benefits.notes.ccb;
                    ccbNoteEl.className = `note ${benefits.ccb === 0 && benefits.notes.ccb ? 'ineligible' : ''}`; // Add class if ineligible note

                    gstResultAmount.textContent = formatCurrency(benefits.gst);
                    gstNoteEl.textContent = benefits.notes.gst;
                     gstNoteEl.className = `note ${benefits.gst === 0 && benefits.notes.gst ? 'ineligible' : ''}`;

                    cwbResultAmount.textContent = formatCurrency(benefits.cwb);
                    cwbNoteEl.textContent = benefits.notes.cwb;
                     cwbNoteEl.className = `note ${benefits.cwb === 0 && benefits.notes.cwb ? 'ineligible' : ''}`;

                    totalResultAmount.textContent = formatCurrency(benefits.total);

                    // Update CAIP note
                    caipProvinceSpan.textContent = CAIP_PROVINCES.includes(formData.province) ? 'Climate Action Incentive Payment (CAIP)' : 'Climate Action Incentive Payment (CAIP - not applicable in your province)';


                    resultsDiv.classList.remove('hidden');
                    resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });

                } catch (error) {
                    console.error("Benefit Calculation Error:", error);
                    showError("An error occurred during calculation. Please check your inputs.");
                }
            });

             // Hide results if major inputs change
             [document.getElementById('immigrationStatus'), document.getElementById('province'), document.getElementById('income'), document.getElementById('maritalStatus')].forEach(el => {
                 el.addEventListener('change', () => {
                     resultsDiv.classList.add('hidden');
                     clearError();
                 });
             });

        });