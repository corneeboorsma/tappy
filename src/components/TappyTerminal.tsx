interface TappyTerminalProps {
  size?: 'sm' | 'md' | 'lg';
  state?: 'idle' | 'active' | 'paid';
  amount?: string;
  className?: string;
}

// Device lies flat on table, screen faces UP, viewed from slight angle
// Body: wide pillow-shape, matte black, tappy)) logo on front face, lime LED strip on front
// Screen: top face, e-ink style (light gray), NFC icon + amount + tagline

export default function TappyTerminal({
  size = 'md',
  state = 'idle',
  amount,
  className = '',
}: TappyTerminalProps) {
  const base = size === 'sm' ? 64 : size === 'lg' ? 160 : 100;

  // Top face (screen) dimensions
  const tw = base * 1.3;
  const th = base * 1.1;
  const tr = base * 0.22;

  // Front face (logo + LED) — visible below screen due to perspective
  const fh = base * 0.28;

  // Screen inset
  const sp = base * 0.08;
  const sw = tw - sp * 2;
  const sh = th - sp * 2;
  const sr = base * 0.14;

  const isActive = state === 'active';
  const isPaid = state === 'paid';

  return (
    <div className={`flex flex-col items-center select-none ${className}`} style={{ width: tw }}>

      {/* Pulse rings — emanate from screen */}
      {isActive && (
        <>
          <div className="absolute animate-ping pointer-events-none" style={{
            width: tw + 18, height: th + 18,
            borderRadius: tr + 9,
            border: '1.5px solid rgba(198,255,59,0.3)',
            animationDuration: '2s',
          }} />
          <div className="absolute animate-ping pointer-events-none" style={{
            width: tw + 34, height: th + 34,
            borderRadius: tr + 17,
            border: '1px solid rgba(198,255,59,0.15)',
            animationDuration: '2s',
            animationDelay: '0.7s',
          }} />
        </>
      )}

      {/* TOP FACE — screen */}
      <div style={{
        width: tw,
        height: th,
        borderRadius: tr,
        position: 'relative',
        background: 'radial-gradient(ellipse at 40% 30%, #2e3238 0%, #1c1f24 50%, #14171b 100%)',
        boxShadow: isPaid
          ? `0 2px 0 rgba(255,255,255,0.05), 0 4px 20px rgba(198,255,59,0.2)`
          : isActive
          ? `0 2px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(198,255,59,0.1)`
          : `0 2px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.4)`,
        border: isPaid
          ? '1px solid rgba(198,255,59,0.35)'
          : '1px solid rgba(255,255,255,0.07)',
      }}>
        {/* Screen surface */}
        <div style={{
          position: 'absolute',
          top: sp, left: sp,
          width: sw, height: sh,
          borderRadius: sr,
          background: isPaid
            ? 'linear-gradient(160deg, #f0fff0, #e6fde6)'
            : '#e8eaeb',
          boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)',
          border: '1px solid rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column' as const,
          alignItems: 'center',
          justifyContent: 'center',
          gap: base * 0.04,
          padding: base * 0.07,
          overflow: 'hidden',
        }}>
          {isPaid ? <ScreenPaid base={base} /> :
           isActive ? <ScreenActive base={base} amount={amount} /> :
           <ScreenIdle base={base} amount={amount} />}
        </div>
      </div>

      {/* FRONT FACE — tappy)) logo + LED strip, visible below top face */}
      <div style={{
        width: tw * 0.92,
        height: fh,
        background: 'linear-gradient(to bottom, #1c1f24, #13161a)',
        borderRadius: `0 0 ${tr * 0.8}px ${tr * 0.8}px`,
        border: '1px solid rgba(255,255,255,0.05)',
        borderTop: 'none',
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        gap: base * 0.05,
        boxShadow: '0 6px 20px rgba(0,0,0,0.7)',
      }}>
        {/* tappy)) wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
          <span style={{ fontSize: base * 0.13, fontWeight: 500, color: 'rgba(255,255,255,0.35)', letterSpacing: 1 }}>
            tappy
          </span>
          <span style={{ fontSize: base * 0.12, color: 'rgba(198,255,59,0.6)', letterSpacing: -1 }}>
            ))
          </span>
        </div>

        {/* Electric Lime LED strip */}
        <div style={{
          width: base * 0.28,
          height: base * 0.04,
          borderRadius: base * 0.02,
          background: isActive || isPaid ? '#C6FF3B' : 'rgba(198,255,59,0.35)',
          boxShadow: isActive || isPaid
            ? '0 0 8px rgba(198,255,59,0.8), 0 0 16px rgba(198,255,59,0.3)'
            : 'none',
        }} />
      </div>

      {/* Table shadow */}
      <div style={{
        width: tw * 0.75,
        height: 6,
        marginTop: 2,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
        borderRadius: '50%',
      }} />
    </div>
  );
}

function ScreenIdle({ base, amount }: { base: number; amount?: string }) {
  const fs = base * 0.12;
  return (
    <>
      <NfcHandIcon size={fs * 1.4} />
      {amount
        ? <span style={{ fontSize: fs * 1.5, fontWeight: 700, color: '#111', lineHeight: 1 }}>{amount}</span>
        : <span style={{ fontSize: fs * 0.8, color: '#777', textAlign: 'center' as const }}>Ready</span>
      }
      <span style={{ fontSize: fs * 0.6, color: '#888', letterSpacing: 0.5 }}>Tap. Pay. Done.</span>
    </>
  );
}

function ScreenActive({ base, amount }: { base: number; amount?: string }) {
  const fs = base * 0.12;
  return (
    <>
      <NfcHandIcon size={fs * 1.4} active />
      {amount && (
        <span style={{ fontSize: fs * 1.6, fontWeight: 700, color: '#111', lineHeight: 1 }}>{amount}</span>
      )}
      <span style={{ fontSize: fs * 0.6, color: '#555', letterSpacing: 0.5, fontWeight: 500 }}>Tap. Pay. Done.</span>
    </>
  );
}

function ScreenPaid({ base }: { base: number }) {
  const fs = base * 0.12;
  return (
    <>
      <div style={{
        width: fs * 2, height: fs * 2, borderRadius: '50%',
        background: '#C6FF3B',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 10px rgba(198,255,59,0.4)',
      }}>
        <svg viewBox="0 0 20 20" fill="none" style={{ width: fs * 1.3, height: fs * 1.3 }}>
          <path d="M4 10l5 5 7-7" stroke="#0D1117" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={{ fontSize: fs * 1.2, fontWeight: 800, color: '#1a4a1a' }}>Paid!</span>
      <span style={{ fontSize: fs * 0.6, color: '#666' }}>Thank you</span>
    </>
  );
}

// NFC contactless payment hand icon — like the one on the device screen
function NfcHandIcon({ size, active }: { size: number; active?: boolean }) {
  const color = active ? '#111' : '#555';
  return (
    <div style={{
      width: size * 1.4, height: size,
      borderRadius: size * 0.15,
      border: `1.5px solid ${active ? '#333' : '#aaa'}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: size * 0.1,
    }}>
      <svg viewBox="0 0 40 28" fill="none" style={{ width: '100%', height: '100%' }}>
        {/* Hand silhouette simplified */}
        <path d="M8 20 Q8 26 14 26 L26 26 Q32 26 32 20 L32 14 Q32 10 28 10 L26 10 L26 8 Q26 5 23 5 Q20 5 20 8 L20 10 L18 10 L18 7 Q18 4 15 4 Q12 4 12 7 L12 10 Q10 10 9 12 L8 16 Z"
          fill={color} opacity="0.15" />
        {/* NFC waves */}
        <path d="M18 10 Q21 7 24 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M15 8 Q20 3 25 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M13 6 Q20 0 27 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
        {/* Hand base */}
        <path d="M10 22 Q10 25 15 25 L25 25 Q30 25 30 22 L30 16 Q30 13 27 13 L26 13 L26 11 Q26 9 24 9 Q22 9 22 11 L22 13 L20 13 L20 10 Q20 8 18 8 Q16 8 16 10 L16 13 Q14 13 13 15 L12 18 Z"
          fill={color} opacity="0.7" />
      </svg>
    </div>
  );
}
