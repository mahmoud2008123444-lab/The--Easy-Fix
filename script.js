// This script runs on index.html

// --- Dependency: Assumes data.js (containing FIXER_DIRECTORY) is loaded first ---

// Get necessary elements
const jobCardsContainer = document.getElementById('job-cards-container');
const jobSearchForm = document.getElementById('jobSearchForm');
const jobSearchInput = document.getElementById('jobSearchInput');

// Determine the list of jobs to use from the data.js file
const jobsToUse = (typeof FIXER_DIRECTORY !== 'undefined' && Object.keys(FIXER_DIRECTORY).length > 0) 
    ? Object.keys(FIXER_DIRECTORY) 
    : [
        "Plumbing", "Electrical", "Carpentry", "IT Support", "HVAC/AC Repair",
        "Mechanics", "Flooring/Tiling", "Deep Cleaning", "Roofing", "Painting",
        "Appliance Repair", "Landscaping", "Locksmith", "Networking"
    ];


// Function to generate the HTML for a single job card
function createJobCard(jobName) {
    let iconClass = 'fas fa-tools'; 
    if (jobName.includes('Plumbing')) iconClass = 'fas fa-faucet';
    else if (jobName.includes('Electrical')) iconClass = 'fas fa-bolt';
    else if (jobName.includes('IT')) iconClass = 'fas fa-laptop-code';
    else if (jobName.includes('HVAC')) iconClass = 'fas fa-snowflake';
    else if (jobName.includes('Painting')) iconClass = 'fas fa-paint-roller';

    // Link to the job-detail page, passing the job name as a URL parameter
    const detailLink = `job-detail.html?job=${encodeURIComponent(jobName)}`;

    return `
        <div class="col">
            <div class="card fixer-card h-100 shadow-sm text-center">
                <div class="card-body">
                    <i class="${iconClass} fa-4x text-primary mb-3"></i>
                    <h5 class="card-title fw-bold">${jobName}</h5>
                    <p class="card-text text-muted">View 14 Service Locations</p>
                    <a href="${detailLink}" class="btn btn-primary mt-2 w-100">View Addresses</a>
                </div>
            </div>
        </div>
    `;
}

// Function to render the job cards
function renderJobCards(jobsToRender) {
    jobCardsContainer.innerHTML = ''; // Clear existing content (including loading message)
    
    if (jobsToRender.length === 0) {
        jobCardsContainer.innerHTML = `
            <div class="col-12 text-center my-5">
                <i class="fas fa-exclamation-circle text-warning fa-3x mb-3"></i>
                <h3 class="text-muted">No job categories found matching your search.</h3>
            </div>
        `;
        return;
    }

    jobsToRender.forEach(jobName => {
        jobCardsContainer.innerHTML += createJobCard(jobName);
    });
}

// Event listener for the Job Search form submission
jobSearchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const searchTerm = jobSearchInput.value.toLowerCase().trim();

    // Filter the job names
    const filteredJobs = jobsToUse.filter(jobName => {
        return jobName.toLowerCase().includes(searchTerm);
    });

    renderJobCards(filteredJobs);
});


// Initial call to render all 14 job cards when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderJobCards(jobsToUse);
});