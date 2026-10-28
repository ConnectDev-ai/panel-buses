# Connect — Design System

Connect es el ecosistema digital operacional del **Grupo Kaufmann**, presentada como una familia de módulos -- **Flota**, **Care**, **AI**, **Seguridad**, **Talleres**, **Clientes** y **Workspace** -- cada uno con su propia identidad cromática dentro de un espectro Connect compartido. El lenguaje del producto es Español (Latino Americano), de carácter técnico y dirigido a profesionales del sector de flotas y postventa.

Este sistema de diseño es una transcripción directa del archivo que se proporcionó al equipo. Toda la paleta cromática, pesos tipográficos, valores de espaciado, radios, sombras, blur y degradados que aparecen a continuación se ha traspasado del archivo de Figma; nada se a redondeado a una grilla de 4/8 px ni se ha tomado de una biblioteca pública.

## Sources

| Source | Detalle |
| --- | --- |
| Figma file | **"Design System - Connect.fig"**, mounted as a virtual filesystem. Pages: `Cover`, `Logos` (8 sections), `UI-KIT - Connect` (11 spec frames). 6,763 nodes, 1,711 local components. |
| Key frames | Color -> Basics `40:287` · Color -> Palette Light `43:1183` · Color -> Palette Dark `85:278` · Color -> Gradient `41:417` · Typography `42:555` · Spacing `190:*` · Grids · Drop Shadows `43:1320` · Blurs `183:108` · Icons `64:3688` · Logo |
| Uploaded file | `uploads/FullColor.svg` — the Connect logotipo cut for dark surfaces (copied to `assets/logos/connect-fullcolor-negative.svg`). |
| Codebase / repo | None provided. |

No public reference was used as a substitute for the file.

---

## Content fundamentals

**Language.** Spanish, Latin-American register, with English retained for system nouns the team already uses in code and in Figma: *Background*, *Body fonts*, *Dividers*, *Surface / Cards*, *Main*, *Text intermediate*, *Borders active focus*. Do not translate those — the file mixes deliberately, e.g. `600 Light fonts / Secondary text`, `400 (Main) Gráficos Fondos`.

**Voice.** Declarative and explanatory, never promotional. Sentences state what a thing *is* and what it *is for*:

> "Del violeta profundo al cian de datos. Una progresión que va desde la inteligencia a la información en tiempo real."

> "Se suele utilizar para fondos, bordes, textos y botones y acciones secundarios."

> "Para llamar la atención de los usuarios sobre mensajes y estados del sistema con fines informativos."

**Person.** Impersonal third person and impersonal *se* ("se suele utilizar", "se pueden modificar"). Second person appears only in developer-facing lines ("importar a tu app"). First person is never used.

**Casing.** Sentence case for headings and body. `UPPERCASE` is reserved for the mono caption styles — status chips (`UI KIT`, `PALETA COLORES UI`, `TIPOGRAFÍA`, `EFECTOS`, `ICONOS`, `GRADIENTS`, `IDENTIDAD DE MARCA`), section eyebrows (`headings`, `body`, `captions`, `actions` — these stay lowercase in the source) and spec labels (`LINE HEIGHT`, `LETTER SPACING`, `WEIGHT`).

**Numbers and units.** Always explicit and lowercase-`px`: `24px`, `0.25rem`, `1,280px` (comma thousands separator), `⍺ 135°`, `+8%`, `-3,5%` (comma decimal in Spanish copy). Ramp steps are bare numbers with the main step marked in parentheses: `600 (Main)`.

**Arrows and separators.** Page titles use a spaced right arrow: `Colors → Basics`, `Colors → Palette Dark`. Sub-brands use an underscore in Figma layer names (`Logotipo - Connect_ submarcas`) but a plain space in UI.

**Emoji.** Never. Not one appears anywhere in the source file.

**Vibe.** Instrumental. The system reads like an engineering datasheet that happens to be beautifully set — mono captions, exact values, no adjectives that can't be measured.

---

## Visual foundations

**Colour.** One spectrum, twelve base colours, running "del violeta profundo al cian de datos": AI `#5322B5` → Violeta `#6A1B9A` → Púrpura `#8E3CD9` → Blue `#2563EB` → Cyan `#00B4DB`, with Care `#0E9AA7`, Fleet `#0EA78C`, Safety `#FE931A` as module accents and Navy `#0E1323` / Gray `#6B7280` / Mist `#F3F4F6` / White as the neutral spine. Eight 10-step ramps (50→900) plus four 6-step semantic ramps (100→600) plus a 10-step neutral ramp whose 50 is pure white. **Proportion is a rule, not a suggestion: 70% neutrales, 22% Violeta y Azul as brand colour, 8% Cian for accents, data and active states.** Semantic mains all sit at 400; module mains at 500 (Safety) or 600 (Fleet, Care, AI).

**Dark mode.** A full second palette, not a filter. Neutral 50 becomes the darkest surface (`#0E1323`) and 900 becomes white; module ramps drop saturation and brightness; semantic mains lighten to `#F87171` / `#FBBF24` / `#60A5FA` / `#34D399` so they read as text and icons, with the 100 step becoming the alert container background.

**Gradients.** Always linear, always two or four stops, always at a named angle. The master gradient is `85.43°` through `#6A1B9A → #8E3CD9 → #2563EB → #00B4DB`. Module gradients run `108°` from the ramp's 800 to its main. Pillar gradients (Clientes, Workspace) run `135°`. Transitions must be smooth: "sin bandas visibles ni cortes duros", and never behind long body copy.

**Type.** **Poppins** carries everything structural — geometric, modern, "ideal para ecosistemas digitales". **IBM Plex Mono** carries captions, labels and data, "la relación única entre el ser humano y la máquina". Headings are Bold at 120% line-height with tracking that tightens as size grows (`-3.5%` at 64px → `0%` at 20px). Body and captions sit at 140%. Actions carry *positive* tracking (`+4%` / `+6%`); captions carry a lot (`+8%` / `+12%`) and are always uppercase. Sub styles are Medium, the only place the system goes mid-weight at size.

**Spacing.** A strict 4px scale, 17 steps: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 224, 256. Spec pages annotate gaps with a violet-tinted band (`rgba(158,119,237,0.1)`) labelled in `#6941C6`, and dimensions with a red rule in `#DC2626`.

**Layout.** Three breakpoints: desktop 1,280px (12 columns, 32px gutter, 32px margin, 1,216px content), tablet 768px (8 / 32 / 32 / 704), mobile 375px (4 / 16 / 16 / 343). Container widths are 640 / 768 / 1024 / 1280. Spec pages are a fixed two-column read: a 300px annotation rail on the left, content on the right, 48px page margin, banner full-bleed at the top.

**Corner radii.** 4px for status chips, **8px for buttons, swatches and gradient cards**, 12px for cards and glass panels, 16px for page containers. Nothing is fully rounded except dots and pills.

**Cards.** White, 12px radius, a 1px `rgba(0,0,0,0.1)` hairline drawn as an inset ring, and one of the five drop shadows. Swatches instead use an 8px radius with a `#DDDDDD` inset ring; gradient cards use an 8px radius with a `#D4DBEA` inset ring. Borders are always drawn as inset box-shadows so they never change layout.

**Shadows.** Five steps, all near-black at very low alpha — `xs`/`sm` `0 1px 2px rgba(0,0,0,.05)`, `md` `0 4px 8px -2px rgba(0,0,0,.1) + 0 2px 4px -2px rgba(0,0,0,.06)`, `lg` `0 12px 16px -4px rgba(0,0,0,.08) + 0 4px 6px -2px rgba(0,0,0,.03)`, `xl` `0 20px 24px -4px rgba(0,0,0,.08) + 0 8px 8px -4px rgba(0,0,0,.03)`. There is no inner-shadow system; every "border" is a hairline ring.

**Transparency and blur.** Used only for glass panels over imagery: a 12px-radius panel filled `rgba(255,255,255,0.6)` (light) or `rgba(14,19,35,0.6)` (dark), `backdrop-filter: blur(4px)` upward through 8/16/24, with a `rgba(255,255,255,0.5)` inset hairline. Never for text panels on flat colour.

**Backgrounds.** Flat. White or Neutral-100 for light pages, Navy `#0E1323` for banners and dark surfaces, the master gradient for hero surfaces and data accents. No repeating patterns, no textures, no hand-drawn illustration. Photography appears once, full-bleed, behind the blur specimens — cool-toned, no grain, no duotone.

**Imagery colour.** Cool and neutral; the palette is never used to tint photography.

**Animation.** The source file specifies none. Keep motion to short functional transitions — 120ms on colour and shadow, ease — and no bounce, no parallax, no entrance choreography.

**Hover / press.** Hover darkens rather than lightens (primary `#7F56D9` → `#6941C6`); secondary and tertiary hover by dropping onto the next surface tint (`--neutral-100`, `--ai-50`). Focus is a 4px translucent ring outside the 1px border (`rgba(158,119,237,.24)` for colour hierarchies, `rgba(148,163,184,.24)` for gray). Press is a colour change, never a scale. Disabled drops to `--neutral-200` / `--text-placeholder` with no shadow.

**Protection.** The banner is a solid navy block, never a gradient scrim — Connect protects type with an opaque surface, not a fade.

---

## Iconography

**Lucide, unmodified.** The Icons page states it outright: the system "está basado en Lucide, una colección de código abierto", every glyph drawn on a **24×24** grid, "haciendo hincapié en la sencillez, coherencia y legibilidad", with **rounded terminations** and all strokes converted to single vectors so colour changes hold across variants. The page also tells developers to install Lucide's official packages (Web, React, React Native, Vue, Svelte, NodeJS, Flutter).

- **Default colour: Navy or Gray.** Module colours are for module badges, not for UI icons.
- **Size:** 24px is the grid; 16/20px are acceptable at small densities, 32px+ for feature marks.
- **No emoji, ever.** No unicode characters used as icons. No PNG icons.
- **No hand-drawn SVG.** If a glyph is missing from Lucide, ask — don't draw one.

The `.fig` embeds \~1,668 Lucide glyphs as vector copies. Rather than duplicate the library into this project, `components/icons/Icon.jsx` renders the official Lucide SVGs from the pinned CDN (`lucide-static@0.544.0`) — the same source the file points developers at. Flagged as a deliberate substitution: swap `CDN` in that file for a local sprite if you need offline builds.

Brand marks are real SVG exports from the file, in `assets/logos/` — never redrawn.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | The single entry point. Nothing but `@import` lines. |
| `tokens/fonts.css` | Poppins, IBM Plex Mono, IBM Plex Sans and Inter from Google Fonts. |
| `tokens/colors.css` | Base colours, 12 ramps, semantic ramps, semantic aliases. |
| `tokens/colors-dark.css` | The full dark palette under `[data-theme="dark"]`. |
| `tokens/typography.css` | Families, sizes, weights, line-heights, tracking. |
| `tokens/text-styles.css` | The 18 named text styles as `.cx-*` classes. |
| `tokens/spacing.css` | The 17-step 4px scale. |
| `tokens/layout.css` | Radii, container widths, the three grids. |
| `tokens/effects.css` | Shadows, blurs, glass, the eight gradients. |
| `tokens/base.css` | Element defaults (body, headings, links, selection). |
| `assets/logos/` | Logotipo, Divemotor lockup, AI sub-brand, isotype cuts, wordmark, orbital. |
| `assets/images/` | The photograph used behind the blur specimens. |
| `guidelines/*.card.html` | 24 foundation specimen cards (Colors, Type, Spacing, Effects). |
| `ui_kits/connect-foundations/` | Click-through recreation of the seven spec pages. |
| `SKILL.md` | Agent-Skills front matter for use outside this project. |

### Components

Grouped by concern under `components/`. This is the file's complete inventory — ten Figma component families plus the standalone symbols it defines.

**`components/actions/`**

- **Button** — `Buttons/Button` (528 variants: Size 4 × Hierarchy 7 × Icon 5 × State 4).
- **ButtonBase** — `_Button base` (20 variants), the geometry layer.
- **Dot** — `_Dot` (3 sizes), the status dot inside Button.
- **Circle** — `circle`, the default icon slot glyph.

**`components/brand/`**

- **Logo** — `Logo` (Dark Mode ×2) plus the Divemotor and AI lockups.
- **Isotype** — `Isotype` (Dark mode ×2) plus the positive/negative cuts.
- **Banner** — `Banner`, the navy spec-page header.

**`components/docs/`** — the annotation kit the file uses to document itself.

- **ShadowCard** — `_Shadow card`, the elevation specimen and canonical card shape.
- **DesignNote** — `Design note` (2 sizes).
- **Spacer** — `Spacer` (Direction ×2, Size ×17).
- **ContainerSpacer** — `Container spacer` (4 widths).
- **SpacingRow** — `_Spacing`, one row of the spacing table.
- **MeasureLine** — `Measure line` (Number position ×4).
- **MeasureLineBase** — `_Measure line base` (Type ×2).
- **Container** — `_Container`, the outlined breakpoint frame.

**`components/icons/`**

- **Icon** — Lucide wrapper. *Intentional addition*: the file defines \~1,668 individual glyph symbols rather than a component; a single wrapper is the usable form of that inventory.

### Intentional additions

- **Icon** (above) — one wrapper standing in for 1,668 glyph symbols.
- **`BUTTON_SIZES`** and **`SPACER_STEPS`** exports — the size tables, surfaced so consumers can build new hierarchies without re-deriving padding.

---

## Known gaps — please confirm

1. **Button hierarchy colours.** In the `.fig`, all 528 Button variants render with the same purple fill: their per-hierarchy and per-state fills are *unresolved library style references*, so the file carries no readable value for `secondary color`, `secondary gray`, `tertiary color`, `tertiary gray`, `link color` or `link gray`. Geometry, typography and the primary fill (`#7F56D9`, hover `#6941C6`, ring `#9E77ED` — all literal values in the file) are exact. The other six hierarchies are derived from Connect's own neutral and AI ramps and should be checked against the source library.
2. **Sub-brand lockups.** The Logos page defines seven Connect sub-brand lockups and five Divemotor ones, but only the base variant (`AI`) exports as a distinct SVG; the rest are instance overrides. Only `connect-ai-light-fullcolor.svg` was copied.
3. **Subtitle / Subheading tracking.** The specimen text reads `0%` while the rendered layer carries `-2%`. The rendered value was used.
4. **Safety-50 and Neutral-50 are both `#FFFFFF`** in the light palette. Transcribed as-is.
5. **No Figma Variables or text styles** are defined in the file (no token collections, no named text styles) — the type scale was read off the Typography spec page instead.
