import Link from 'next/link';

const cols = [
  { title: 'Product', links: ['Terminal', 'Payments', 'Insights', 'Integrations'] },
  { title: 'Solutions', links: ['Bars & Pubs', 'Cafés', 'Restaurants', 'Sports & Events'] },
  { title: 'Company', links: ['About us', 'Careers', 'News', 'Contact'] },
  { title: 'Support', links: ['Help center', 'Documentation', 'Status'] },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D1117] border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-bold mb-1">
              <span className="text-white">tappy</span>
              <span className="text-[#C6FF3B]">))</span>
            </div>
            <p className="text-xs text-[#8B949E] mb-4">Tap. Pay. Done.</p>
            <div className="flex gap-3 text-[#8B949E]">
              <Link href="#" className="hover:text-white transition-colors text-sm">ig</Link>
              <Link href="#" className="hover:text-white transition-colors text-sm">fb</Link>
              <Link href="#" className="hover:text-white transition-colors text-sm">in</Link>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-[#8B949E] hover:text-white transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Stay updated</h4>
            <p className="text-xs text-[#8B949E] mb-3">Get the latest news and updates straight to your inbox.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#1E242D] border border-white/10 rounded-l-lg px-3 py-2 text-sm text-white placeholder-[#8B949E] focus:outline-none focus:border-[#C6FF3B]/50"
              />
              <button className="bg-[#C6FF3B] text-[#0D1117] px-3 py-2 rounded-r-lg font-bold hover:bg-[#d4ff5a] transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-wrap gap-4 justify-between items-center text-xs text-[#8B949E]">
          <span>© 2024 Tappy. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms &amp; conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
