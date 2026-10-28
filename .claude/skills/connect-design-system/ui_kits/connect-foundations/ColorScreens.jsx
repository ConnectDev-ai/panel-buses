const { DesignNote } = window.ConnectDesignSystem_a5c051;

const SwatchCard = ({ name, hex }) => (
  <div style={{ borderRadius: 8, boxShadow: 'inset 0 0 0 1px var(--doc-hairline)', overflow: 'hidden' }}>
    <div style={{ height: 70, background: hex }} />
    <div style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: 18, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--text-title)' }}>{name}</span>
      <span style={{ fontFamily: 'var(--font-primary)', fontSize: 14, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--connect-gray)' }}>{hex}</span>
    </div>
  </div>
);

const BASICS = {
  Base: [['Navy', '#0E1323'], ['Gray', '#6B7280'], ['Mist', '#F3F4F6'], ['White', '#FFFFFF']],
  Primary: [['Violeta', '#6A1B9A'], ['Purple', '#8E3CD9'], ['Blue', '#2563EB'], ['Cyan', '#00B4DB']],
  Productos: [['AI', '#5322B5'], ['Safety', '#FE931A'], ['Fleet', '#0EA78C'], ['Care', '#0E9AA7']],
};

function ColorsBasics() {
  return (
    <Page id="basics">
      <SideNote status="UI KIT" statusColor="var(--violeta-600)" title="Proporción de uso">
        {'70% neutrales\n22% Violeta y Azul como color de marca.\n8% Cian para acentos, datos y estados activos.'}
      </SideNote>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40 }}>
        <p className="cx-body" style={{ maxWidth: 620, color: 'var(--text-title)' }}>
          <strong>El espectro Connect.</strong> Del violeta profundo al cian de datos. Una progresión que va desde la inteligencia a la información en tiempo real.
        </p>
        {Object.entries(BASICS).map(([group, rows]) => (
          <section key={group}>
            <h3 className="cx-h3" style={{ color: 'var(--text-title)', paddingBottom: 12, borderBottom: '1px solid var(--connect-gray)', marginBottom: 24 }}>{group}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
              {rows.map(([n, h]) => <SwatchCard key={n} name={n} hex={h} />)}
            </div>
          </section>
        ))}
      </div>
    </Page>
  );
}

const RAMPS = [
  { label: 'Cian', prefix: 'cyan', main: 600 },
  { label: 'Azul', prefix: 'blue', main: 500 },
  { label: 'Púrpura', prefix: 'purple', main: 500 },
  { label: 'Violeta', prefix: 'violeta', main: 600 },
];
const MODULES = [
  { label: 'Safety', prefix: 'safety', main: 500 },
  { label: 'Fleet', prefix: 'fleet', main: 600 },
  { label: 'Care', prefix: 'care', main: 600 },
  { label: 'AI', prefix: 'ai', main: 600 },
];
const SEMANTIC = ['error', 'warning', 'info', 'success'];
const NEUTRAL_NOTES = { 100: '100 Background', 400: '400\nIcons Strong Borders', 600: '600\nLight fonts\nSecondary text', 700: '700\nText intermediate', 800: '800\nBody fonts\n(principal)', 900: '900\nDark fonts\nTitulos' };

function Ramp({ label, prefix, main, steps = [50,100,200,300,400,500,600,700,800,900], notes }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: 18, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'var(--text-title)', marginBottom: 16 }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length},1fr)`, gap: 13 }}>
        {steps.map((n) => (
          <div key={n}>
            <div style={{ height: 60, borderRadius: 8, background: `var(--${prefix}-${n})`, boxShadow: 'inset 0 0 0 1px var(--doc-swatch-border)' }} />
            <div style={{ fontFamily: 'var(--font-primary)', fontSize: 12, lineHeight: 1.3, letterSpacing: '-0.02em', color: 'var(--connect-gray)', marginTop: 13, whiteSpace: 'pre-line' }}>
              {(notes && notes[n]) || (n === main ? `${n} (Main)` : n)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorPalette({ dark, setDark }) {
  return (
    <Page id="palette">
      <SideNote status="PALETA COLORES UI" title={dark ? 'Dark mode' : 'Light mode'}>
        {dark
          ? 'El 50 pasa a ser el color más oscuro de la UI y las escalas más altas son para los textos. Los módulos reducen su opacidad y brillo para encajar en el entorno oscuro.'
          : 'Neutral se usa para fondos, bordes, textos y acciones secundarias. Los módulos son los colores predominantes por cada módulo de Connect.'}
      </SideNote>
      <div style={{ flex: 1 }} data-theme={dark ? 'dark' : undefined}>
        <button onClick={() => setDark(!dark)} style={{
          appearance: 'none', border: 0, cursor: 'pointer', borderRadius: 4, padding: '10px 14px', marginBottom: 32,
          fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
          background: 'var(--connect-navy)', color: '#fff',
        }}>{dark ? 'Ver light mode' : 'Ver dark mode'}</button>
        <div style={{ background: dark ? 'var(--neutral-50)' : 'transparent', padding: dark ? 24 : 0, borderRadius: 16 }}>
          <h3 className="cx-h3" style={{ color: 'var(--text-title)', paddingBottom: 12, borderBottom: '1px solid var(--connect-gray)', marginBottom: 24 }}>Primary</h3>
          {RAMPS.map((r) => <Ramp key={r.prefix} {...r} />)}
          <h3 className="cx-h3" style={{ color: 'var(--text-title)', paddingBottom: 12, borderBottom: '1px solid var(--connect-gray)', margin: '8px 0 24px' }}>Neutral</h3>
          <Ramp label="Neutral" prefix="neutral" notes={NEUTRAL_NOTES} />
          <h3 className="cx-h3" style={{ color: 'var(--text-title)', paddingBottom: 12, borderBottom: '1px solid var(--connect-gray)', margin: '8px 0 24px' }}>Modules</h3>
          {MODULES.map((r) => <Ramp key={r.prefix} {...r} />)}
          <h3 className="cx-h3" style={{ color: 'var(--text-title)', paddingBottom: 12, borderBottom: '1px solid var(--connect-gray)', margin: '8px 0 24px' }}>Semantic</h3>
          {SEMANTIC.map((p) => <Ramp key={p} label={p[0].toUpperCase() + p.slice(1)} prefix={p} main={400} steps={[100,200,300,400,500,600]} />)}
        </div>
      </div>
    </Page>
  );
}

const GRADIENTS = [
  ['Master', 'var(--gradient-master)', '#6A1B9A', '⍺ 85.43°', '#00B4DB'],
  ['Safety', 'var(--gradient-safety)', '#7E4301', '⍺ 108°', '#FE931A'],
  ['Fleet', 'var(--gradient-fleet)', '#06493D', '⍺ 108°', '#0EA78C'],
  ['Care', 'var(--gradient-care)', '#064349', '⍺ 108°', '#0E9AA7'],
  ['AI', 'var(--gradient-ai)', '#2C125F', '⍺ 108°', '#5322B5'],
  ['Clientes', 'var(--gradient-clientes)', '#2563EB', '⍺ 135°', '#00B4DB'],
  ['Workspace', 'var(--gradient-workspace)', '#6A1B9A', '⍺ 135°', '#8E3CD9'],
  ['Surface', 'var(--gradient-surface)', '#0E1323', '⍺ 90°', '#1B2440'],
];

function ColorGradient() {
  return (
    <Page id="gradient">
      <SideNote status="GRADIENTS" title="Marca">
        {'Gradientes maestro (de Connect) y de pilares principales. Se utiliza en fondos, superficies amplias y en acentos de datos.\n\nGradientes diseñados por módulo para dar identidad a la sub-marca, manteniendo la identidad principal de Connect.'}
      </SideNote>
      <div style={{ flex: 1 }}>
        <div style={{ borderRadius: 8, boxShadow: 'inset 0 0 0 1px var(--doc-hairline)', overflow: 'hidden', marginBottom: 32 }}>
          <div style={{ height: 70, background: 'var(--gradient-master)' }} />
          <div style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: 18, lineHeight: 0.9, letterSpacing: '-0.02em' }}>Master</span>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-primary)', fontSize: 14, color: 'var(--connect-gray)' }}>
              <span>#6A1B9A</span><span>#8E3CD9</span><span>⍺ 85.43°</span><span>#2563EB</span><span>#00B4DB</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
          {GRADIENTS.slice(1).map(([n, g, a, ang, b]) => (
            <div key={n} style={{ borderRadius: 8, boxShadow: 'inset 0 0 0 1px var(--doc-hairline)', overflow: 'hidden' }}>
              <div style={{ height: 70, background: g }} />
              <div style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontFamily: 'var(--font-primary)', fontWeight: 600, fontSize: 18, lineHeight: 0.9, letterSpacing: '-0.02em' }}>{n}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-primary)', fontSize: 12, color: 'var(--connect-gray)' }}>
                  <span>{a}</span><span>{ang}</span><span>{b}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { ColorsBasics, ColorPalette, ColorGradient });
