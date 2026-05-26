import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0D1117]">
      {/* Background — real device on marble bar photo */}
      <div className="absolute inset-0 bg-[url('/images/hero-bar.jpg')] bg-cover bg-center" style={{ backgroundPosition: '50% 20%' }} />
      {/* Dark overlay — heavy on left for text, fades right to show venue */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D1117] from-25% via-[#0D1117]/85 via-50% to-[#0D1117]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/70 via-transparent to-[#0D1117]/50" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-xl">
          <h1 className="text-6xl md:text-8xl font-bold leading-none tracking-tight mb-6">
            <span className="text-white block">Tap. Pay.</span>
            <span className="text-[#C6FF3B] block">Done.</span>
          </h1>
          <p className="text-lg text-[#8B949E] mb-8 max-w-sm leading-relaxed">
            The all-in-one payment device<br />built for busy venues.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="#"
              className="flex items-center gap-2 bg-[#C6FF3B] text-[#0D1117] font-semibold px-6 py-3 rounded-full hover:bg-[#d4ff5a] transition-colors"
            >
              Get your Tappy <span>→</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 border border-white/20 text-white font-semibold px-6 py-3 rounded-full hover:border-white/40 transition-colors"
            >
              Book a demo
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-6 text-sm">
            {[
              { icon: '⚡', title: 'Fast payments', sub: 'Get paid in seconds' },
              { icon: '🛡', title: 'Reliable & secure', sub: 'Built for peace of mind' },
              { icon: '📊', title: 'Real-time insights', sub: 'See what matters' },
            ].map((t) => (
              <div key={t.title} className="flex items-center gap-2 text-[#8B949E]">
                <span className="text-[#C6FF3B]">{t.icon}</span>
                <div>
                  <div className="text-white font-medium">{t.title}</div>
                  <div className="text-xs">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
