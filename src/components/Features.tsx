import Image from 'next/image';

const features = [
  {
    icon: '📱',
    title: 'All payments. One solution.',
    desc: 'Accept every payment method. Cards, phones, wearables and more.',
    img: '/images/feature-payments.jpg',
    imgAlt: 'Tappy device with contactless card payment',
  },
  {
    icon: '📊',
    title: 'Real-time insights.',
    desc: 'Track sales, tips and performance in real-time from any device.',
    img: '/images/feature-insights.jpg',
    imgAlt: 'Real-time sales dashboard on mobile',
  },
  {
    icon: '👥',
    title: 'Built for busy teams.',
    desc: 'Easy to use, quick to learn and made to handle the rush.',
    img: '/images/feature-teams.jpg',
    imgAlt: 'Bartender serving guests with Tappy on the bar',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-[#0D1117]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#C6FF3B] uppercase mb-4">
              Built for Hospitality
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              More time for your guests.<br />
              <span className="text-[#C6FF3B]">More revenue</span> for your business.
            </h2>
          </div>
          <p className="text-[#8B949E] leading-relaxed">
            Tappy helps bars, cafés, restaurants and sports venues streamline payments,
            reduce queues and improve the guest experience.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-[#1E242D] rounded-2xl overflow-hidden flex flex-col">
              <div className="relative w-full h-52">
                <Image
                  src={f.img}
                  alt={f.imgAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-[#C6FF3B]/10 border border-[#C6FF3B]/20 flex items-center justify-center text-[#C6FF3B]">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{f.title}</h3>
                <p className="text-sm text-[#8B949E] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
