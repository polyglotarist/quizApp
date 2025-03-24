const fs = require('fs');
const csv = require('csv-parser');

function parseCSV(filePath) {
    return new Promise((resolve, reject) => {
        const result = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                const keys = Object.keys(row);
                if (keys.length >= 2) {
                    result.push({ key: row[keys[0]], value: row[keys[1]] });
                }
            })
            .on('end', () => {
                resolve(result);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Example usage
const filePath = 'myFile.csv'; // Replace with your CSV file path
parseCSV(filePath)
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
