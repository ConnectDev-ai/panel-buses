# Connect — foundations book (UI kit)

A click-through recreation of the seven spec pages inside **Design System - Connect.fig**
(page `UI-KIT - Connect`). It is the only "product surface" the source file defines:
Connect ships a documentation book, not an application, so this kit reproduces that book
rather than inventing screens.

| Screen | Source frame |
| --- | --- |
| `basics` | Color -> Basics (40:287) |
| `palette` | Color -> Palette Light (43:1183) + Palette Dark (85:278), toggled live |
| `gradient` | Color -> Gradient (41:417) |
| `type` | Typography (42:555) |
| `spacing` | Spacing (190:x) + Grids |
| `effects` | Drop Shadows (43:1320) + Blurs (183:108) |
| `icons` | Icons (64:3688) + Logo (Logos page) |

Files: `index.html` (nav + mount), `Shell.jsx` (Banner/SideNote/Page chrome),
`ColorScreens.jsx`, `SystemScreens.jsx`. Every screen composes the published
components — `Banner`, `ShadowCard`, `Spacer`, `ContainerSpacer`, `SpacingRow`,
`Icon`, `Logo`, `Isotype` — and reads colour, type and spacing from `styles.css`.
