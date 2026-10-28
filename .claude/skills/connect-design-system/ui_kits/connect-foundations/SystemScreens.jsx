const { ShadowCard, Spacer, ContainerSpacer, SpacingRow, Icon, Logo, Isotype } = window.ConnectDesignSystem_a5c051;

const SPEC = { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 16 };
const META = { fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: 'var(--connect-gray)', textTransform: 'uppercase', whiteSpace: 'nowrap' };
const GROUP = { fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 12, letterSpacing: '0.08em', color: 'var(--text-title)', textTransform: 'uppercase', marginBottom: 20, display: 'block' };

function Specimen({ cls, label, meta }) {
  return (
    <div style={SPEC}>
      <span className={cls} style={{ color: 'var(--text-title)' }}>{label}</span>
      <span style={META}>{meta}</span>
    </div>
  );
}

function TypographyScreen() {
  return (
    <Page id="type">
      <SideNote status="TIPOGRAFÍA" title="Poppins">
        {'Poppins es la familia tipográfica principal de Connect. Su estructura es geométrica y aporta modernidad y tecnología, ideal para ecosistemas digitales.\n\nIBM Plex Mono acompaña al ecosistema digital. Ilustra la relación única entre el ser humano y la máquina.'}
      </SideNote>
      <div style={{ flex: 1, maxWidth: 820 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 28, marginBottom: 18 }}>
          {['SIZE', 'LINE HEIGHT', 'LETTER SPACING', 'WEIGHT'].map((t) => <span key={t} style={META}>{t}</span>)}
        </div>
        <span style={{ ...GROUP, color: 'var(--cyan-600)' }}>headings</span>
        <Specimen cls="cx-title-hero" label="Title Hero" meta="64PX · 120% · -3,5% · BOLD" />
        <Specimen cls="cx-h1" label="Heading 1" meta="40PX · 120% · -2% · BOLD" />
        <Specimen cls="cx-h2" label="Heading 2" meta="32PX · 120% · -1% · BOLD" />
        <Specimen cls="cx-h3" label="Heading 3" meta="28PX · 120% · 0% · BOLD" />
        <Specimen cls="cx-h4" label="Heading 4" meta="20PX · 120% · 0% · BOLD" />
        <span style={{ ...GROUP, marginTop: 40 }}>sub</span>
        <Specimen cls="cx-subtitle" label="Subtitle" meta="32PX · 120% · MEDIUM" />
        <Specimen cls="cx-subheading" label="Subheading" meta="28PX · 120% · MEDIUM" />
        <span style={{ ...GROUP, marginTop: 40 }}>body</span>
        <Specimen cls="cx-body" label="Body Base" meta="14PX · 140% · 0% · REGULAR" />
        <Specimen cls="cx-body-strong" label="Body Strong" meta="14PX · 140% · SEMIBOLD" />
        <Specimen cls="cx-body-emphasis" label="Body Emphasis" meta="14PX · 140% · MEDIUM ITALIC" />
        <Specimen cls="cx-body-link" label="Body Link" meta="14PX · 140% · REGULAR" />
        <Specimen cls="cx-body-small" label="Body Small" meta="12PX · 140% · REGULAR" />
        <Specimen cls="cx-body-small-strong" label="Body Small Strong" meta="12PX · 140% · SEMIBOLD" />
        <span style={{ ...GROUP, marginTop: 40 }}>captions</span>
        <Specimen cls="cx-caption" label="Caption base" meta="12PX · 140% · +8% · SEMIBOLD" />
        <Specimen cls="cx-caption-small" label="Caption small" meta="10PX · 140% · +12% · SEMIBOLD" />
        <span style={{ ...GROUP, marginTop: 40 }}>actions</span>
        <Specimen cls="cx-button-large" label="Button large" meta="14PX · 140% · +4% · BOLD" />
        <Specimen cls="cx-button-small" label="Button small" meta="12PX · 140% · +6% · SEMIBOLD" />
        <Specimen cls="cx-link" label="Link" meta="14PX · 140% · +6% · MEDIUM" />
        <Specimen cls="cx-link-small" label="Link small" meta="12PX · 140% · +6% · MEDIUM" />
      </div>
    </Page>
  );
}

const STEPS = [['01','0.25rem','4px'],['02','0.5rem','8px'],['03','0.75rem','12px'],['04','1rem','16px'],['05','1.25rem','20px'],['06','1.5rem','24px'],['08','2rem','32px'],['10','2.5rem','40px'],['12','3rem','48px'],['16','4rem','64px'],['20','5rem','80px'],['24','6rem','96px'],['32','8rem','128px'],['40','10rem','160px'],['48','12rem','192px'],['56','14rem','224px'],['64','16rem','256px']];
const GRIDS = [['Desktop 1,280px', 1280, 12, 32, 1216], ['Tablet 768px', 768, 8, 32, 704], ['iPhone 375px', 375, 4, 16, 343]];

function SpacingScreen() {
  return (
    <Page id="spacing">
      <SideNote status="LAYOUT" title="Spacing & Grids">
        {'La escala de espaciado avanza en múltiplos de 4px (17 pasos, de 4px a 256px).\n\nLos grids se definen en tres breakpoints: 12 columnas en desktop, 8 en tablet y 4 en móvil.'}
      </SideNote>
      <div style={{ flex: 1 }}>
        <span style={GROUP}>spacing scale</span>
        <div style={{ display: 'flex', gap: 64, marginBottom: 56, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
              {['01','02','03','04','05','06','08','10','12'].map((s) => <div key={s} style={{ marginRight: 24 }}><Spacer size={s} /></div>)}
            </div>
            {STEPS.slice(0, 9).map(([s, r, p]) => <SpacingRow key={s} step={s} rem={r} px={p} />)}
          </div>
          <div>{STEPS.slice(9).map(([s, r, p]) => <SpacingRow key={s} step={s} rem={r} px={p} />)}</div>
        </div>
        <span style={GROUP}>containers</span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 56 }}>
          {['sm - 640px','md - 768px','lg - 1024px','xl - 1280px'].map((s) => <ContainerSpacer key={s} size={s} style={{ maxWidth: '100%' }} />)}
        </div>
        <span style={GROUP}>grids</span>
        {GRIDS.map(([label, w, cols, gutter, content]) => (
          <div key={label} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="cx-h4" style={{ color: 'var(--text-title)' }}>{label}</span>
              <span style={META}>{cols} COL · {gutter}PX GUTTER · {content.toLocaleString('en-US')}PX CONTENT</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: gutter / 2, background: 'var(--neutral-100)', padding: gutter / 2, borderRadius: 8 }}>
              {Array.from({ length: cols }).map((_, i) => <div key={i} style={{ height: 56, background: 'var(--doc-spacer-fill)' }} />)}
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

function EffectsScreen() {
  return (
    <Page id="effects">
      <SideNote status="EFECTOS" statusColor="#55617A" title="Drop Shadows">
        {'Las sombras permiten agregar profundidad y realismo a los diseños, posicionando los elementos en el eje Z.\n\nLos desenfoques de fondo se utilizan con fines estéticos, y al igual que las sombras sitúan los elementos en el eje Z.'}
      </SideNote>
      <div style={{ flex: 1 }}>
        <span style={GROUP}>drop shadows</span>
        <div style={{ display: 'flex', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
          {['xs','sm','md','lg','xl'].map((l) => <ShadowCard key={l} level={l} style={{ width: 200, height: 180 }} />)}
        </div>
        <span style={GROUP}>blurs</span>
        <div style={{ width: '100%', maxWidth: 1024, aspectRatio: '4 / 3', background: 'url(../../assets/images/blur-sample.png) center/cover', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(4,1fr)', gap: '18px 59px', padding: '74px 66px', boxSizing: 'border-box', borderRadius: 12 }}>
          {['sm','sm','md','md','lg','lg','xl','xl'].map((size, i) => {
            const dark = i % 2 === 1;
            return (
              <div key={i} style={{
                borderRadius: 12, background: dark ? 'var(--glass-dark)' : 'var(--glass-light)',
                backdropFilter: `var(--blur-${size})`, WebkitBackdropFilter: `var(--blur-${size})`,
                boxShadow: dark ? 'var(--glass-dark-hairline)' : 'var(--glass-light-hairline)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 30, lineHeight: '38px',
                color: dark ? '#fff' : '#171717',
              }}>{size} {dark ? 'dark' : 'light'}</div>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

const ICONS = ['truck','shield-check','wrench','brain-circuit','users','layout-dashboard','map-pin','bell','settings','search','chart-line','circle-alert','calendar','file-text','fuel','gauge','clipboard-check','headset','route','battery-charging','hard-hat','box','building-2','credit-card','phone','mail','download','filter','pencil','trash-2','lock','plus'];

function IconsScreen() {
  return (
    <Page id="icons">
      <SideNote status="ICONOS" title="Sistema de íconos">
        {'El sistema de íconos está basado en Lucide, una colección de código abierto. Cada icono está diseñado en una cuadrícula de 24x24, haciendo hincapié en la sencillez, coherencia y legibilidad.\n\nGeometría redondeada: terminaciones redondeadas, coherentes con el Design System.\n\nColor: Navy o Gris por defecto.'}
      </SideNote>
      <div style={{ flex: 1 }}>
        <span style={GROUP}>lucide · 24×24</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: 28, color: 'var(--connect-navy)', marginBottom: 56 }}>
          {ICONS.map((n) => (
            <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <Icon name={n} size={24} />
              <span style={{ fontFamily: 'var(--font-primary)', fontSize: 10, color: 'var(--connect-gray)', textAlign: 'center' }}>{n}</span>
            </div>
          ))}
        </div>
        <span style={GROUP}>identidad de marca</span>
        <div style={{ display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <Logo lockup="connect" size={36} />
          <Logo lockup="divemotor" size={40} />
          <Logo lockup="ai" size={36} />
          <Isotype size={56} />
        </div>
        <div style={{ background: 'var(--gradient-surface)', borderRadius: 16, padding: 48, display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <Logo lockup="connect" darkMode size={36} />
          <Isotype darkMode size={56} />
          <Isotype variant="negative" size={56} />
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { TypographyScreen, SpacingScreen, EffectsScreen, IconsScreen });
