// This script runs on job-detail.html

// Get necessary elements
const jobTitleElement = document.getElementById('jobTitle');
const addressCardsContainer = document.getElementById('address-cards-container');
const workerListContainer = document.getElementById('worker-list-container');
const currentAddressElement = document.getElementById('currentAddress');
const addressSearchForm = document.getElementById('addressSearchForm');
const addressSearchInput = document.getElementById('addressSearchInput');

let currentJobData = null; // Stores the data for the current job

/**
 * Parses the URL query parameters to get the selected job name.
 */
function getJobFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('job');
}

/**
 * Renders the 14 address cards for the selected job.
 * @param {Array} addressesToRender - The array of address strings to display.
 */
function renderAddressCards(addressesToRender) {
    addressCardsContainer.innerHTML = '';
    
    if (!currentJobData || addressesToRender.length === 0) {
        addressCardsContainer.innerHTML = `
            <div class="col-12 text-center text-muted p-5">No addresses found for this job.</div>
        `;
        return;
    }

    addressesToRender.forEach(address => {
        // Find how many workers are in this address (should be 30)
        const workerCount = currentJobData[address].length;

        const cardHtml = `
            <div class="col">
                <div class="card fixer-card h-100 shadow-sm address-card" data-address="${address}">
                    <div class="card-body text-center">
                        <i class="fas fa-map-marker-alt fa-3x text-success mb-3"></i>
                        <h6 class="card-title fw-bold">${address}</h6>
                        <p class="card-text text-muted">${workerCount} Workers Ready</p>
                        <button class="btn btn-success btn-sm w-100 view-workers-btn" data-address="${address}">View 30 Workers</button>
                    </div>
                </div>
            </div>
        `;
        addressCardsContainer.innerHTML += cardHtml;
    });

    // Attach click listeners to the new "View Workers" buttons
    document.querySelectorAll('.view-workers-btn').forEach(button => {
        button.addEventListener('click', function() {
            const address = this.getAttribute('data-address');
            const workers = currentJobData[address];
            renderWorkerList(workers, address);
        });
    });
}

/**
 * Renders the list of 30 workers for a selected address.
 * @param {Array} workers - The array of 30 worker objects.
 * @param {string} address - The name of the address/location.
 */
function renderWorkerList(workers, address) {
    workerListContainer.innerHTML = '';
    currentAddressElement.textContent = address;
    
    workers.forEach(worker => {
        const workerHtml = `
            <div class="col">
                <div class="card bg-light h-100 shadow-sm border-success">
                    <div class="card-body">
                        <h6 class="card-title fw-bold text-success">${worker.name}</h6>
                        <p class="card-text mb-1">
                            <i class="fas fa-star text-warning me-1"></i> Rating: ${worker.rating}
                        </p>
                        <p class="card-text mb-1 text-muted">
                            <i class="fas fa-briefcase me-1"></i> Job: ${worker.job}
                        </p>
                        <p class="card-text mb-1 text-muted">
                            <i class="fas fa-envelope me-1"></i> ${worker.contact}
                        </p>
                    </div>
                </div>
            </div>
        `;
        workerListContainer.innerHTML += workerHtml;
    });
}


// Event listener for the Address Search form submission
addressSearchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const searchTerm = addressSearchInput.value.toLowerCase().trim();
    const allAddresses = Object.keys(currentJobData);

    // Filter the address names
    const filteredAddresses = allAddresses.filter(address => {
        return address.toLowerCase().includes(searchTerm);
    });

    // Render the filtered results
    renderAddressCards(filteredAddresses);
    // Clear the worker list when a new address search is performed
    workerListContainer.innerHTML = '<div class="col-12 text-center text-muted p-5">Please click on one of the filtered Address Cards above to view the 30 workers.</div>';
    currentAddressElement.textContent = 'Filtered Results';
});


// Initialization function
document.addEventListener('DOMContentLoaded', () => {
    const jobName = getJobFromURL();

    if (!jobName || !FIXER_DIRECTORY[jobName]) {
        // Handle invalid job in URL
        jobTitleElement.textContent = "Error: Job Not Found";
        return;
    }

    // Set the page title and data
    jobTitleElement.textContent = `${jobName} Fixers & Locations`;
    currentJobData = FIXER_DIRECTORY[jobName];
    
    // Get all address keys for the current job
    const allAddresses = Object.keys(currentJobData);

    // Initial render of all address cards
    renderAddressCards(allAddresses);
});