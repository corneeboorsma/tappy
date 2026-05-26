// seed-tcdemors.mjs
// Creates the TC de Mors tenant document in Firestore.
// Uses the Firebase client SDK (not Admin SDK).
// Run with: node scripts/seed-tcdemors.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCphq1SmEOAcfBcr5dZ9KpW3GIznpZetBA',
  authDomain: 'tappy-e9eed.firebaseapp.com',
  projectId: 'tappy-e9eed',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tenantData = {
  bedrijfsnaam: 'TC de Mors',
  adres: 'Opbroekweg 40, 7461 PH Rijssen',
  kvk: '40075767',
  iban: 'NL04 RABO 0319 0240 59',
  btwNummer: '',
  contactNaam: 'Andre Zwoferink',
  contactEmail: 'andrezwoferink@gmail.com',
  contactTelefoon: '06 39 777 336',
  locaties: [],
  pricing: {
    vastPerTerminal: 9.95,
    transactieTarief: 1.5,
  },
  status: 'active',
  aangemaaktOp: serverTimestamp(),
};

async function main() {
  try {
    const ref = await addDoc(collection(db, 'tenants'), tenantData);
    console.log('Tenant document created with ID:', ref.id);
  } catch (err) {
    console.error('Failed to create tenant:', err);
    process.exit(1);
  }
}

main();
