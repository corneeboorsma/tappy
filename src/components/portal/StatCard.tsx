interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className={`bg-[#1E242D] rounded-2xl p-6 border ${accent ? 'border-[#C6FF3B]/20' : 'border-white/5'}`}>
      <div className="text-xs text-[#8B949E] uppercase tracking-wide mb-2">{label}</div>
      <div className={`text-3xl font-bold ${accent ? 'text-[#C6FF3B]' : 'text-white'}`}>{value}</div>
      {sub && <div className="text-xs text-[#8B949E] mt-1">{sub}</div>}
    </div>
  );
}
