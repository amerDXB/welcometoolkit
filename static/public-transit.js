// --- Transit data ---
// Data is illustrative and needs regular verification with official sources.
const transitData = {
    "Toronto": {
        system: "TTC",
        zones: ["Single Zone"], // Simplified for base fare
        fares: { // Assumes Presto card fare
            "Adult": { "Single Zone": 3.30 },
            "Youth/Student": { "Single Zone": 2.35 }, // TTC uses Youth 13-19
            "Senior": { "Single Zone": 2.25 },
            "Child": { "Single Zone": 0.00 } // Children 12 and under ride free
        },
        card: {
            name: "PRESTO Card",
            cost: "$6 (one-time fee)",
            buyAt: "Shoppers Drug Mart, Fare Vending Machines in stations, TTC Customer Service Centre, online",
            reload: "Online (prestocard.ca), Fare Vending Machines, Shoppers Drug Mart, Customer Service Centres",
            discounts: ["Youth (13-19)", "Post-Secondary Students (Monthly Pass)", "Seniors (65+)"] ,
            learnMore: "https://www.ttc.ca/Fares-and-passes/PRESTO" // Updated link
        },
        plannerLink: "https://www.ttc.ca/trip-planner",
        transferInfo: "2-hour transfer window included with PRESTO tap.",
        monthlyPassInfo: "Monthly passes available on PRESTO.",
        accessibilityLink: "https://www.ttc.ca/accessibility"
    },
    "Vancouver": {
        system: "TransLink",
        zones: ["Zone 1", "Zone 2", "Zone 3"], // Weekdays before 6:30 PM
        fares: { // Assumes Compass card fare
            "Adult": { "Zone 1": 2.55, "Zone 2": 3.75, "Zone 3": 4.80 }, // Stored value fares
            "Youth/Student": { "Zone 1": 2.10, "Zone 2": 3.10, "Zone 3": 4.15 }, // Concession fares (Youth 14-18, Seniors 65+)
            "Senior": { "Zone 1": 2.10, "Zone 2": 3.10, "Zone 3": 4.15 },
            "Child": { "Zone 1": 0.00, "Zone 2": 0.00, "Zone 3": 0.00 } // Children 12 and under ride free
        },
        card: {
            name: "Compass Card",
            cost: "$6 (refundable deposit)",
            buyAt: "Compass Vending Machines (stations), online, London Drugs, Customer Service Centres",
            reload: "Online (compasscard.ca), Vending Machines, by phone, Customer Service Centres",
            discounts: ["Youth (14-18)", "Seniors (65+)", "HandyDART users", "BC Bus Pass Program (Low Income Seniors/Disability)"],
            learnMore: "https://www.translink.ca/transit-fares/compass-card"
        },
        plannerLink: "https://www.translink.ca/trip-planner",
        transferInfo: "90-minute transfer window included with Compass tap.",
        monthlyPassInfo: "Monthly passes available loaded onto Compass Card.",
        accessibilityLink: "https://www.translink.ca/rider-guide/accessibility"
    },
    "Montreal": {
        system: "STM",
        zones: ["Zone A (Island)"], // Simplified - ARTM zones exist but base fare covers island
        fares: { // Assumes OPUS card fare, 1-trip
            "Adult": { "Zone A (Island)": 3.75 }, // Price for 1 trip
            "Youth/Student": { "Zone A (Island)": 2.75 }, // Reduced fare 6-17, 18+ students
            "Senior": { "Zone A (Island)": 2.75 }, // Reduced fare 65+
            "Child": { "Zone A (Island)": 0.00 } // Free for ages 6-11 with photo OPUS
        },
        card: {
            name: "OPUS Card",
            cost: "$6 (for card with photo, required for reduced fares)",
            buyAt: "Metro stations, authorized retailers, online (for some passes)",
            reload: "Metro stations, authorized retailers, online (for some passes)",
            discounts: ["Children (6-11, free with photo card)", "Youth (12-17)", "Students (18+)", "Seniors (65+)"] ,
            learnMore: "https://www.stm.info/en/info/fares/opus-cards-and-other-fare-media/opus-card" // Updated link
        },
        plannerLink: "https://www.stm.info/en/info/routes-and-schedules", // Updated link
        transferInfo: "120-minute transfer window included.",
        monthlyPassInfo: "Monthly passes available for different zones/groups.",
        accessibilityLink: "https://www.stm.info/en/info/accessibility"
    },
    "Calgary": {
        system: "Calgary Transit",
        zones: ["Single Zone"],
        fares: { // Ticket/My Fare App price
            "Adult": { "Single Zone": 3.60 },
            "Youth/Student": { "Single Zone": 2.45 }, // Youth 6-17
            "Senior": { "Single Zone": 2.45 }, // Senior 65+ (Low income seniors may have cheaper pass)
            "Child": { "Single Zone": 0.00 } // Children 5 and under ride free
        },
        card: {
            name: "My Fare (App) / Tickets / Pass", // No single reloadable card like others
            cost: "App is free, physical passes vary",
            buyAt: "My Fare app, Ticket Vending Machines (stations), convenience stores, online (passes)",
            reload: "App (credit/debit), TVMs, retailers (passes)",
            discounts: ["Youth (6-17)", "Seniors (65+)", "Low Income Passes"],
            learnMore: "https://www.calgarytransit.com/content/transit/en/home/fares---passes.html" // Updated link
        },
        plannerLink: "https://www.calgarytransit.com/plan-a-trip", // Updated link
        transferInfo: "90-minute transfer window included with fare payment.",
        monthlyPassInfo: "Monthly passes available.",
        accessibilityLink: "https://www.calgarytransit.com/content/transit/en/home/rider-information/accessibility.html"
    },
    "Ottawa": {
        system: "OC Transpo",
        zones: ["Single Zone"],
        fares: { // Assumes Presto card fare
            "Adult": { "Single Zone": 3.75 }, // Tap fare
            "Youth/Student": { "Single Zone": 3.75 }, // No general youth discount on single fares, pass needed
            "Senior": { "Single Zone": 2.85 }, // Weekdays 6am-4:30pm & Sat/Sun/Holidays (Free Wed/Sun for 65+)
            "Child": { "Single Zone": 0.00 } // Children 7 and under ride free
        },
        card: {
            name: "PRESTO Card",
            cost: "$4 (one-time fee)",
            buyAt: "OC Transpo Customer Service Centres, Ticket Machines, Shoppers Drug Mart, online",
            reload: "Online (prestocard.ca), Ticket Machines, Shoppers Drug Mart, Customer Service Centres",
            discounts: ["Youth (Pass only)", "Seniors (65+)", "Community Pass (Low Income)", "Access Pass (Disability)"],
            learnMore: "https://www.octranspo.com/en/fares/payment/presto/" // Updated link
        },
        plannerLink: "https://www.octranspo.com/en/plan-your-trip/travel-planner/", // Updated link
        transferInfo: "Transfer window depends on time of day (e.g., 90-105 mins).",
        monthlyPassInfo: "Monthly passes available on PRESTO.",
        accessibilityLink: "https://www.octranspo.com/en/accessibility/"
    },
    "Halifax": {
        system: "Halifax Transit",
        zones: ["Single Zone"],
        fares: { // Cash fare listed, tickets/passes cheaper
            "Adult": { "Single Zone": 2.75 },
            "Youth/Student": { "Single Zone": 2.00 }, // Student ID may be required
            "Senior": { "Single Zone": 2.00 }, // Senior 65+
            "Child": { "Single Zone": 0.00 } // Children 12 and under ride free
        },
        card: {
            name: "Tickets / Monthly Pass", // No universal smart card yet
            cost: "N/A (Tickets sold in sheets, passes vary)",
            buyAt: "Ticket/pass retailers (list on website), Ferry Terminals",
            reload: "N/A (Buy new tickets/passes)",
            discounts: ["Youth/Student", "Seniors (65+)", "Low Income Bus Pass Program"],
            learnMore: "https://www.halifax.ca/transportation/halifax-transit/fares-tickets-passes" // Updated link
        },
        plannerLink: "https://www.halifax.ca/transportation/halifax-transit/plan-your-trip",
        transferInfo: "Transfers valid for 90 minutes, ask driver for paper transfer if paying cash.",
        monthlyPassInfo: "Monthly passes available.",
        accessibilityLink: "https://www.halifax.ca/transportation/halifax-transit/accessibility"
    },
     "Edmonton": {
        system: "ETS",
        zones: ["Single Zone"],
        fares: { // Assumes Arc card tap fare
            "Adult": { "Single Zone": 2.75 },
            "Youth/Student": { "Single Zone": 2.75 }, // No discount on single tap, pass needed
            "Senior": { "Single Zone": 2.75 }, // No discount on single tap, pass needed
            "Child": { "Single Zone": 0.00 } // Children 12 and under ride free
        },
        card: {
            name: "Arc Card",
            cost: "$6 (one-time fee)",
            buyAt: "Arc Vending Machines, ETS Service Centre, participating retailers, online",
            reload: "Online (myarc.ca), Arc Vending Machines, ETS Service Centre, retailers",
            discounts: ["Youth (Pass only)", "Students (U-Pass)", "Seniors (Annual Pass)", "Low Income Pass"],
            learnMore: "https://www.edmonton.ca/ets/arc-card"
        },
        plannerLink: "https://www.edmonton.ca/ets/trip-planner",
        transferInfo: "90-minute transfer window included with Arc tap.",
        monthlyPassInfo: "Monthly capping feature on Arc card acts like a pass.",
        accessibilityLink: "https://www.edmonton.ca/ets/accessibility"
    },
    "Winnipeg": {
        system: "Winnipeg Transit",
        zones: ["Single Zone"],
        fares: { // Assumes Peggo card e-fare
            "Adult": { "Single Zone": 2.80 }, // e-fare price
            "Youth/Student": { "Single Zone": 2.25 }, // Youth 6-16 / Student 17-21
            "Senior": { "Single Zone": 1.40 }, // Senior 65+
            "Child": { "Single Zone": 0.00 } // Children 5 and under ride free
        },
        card: {
            name: "Peggo Card",
            cost: "$5 (one-time fee)",
            buyAt: "Transit Customer Service Centres, 7-Eleven, Shoppers Drug Mart, online",
            reload: "Online (winnipegtransit.com), by phone, retailers, Customer Service Centres",
            discounts: ["Youth (6-16)", "Post-Secondary Students", "Seniors (65+)"] ,
            learnMore: "https://info.winnipegtransit.com/en/fares/peggo"
        },
        plannerLink: "https://winnipegtransit.com/en/navigo",
        transferInfo: "75-minute transfer window included with Peggo tap.",
        monthlyPassInfo: "Monthly passes available loaded onto Peggo card.",
        accessibilityLink: "https://info.winnipegtransit.com/en/rider-guide/accessible-transit-service"
    }
};

// --- DOM Elements ---
const citySelect = document.getElementById('city');
const zoneSelect = document.getElementById('zone');
const riderTypeSelect = document.getElementById('riderType');
const calculateFareBtn = document.getElementById('calculateFare');
const fareResultDiv = document.getElementById('fareResult');
const fareAmountSpan = document.getElementById('fareAmount');
const fareDetailsP = document.getElementById('fareDetails');
const cardNameP = document.getElementById('cardName');
const cardCostP = document.getElementById('cardCost'); // Added
const buyLocationP = document.getElementById('buyLocation');
const reloadOptionsP = document.getElementById('reloadOptions');
const discountsUl = document.getElementById('discounts');
const learnMoreLink = document.getElementById('learnMoreLink');
const plannerLink = document.getElementById('plannerLink');
const transitDetailsContainer = document.getElementById('transitDetailsContainer');
const initialPrompt = document.getElementById('initialPrompt');
// Added elements for new sections/notes
const farePaymentNoteP = document.getElementById('farePaymentNote');
const transferInfoTextSpan = document.getElementById('transferInfoText');
const monthlyPassInfoTextSpan = document.getElementById('monthlyPassInfoText');
const transitSystemNameSpan = document.getElementById('transitSystemName');
const accessibilityInfoP = document.getElementById('accessibilityInfo');
const accessibilityLinkA = document.getElementById('accessibilityLink');
const etiquetteListUl = document.getElementById('etiquetteList'); // Assuming general etiquette is fine

// --- Functions ---

/** Toggles the visibility of main content sections. */
function toggleContentVisibility(show) {
    const sections = transitDetailsContainer.querySelectorAll('.info-section');
    if (show) {
        initialPrompt.classList.add('hidden');
        sections.forEach(section => section.classList.add('visible'));
    } else {
        initialPrompt.classList.remove('hidden');
         sections.forEach(section => section.classList.remove('visible'));
    }
}

/** Updates zone options based on selected city. */
function updateZoneOptions(city) {
    zoneSelect.innerHTML = ''; // Clear previous options
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Select zone...";
    zoneSelect.appendChild(defaultOption);

    const cityData = transitData[city];
    if (cityData && cityData.zones && cityData.zones.length > 0) {
        cityData.zones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone;
            option.textContent = zone;
            zoneSelect.appendChild(option);
        });
        zoneSelect.disabled = cityData.zones.length <= 1; // Disable if only one zone
        if (cityData.zones.length === 1) {
            zoneSelect.value = cityData.zones[0]; // Auto-select if only one zone
        }
    } else {
        zoneSelect.disabled = true; // Disable if no zones defined
    }
}

/** Calculates and displays the estimated fare. */
function calculateAndDisplayFare() {
    const city = citySelect.value;
    const zone = zoneSelect.value;
    const riderType = riderTypeSelect.value;

    if (!city || !zone || !riderType || !transitData[city]) {
        fareResultDiv.classList.add('hidden');
        return;
    }

    const cityData = transitData[city];
    const fare = cityData.fares[riderType]?.[zone]; // Use optional chaining

    if (fare !== undefined && fare !== null) { // Check if fare exists
        fareAmountSpan.textContent = `$${fare.toFixed(2)}`;
        fareDetailsP.textContent = `${zone}, ${riderType}`;
        fareResultDiv.classList.remove('hidden');
    } else {
        // Handle cases where fare might not be defined for a combo (e.g., child fare missing)
        fareAmountSpan.textContent = 'N/A';
        fareDetailsP.textContent = `Fare not available for ${riderType} in ${zone}. Check official site.`;
        fareResultDiv.classList.remove('hidden'); // Show message
    }
}

/** Updates the transit card information display. */
function updateCardInfo(city) {
    const cityData = transitData[city];
    const cardData = cityData?.card; // Use optional chaining

    if (cardData) {
        cardNameP.textContent = cardData.name || '-';
        cardCostP.textContent = cardData.cost || 'Check official site'; // Display card cost
        buyLocationP.textContent = cardData.buyAt || '-';
        reloadOptionsP.textContent = cardData.reload || '-'; // Display reload locations
        learnMoreLink.href = cardData.learnMore || '#';

        discountsUl.innerHTML = ''; // Clear previous discounts
        if (cardData.discounts && cardData.discounts.length > 0) {
            cardData.discounts.forEach(discount => {
                const li = document.createElement('li');
                li.textContent = discount;
                discountsUl.appendChild(li);
            });
        } else {
            discountsUl.innerHTML = '<li>Check official website for discount programs.</li>';
        }
    } else {
        // Reset fields if no card data
        cardNameP.textContent = '-';
        cardCostP.textContent = '-';
        buyLocationP.textContent = '-';
        reloadOptionsP.textContent = '-';
        learnMoreLink.href = '#';
        discountsUl.innerHTML = '<li>-</li>';
    }
}

/** Updates links and text related to trip planning and tips. */
function updatePlanningAndTips(city) {
     const cityData = transitData[city];
     if (cityData) {
         plannerLink.href = cityData.plannerLink || '#';
         transitSystemNameSpan.textContent = cityData.system || 'transit'; // For app suggestion
         // Update dynamic text spans
         transferInfoTextSpan.textContent = cityData.transferInfo || 'Transfer policies vary. Check the official website.';
         monthlyPassInfoTextSpan.textContent = cityData.monthlyPassInfo || 'Monthly passes may be available. Check the official website for options and pricing.';
         accessibilityLinkA.href = cityData.accessibilityLink || '#';
         // Etiquette list is currently static, could be made dynamic if needed
     } else {
         // Reset if no city data
         plannerLink.href = '#';
         transitSystemNameSpan.textContent = 'transit';
         transferInfoTextSpan.textContent = 'Transfer policies vary. Check the official website.';
         monthlyPassInfoTextSpan.textContent = 'Monthly passes may be available. Check the official website for options and pricing.';
         accessibilityLinkA.href = '#';
     }
}

// --- Event Listeners ---
citySelect.addEventListener('change', function(e) {
    const city = e.target.value;
    if (city) {
        updateZoneOptions(city);
        updateCardInfo(city);
        updatePlanningAndTips(city); // Update tips section
        fareResultDiv.classList.add('hidden'); // Hide old fare result
        toggleContentVisibility(true); // Show content sections
    } else {
         toggleContentVisibility(false); // Hide content sections if no city selected
    }
});

calculateFareBtn.addEventListener('click', calculateAndDisplayFare);

// Optional: Trigger fare calculation when zone or rider type changes too
zoneSelect.addEventListener('change', () => { if (citySelect.value) calculateAndDisplayFare(); });
riderTypeSelect.addEventListener('change', () => { if (citySelect.value) calculateAndDisplayFare(); });

// --- Initial State ---
// Keep content hidden initially until a city is selected
document.addEventListener('DOMContentLoaded', () => {
     toggleContentVisibility(false);
}); 