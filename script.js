import { database } from './firebase-config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js"; // Import onValue for listening to database changes

// Initialize the map
const map = L.map('map').setView([-33.8688, 151.2093], 10); // Default center is Sydney
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Fetching the cell tower data from Firebase and adding it to the map
const towersRef = ref(database, 'CellTowers');
onValue(towersRef, (snapshot) => {
    const towersData = snapshot.val();
    if (towersData) {
        Object.keys(towersData).forEach(towerId => {
            const tower = towersData[towerId];
            const { latitude, longitude, siteName, carriers } = tower;

            // Create a marker for the tower
            const marker = L.marker([latitude, longitude]).addTo(map);

            // Build the popup content
            let popupContent = `<strong>Site Name:</strong> ${siteName}<br/>`;

            // Loop through carriers to create content
            if (carriers && carriers.length > 0) {
                carriers.forEach(carrier => {
                    popupContent += `<strong>Carrier:</strong> ${carrier.carrier}<br/>`;
                    carrier.technologies.forEach(tech => {
                        popupContent += `<strong>Technology:</strong> ${tech.technology}<br/>`;
                        popupContent += `<strong>Band Type:</strong> ${tech.band}<br/>`;
                    });
                });
            } else {
                popupContent += 'No carriers information available.';
            }

            marker.bindPopup(popupContent); // Bind the formatted content to the marker
        });
    }
});
