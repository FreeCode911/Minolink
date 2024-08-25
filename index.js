const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

const app = express();

// Load configuration
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const PORT = process.env.PORT || config.port;
const allowedDomains = config.domains || [];

// Connect to MongoDB
mongoose.connect(config.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the URL model
const Url = mongoose.model('Url', {
  originalUrl: String,
  shortUrl: String,
  domain: String, // Store the domain
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Serve configuration
app.get('/config', (req, res) => {
  res.json({ domains: allowedDomains });
});

// Serve the main page
app.get('/', (req, res) => {
  res.render('index');
});

// Handle redirect
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ shortUrl });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

// Shorten URL
app.post('/shorten', async (req, res) => {
  const { originalUrl, domain } = req.body;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  if (!allowedDomains.includes(domain)) {
    return res.status(400).json({ error: 'Invalid domain' });
  }

  const existingUrl = await Url.findOne({ originalUrl, domain });

  if (existingUrl) {
    res.json({ shortUrl: existingUrl.shortUrl });
  } else {
    const shortUrl = generateShortUrl();
    const url = new Url({ originalUrl, shortUrl, domain });

    await url.save();
    res.json({ shortUrl });
  }
});

// Validate URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

// Generate a short URL
function generateShortUrl() {
  return shortid.generate();
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
