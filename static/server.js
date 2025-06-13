const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Counter functions
function updateCounter() {
    try {
        const counterPath = path.join(__dirname, 'counter.json');
        const data = JSON.parse(fs.readFileSync(counterPath, 'utf8'));
        data.count += 1;
        data.lastUpdated = new Date().toISOString();
        fs.writeFileSync(counterPath, JSON.stringify(data, null, 2));
        return data.count;
    } catch (error) {
        console.error('Error updating counter:', error);
        return 0;
    }
}

// Counter endpoint
app.get('/update-counter', (req, res) => {
    const count = updateCounter();
    res.json({ count });
});

// Serve all HTML files
app.get('*.html', (req, res) => {
    const filePath = path.join(__dirname, req.path);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Not found');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 