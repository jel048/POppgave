const axios = require('axios');


// Henter organisasjonsinformasjon fra Brønnøysundregistrene for en gitt organisasjon
// Funksjonen tar inn en object organisasjon : {FirmaNavn, OrgNr} som parameter og returnerer et objekt med organisasjonsinformasjon


async function hentOrgInfo(organisasjon) {
  const url = `https://data.brreg.no/enhetsregisteret/api/enheter/${organisasjon.OrgNr}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    let status = await settStatus(data);
    console.log('Firma:', data.navn);
    return {
      orgno: organisasjon.OrgNr,
      firmanavn: data.navn,
      status: status,
      antallansatte: data.antallAnsatte || 0,
      organisasjonsformkode: data.organisasjonsform?.kode || '',
      naeringskode: data.naeringskode1?.kode || '',
    };
  } catch (error) {
    console.log('Feil:', organisasjon.FirmaNavn);
    return {
      orgno: organisasjon.OrgNr,
      firmanavn: organisasjon.FirmaNavn,
      status: 'Feil',
      antallansatte: '',
      organisasjonsformkode: '',
      naeringskode: '',
    };
  }
}


async function settStatus(data) {
    let status = 'Aktiv';
    if (data.underAvvikling || data.underTvangsavviklingEllerTvangsopplosning) {
        status = 'UnderAvvikling';
    } else if (data.konkurs) {
        status = 'Konkurs';
    } else if (data.slettedato) {
        status = 'Slettet';
    }
    return status;
}

module.exports = { hentOrgInfo };
