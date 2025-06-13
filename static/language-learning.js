// --- Language Resource Data ---
// Data is illustrative and needs verification/expansion. Links can change.
const languageResources = {
    // General resources applicable everywhere
    general: {
        onlinePlatforms: [
            { name: "Duolingo", link: "https://www.duolingo.com/", desc: "Popular free app for learning basics of many languages, including English & French.", type: "App/Website (Free/Paid)" },
            { name: "CBC Curio / Radio-Canada Mauril", link: "https://mauril.ca/", desc: "Free platform using CBC/Radio-Canada content to learn English and French.", type: "App/Website (Free)" },
            { name: "Babbel", link: "https://www.babbel.com/", desc: "Subscription-based platform focusing on conversational skills.", type: "App/Website (Paid)" },
            { name: "italki", link: "https://www.italki.com/", desc: "Connects learners with tutors for online lessons (various prices).", type: "Platform (Paid Tutors)" },
            { name: "YouTube Channels", link: "#", desc: "Search for channels dedicated to 'Learn English for Beginners', 'Learn French Conversation', etc.", type: "Video (Free)" },
            { name: "Government of Canada - Language Portal", link: "https://www.noslangues-ourlanguages.gc.ca/en/index", desc: "Resources for writing, grammar, and terminology in English and French.", type: "Website (Free)" }
        ],
        community: [
            { name: "Local Public Libraries", link: "#", desc: "Often offer free ESL/FSL books, software (like Mango Languages), conversation circles, and internet access. Check your local library's website.", type: "In-Person/Online" },
            { name: "Newcomer Settlement Agencies", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/organizations.html", desc: "Many offer language support, referrals to classes, and conversation groups. Find one near you.", type: "In-Person/Online" },
            { name: "Community Centres", link: "#", desc: "Some community centres host informal language practice groups or classes. Check local listings.", type: "In-Person" },
            { name: "Meetup.com / Eventbrite", link: "https://www.meetup.com/", desc: "Search for local language exchange or practice groups in your city.", type: "In-Person/Online" }
        ],
        languageExchange: [
            { name: "Tandem", link: "https://www.tandem.net/", desc: "App connecting language learners worldwide for practice via text, voice, video.", type: "App (Free/Paid)" },
            { name: "HelloTalk", link: "https://www.hellotalk.com/", desc: "Another popular app for finding language exchange partners.", type: "App (Free/Paid)" }
        ],
        learningTips: [
            "<strong>Practice Daily:</strong> Even 15-30 minutes helps build consistency.",
            "<strong>Immerse Yourself:</strong> Listen to Canadian radio/TV, read local news, label items around your home.",
            "<strong>Speak Often:</strong> Don't be afraid to make mistakes! Talk to neighbours, cashiers, colleagues.",
            "<strong>Focus on Goals:</strong> Learn vocabulary relevant to your job, daily life, or interests.",
            "<strong>Use Multiple Resources:</strong> Combine apps, classes, conversation practice, and media.",
            "<strong>Be Patient:</strong> Language learning takes time and effort."
        ]
    },
    // Province-specific government-funded programs (mainly LINC/CLIC info)
    // Eligibility for LINC/CLIC: Permanent Residents, Protected Persons (Refugees). Not usually for temporary residents or citizens.
    provincial: {
        AB: { programs: [{ name: "LINC / CLIC Programs (Alberta)", link: "https://www.alberta.ca/language-training-for-newcomers", eligibility: "PRs/Refugees" }] },
        BC: { programs: [{ name: "LINC / CLIC Programs (British Columbia)", link: "https://www.welcomebc.ca/Choose-B-C/Learn-English", eligibility: "PRs/Refugees" }] },
        MB: { programs: [{ name: "LINC / CLIC Programs (Manitoba)", link: "https://immigratemanitoba.com/live/english-language-training/", eligibility: "PRs/Refugees" }] },
        NB: { programs: [{ name: "LINC / CLIC Programs (New Brunswick)", link: "https://www.welcomenb.ca/content/wel-bien/en/living/language_training.html", eligibility: "PRs/Refugees" }] },
        NL: { programs: [{ name: "LINC / CLIC Programs (Newfoundland & Labrador)", link: "https://www.gov.nl.ca/ip/settlement-services/language-training/", eligibility: "PRs/Refugees" }] },
        NT: { programs: [{ name: "Language Training (Northwest Territories)", link: "https://www.ece.gov.nt.ca/en/services/adult-literacy-and-language-training", eligibility: "Check website" }] },
        NS: { programs: [{ name: "LINC / CLIC Programs (Nova Scotia - ISANS)", link: "https://isans.ca/learn-english/", eligibility: "PRs/Refugees" }] },
        NU: { programs: [{ name: "Language Training (Nunavut)", link: "https://www.gov.nu.ca/family-services/information/adult-learning-and-training-supports-lts", eligibility: "Check website" }] },
        ON: { programs: [{ name: "LINC / CLIC Programs (Ontario)", link: "https://www.ontario.ca/page/language-training-english-and-french", eligibility: "PRs/Refugees" }, { name: "ESL/FSL for Adults (School Boards)", link: "https://www.ontario.ca/page/adult-learning-ontario-ministry-labour-immigration-training-skills-development", eligibility: "Varies" }] },
        PE: { programs: [{ name: "LINC / CLIC Programs (Prince Edward Island - IRSA)", link: "https://www.irsapei.ca/en/learning-english-and-french", eligibility: "PRs/Refugees" }] },
        QC: { programs: [{ name: "Francisation Québec (French Courses)", link: "https://www.quebec.ca/en/education/learn-french", eligibility: "Wide eligibility, check site" }, { name: "English Courses (Limited Availability)", link: "https://www.quebec.ca/en/education/learn-english", eligibility: "Check site" }] },
        SK: { programs: [{ name: "LINC / CLIC Programs (Saskatchewan)", link: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/language-training-and-support", eligibility: "PRs/Refugees" }] },
        YT: { programs: [{ name: "Language Training (Yukon)", link: "https://yukon.ca/en/learn-english-or-french", eligibility: "Check website" }] }
    }
};

// --- DOM Elements ---
const form = document.getElementById('languageForm');
const provinceSelect = document.getElementById('province');
const resultsDiv = document.getElementById('results');
const errorContainer = document.getElementById('errorContainer');
const findResourcesButton = document.getElementById('findResourcesButton');

// --- Helper Functions ---
function clearError() { errorContainer.innerHTML = ''; }
function showError(message) {
    errorContainer.innerHTML = `<div class="error-box"><p><i class="fas fa-exclamation-circle mr-2"></i>${message}</p></div>`;
    resultsDiv.innerHTML = ''; // Clear results on error
    resultsDiv.classList.add('hidden');
    errorContainer.scrollIntoView({ behavior: 'smooth' });
}

function createResourceListItem(item) {
     let linkHTML = item.link && item.link !== "#"
        ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.name}<i class="fas fa-external-link-alt link-icon"></i></a>`
        : `<strong>${item.name}</strong>`;

     let typeHTML = item.type ? `<span class="text-xs text-gray-500 ml-2">(${item.type})</span>` : '';
     let eligibilityHTML = item.eligibility ? `<p class="text-xs text-blue-700 mt-1">Eligibility: ${item.eligibility}</p>` : '';

     return `
        <li>
            <span class="resource-icon"><i class="fas fa-check-circle"></i></span>
            <div>
                ${linkHTML} ${typeHTML}
                <p class="text-sm mt-1">${item.desc}</p>
                ${eligibilityHTML}
            </div>
        </li>`;
}

function createTipsListItem(tipHTML) {
     return `
        <li>
            <span class="resource-icon text-yellow-500"><i class="fas fa-lightbulb"></i></span>
            <div>${tipHTML}</div>
        </li>`;
}

function createResultSection(title, iconClass, contentHTML) {
     const section = document.createElement('div');
     section.className = 'resource-section';
     section.innerHTML = `
        <h3><i class="fas ${iconClass}"></i>${title}</h3>
        <div>${contentHTML}</div>
     `;
     return section;
}

// --- Main Display Logic ---
function displayLanguageResources(provinceCode) {
    clearError();
    resultsDiv.innerHTML = ''; // Clear previous results
    resultsDiv.classList.add('hidden'); // Hide initially

    const provData = languageResources.provincial[provinceCode];
    const generalData = languageResources.general;

    if (!provData) {
        showError(`Resource data for province code "${provinceCode}" not found.`);
        return;
    }

    // 1. Government Programs Section
    let govHTML = `<p>Government-funded programs like LINC (English) and CLIC (French) offer free language classes to eligible Permanent Residents and Protected Persons. Assessment is usually required first.</p><ul>`;
    if (provData.programs && provData.programs.length > 0) {
        provData.programs.forEach(prog => {
            govHTML += createResourceListItem(prog);
        });
    } else {
         govHTML += `<li>No specific provincial programs listed here. Check the main LINC/CLIC links via settlement agencies.</li>`;
    }
     govHTML += `<li>${createResourceListItem({ name: "Find LINC/CLIC Assessment Centres & Classes (via IRCC)", link: "https://www.canada.ca/en/immigration-refugees-citizenship/services/new-immigrants/prepare-life-canada/learn-english-french/classes.html", desc: "Official portal to find government-funded language classes.", eligibility: "PRs/Refugees" })}</li>`;
    govHTML += '</ul>';
    resultsDiv.appendChild(createResultSection("Government Language Programs", "fa-landmark-flag text-red-500", govHTML));

    // 2. Online Platforms & Apps
    let onlineHTML = '<ul>';
    generalData.onlinePlatforms.forEach(item => onlineHTML += createResourceListItem(item));
    onlineHTML += '</ul>';
    resultsDiv.appendChild(createResultSection("Online Tools & Apps", "fa-laptop-code text-blue-500", onlineHTML));

    // 3. Community Resources & Libraries
    let communityHTML = '<ul>';
    generalData.community.forEach(item => communityHTML += createResourceListItem(item));
    communityHTML += '</ul>';
    resultsDiv.appendChild(createResultSection("Community Programs & Libraries", "fa-users text-purple-500", communityHTML));

    // 4. Language Exchange Partners
    let exchangeHTML = '<ul>';
    generalData.languageExchange.forEach(item => exchangeHTML += createResourceListItem(item));
    exchangeHTML += '</ul>';
    resultsDiv.appendChild(createResultSection("Language Exchange Partners", "fa-comments text-indigo-500", exchangeHTML));

    // 5. General Learning Tips
    let tipsHTML = '<ul>';
    generalData.learningTips.forEach(tip => tipsHTML += createTipsListItem(tip));
    tipsHTML += '</ul>';
    resultsDiv.appendChild(createResultSection("Tips for Effective Learning", "fa-lightbulb text-yellow-500", tipsHTML));

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
        // const language = languageSelect.value; // For future filtering

        if (!province) {
            showError('Please select a province or territory.');
            return;
        }

        try {
            displayLanguageResources(province);
        } catch (error) {
             console.error("Display Error:", error);
             showError("An error occurred while retrieving language resources.");
        }
    });

     // Hide results if province changes
     provinceSelect.addEventListener('change', () => {
         resultsDiv.classList.add('hidden');
         clearError();
     });
}); 