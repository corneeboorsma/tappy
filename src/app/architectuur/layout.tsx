import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Architectuur — Tappy',
  description: 'Technische documentatie: componentstructuur, i18n-systeem en design system van de Tappy-website.',
  robots: 'noindex',
};

export default function ArchitectuurLayout({ children }: { children: React.ReactNode }) {
  return children;
}
