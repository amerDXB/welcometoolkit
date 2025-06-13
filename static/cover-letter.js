// State management
let lastGeneratedLetter = null;

// DOM Elements
const coverLetterForm = document.getElementById('coverLetterForm');
const coverLetterPreview = document.getElementById('coverLetterPreview');
const downloadLetterBtn = document.getElementById('downloadLetterBtn');
const copyLetterBtn = document.getElementById('copyLetterBtn');

// Simple HTML sanitizer fallback
function simpleSanitize(html) {
    if (typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(html);
    }
    // Basic sanitization if DOMPurify is not available
    return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
              .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
              .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
              .replace(/javascript:/gi, '');
}

// Initialize the form
document.addEventListener('DOMContentLoaded', () => {
    // Load resume data if available
    const resumeData = JSON.parse(localStorage.getItem('resumeData') || '{}');
    if (resumeData.job_title) {
        coverLetterForm.job_title.value = resumeData.job_title;
    }

    // Enable buttons initially
    downloadLetterBtn.disabled = false;
    downloadLetterBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    copyLetterBtn.disabled = false;
    copyLetterBtn.classList.remove('opacity-50', 'cursor-not-allowed');
});

// Format today's date
function formatDate() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    return `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
}

// Generate cover letter content
function generateCoverLetter(data) {
    // Get resume data
    const resumeData = JSON.parse(localStorage.getItem('resumeData') || '{}');
    const fullName = resumeData.full_name || '[Your Name]';

    const template = `
        <div style="background-color: #ffffff; padding: 40pt; font-family: Calibri, Arial, sans-serif; color: #333333; font-size: 10pt; line-height: 1.4; max-width: 612pt; margin: auto;">
            <div style="text-align: right; margin-bottom: 25pt; color: #666;">
                ${formatDate()}
            </div>

            <div style="margin-bottom: 20pt;">
                Dear Hiring Manager,
            </div>

            <div style="margin-bottom: 20pt;">
                I am writing to express my interest in the position of ${data.job_title} at ${data.company_name}. 
                ${data.custom_note ? `\n${data.custom_note}` : ''}
            </div>

            <div style="margin-bottom: 20pt;">
                I would be thrilled to bring my experience to ${data.company_name} and contribute to your success. 
                Thank you for considering my application.
            </div>

            <div style="margin-top: 30pt;">
                Sincerely,<br>
                ${fullName}
            </div>
        </div>
    `;

    return simpleSanitize(template);
}

// Generate cover letter
coverLetterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    try {
        const formData = {
            company_name: coverLetterForm.company_name.value,
            job_title: coverLetterForm.job_title.value,
            custom_note: coverLetterForm.custom_note.value
        };

        const coverLetter = generateCoverLetter(formData);
        coverLetterPreview.innerHTML = coverLetter;
        coverLetterPreview.classList.remove('hidden');
        lastGeneratedLetter = coverLetter;
    } catch (error) {
        console.error('Error generating cover letter:', error);
        alert('There was an error generating your cover letter. Please try again.');
    }
});

// Download cover letter
downloadLetterBtn.addEventListener('click', () => {
    if (!lastGeneratedLetter) {
        alert('Please generate a cover letter first.');
        return;
    }
    
    const element = document.createElement('a');
    const file = new Blob([coverLetterPreview.innerText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'cover-letter.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
});

// Copy cover letter
copyLetterBtn.addEventListener('click', () => {
    if (!lastGeneratedLetter) {
        alert('Please generate a cover letter first.');
        return;
    }
    
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = coverLetterPreview.innerText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    
    alert('Cover letter copied to clipboard!');
}); 