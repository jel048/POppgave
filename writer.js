const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function writeOutputFile(filePath, data) {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'orgno', title: 'OrgNo' },
      { id: 'firmanavn', title: 'FirmaNavn' },
      { id: 'status', title: 'Status' },
      { id: 'antallansatte', title: 'AntallAnsatte' },
      { id: 'organisasjonsformkode', title: 'OrganisasjonsformKode' },
      { id: 'naeringskode', title: 'Naeringskode' },
      
    ]
  });

  return csvWriter.writeRecords(data);
}

module.exports = { writeOutputFile };
