// Function to generate a random 5-star rating
const generateRating = () => (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);

// A list of 14 common specializations/jobs
const specializations = [
    "Plumbing", "Electrical", "Carpentry", "IT Support", "HVAC/AC Repair",
    "Mechanics", "Flooring/Tiling", "Deep Cleaning", "Roofing", "Painting",
    "Appliance Repair", "Landscaping", "Locksmith", "Networking"
];

// A list of 14 general addresses/locations
const locations = [
    "Downtown Central", "Northside Industrial Park", "West End Arts District", 
    "East River Residential", "Midtown Business Hub", "The Waterfront",
    "Old Town Historic Center", "South Hills Suburb", "Airport Logistics Zone",
    "University Heights", "The Valley Estates", "Coastal Village",
    "Mountain View Sector", "Forest Edge Community"
];

// Function to generate a single worker profile
const generateWorker = (job, location, workerIndex) => {
    const firstName = ["Alex", "Jamie", "Chris", "Taylor", "Morgan", "Jesse", "Riley", "Drew"][workerIndex % 8];
    const lastName = ["Smith", "Jones", "Williams", "Brown", "Davis", "Wilson", "Taylor", "Moore"][workerIndex % 8];
    return {
        id: `${job.substring(0, 3)}${location.substring(0, 3)}${workerIndex}`,
        name: `${firstName} ${lastName} (${job.substring(0, 4)} Specialist)`,
        job: job,
        location: location,
        rating: generateRating(),
        contact: `worker-${workerIndex}@easyfix.com`
    };
};

// --- MASTER DATA STRUCTURE ---
const FIXER_DIRECTORY = {};

specializations.forEach(job => {
    FIXER_DIRECTORY[job] = {}; // Initialize the job object

    locations.forEach(address => {
        // Generate 30 workers for this specific job at this specific address
        const workers = [];
        for (let i = 1; i <= 30; i++) {
            workers.push(generateWorker(job, address, i));
        }
        
        // Store the workers under the address key
        FIXER_DIRECTORY[job][address] = workers;
    });
});