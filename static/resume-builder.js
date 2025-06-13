        // Initialize jsPDF globally
        window.jsPDF = window.jspdf.jsPDF;

        // --- DOM Elements ---
        const form = document.getElementById('resumeForm');
        const experienceEntries = document.getElementById('experienceEntries');
        const educationEntries = document.getElementById('educationEntries');
        const languageEntries = document.getElementById('languageEntries');
        const certificateEntries = document.getElementById('certificateEntries');
        const addExperienceBtn = document.getElementById('addExperienceBtn');
        const addEducationBtn = document.getElementById('addEducationBtn');
        const addLanguageBtn = document.getElementById('addLanguageBtn');
        const addCertificateBtn = document.getElementById('addCertificateBtn');
        const previewSection = document.getElementById('previewSection');
        const resumePreviewDiv = document.getElementById('resumePreview');
        const resumePreviewContent = document.getElementById('resumePreviewContent');
        const regenerateBtn = document.getElementById('regenerateBtn');
        const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        const fillDummyDataBtn = document.getElementById('fillDummyDataBtn');
        const generateButton = document.getElementById('generateButton');
        const errorContainer = document.getElementById('errorContainer');

        // --- State ---
        let lastGeneratedData = null;

        // --- Helper Functions ---
        function clearError() { errorContainer.innerHTML = ''; }
        function showError(message) {
            errorContainer.innerHTML = `<div class="error-box"><p><i class="fas fa-exclamation-circle mr-2"></i>${message}</p></div>`;
            errorContainer.scrollIntoView({ behavior: 'smooth' });
        }

        /** Creates a generic removable entry section */
        function createRemovableEntry(options) {
            const { container, templateHTML, removeButtonClass } = options;
            const templateElement = document.createElement('div');
            templateElement.innerHTML = templateHTML.trim(); // Trim whitespace
            const newEntry = templateElement.firstElementChild; // Get the actual element

            if (!newEntry) {
                console.error("Could not create element from template HTML for container:", container);
                return;
            }

            const removeBtn = newEntry.querySelector(`.${removeButtonClass}`);
            if (removeBtn) {
                removeBtn.addEventListener('click', () => newEntry.remove());
            } else {
                console.warn(`Remove button with class "${removeButtonClass}" not found in template.`);
            }
            container.appendChild(newEntry);
        }

        // --- Dynamic Entry Templates ---
        // Using template literals for easier HTML structure
        const experienceTemplate = `
            <div class="experience-entry p-3 bg-gray-50 rounded-lg border border-gray-200 relative">
                <button type="button" class="remove-entry absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs px-1" title="Remove Job">
                    <i class="fas fa-times"></i>
                </button>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    <input type="text" name="expJobTitle[]" placeholder="Job Title *" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                    <input type="text" name="expCompany[]" placeholder="Company Name *" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    <input type="text" name="expCity[]" placeholder="City, Country *" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                    <input type="text" name="expYears[]" placeholder="Years (e.g., 2020-2023 or 2021-Present) *" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                </div>
                <textarea name="expDesc[]" placeholder="Describe responsibilities & achievements using action verbs (e.g., Managed..., Developed..., Increased..., Led...). Use bullet points (start each with * ). *" rows="4" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm"></textarea>
            </div>`;

        const educationTemplate = `
            <div class="education-entry p-3 bg-gray-50 rounded-lg border border-gray-200 relative">
                 <button type="button" class="remove-entry absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs px-1" title="Remove Education">
                    <i class="fas fa-times"></i>
                </button>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    <input type="text" name="eduDegree[]" placeholder="Degree / Diploma / Certificate *" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                    <input type="text" name="eduSchool[]" placeholder="Institution Name *" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" name="eduCity[]" placeholder="City, Country *" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                    <input type="text" name="eduYear[]" placeholder="Year Completed (or Expected) *" required pattern="\\d{4}|Present" title="Enter a 4-digit year or 'Present'" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                </div>
            </div>`;

        const certificateTemplate = `
            <div class="certificate-entry p-3 bg-gray-50 rounded-lg border border-gray-200 relative">
                <button type="button" class="remove-entry absolute top-1 right-1 text-red-500 hover:text-red-700 text-xs px-1" title="Remove Certificate">
                    <i class="fas fa-times"></i>
                </button>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                    <input type="text" name="certName[]" placeholder="Certificate Name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                    <input type="text" name="certIssuer[]" placeholder="Issuer/Organization" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                </div>
                <input type="text" name="certYear[]" placeholder="Year (e.g., 2023)" pattern="\\d{4}" title="Enter a 4-digit year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
            </div>`;

        const languageTemplate = `
            <div class="language-entry grid grid-cols-2 gap-3 relative">
                 <button type="button" class="remove-entry absolute -left-5 top-2 text-red-500 hover:text-red-700 text-xs px-1" title="Remove Language">
                    <i class="fas fa-times"></i>
                </button>
                <input type="text" name="langName[]" placeholder="Language" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                <select name="langLevel[]" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 text-sm">
                    <option value="">Select level...</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent / Bilingual</option>
                    <option value="Advanced">Advanced / Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                </select>
            </div>`;


        // --- Add/Remove Buttons Logic ---
        function setupAddRemoveListeners() {
            // Add button listeners
            addExperienceBtn.addEventListener('click', () => createRemovableEntry({ container: experienceEntries, templateHTML: experienceTemplate, removeButtonClass: 'remove-entry' }));
            addEducationBtn.addEventListener('click', () => createRemovableEntry({ container: educationEntries, templateHTML: educationTemplate, removeButtonClass: 'remove-entry' }));
            addCertificateBtn.addEventListener('click', () => createRemovableEntry({ container: certificateEntries, templateHTML: certificateTemplate, removeButtonClass: 'remove-entry' }));
            addLanguageBtn.addEventListener('click', () => createRemovableEntry({ container: languageEntries, templateHTML: languageTemplate, removeButtonClass: 'remove-entry' }));

            // Add remove listener to containers (using event delegation)
             [experienceEntries, educationEntries, certificateEntries, languageEntries].forEach(container => {
                container.addEventListener('click', (e) => {
                    const removeButton = e.target.closest('.remove-entry');
                    if (removeButton && container.contains(removeButton)) {
                         // Prevent removing the very first entry in Experience and Education
                         const entryElement = removeButton.closest('.experience-entry, .education-entry, .certificate-entry, .language-entry');
                         if (entryElement && entryElement !== container.firstElementChild) {
                            entryElement.remove();
                         } else if (entryElement && (container.id !== 'experienceEntries' && container.id !== 'educationEntries')) {
                              // Allow removing first entry for optional sections
                              entryElement.remove();
                         }
                    }
                });
             });
        }

        // --- Generate Resume Function ---
        /** Generates the HTML string for the resume preview. */
        function generateResumeHTML(data) {
            // Helper to process descriptions into bullet points
             const processDescription = (desc) => {
                if (!desc) return '';
                return desc.split(/[\n\*]/) // Split by newline or asterisk
                           .map(point => point.trim())
                           .filter(point => point.length > 0)
                           .map(point => `<li style="margin-bottom: 4pt; padding-left: 5pt;">${point}</li>`)
                           .join('');
            };

            // Format contact info line
            const contactItems = [
                `${data.city}, ${data.province}`,
                data.phone,
                data.email,
                data.linkedin ? `<a href="${data.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>` : null
            ].filter(Boolean);
            const contactInfo = contactItems.join('&nbsp;&nbsp;|&nbsp;&nbsp;');

            // Build sections HTML (using simplified structure for better PDF rendering)
            const experienceHTML = data.work_experience.map(exp => `
                <div class="experience-item" style="margin-bottom: 12pt;">
                    <div class="job-header">
                        <strong style="font-size: 11pt;">${exp.title || 'Job Title'}</strong>
                        <span style="font-size: 10pt; color: #555;">${exp.years || 'Years'}</span>
                    </div>
                    <div>
                        <em style="font-size: 10.5pt;">${exp.company || 'Company Name'}</em>
                        <span class="job-location"> - ${exp.city || 'City, Country'}</span>
                    </div>
                    <ul style="list-style-type: disc; margin: 5pt 0 0 20pt; padding: 0;">
                        ${processDescription(exp.description)}
                    </ul>
                </div>`).join('');

             const educationHTML = data.education.map(edu => `
                <div class="education-item" style="margin-bottom: 10pt;">
                     <div class="edu-header">
                         <strong style="font-size: 11pt;">${edu.degree || 'Degree/Program'}</strong>
                         <span style="font-size: 10pt; color: #555;">${edu.year || 'Year'}</span>
                     </div>
                     <div>
                         <em style="font-size: 10.5pt;">${edu.school || 'Institution Name'}</em>
                         <span class="edu-location"> - ${edu.city || 'City, Country'}</span>
                     </div>
                </div>`).join('');

            const skillsHTML = data.skills && data.skills.length > 0 ? `
                <div class="section skills-section">
                    <h2>Skills</h2>
                    <p class="skills-list">
                        ${data.skills.join(' &bull; ')}
                    </p>
                </div>` : '';

             const languagesHTML = data.languages && data.languages.length > 0 ? `
                <div class="section languages-section">
                    <h2>Languages</h2>
                    <p class="languages-list">
                       ${data.languages.map(lang => `${lang.name} (${lang.level})`).join(' &bull; ')}
                    </p>
                </div>` : '';

             const certificatesHTML = data.certificates && data.certificates.length > 0 ? `
                <div class="section certificates-section">
                    <h2>Certifications & Licenses</h2>
                     <ul class="certs-list">
                        ${data.certificates.map(cert => `
                            <li>
                                <strong>${cert.name || 'Certificate'}</strong> - ${cert.issuer || 'Issuer'} (${cert.year || 'Year'})
                            </li>
                        `).join('')}
                    </ul>
                </div>` : '';

            // Assemble the full resume HTML
            const fullResumeHTML = `
                <div> <div style="text-align: center; margin-bottom: 20pt;">
                        <h1>${data.full_name}</h1>
                        <p class="contact-info">${contactInfo}</p>
                    </div>

                    ${data.summary ? `
                    <div class="section summary-section">
                        <h2>Summary</h2>
                        <p>${data.summary.replace(/\n/g, '<br>')}</p>
                    </div>` : ''}

                    ${experienceHTML ? `
                    <div class="section experience-section">
                        <h2>Work Experience</h2>
                        ${experienceHTML}
                    </div>` : ''}

                    ${educationHTML ? `
                    <div class="section education-section">
                        <h2>Education</h2>
                        ${educationHTML}
                    </div>` : ''}

                    ${skillsHTML}

                     ${certificatesHTML}

                    ${languagesHTML}
                </div>`;

            // Sanitize the final HTML before returning
            // Allow basic formatting tags and style attributes needed for PDF generation
             return DOMPurify.sanitize(fullResumeHTML, {
                USE_PROFILES: { html: true },
                ADD_ATTR: ['style'], // Allow style attributes
                ADD_TAGS: ['strong', 'em', 'ul', 'li', 'br', 'table', 'tr', 'td', 'span', 'h1', 'h2', 'p', 'div'] // Allow necessary tags
            });
        }

        /** Displays the generated resume HTML in the preview area. */
        function displayPreview(resumeHtml) {
            resumePreviewContent.innerHTML = resumeHtml;
            previewSection.classList.remove('hidden');
             // Enable action buttons
             regenerateBtn.disabled = false;
             regenerateBtn.classList.remove('bg-gray-200', 'text-gray-500', 'cursor-not-allowed');
             regenerateBtn.classList.add('bg-gray-600', 'text-white', 'hover:bg-gray-700');

             downloadPdfBtn.disabled = false;
             downloadPdfBtn.classList.remove('bg-gray-200', 'text-gray-500', 'cursor-not-allowed');
             downloadPdfBtn.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-700');

            // Enable Cover Letter button
            const coverLetterBtn = document.getElementById('coverLetterBtn');
            if (coverLetterBtn) {
                coverLetterBtn.disabled = false;
                coverLetterBtn.classList.remove('text-blue-400', 'cursor-not-allowed');
                coverLetterBtn.classList.add('text-blue-700', 'hover:bg-blue-200');
            }

            // Show resume ready section
            const resumeReadySection = document.getElementById('resumeReadySection');
            if (resumeReadySection) {
                resumeReadySection.classList.remove('hidden');
            }

            previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // --- Elegant PDF Export (Refined per user feedback) ---
        async function downloadPDF() {
            if (!lastGeneratedData) {
                showError('Please generate a resume preview first.');
                return;
            }
            const doc = new jsPDF({ unit: 'pt', format: 'letter' });
            const margin = 48;
            let y = margin;
            const lineHeight = 22; // 1.5 spacing
            const sectionGap = 38;
            const entryGap = 18;
            const font = 'helvetica';
            const black = '#000000';
            const gray = '#444444';
            const pageWidth = doc.internal.pageSize.getWidth();
            // Name
            doc.setFont(font, 'normal');
            doc.setFontSize(28);
            doc.setTextColor(black);
            doc.text(lastGeneratedData.full_name || '', pageWidth / 2, y, { align: 'center' });
            y += lineHeight + 2;
            // Contact Info
            doc.setFont(font, 'normal');
            doc.setFontSize(11);
            doc.setTextColor(gray);
            const contactInfo = [
                lastGeneratedData.city + (lastGeneratedData.province ? ', ' + lastGeneratedData.province : ''),
                lastGeneratedData.phone,
                lastGeneratedData.email,
                lastGeneratedData.linkedin
            ].filter(Boolean).join(' | ');
            doc.text(contactInfo, pageWidth / 2, y, { align: 'center' });
            y += sectionGap;
            // Section helper
            function section(title) {
                y += 10;
                doc.setFont(font, 'bold');
                doc.setFontSize(16);
                doc.setTextColor(black);
                doc.text(title.toUpperCase(), margin, y);
                y += 4;
                doc.setDrawColor(black);
                doc.setLineWidth(1);
                doc.line(margin, y, pageWidth - margin, y);
                y += lineHeight - 4;
                doc.setFont(font, 'normal');
                doc.setFontSize(12);
                doc.setTextColor(black);
            }
            // Summary
            if (lastGeneratedData.summary) {
                section('Summary');
                doc.setFont(font, 'normal');
                doc.setFontSize(12);
                doc.setTextColor(black);
                doc.text(doc.splitTextToSize(lastGeneratedData.summary, pageWidth - 2 * margin), margin, y);
                y += sectionGap + 28;
            }
            // Experience
            if (lastGeneratedData.work_experience && lastGeneratedData.work_experience.length) {
                section('Experience');
                lastGeneratedData.work_experience.forEach(exp => {
                    // Title left, years right (years: normal, 12px)
                    doc.setFont(font, 'bold');
                    doc.setFontSize(14);
                    doc.setTextColor(black);
                    const title = exp.title || '';
                    const years = exp.years || '';
                    doc.text(title, margin, y);
                    if (years) {
                        doc.setFont(font, 'normal');
                        doc.setFontSize(12);
                        doc.text(years, pageWidth - margin, y, { align: 'right' });
                    }
                    y += lineHeight - 6;
                    // Company (bold) and city (normal) on same line
                    let companyLine = '';
                    if (exp.company) companyLine += exp.company;
                    if (exp.city) companyLine += (companyLine ? ' | ' : '') + exp.city;
                    if (companyLine) {
                        doc.setFont(font, 'bold');
                        doc.setFontSize(12);
                        doc.text(companyLine, margin, y);
                        y += lineHeight - 8;
                    }
                    // Bullets
                    if (exp.description) {
                        const bullets = exp.description.split(/\n|\*/).map(s => s.trim()).filter(Boolean);
                        doc.setFont(font, 'normal');
                        doc.setFontSize(11);
                        doc.setTextColor(black);
                        bullets.forEach(bullet => {
                            doc.text('• ' + bullet, margin + 16, y);
                            y += lineHeight - 8;
                        });
                    }
                    y += entryGap;
                });
                y += 2;
            }
            // Education
            if (lastGeneratedData.education && lastGeneratedData.education.length) {
                section('Education');
                lastGeneratedData.education.forEach(edu => {
                    // Degree left (14px normal), year right (12px normal)
                    doc.setFont(font, 'normal');
                    doc.setFontSize(14);
                    doc.setTextColor(black);
                    const degree = edu.degree || '';
                    const year = edu.year || '';
                    doc.text(degree, margin, y);
                    if (year) {
                        doc.setFont(font, 'normal');
                        doc.setFontSize(12);
                        doc.text(year, pageWidth - margin, y, { align: 'right' });
                    }
                    y += lineHeight - 6;
                    // School + city (12px normal)
                    let schoolLine = '';
                    if (edu.school) schoolLine += edu.school;
                    if (edu.city) schoolLine += (schoolLine ? ' | ' : '') + edu.city;
                    if (schoolLine) {
                        doc.setFont(font, 'normal');
                        doc.setFontSize(12);
                        doc.text(schoolLine, margin, y);
                        y += lineHeight - 8;
                    }
                    y += entryGap;
                });
                y += 2;
            }
            // Skills
            if (lastGeneratedData.skills && lastGeneratedData.skills.length) {
                section('Skills');
                doc.setFont(font, 'normal');
                doc.setFontSize(12);
                // Wrap skills text
                const skillsText = lastGeneratedData.skills.join(' • ');
                const wrappedSkills = doc.splitTextToSize(skillsText, pageWidth - 2 * margin);
                doc.text(wrappedSkills, margin, y);
                y += wrappedSkills.length * (lineHeight - 8) + 8;
                y += 8;
            }
            // Languages
            if (lastGeneratedData.languages && lastGeneratedData.languages.length) {
                section('Languages');
                doc.setFont(font, 'normal');
                doc.setFontSize(12);
                doc.text(lastGeneratedData.languages.map(l => l.name + (l.level ? ' (' + l.level + ')' : '')).join(', '), margin, y);
                y += sectionGap - 10;
            }
            // Certificates
            if (lastGeneratedData.certificates && lastGeneratedData.certificates.length) {
                section('Certificates');
                lastGeneratedData.certificates.forEach(cert => {
                    // Name left (14px normal, not bold), year right (12px normal)
                    doc.setFont(font, 'normal');
                    doc.setFontSize(14);
                    doc.setTextColor(black);
                    const certName = cert.name || '';
                    const certYear = cert.year || '';
                    doc.text(certName, margin, y);
                    if (certYear) {
                        doc.setFont(font, 'normal');
                        doc.setFontSize(12);
                        doc.text(certYear, pageWidth - margin, y, { align: 'right' });
                    }
                    y += lineHeight - 6;
                    // Issuer (12px normal, not bold)
                    if (cert.issuer) {
                        doc.setFont(font, 'normal');
                        doc.setFontSize(12);
                        doc.text(cert.issuer, margin, y);
                        y += lineHeight - 8;
                    }
                    y += entryGap;
                });
            }
            // Save
            doc.save(`${lastGeneratedData?.full_name?.replace(/\s+/g, '_') || 'resume'}.pdf`);
        }


        // --- Form Submission Handler ---
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            clearError();

            if (!form.checkValidity()) {
                showError('Please fill out all required fields (*). Check formats (e.g., Year).');
                form.reportValidity();
                return;
            }

            generateButton.disabled = true;
            generateButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating...';

            try {
                 lastGeneratedData = {
                    full_name: form.fullName.value.trim(),
                    email: form.email.value.trim(),
                    phone: form.phone.value.trim(),
                    linkedin: form.linkedin.value.trim(),
                    city: form.city.value.trim(),
                    province: form.province.value,
                    summary: form.summary.value.trim(),
                    work_experience: Array.from(experienceEntries.querySelectorAll('.experience-entry')).map(entry => ({
                        title: entry.querySelector('[name="expJobTitle[]"]').value.trim(),
                        company: entry.querySelector('[name="expCompany[]"]').value.trim(),
                        city: entry.querySelector('[name="expCity[]"]').value.trim(),
                        years: entry.querySelector('[name="expYears[]"]').value.trim(),
                        description: entry.querySelector('[name="expDesc[]"]').value.trim()
                    })).filter(exp => exp.title && exp.company),
                     education: Array.from(educationEntries.querySelectorAll('.education-entry')).map(entry => ({
                        degree: entry.querySelector('[name="eduDegree[]"]').value.trim(),
                        school: entry.querySelector('[name="eduSchool[]"]').value.trim(),
                        city: entry.querySelector('[name="eduCity[]"]').value.trim(),
                        year: entry.querySelector('[name="eduYear[]"]').value.trim()
                    })).filter(edu => edu.degree && edu.school),
                    skills: form.skills.value.split(',').map(skill => skill.trim()).filter(Boolean),
                    languages: Array.from(languageEntries.querySelectorAll('.language-entry')).map(entry => ({
                        name: entry.querySelector('[name="langName[]"]').value.trim(),
                        level: entry.querySelector('[name="langLevel[]"]').value
                    })).filter(lang => lang.name && lang.level),
                    certificates: Array.from(certificateEntries.querySelectorAll('.certificate-entry')).map(entry => ({
                        name: entry.querySelector('[name="certName[]"]').value.trim(),
                        issuer: entry.querySelector('[name="certIssuer[]"]').value.trim(),
                        year: entry.querySelector('[name="certYear[]"]').value.trim()
                    })).filter(cert => cert.name) // Only require name for cert
                };

                const resumeHtml = generateResumeHTML(lastGeneratedData);
                displayPreview(resumeHtml);

            } catch (error) {
                console.error('Error generating resume:', error);
                showError('Sorry, there was an error generating your resume. Please check your inputs and try again.');
            } finally {
                generateButton.disabled = false;
                generateButton.innerHTML = 'Generate My Resume Preview';
            }
        });

        // --- Other Event Listeners ---
        document.addEventListener('DOMContentLoaded', () => {
            setupAddRemoveListeners(); // Setup add/remove for dynamic sections

            fillDummyDataBtn.addEventListener('click', fillDummyData);

            regenerateBtn.addEventListener('click', () => {
                 if (lastGeneratedData) {
                     form.dispatchEvent(new Event('submit', { cancelable: true }));
                 } else {
                     showError("Please generate a resume first before regenerating.");
                 }
            });
            downloadPdfBtn.addEventListener('click', downloadPDF);
        });

        // --- Fill Dummy Data Function ---
        function fillDummyData() {
            clearError();
            form.reset();
            [experienceEntries, educationEntries, certificateEntries, languageEntries].forEach(container => {
                const firstEntry = container.firstElementChild;
                while (container.children.length > 1) { container.removeChild(container.lastChild); }
                firstEntry?.querySelectorAll('input, textarea, select').forEach(input => input.value = '');
            });

            form.fullName.value = "Alex Chen";
            form.email.value = "alex.chen.dev@email.com";
            form.phone.value = "416-555-1234";
            form.linkedin.value = "https://linkedin.com/in/alexchendev";
            form.city.value = "Toronto";
            form.province.value = "ON";
            form.summary.value = "Results-oriented Project Coordinator with 4+ years of experience managing software development projects in agile environments. Proven ability to deliver projects on time and within budget. Seeking to leverage strong organizational and communication skills in a challenging Project Manager role.";

            const firstExp = experienceEntries.firstElementChild;
            firstExp.querySelector('[name="expJobTitle[]"]').value = "Project Coordinator";
            firstExp.querySelector('[name="expCompany[]"]').value = "Innovatech Solutions";
            firstExp.querySelector('[name="expCity[]"]').value = "Toronto, ON";
            firstExp.querySelector('[name="expYears[]"]').value = "2021-Present";
            firstExp.querySelector('[name="expDesc[]"]').value = "* Coordinated project activities for 5+ software projects simultaneously.\n* Managed project timelines, resources, and budgets using Jira and Confluence.\n* Facilitated daily stand-ups and sprint planning meetings.\n* Improved team communication efficiency by 15% by implementing new reporting methods.";
            addExperienceBtn.click();
            const secondExp = experienceEntries.lastElementChild;
            secondExp.querySelector('[name="expJobTitle[]"]').value = "Project Assistant";
            secondExp.querySelector('[name="expCompany[]"]').value = "Tech Gadgets Ltd.";
            secondExp.querySelector('[name="expCity[]"]').value = "Mississauga, ON";
            secondExp.querySelector('[name="expYears[]"]').value = "2019-2021";
            secondExp.querySelector('[name="expDesc[]"]').value = "* Supported Project Managers with scheduling and documentation.\n* Prepared project status reports and presentations.\n* Assisted in tracking project milestones and deliverables.";

            const firstEdu = educationEntries.firstElementChild;
            firstEdu.querySelector('[name="eduDegree[]"]').value = "Bachelor of Business Administration";
            firstEdu.querySelector('[name="eduSchool[]"]').value = "York University";
            firstEdu.querySelector('[name="eduCity[]"]').value = "Toronto, ON";
            firstEdu.querySelector('[name="eduYear[]"]').value = "2019";
            addEducationBtn.click();
            const secondEdu = educationEntries.lastElementChild;
            secondEdu.querySelector('[name="eduDegree[]"]').value = "Project Management Certificate";
            secondEdu.querySelector('[name="eduSchool[]"]').value = "Centennial College";
            secondEdu.querySelector('[name="eduCity[]"]').value = "Toronto, ON";
            secondEdu.querySelector('[name="eduYear[]"]').value = "2020";

            form.skills.value = "Project Coordination, Agile Methodologies, Scrum, Jira, Confluence, Risk Management, Budget Tracking, Stakeholder Communication, Microsoft Office Suite, Team Collaboration";

            addLanguageBtn.click();
            const firstLang = languageEntries.firstElementChild;
            firstLang.querySelector('[name="langName[]"]').value = "English";
            firstLang.querySelector('[name="langLevel[]"]').value = "Fluent";
            addLanguageBtn.click();
            const secondLang = languageEntries.lastElementChild;
            secondLang.querySelector('[name="langName[]"]').value = "Mandarin";
            secondLang.querySelector('[name="langLevel[]"]').value = "Native";

            addCertificateBtn.click();
            const firstCert = certificateEntries.firstElementChild;
            firstCert.querySelector('[name="certName[]"]').value = "Certified Associate in Project Management (CAPM)";
            firstCert.querySelector('[name="certIssuer[]"]').value = "Project Management Institute (PMI)";
            firstCert.querySelector('[name="certYear[]"]').value = "2021";

            resultsDiv.classList.add('hidden');
            previewSection.classList.add('hidden');
        }

    