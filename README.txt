Programmet parser firmaer.csv og bruker organisasjonsnummerne til å hente tilleggsinformasjon fra Brønnøysundregistrene via API-kall.

Basert på informasjon fra BRR settes status for org. til Aktiv, UnderAvvikling, Konkurs, Slettet, eller Feil (Hvis organisasjonsnummeret ikke finnes eller APIkallet feiler).

OrgNo; FirmaNavn; Status; AntallAnsatte; OrganisasjonsformKode; Naeringskode for hver organisasjon skrives til firmaer_output.csv

Statistikk skrives ut til konsoll:

Antall for hver status.

Prosentvis fordeling av de ulike organisasjonsformene (AS, Enk osv).

En fordeling av antall ansatte ( 0, 1-9 ansatte, 10-49 ansatte, 50+ ansatte).




Hvordan kjøre:

- ha node.js installert

- Naviger til mappen

- npm install

- node index.js