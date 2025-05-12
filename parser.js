const fs = require('fs');
const csv = require('csv-parser');

/// Leser inn data fra en CSV-fil og returnerer det som et array av objekter
// bruker promises, siden filinnlesning er asynkron, og vi ønsker å vente til filen er lest før vi fortsetter
// Funksjonen tar inn filstien som parameter og returnerer et promise som løses når filen er lest
function readInputFile(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

module.exports = { readInputFile };
