const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const apiUrl = 'https://api.openrouteservice.org';


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




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});