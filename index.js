async function searchHospitals() {
            const location = document.getElementById('search').value;
            const response = await fetch(`/api/hospitals?location=${location}`);
            const hospitals = await response.json();
            const hospitalList = document.getElementById('hospital-list');
            hospitalList.innerHTML = '';
            hospitals.forEach(hospital => {
                const hospitalElement = document.createElement('div');
                hospitalElement.className = 'hospital';
                hospitalElement.innerHTML = `
                    <h2>${hospital.name}</h2>
                    <p>Location: ${hospital.location}</p>
                    <p>Beds Available: ${hospital.bedsAvailable}</p>
                `;
                hospitalList.appendChild(hospitalElement);
            });
}
         const hospitalList = document.getElementById('hospital-list');
    hospitalList.innerHTML = ''; // Clear previous results

    filteredHospitals.forEach(hospital => {
        hospitalList.innerHTML += `
            <div>
                <h2>${hospital.name}</h2>
                <p>Location: ${hospital.location}</p>
                <p>Beds available: ${hospital.beds}</p>
                <button onclick="admitPatient('${hospital.id}')">Admit Patient</button>
            </div>
            <hr>
        `;
    });


// Function to redirect to the admit page for a selected hospital
function admitPatient(hospitalId) {
    // Redirect to admit.html with the hospital ID as a query parameter
    window.location.href = `admit.html?hospitalId=${hospitalId}`;
}