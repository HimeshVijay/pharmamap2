// Importing Express and Path
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

// Sample data for hospitals (in-memory)
let hospitals = [
    { id: 1, name: 'Sahara', location: 'Indira Nagar', bedsAvailable: 10, patients: [] },
    { id: 2, name: 'Hospital B', location: 'Location B', bedsAvailable: 5, patients: [] },
    { id: 3, name: 'Fourth Hospital', location: 'Matiyari', bedsAvailable: 8, patients: [] },
    { id: 4, name: 'Kaykalp Hospital', location: 'Delhi', bedsAvailable: 7, patients: [] },
    { id: 5, name: 'Apollo Hospital', location: 'Delhi', bedsAvailable: 8, patients: [] }
];

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Route to get hospitals by location
app.get('/api/hospitals', (req, res) => {
    const { location } = req.query;
    const filteredHospitals = hospitals.filter(h => h.location.toLowerCase().includes(location.toLowerCase()));
    res.json(filteredHospitals);
});

// Admit patient route
app.post('/admit', (req, res) => {
    const { hospitalId, patientName, age, illness } = req.body;
    const hospital = hospitals.find(h => h.id == hospitalId);

    if (hospital && hospital.bedsAvailable > 0) {
        hospital.patients.push({ patientName, age, illness });
        hospital.bedsAvailable -= 1;
        res.json({ success: true, message: 'Patient admitted successfully!' });
    } else {
        res.json({ success: false, message: 'No beds available or hospital not found' });
    }
});

// Serve the admit page
app.get('/admit', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admit.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
