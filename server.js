const express = require('express');
const path = require('path');
const app = express();

// ✅ Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'dist/anova-ui/browser')));

// ✅ Fallback to index.html
app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, 'dist/anova-ui/browser/index.html'))
);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Frontend listening on port ${PORT}`));
