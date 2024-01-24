// Calculate the current year progress
const currentYear = new Date().getFullYear(); // Get the current year
const startDate = new Date(`${currentYear}-01-01`); // Set the start date to January 1st of the current year
const endDate = new Date(`${currentYear + 1}-01-01`); // Set the end date to January 1st of the next year
const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24); // Calculate the total days between start and end dates

// Variable to store the live update interval ID
let liveUpdateInterval;

// Function to calculate and update progress
function calculateProgress(type) {
    const progressBar = document.getElementById('progress-bar');
    const currentYearSpan = document.getElementById('current-year');
    const completionPercentageSpan = document.getElementById('completion-percentage');

    // Clear the live update interval if it exists
    clearInterval(liveUpdateInterval);

    if (type === 'static') {
        // Static calculation
        let daysPassed = (new Date() - startDate) / (1000 * 60 * 60 * 24);
        // Ensure it doesn't go beyond the total days
        daysPassed = Math.min(Math.max(daysPassed, 0), totalDays);

        // Calculate the completion percentage
        const percentage = Math.floor((daysPassed / totalDays) * 100);

        // Update the progress bar and text
        progressBar.style.width = `${percentage}%`;
        currentYearSpan.innerText = currentYear;
        completionPercentageSpan.innerText = `${percentage}%`;
    } else if (type === 'live') {
        // Live calculation
        const updateLive = () => {
            const now = new Date();
            const elapsedDays = (now - startDate) / (1000 * 60 * 60 * 24);
            // Calculate the live completion percentage
            const livePercentage = (elapsedDays / totalDays) * 100;

            // Update the progress bar and text
            progressBar.style.width = `${livePercentage}%`;
            currentYearSpan.innerText = currentYear;
            completionPercentageSpan.innerText = livePercentage.toFixed(10) + '%';
        };

        // Start the live update loop
        liveUpdateInterval = setInterval(updateLive, 100);
    }
}

// Perform the static calculation when the page loads
calculateProgress('static');
