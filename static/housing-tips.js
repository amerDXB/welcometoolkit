// Provincial tenancy board resources
const rentalResources = {
    "British Columbia": "https://www2.gov.bc.ca/gov/content/housing-tenancy/residential-tenancies",
    "Alberta": "https://www.alberta.ca/renting-in-alberta.aspx",
    "Saskatchewan": "https://www.saskatchewan.ca/residents/housing/renting-a-home",
    "Manitoba": "https://www.gov.mb.ca/cca/rtb/",
    "Ontario": "https://tribunalsontario.ca/ltb/",
    "Quebec": "https://www.tal.gouv.qc.ca/",
    "New Brunswick": "https://www2.gnb.ca/content/gnb/en/departments/snb/rental_board.html",
    "Nova Scotia": "https://novascotia.ca/just/regulations/regs/rrten.htm",
    "Prince Edward Island": "https://www.princeedwardisland.ca/en/information/justice-and-public-safety/rental-of-residential-property",
    "Newfoundland and Labrador": "https://www.gov.nl.ca/cca/rental/"
};

// Function to update the tenancy board link
function updateTenancyBoardLink(province) {
    const provinceResources = document.getElementById('provinceResources');
    const tenancyBoardLink = document.getElementById('tenancyBoardLink');
    
    if (province && rentalResources[province]) {
        tenancyBoardLink.href = rentalResources[province];
        provinceResources.classList.remove('hidden');
    } else {
        provinceResources.classList.add('hidden');
    }
}

// Event listener for province selection
document.getElementById('province').addEventListener('change', function(e) {
    updateTenancyBoardLink(e.target.value);
}); 