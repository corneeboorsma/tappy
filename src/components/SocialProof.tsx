const logos = ['Heineken', "O'Learys", 'De Bierfabriek', 'Feyenoord Rotterdam', 'Bavaria'];

export default function SocialProof() {
  return (
    <section className="py-6 border-y border-white/10 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-white/10 rounded-2xl px-8 py-5 flex flex-wrap items-center gap-8">
          <p className="text-sm text-[#8B949E] whitespace-nowrap">
            Trusted by venues<br />across the country
          </p>
          <div className="flex flex-wrap items-center gap-8">
            {logos.map((name) => (
              <span key={name} className="text-sm font-semibold text-white/40 hover:text-white/70 transition-colors tracking-wide uppercase text-xs">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
