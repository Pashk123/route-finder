const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const OPEN_ROUTE_SERVICE_API_KEY = '5b3ce3597851110001cf6248c66c131fa6944d39be0be08ddb0619e8'; // Füge hier deinen API-Schlüssel ein

const apiUrl = 'https://api.openrouteservice.org'; // Lokale API-URL
// Endpunkt zur Berechnung der Route für GET-Anfragen
app.get('/api/directions/:profile', async (req, res) => {
  const { start, end, api_key } = req.query;
  const { profile } = req.params;
  try {
    const response = await axios.get(`${apiUrl}/v2/directions/${profile}`, {
      params: {
        api_key: api_key,
        start: start,
        end: end
      },
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search', async (req, res) => {
  console.log("Search request received:", req.query); // Log the incoming request
  const { text, api_key } = req.query;
  
  try {
    const response = await axios.get(`${apiUrl}/geocode/search`, {
      params: {
        api_key: api_key,
        text: text
      },
      headers: {
        'Accept': 'application/json'
      }
    });
    console.log("Search response:", response.data); // Log the outgoing response
    res.json(response.data);
  } catch (error) {
    console.error("Search error:", error.message); // Log the error
    res.status(500).json({ error: error.message });
  }
});


// Endpunkt zur Berechnung der Route
app.post('/api/routes', async (req, res) => {
  const { start, end, profile = 'driving-car' } = req.body;
  try {
    const response = await axios.get(`${apiUrl}/v2/directions/${profile}`, {
      params: {
        api_key: OPEN_ROUTE_SERVICE_API_KEY,
        start: `${start.lng},${start.lat}`,
        end: `${end.lng},${end.lat}`
      },
      headers: {
        'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
      }
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
    const response = await axios.get(`${apiUrl}/geocode/search`, {
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
    const response = await axios.get(`${apiUrl}/geocode/autocomplete`, {
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
