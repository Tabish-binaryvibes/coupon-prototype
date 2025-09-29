const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const DIST_DIR = path.join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
};

const server = http.createServer(async (req, res) => {
  try {
    // Construct the file path
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

    // Check if the file exists
    const stats = await fs.stat(filePath).catch(() => null);
    if (!stats || stats.isDirectory()) {
      // If the file doesn't exist or is a directory, serve index.html (for SPA routing)
      filePath = path.join(DIST_DIR, 'index.html');
    }

    // Read the file
    const content = await fs.readFile(filePath);

    // Determine the MIME type
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    // Serve the file
    res.writeHead(200, { 'Content-Type': mimeType });
    res.end(content);
  } catch (err) {
    // Handle errors (e.g., 404 or 500)
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});