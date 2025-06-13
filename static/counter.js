const fs = require('fs');
const path = require('path');

function updateCounter() {
    try {
        const counterPath = path.join(__dirname, 'counter.json');
        const data = JSON.parse(fs.readFileSync(counterPath, 'utf8'));
        
        // Increment counter
        data.count += 1;
        data.lastUpdated = new Date().toISOString();
        
        // Save updated count
        fs.writeFileSync(counterPath, JSON.stringify(data, null, 2));
        return data.count;
    } catch (error) {
        console.error('Error updating counter:', error);
        return 0;
    }
}

function getCounter() {
    try {
        const counterPath = path.join(__dirname, 'counter.json');
        const data = JSON.parse(fs.readFileSync(counterPath, 'utf8'));
        return data.count;
    } catch (error) {
        console.error('Error reading counter:', error);
        return 0;
    }
}

module.exports = {
    updateCounter,
    getCounter
}; 