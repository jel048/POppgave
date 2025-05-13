const { readInputFile } = require('./parser');
const { hentOrgInfo } = require('./api');
const { writeOutputFile } = require('./writer');
const { statistikk } = require('./statistikk');

const CSV_INPUT = './ressurs/firmaer.csv';
const CSV_OUTPUT = './ressurs/firmaer_output.csv';

async function main() {
    //Les data fra CSV
  const organisasjoner = await readInputFile(CSV_INPUT);
  

  //Henter data parallelt fra API
  const promises = organisasjoner.map(async (organisasjon) => hentOrgInfo(organisasjon))
  const beriket = await Promise.all(promises);

    //skriv til output CSV
  await writeOutputFile(CSV_OUTPUT, beriket);
  console.log('Data skrevet til', CSV_OUTPUT);

  //Kjør statistikk
  const stats = await statistikk(CSV_OUTPUT);


}

main();
