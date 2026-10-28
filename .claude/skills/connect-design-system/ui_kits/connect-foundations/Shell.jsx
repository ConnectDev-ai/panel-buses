const { Banner, DesignNote } = window.ConnectDesignSystem_a5c051;

const PAGES = [
  { id: 'basics', eyebrow: 'ui kit', title: 'Colors → Basics' },
  { id: 'palette', eyebrow: 'paleta colores ui', title: 'Colors → Palette' },
  { id: 'gradient', eyebrow: 'gradients', title: 'Colors → Gradient' },
  { id: 'type', eyebrow: 'tipografía', title: 'Fonts' },
  { id: 'spacing', eyebrow: 'layout', title: 'Spacing & Grids' },
  { id: 'effects', eyebrow: 'efectos', title: 'Drop Shadows & Blurs' },
  { id: 'icons', eyebrow: 'iconos', title: 'Icons' },
];

function SideNote({ status, statusColor, title, children }) {
  return (
    <aside style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ alignSelf: 'flex-start', borderRadius: 4, background: statusColor || 'var(--doc-status-bg)', padding: '16px 12px', display: 'flex', alignItems: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, lineHeight: 0.9, letterSpacing: '0.04em', color: '#fff', textTransform: 'uppercase' }}>{status}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 className="cx-h3" style={{ color: 'var(--text-title)' }}>{title}</h2>
        <div className="cx-body" style={{ color: 'var(--text-title)', whiteSpace: 'pre-line' }}>{children}</div>
      </div>
    </aside>
  );
}

function Nav({ page, setPage }) {
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', gap: 2, padding: '10px 48px', background: 'var(--neutral-900)', borderBottom: '1px solid rgba(255,255,255,0.08)', flexWrap: 'wrap' }}>
      {PAGES.map((p) => (
        <button key={p.id} onClick={() => setPage(p.id)} style={{
          appearance: 'none', border: 0, cursor: 'pointer', borderRadius: 4, padding: '8px 12px',
          fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase',
          background: page === p.id ? 'var(--cyan-600)' : 'transparent',
          color: page === p.id ? 'var(--connect-navy)' : 'rgba(255,255,255,0.65)',
        }}>{p.id}</button>
      ))}
    </nav>
  );
}

function Page({ id, children }) {
  const meta = PAGES.find((p) => p.id === id);
  return (
    <div style={{ background: 'var(--neutral-50)', minHeight: '100%' }}>
      <Banner eyebrow={meta.eyebrow} title={meta.title} />
      <div style={{ display: 'flex', gap: 106, padding: '60px 48px 96px' }}>{children}</div>
    </div>
  );
}

Object.assign(window, { PAGES, SideNote, Nav, Page });
