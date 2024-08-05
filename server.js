const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const OPEN_ROUTE_SERVICE_API_KEY = '5b3ce3597851110001cf6248c66c131fa6944d39be0be08ddb0619e8'; // Füge hier deinen API-Schlüssel ein

// Endpunkt zur Berechnung der Route
app.post('/api/routes', async (req, res) => {
  const { start, end, profile = 'driving-car' } = req.body;
  try {
    const response = await axios.post(`https://api.openrouteservice.org/v2/directions/${profile}`, {
      coordinates: [[start.lng, start.lat], [end.lng, end.lat]]
    }, {
      headers: { 'Authorization': `Bearer ${OPEN_ROUTE_SERVICE_API_KEY}` }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpunkt für Adressvorschläge (search)
app.get('/api/addresses', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.openrouteservice.org/geocode/search`, {
      params: { api_key: OPEN_ROUTE_SERVICE_API_KEY, text: query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpunkt für Adressvorschläge (autocomplete)
app.get('/api/autocomplete', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`https://api.openrouteservice.org/geocode/autocomplete`, {
      params: { api_key: OPEN_ROUTE_SERVICE_API_KEY, text: query }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
