const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const path = require('path');

const app = express();

const fs = require('fs');
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));


const PORT = process.env.PORT || config.port;


mongoose.connect(config.mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Url = mongoose.model('Url', {
  originalUrl: String,
  shortUrl: String,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
// Add this to your server code

app.get('/config', (req, res) => {
  const config = require('./config.json');
  res.json(config);
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const url = await Url.findOne({ shortUrl });

  if (url) {
    res.redirect(url.originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  const existingUrl = await Url.findOne({ originalUrl });

  if (existingUrl) {
    res.json({ shortUrl: existingUrl.shortUrl });
  } else {
    const shortUrl = generateShortUrl();
    const url = new Url({ originalUrl, shortUrl });

    await url.save();
    res.json({ shortUrl });
  }
});

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

function generateShortUrl() {
  return shortid.generate();
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
