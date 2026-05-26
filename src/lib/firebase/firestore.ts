import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  setDoc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './client';

// --- Types ---

export type TenantStatus = 'active' | 'inactive';
export type TerminalStatus = 'active' | 'inactive';
export type UserRole = 'super_admin' | 'admin';

export interface Locatie {
  id: string;
  naam: string;
  adres: string;
}

export interface Pricing {
  vastPerTerminal: number;
  transactieTarief: number;
}

export interface Tenant {
  id: string;
  bedrijfsnaam: string;
  adres: string;
  kvk: string;
  iban: string;
  btwNummer: string;
  contactNaam: string;
  contactEmail: string;
  contactTelefoon: string;
  locaties: Locatie[];
  pricing: Pricing;
  status: TenantStatus;
  aangemaaktOp: Timestamp;
}

export interface Terminal {
  id: string;
  naam: string;
  tafelNummer: string;
  locatieId: string;
  serienummer: string;
  status: TerminalStatus;
  bedrag: number;
  aangemaaktOp: Timestamp;
}

export interface Transaction {
  id: string;
  terminalId: string;
  bedrag: number;
  tijdstip: Timestamp;
  betaalmethode: string;
}

export interface PortalUser {
  uid: string;
  role: UserRole;
  tenantId: string;
  email: string;
}

// --- Tenants ---

export async function getTenants(): Promise<Tenant[]> {
  const snap = await getDocs(collection(db, 'tenants'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Tenant));
}

export async function getTenant(tenantId: string): Promise<Tenant | null> {
  const snap = await getDoc(doc(db, 'tenants', tenantId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Tenant;
}

export async function createTenant(data: Omit<Tenant, 'id' | 'aangemaaktOp'>): Promise<string> {
  const ref = await addDoc(collection(db, 'tenants'), {
    ...data,
    aangemaaktOp: Timestamp.now(),
  });
  return ref.id;
}

export async function updateTenant(tenantId: string, data: Partial<Omit<Tenant, 'id'>>): Promise<void> {
  await updateDoc(doc(db, 'tenants', tenantId), data as Record<string, unknown>);
}

// --- Users ---

export async function getPortalUser(uid: string): Promise<PortalUser | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return { uid, ...snap.data() } as PortalUser;
}

export async function createPortalUser(uid: string, data: Omit<PortalUser, 'uid'>): Promise<void> {
  await setDoc(doc(db, 'users', uid), data);
}

// --- Terminals ---

export async function getTerminals(tenantId: string): Promise<Terminal[]> {
  const snap = await getDocs(
    query(collection(db, 'tenants', tenantId, 'terminals'), orderBy('aangemaaktOp', 'desc'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Terminal));
}

export async function addTerminal(tenantId: string, data: Omit<Terminal, 'id' | 'aangemaaktOp'>): Promise<string> {
  const ref = await addDoc(collection(db, 'tenants', tenantId, 'terminals'), {
    ...data,
    aangemaaktOp: Timestamp.now(),
  });
  return ref.id;
}

export async function updateTerminal(tenantId: string, terminalId: string, data: Partial<Omit<Terminal, 'id'>>): Promise<void> {
  await updateDoc(doc(db, 'tenants', tenantId, 'terminals', terminalId), data as Record<string, unknown>);
}

// --- Transactions ---

export async function getTransactions(tenantId: string): Promise<Transaction[]> {
  const snap = await getDocs(
    query(collection(db, 'tenants', tenantId, 'transactions'), orderBy('tijdstip', 'desc'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Transaction));
}

export async function addTransaction(tenantId: string, data: Omit<Transaction, 'id'>): Promise<void> {
  await addDoc(collection(db, 'tenants', tenantId, 'transactions'), data);
}
