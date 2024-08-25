# URL Shortener

A simple URL shortening web application built with Node.js, Express, and MongoDB.

## ScreenShot

### Mobile View

<img src="https://github.com/ApiError/Url-Shortener/blob/main/images/Screenshot_20231111_050516_Chrome.jpg" title="Connected bots" width="350px"/>

### Desktop View
<img src="https://github.com/ApiError/Url-Shortener/blob/main/images/Screenshot_20231111_052046_Chrome.jpg" title="Connected bots" 
width="350px"/>

## Features

- Shorten long URLs to concise and shareable short links.
- Copy short URLs to the clipboard with a click.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/FreeCode911/Minolink.git
   ```

2. Navigate to the project directory:

   ```bash
   cd url-shortener
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Open file named `config.json` in the project root:

   ```json
   {
    "mongodb_url": "mongodb+srv://admin:admin@lykcloud.me/url-shortener", //Remove In MongoDB ( ?retryWrites=true&w=majority ) EG:- mongodb+srv://USERNAME:PASSWORD@xx/ANY_NAME
    "port": 3000,
    "website_url": "https://example.com", //Website Url Must Be https://example.com Do Not Add https://example.com/ , https://example.com//, etc..
}
  
   ```

### Usage

1. Start the application:

   ```bash
   npm start
   ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000).

3. Enter a long URL in the input box and click "Shorten URL."

4. Copy the generated short URL and share it!

### Configuration

You can customize the website URL by modifying the `config.json` file.