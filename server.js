const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const OPEN_ROUTE_SERVICE_API_KEY = '5b3ce3597851110001cf6248c66c131fa6944d39be0be08ddb0619e8'; // Füge hier deinen API-Schlüssel ein

const apiUrl = 'https://api.openrouteservice.org';

// Swagger-Konfiguration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Route Finder API',
      version: '1.0.0',
      description: 'API zur Routenberechnung und Adressvorschlägen'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Lokaler Server'
      }
    ]
  },
  apis: ['./server.js'], // Pfad zu den API-Dokumentationsdateien
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Endpunkt zur Berechnung der Route für GET-Anfragen
/**
 * @swagger
 * /api/directions/{profile}:
 *   get:
 *     summary: Berechnet eine Route basierend auf zwei Adressen.
 *     parameters:
 *       - in: path
 *         name: profile
 *         required: true
 *         schema:
 *           type: string
 *         description: Transportprofil (z.B. driving-car)
 *       - in: query
 *         name: start
 *         required: true
 *         schema:
 *           type: string
 *         description: Startadresse (Longitude,Latitude)
 *       - in: query
 *         name: end
 *         required: true
 *         schema:
 *           type: string
 *         description: Zieladresse (Longitude,Latitude)
 *     responses:
 *       200:
 *         description: Erfolgreiche Routenberechnung
 *       400:
 *         description: Fehlende oder ungültige Parameter
 */
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
/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Suche nach Addressen basierend auf einem Text.
 *     parameters:
 *       - in: query
 *         name: text
 *         required: true
 *         schema:
 *           type: string
 *         description: Der Text, nach dem gesucht werden soll (z.B. Ortsname, Adresse).
 *       - in: query
 *         name: api_key
 *         required: true
 *         schema:
 *           type: string
 *         description: Dein API-Schlüssel für den Zugriff auf den Dienst.
 *     responses:
 *       200:
 *         description: Erfolgreiche Suche nach Orten.
 *       500:
 *         description: Interner Serverfehler.
 */
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

/**
 * @swagger
 * /api/autocomplete:
 *   get:
 *     summary: Gibt Autocomplete-Vorschläge basierend auf einer unvollständigen Adresse zurück.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Die unvollständige Adresse für Autocomplete-Vorschläge.
 *     responses:
 *       200:
 *         description: Erfolgreiche Rückgabe von Autocomplete-Vorschlägen.
 *       500:
 *         description: Interner Serverfehler.
 */
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

// Weitere Endpunkte dokumentieren und hinzufügen (ähnlich wie oben)
// Swagger-Kommentare für andere Endpunkte hinzufügen

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
  console.log(`Swagger-Dokumentation verfügbar unter http://localhost:${PORT}/api-docs`);
});