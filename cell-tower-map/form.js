import { database } from './firebase-config.js'; // Import the database reference
import { ref, set } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"; // Import set and ref functions

// Ensure this function runs after the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tower-form');
    const carriersContainer = document.getElementById('carriers-container');

    // Function to add a new carrier entry
    function addCarrier() {
        const carrierEntry = document.createElement('div');
        carrierEntry.classList.add('carrier-entry');

        carrierEntry.innerHTML = `
            <input type="text" class="carrier" placeholder="Carrier" required />
            <div class="technologies-container">
                <h4>Technologies</h4>
                <div class="technology-entry">
                    <input type="text" class="technology" placeholder="Technology (e.g., 3G, 4G)" required />
                    <input type="text" class="band" placeholder="Band Type (e.g., 1800mhz, 1900mhz)" required />
                    <button type="button" class="remove-technology">Remove Technology</button>
                </div>
            </div>
            <button type="button" class="add-technology">Add Technology</button>
            <button type="button" class="remove-carrier">Remove Carrier</button>
        `;

        carriersContainer.appendChild(carrierEntry);

        // Add event listeners for the new buttons
        carrierEntry.querySelector('.add-technology').addEventListener('click', function() {
            const technologyEntry = document.createElement('div');
            technologyEntry.classList.add('technology-entry');
            technologyEntry.innerHTML = `
                <input type="text" class="technology" placeholder="Technology (e.g., 3G, 4G)" required />
                <input type="text" class="band" placeholder="Band Type (e.g., 1800mhz, 1900mhz)" required />
                <button type="button" class="remove-technology">Remove Technology</button>
            `;
            carrierEntry.querySelector('.technologies-container').appendChild(technologyEntry);
            technologyEntry.querySelector('.remove-technology').addEventListener('click', function() {
                technologyEntry.remove();
            });
        });

        // Add event listener to remove the carrier entry
        carrierEntry.querySelector('.remove-carrier').addEventListener('click', function() {
            carrierEntry.remove();
        });
    }

    // Add initial carrier entry
    addCarrier();

    // Add event listener for the Add Carrier button
    document.getElementById('add-carrier').addEventListener('click', addCarrier);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const siteName = document.getElementById('siteName').value;
        const latitude = document.getElementById('latitude').value; // Get latitude
        const longitude = document.getElementById('longitude').value; // Get longitude

        // Collect carrier and technology data
        const carriers = Array.from(carriersContainer.querySelectorAll('.carrier-entry')).map(carrierEntry => {
            const carrierName = carrierEntry.querySelector('.carrier').value;
            const technologies = Array.from(carrierEntry.querySelectorAll('.technology-entry')).map(techEntry => ({
                technology: techEntry.querySelector('.technology').value,
                band: techEntry.querySelector('.band').value
            }));
            return { carrier: carrierName, technologies };
        });

        const towerData = {
            siteName,
            latitude, // Include latitude
            longitude, // Include longitude
            carriers // Include the carriers array
        };

        // Reference to the CellTowers node in Firebase
        const towersRef = ref(database, 'CellTowers/' + siteName); // Use siteName as unique ID

        // Set the data to the CellTowers node
        set(towersRef, towerData)
            .then(() => {
                console.log("Tower data added successfully.");
                alert("Tower added!");
                form.reset(); // Clear the form after submission
                carriersContainer.innerHTML = '<h3>Carriers</h3>'; // Reset carriers container
                addCarrier(); // Add initial carrier entry again
            })
            .catch((error) => {
                console.error("Error adding tower data: ", error);
                alert("Error adding tower data.");
            });
    });
});
