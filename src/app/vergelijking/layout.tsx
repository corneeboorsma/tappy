import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tappy vs. de rest — Waarom Tappy anders is',
  description: 'Een eerlijke vergelijking van Tappy met Mollie, Buckaroo en Adyen POS-oplossingen.',
  robots: 'noindex',
};

export default function VergelijkingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
