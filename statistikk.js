const { readInputFile } = require('./parser');


async function statistikk(filePath) {

    //Les data fra CSV
    const promise = readInputFile(filePath);
    const csvData = await Promise.all([promise]);
    const data = csvData[0];



    let stats = {}
    const statusCount = {}
    const orgFormCount = {}
    const ansatteKategorier = {
        '0': 0,
        '1-9': 0,
        '10-49': 0,
        '50+': 0
      }

      let totalOrgForms = 0

      for (const row of data) {
        const status = row.Status?.trim()
        const form = row.OrganisasjonsformKode?.trim()
        const ansatte = parseInt(row.AntallAnsatte)

        //status
        if (status) {
          statusCount[status] = (statusCount[status] || 0) + 1
        }

        //organisasjonsform
        if (form) {
          orgFormCount[form] = (orgFormCount[form] || 0) + 1
          totalOrgForms++
        }

        //Ansattekategorier
        if (!isNaN(ansatte)) {
          if (ansatte === 0) ansatteKategorier['0']++
          else if (ansatte <= 9) ansatteKategorier['1-9']++
          else if (ansatte <= 49) ansatteKategorier['10-49']++
          else ansatteKategorier['50+']++
        }
      }

      // Konverter antall til prosent
      const orgFormPercent = {}
      for (const form in orgFormCount) {
        orgFormPercent[form] = (orgFormCount[form] / totalOrgForms) * 100
      }

      stats = {
        statusCount,
        orgFormPercent,
        ansatteKategorier
      }

      //Print ut statistikk
      console.log('Statistikk:')   
      console.log('Antall organisasjoner:', data.length) 
      console.log('Statuskategorier:')
      
      for (const [key, value] of Object.entries(stats.statusCount)) { 
        console.log(`Status ${key}: ${value} (${((value / data.length) * 100).toFixed(2)}%)`)
      }
      console.log('Organisasjonsformer:')
      for (const [key, value] of Object.entries(stats.orgFormPercent)) {
        console.log(`Organisasjonsform ${key}: ${value.toFixed(2)}%`)
      }      
        console.log('Antall ansatte:')
        for (const [key, value] of Object.entries(stats.ansatteKategorier)) {   
        console.log(`Antall ansatte ${key}: ${value} (${((value / data.length) * 100).toFixed(2)}%)`)
      }

  return stats;
}

module.exports = { statistikk };