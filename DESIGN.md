---
version: alpha
name: Forest Flower

# ── Colour source of truth ───────────────────────────────────────────────────
# Four brand seeds (+ status seeds). Each is a hue and a chroma in CIE LCh(ab);
# a seed's tonal palette is every lightness 0–100 at that hue. A role is a tone
# (L*) picked from one palette, with chroma lowered where needed to stay in
# sRGB. The resolved hexes are in `schemes:` below and in styles/tokens.css.
seeds:
  primary: { hue: 87, chroma: 84 } # Gold — action. Cobalt 2 #FFC600 at tone 83
  secondary: { hue: 118, chroma: 50 } # Green — rest
  neutral: { hue: 131, chroma: 5, achromatic_below: 15 } # Leaf — surfaces
  neutral_variant: { hue: 131, chroma: 10, achromatic_below: 15 } # Leaf — ink
  danger: { hue: 35, chroma: 54 }
  warning: { hue: 58, chroma: 56 }
  info: { hue: 262, chroma: 40 }

# Tone per role, per scheme. Optional `chroma:` caps the palette chroma for that
# role; optional `hue:` overrides it (used once — see Colors › Containers).
# A string is an alias to another role.
roles:
  surface: # neutral — base is the substrate edge; every step is inward
    base: { seed: neutral, light: { tone: 97.1 }, dark: { tone: 0 } }
    recessed1: { seed: neutral, light: { tone: 94.6 }, dark: { tone: 3 } }
    recessed2: { seed: neutral, light: { tone: 92.8 }, dark: { tone: 5.5 } }
    raised: { seed: neutral, light: { tone: 89.8 }, dark: { tone: 8.2 } }
    overlay: { seed: neutral, light: { tone: 86.7 }, dark: { tone: 12.3 } }
  ink: # neutral variant — read tiers meet AA; faint is locate-only
    primary: { seed: neutral_variant, light: { tone: 25 }, dark: { tone: 86 } }
    secondary: { seed: neutral_variant, light: { tone: 37 }, dark: { tone: 72 } }
    comment: { seed: neutral_variant, light: { tone: 43 }, dark: { tone: 62 } }
    faint: { seed: neutral_variant, light: { tone: 70 }, dark: { tone: 50 } }
    on_action: "{surface.base}"
    on_wash: "{ink.primary}"
  accent:
    action: { seed: primary, light: { tone: 38.5 }, dark: { tone: 82.7 } }
    action_container:
      seed: primary
      light: { tone: 92, chroma: 18, hue: 93 }
      dark: { tone: 28, chroma: 18 }
    resting: { seed: secondary, light: { tone: 41.4 }, dark: { tone: 78.6 } }
    resting_container:
      seed: secondary
      light: { tone: 90, chroma: 14 }
      dark: { tone: 28, chroma: 20 }
  status:
    danger: { seed: danger, light: { tone: 34 }, dark: { tone: 73 } }
    warning: { seed: warning, light: { tone: 41 }, dark: { tone: 77 } }
    success: "{accent.resting}"
    info: { seed: info, light: { tone: 34 }, dark: { tone: 75 } }
  illustration: # decorative only — never text, never a boundary
    backdrop: { seed: info, light: { tone: 80, chroma: 18, hue: 255 }, dark: { tone: 78, chroma: 18, hue: 255 } }
  state:
    active: "{accent.action}"
    hover: "{surface.raised}"
    disabled: "{ink.faint}"

# Derived washes: blend(from, alpha, surface.base). α is per-substrate.
washes:
  selection: { from: accent.resting, alpha: { light: 0.24, dark: 0.16 } }
  match_all: { from: accent.action, alpha: { light: 0.25, dark: 0.16 } }

# Syntax palette — a domain palette (Material's "custom colours"), adapted from
# Flexoki; kept as literals because each hue is calibrated per tier.
code:
  keyword: { light: "#66800B", dark: "#A0AF54" }
  operator: { light: "#878580", dark: "#878580" } # constant in both schemes
  function: { light: "#BC5215", dark: "#EC8B49" }
  string: { light: "#24837B", dark: "#5ABDAC" }
  type: { light: "#205EA6", dark: "#66A0C8" }
  tag: { light: "#A02F6F", dark: "#E47DA8" }
  regex: { light: "#5E409D", dark: "#A699D0" }
  number: "{code.regex}"
  variable: "{ink.primary}"
  punctuation: "{ink.comment}"
  comment: "{ink.comment}"

# Pairs that must meet their target. Grounds may differ per scheme (`on_light`).
contrast:
  - fg: [ink.primary, ink.secondary]
    on: [surface.base, surface.recessed1, surface.recessed2, surface.raised, surface.overlay, state.selection, state.match_all]
    min: 4.5
  - fg: [ink.comment]
    on_light: [surface.base, surface.recessed1, surface.recessed2]
    on_dark: [surface.base, surface.recessed1, surface.recessed2, surface.raised, surface.overlay, state.selection, state.match_all]
    min: 4.5
  - fg: [accent.action, accent.resting, status.danger, status.warning, status.info]
    on: [surface.base, surface.recessed1]
    min: 4.5
  - fg: [ink.on_action]
    on: [accent.action]
    min: 4.5
  - fg: [accent.action, ink.primary]
    on: [accent.action_container]
    min: 4.5
  - fg: [accent.resting, ink.primary]
    on: [accent.resting_container]
    min: 4.5
  - fg: [code.keyword, code.operator, code.function, code.string, code.type, code.tag, code.regex]
    on: [surface.recessed1]
    min: 3.0

# Resolved from seeds + roles above. Keep in sync with styles/tokens.css.
schemes:
  light:
    surface:
      base: "#F3F8EF"
      recessed1: "#ECF1E8"
      recessed2: "#E7ECE3"
      raised: "#DEE3DA"
      overlay: "#D6DBD2"
    ink:
      primary: "#363E30"
      secondary: "#515A4B"
      comment: "#606859"
      faint: "#A5AE9D"
      on_action: "#F3F8EF" # {surface.base}
      on_wash: "#363E30" # {ink.primary}
    accent:
      action: "#705800"
      action_container: "#F4E7C6"
      resting: "#506A0C"
      resting_container: "#DFE5CB"
    status:
      danger: "#942921"
      warning: "#9A4B0B"
      success: "#506A0C" # {accent.resting}
      info: "#005581"
    illustration:
      backdrop: "#AACAE6"
    state:
      match_all: "#D2D0B3"
      selection: "#CCD6B9"
      active: "#705800" # {accent.action}
      hover: "#DEE3DA" # {surface.raised}
      disabled: "#A5AE9D" # {ink.faint}
    code:
      keyword: "#66800B"
      operator: "#878580"
      function: "#BC5215"
      string: "#24837B"
      type: "#205EA6"
      tag: "#A02F6F"
      regex: "#5E409D"
      number: "#5E409D" # {code.regex}
      variable: "#363E30" # {ink.primary}
      punctuation: "#606859" # {ink.comment}
      comment: "#606859" # {ink.comment}
  dark:
    surface:
      base: "#000000"
      recessed1: "#0B0B0B"
      recessed2: "#121212"
      raised: "#181818"
      overlay: "#202020"
    ink:
      primary: "#D0DAC9"
      secondary: "#AAB4A3"
      comment: "#8F9988"
      faint: "#717A6A"
      on_action: "#000000" # {surface.base}
      on_wash: "#D0DAC9" # {ink.primary}
    accent:
      action: "#FBC701"
      action_container: "#4D4126"
      resting: "#B3CD6E"
      resting_container: "#3D4526"
    status:
      danger: "#FF9786"
      warning: "#FFAB74"
      success: "#B3CD6E" # {accent.resting}
      info: "#75BFFF"
    illustration:
      backdrop: "#A4C5E1"
    state:
      match_all: "#282000"
      selection: "#1D2112"
      active: "#FBC701" # {accent.action}
      hover: "#181818" # {surface.raised}
      disabled: "#717A6A" # {ink.faint}
    code:
      keyword: "#A0AF54"
      operator: "#878580"
      function: "#EC8B49"
      string: "#5ABDAC"
      type: "#66A0C8"
      tag: "#E47DA8"
      regex: "#A699D0"
      number: "#A699D0" # {code.regex}
      variable: "#D0DAC9" # {ink.primary}
      punctuation: "#8F9988" # {ink.comment}
      comment: "#8F9988" # {ink.comment}

constant:
  - code.operator # "#878580" in both schemes

# Four families, one exclusive job each. A family must differentiate by KIND
# (width, spacing model, stroke class) — anything a size, weight, case or
# tracking change can mark does not get a typeface of its own. Inter and Wix
# Madefor Display were both cut under that rule: Inter duplicated content's job
# as another neutral humanist sans (and sat behind -apple-system, so it never
# rendered on Apple hardware), and Madefor Display had no job left once the
# display tier went condensed.
typography:
  code:
    fontFamily: "JetBrains Mono Variable, JetBrains Mono, Operator Mono, Menlo, Monaco, Courier New, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0.5px
  ui: # same family as content — chrome is a size/weight tier, not a typeface
    fontFamily: "Wix Madefor Text Variable, Madefor Fallback, Arial, Helvetica, sans-serif"
    fontSize: 16px # chrome tier — see Scale
    fontWeight: 400
    lineHeight: 1.5
  content:
    fontFamily: "Wix Madefor Text Variable, Madefor Fallback, Arial, Helvetica, sans-serif"
    fontSize: 19px # body tier — see Scale
    fontWeight: 400
    lineHeight: 1.7
    measure: 65ch # ~639px of text — see Scale
  heading: # display tier — h1/h2 only; below ~32px headings fall back to content
    fontFamily: "Big Shoulders Display Variable, Arial Narrow, Arial, sans-serif"
    fontWeight: 800 # one display weight; size separates the levels — see Scale
    fontStyle: normal
    letterSpacing: -0.03em # em, not px, so it holds at every size
    floor: 32px # under this the condensed face reads merely narrow
  wordmark: # the name only — never a heading, body, or chrome
    fontFamily: "Freehand, Snell Roundhand, Brush Script MT, cursive"
    fontWeight: 400 # the only cut Freehand ships — it is already a thin hairline
    floor: 32px # under this the hairline strokes break up

rounded:
  none: 0px # every rectangle — chrome, inputs, pills, cards, code blocks
  full: 9999px # genuinely circular only — avatar, toggle knob

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  xxl: 32px

motion:
  resting:
    duration: 400ms
    easing: ease-out # untriggered state changes: theme switch, fade-in
  action:
    duration: 130ms
    easing: cubic-bezier(0.2, 0.8, 0.2, 1) # direct feedback: press, hover, toggle
  none: 0ms # prefers-reduced-motion — always respected, no exceptions

# Component map — each element styled by INDEXING the token axes above
# (elevation / ink / attention / status / state). References are mode-agnostic;
# the active scheme resolves them.
components:
  nav:
    backgroundColor: "{surface.recessed1}"
    textColor: "{ink.secondary}"

  footer:
    backgroundColor: "{surface.recessed1}"
    textColor: "{ink.comment}"

  # Use a card only where content genuinely floats above the page (a grid of
  # tiles, a dialog). For a vertical list, spacing separates — a fill would be a
  # second mechanism for a job the gap already does. See Layout.
  card:
    backgroundColor:
      "{surface.recessed1}" # +1, not raised: raised is the hover tone, and a
      # card at rest must not look hovered. (Prose would pass on raised: 8.55.)
    textColor: "{ink.primary}"
    rounded: "{rounded.none}"

  button-primary:
    backgroundColor: "{accent.action}"
    textColor: "{ink.on_action}"
    rounded: "{rounded.none}"

  button-secondary:
    backgroundColor: "none"
    borderColor: "{accent.action}"
    textColor: "{accent.action}"
    rounded: "{rounded.none}"

  link:
    textColor: "{accent.action}"

  kicker:
    textColor: "{accent.action}"

  hero:
    backgroundColor: "{surface.base}"
    textColor: "{ink.primary}"

  theme-toggle:
    backgroundColor: "{surface.recessed1}"
    accentColor: "{accent.action}"

  selection:
    backgroundColor: "{state.selection}"

  code-block:
    backgroundColor: "{surface.recessed1}"
    textColor: "{ink.primary}"
    rounded: "{rounded.none}"

  blockquote:
    borderColor: "{accent.action}"
    textColor: "{ink.secondary}"
---

A warm-surface, calm-ink brand and interface system. One semantic token layer
— elevation · ink · attention · status · state, plus the code/syntax domain
palette — drives every surface from a single source.

## Overview

Forest Flower reflects three things. **Simplicity** — nothing appears without
a functional reason: no shadows, no blur, no decorative borders; depth comes
from tone, hierarchy from spacing. **Intensity while relaxed** — a
calm default, full commitment when engaged: gold marks the moments of intensity,
green the state of rest, and motion follows the same split. Not a duality — the
two aren't opposites and have no midpoint; they coexist on a page doing
different jobs, and rest is the ground that makes intensity legible. And
**warmth** —
surfaces are never cold or harsh white, gold is celebratory rather than
alarming, and the Freehand wordmark carries real character; restraint should
read as calm, never as sterile.

Light and dark are one system, not two: the same tokens, typography, shapes,
and rules drive both — only resolved values flip. Both schemes anchor
`surface.base` at the **substrate edge** — the brightest tone in light, the
darkest in dark — and step every other surface inward from there, so the two
ramps are mirror images rather than two different structures wearing the same
token names.

- **Light — Leaf.** A barely-there green page (`#F3F8EF`, tone 97, hue 131°),
  Leaf-tinted forest ink (`#363E30`), deeper-tier syntax inks, and the gold
  at tone 38 (`#705800`) so it reads on a bright ground: sunlight through new
  leaves. The page itself sits in the resting register, so gold is the only
  point of intensity on it.
- **Dark — Night.** A pure black floor (`#000000`) with grey surfaces stepping
  up out of it, Leaf-tinted light ink (`#D0DAC9`), brighter-tier syntax inks,
  and the gold at tone 83 (`#FBC701`): a forest at night, where the shell
  recedes and the code glows.

**One palette, two tone ranges.** Both schemes are drawn from the same four
seeds (see _Colors › Seeds_); a scheme is only a choice of tones. The one rule
that differs by tone, not by scheme: the neutral seeds go **achromatic at tone
15 and below**, so the black floor and the greys stepped off it carry no hue,
while every ink — light or dark — keeps the Leaf tint. That is what makes Night
read as Leaf at night rather than as a second brand.

**History, so nobody re-tries a dead end.** Light was cream (`#FDF6E3`) until
2026-10 and read as a borrowed Solarized/Everforest parchment rather than as
this brand. Dark was blue-black (`#13181D`), then briefly green-black
(`#131914`) — rejected by eye, a tinted floor looked murky — and its ink was
Everforest parchment (`#D3C6AA`) until the seed model made every neutral one
hue. Each replacement kept the old tone steps, so every surface still does the
job it did before.

The same ramp serves the website and the editor: the page and the editor's text
pane are both `surface.base`; chrome and panels sit at `surface.recessed1`.

## Pipeline

**Seeds and roles are the source of truth.** The `seeds:` and `roles:` blocks at
the top of this file define every colour; `schemes:` lists the resolved hexes.
`styles/tokens.css` mirrors `schemes:` as HSL triples (light in `:root`, dark in
`.dark`), with the hex in a trailing comment on each line. It is maintained by
hand: when a seed or tone changes, recompute the affected hexes, update
`schemes:`, `tokens.css` and the tables under _Colors_ together, and re-check
every pair listed under `contrast:`.

`styles/globals.css` layers the shadcn role aliases (`--background`, `--card`,
`--primary`, `--ring`, …) on top of those primitives, and `tailwind.config.ts`
exposes them as utilities — a new token needs adding to both if a component
should use it as a class.

Typography, spacing, radius, and motion in the front matter are documentation
that `globals.css` and `tailwind.config.ts` implement by hand.

The editor-only palettes (git diff, terminal ANSI) were specified in a
companion `FOREST-FLOWER-EDITOR.md`, which is not in this repository. Nothing on
the website consumes them.

## Colors

The colour system follows the Material 3 model: **a few seed colours, each
expanded into a tonal palette, and every role a tone picked from one palette.**
Change a seed and every role derived from it moves together.

### Seeds

| Seed              | Hue  | Chroma | Job                                                   |
| ----------------- | ---- | ------ | ----------------------------------------------------- |
| `primary`         | 87°  | 84     | **Gold** — action: links, buttons, kicker, highlight  |
| `secondary`       | 118° | 50     | **Green** — rest: success, calm labels, selection     |
| `neutral`         | 131° | 5      | **Leaf** — every surface (page, nav, hover, popovers) |
| `neutral_variant` | 131° | 10     | **Leaf** — every ink tier                             |
| `danger`          | 35°  | 54     | errors, destructive                                   |
| `warning`         | 58°  | 56     | warnings                                              |
| `info`            | 262° | 40     | informational notices                                 |

Hue and chroma are CIE LCh(ab); tone is L\*. A seed's chroma is a ceiling: at
very light or very dark tones a hue cannot reach it inside sRGB, and the build
lowers chroma until the colour exists rather than shifting its hue or tone.
There is deliberately **no tertiary** seed — gold and green already split the
attention budget, and a third accent would compete with both.

### Role tones

| Role                         | Light | Dark  | Material equivalent         |
| ---------------------------- | ----- | ----- | --------------------------- |
| `surface.base`               | 97    | 0     | surface                     |
| `surface.recessed1` → overlay | 95 → 87 | 3 → 12 | surface containers        |
| `ink.primary`                | 25    | 86    | on-surface                  |
| `ink.secondary` / `comment`  | 37 / 43 | 72 / 62 | on-surface-variant       |
| `accent.action`              | 38    | 83    | primary                     |
| `accent.action_container`    | 92    | 28    | primary-container           |
| `accent.resting`             | 41    | 79    | secondary                   |
| `accent.resting_container`   | 90    | 28    | secondary-container         |
| `status.*`                   | 34–41 | 73–77 | error                       |

Read across a row and the structure is the same in both schemes — strong
roles near tone 40 in light and 80 in dark, containers near 90 and 28 — which
is why the two modes feel like one brand. Containers sit a little below
Material's 30 in dark because the floor is pure black; on black, 28 already
reads as a fill rather than a stain.

**Two documented exceptions.** Both are encoded in `roles:`, not hand-picked:

- **Containers cap their chroma** (`action_container` 18, `resting_container`
  14–20). A container at the full seed chroma would be a
  saturated pastel that out-shouts the action colour it supports.
- **Light gold containers shift hue to 93°** (seed 87°). Next to the green page,
  simultaneous contrast pushes pale gold toward peach; six degrees toward
  yellow cancels it. Dark containers keep the seed hue — black has no
  surround cast.

### Token axes

Tokens are organised by the semantic **axis** they belong to. An element is
styled by **indexing an axis** — a nav is "recessed", a link is "action" — so
there is no component-by-component mapping table.

| Axis          | Index                                             | Tokens                                     | Source             |
| ------------- | ------------------------------------------------- | ------------------------------------------ | ------------------ |
| **Elevation** | base · recessed-1 · recessed-2 · raised · overlay | `surface.*` (+ `border` = recessed-2 tone) | `neutral` seed     |
| **Ink**       | primary · secondary · comment · faint · on-action | `ink.*`                                    | `neutral_variant`  |
| **Attention** | action · resting (+ container, line)              | `accent.*`                                 | `primary` + `secondary` |
| **Status**    | danger · warning · success · info                 | `status.*`                                 | status seeds       |
| **State**     | selection · match-all · active · hover · disabled | `state.*` (**derived**)                    | Attention/Surface  |
| **Code**      | keyword · function · string · type · tag · …      | `code.*`                                   | Flexoki            |

**Aliases, not copies.** Several roles are references, so one edit propagates:
`status.success → {accent.resting}`, `code.variable → {ink.primary}`,
`code.comment` = `code.punctuation` = `{ink.comment}`,
`state.active → {accent.action}`, `state.hover → {surface.raised}`,
`state.disabled → {ink.faint}`, `ink.on_action → {surface.base}` (the
substrate edge is by definition the extreme tone, so it is also the right
foreground on a gold fill), and `ink.on_wash → {ink.primary}`.

**Derived state.** State washes are computed from the attention accents rather
than stored as hand-picked literals, so they always sit inside the palette:

- `state.selection = blend(accent.resting, α, surface.base)` — a low-chroma
  green wash behind selected text. One hue both modes.
- `state.match_all = blend(accent.action, α, surface.base)` — a faint gold
  wash behind all matches of a search; the **current** match stays solid
  `accent.action` (`state.active`) so it still pops.

**α is per-substrate: 0.24 / 0.25 in light, 0.16 in dark.** A wash has to do
three things at once — keep the text on it readable, be visible against
`surface.base`, and stay distinguishable from the other wash. Dark manages all
three at 0.16 (ΔE 10.3 between the washes). Light needs the larger α to be
visible at all on a bright page, and still keeps ΔE 4.7 between the two. Body
ink clears AA on every wash in both schemes (7.10 is the light floor), which is
why `ink.on_wash` needs no value of its own.

### Token value table

| Token                               | Light     | Dark      |
| ----------------------------------- | --------- | --------- |
| `surface.base`                      | `#F3F8EF` | `#000000` |
| `surface.recessed1`                 | `#ECF1E8` | `#0B0B0B` |
| `surface.recessed2`                 | `#E7ECE3` | `#121212` |
| `surface.raised`                    | `#DEE3DA` | `#181818` |
| `surface.overlay`                   | `#D6DBD2` | `#202020` |
| `ink.primary`                       | `#363E30` | `#D0DAC9` |
| `ink.secondary`                     | `#515A4B` | `#AAB4A3` |
| `ink.comment`                       | `#606859` | `#8F9988` |
| `ink.faint`                         | `#A5AE9D` | `#717A6A` |
| `ink.on_action` (= surface.base)    | `#F3F8EF` | `#000000` |
| `ink.on_wash` (= ink.primary)       | `#363E30` | `#D0DAC9` |
| `accent.action`                     | `#705800` | `#FBC701` |
| `accent.action_container`           | `#F4E7C6` | `#4D4126` |
| `accent.resting`                    | `#506A0C` | `#B3CD6E` |
| `accent.resting_container`          | `#DFE5CB` | `#3D4526` |
| `status.danger`                     | `#942921` | `#FF9786` |
| `status.warning`                    | `#9A4B0B` | `#FFAB74` |
| `status.success` (= accent.resting) | `#506A0C` | `#B3CD6E` |
| `status.info`                       | `#005581` | `#75BFFF` |
| `illustration.backdrop`             | `#AACAE6` | `#A4C5E1` |
| `state.match_all`                   | `#D2D0B3` | `#282000` |
| `state.selection`                   | `#CCD6B9` | `#1D2112` |
| `state.active` (= accent.action)    | `#705800` | `#FBC701` |
| `state.hover` (= surface.raised)    | `#DEE3DA` | `#181818` |
| `state.disabled` (= ink.faint)      | `#A5AE9D` | `#717A6A` |
| `code.keyword`                      | `#66800B` | `#A0AF54` |
| `code.operator`                     | `#878580` | `#878580` |
| `code.function`                     | `#BC5215` | `#EC8B49` |
| `code.string`                       | `#24837B` | `#5ABDAC` |
| `code.type`                         | `#205EA6` | `#66A0C8` |
| `code.tag`                          | `#A02F6F` | `#E47DA8` |
| `code.regex`                        | `#5E409D` | `#A699D0` |
| `code.number` (= code.regex)        | `#5E409D` | `#A699D0` |
| `code.variable` (= ink.primary)     | `#363E30` | `#D0DAC9` |
| `code.punctuation` (= ink.comment)  | `#606859` | `#8F9988` |
| `code.comment` (= ink.comment)      | `#606859` | `#8F9988` |

The git-diff and terminal-ANSI palettes are held in `FOREST-FLOWER-EDITOR.md`,
which extends this file. They are editor surfaces; the website resolves neither.

### Measured contrast

This system requires that every claim be checkable, so the ratios are recorded
here rather than asserted. Each row is a pair listed under `contrast:` in the
front matter, measured against the shipped values on 2026-10-09; targets are
**4.5** for anything read and **3.0** for the syntax palette. Re-measure any row
whose colours change. `ink.faint`, the divider tone
and `illustration.backdrop` are decorative by design and not audited.

**Light (Leaf).**

| on light         | base  | recessed1 | recessed2 | raised | overlay | selection | match_all | action | action_container | resting_container |
| ---------------- | ----- | --------- | --------- | ------ | ------- | --------- | --------- | ------ | ---------------- | ----------------- |
| `ink.primary`    | 10.32 | 9.70      | 9.27      | 8.53   | 7.90    | 7.35      | 7.10      | —      | 9.05             | 8.58              |
| `ink.secondary`  | 6.69  | 6.28      | 6.01      | 5.53   | 5.12    | 4.77      | 4.60      | —      | —                | —                 |
| `ink.comment`    | 5.38  | 5.06      | 4.83      | —      | —       | —         | —         | —      | —                | —                 |
| `accent.action`  | 6.32  | 5.94      | —         | —      | —       | —         | —         | —      | 5.54             | —                 |
| `accent.resting` | 5.72  | 5.37      | —         | —      | —       | —         | —         | —      | —                | 4.76              |
| `status.danger`  | 7.50  | 7.05      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `status.warning` | 5.76  | 5.41      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `status.info`    | 7.45  | 7.00      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `ink.on_action`  | —     | —         | —         | —      | —       | —         | —         | 6.32   | —                | —                 |
| `code.keyword`   | —     | 3.93      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.operator`  | —     | 3.21      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.function`  | —     | 4.20      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.string`    | —     | 3.97      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.type`      | —     | 5.70      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.tag`       | —     | 5.85      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.regex`     | —     | 6.79      | —         | —      | —       | —         | —         | —      | —                | —                 |

**Dark (Night).**

| on dark          | base  | recessed1 | recessed2 | raised | overlay | selection | match_all | action | action_container | resting_container |
| ---------------- | ----- | --------- | --------- | ------ | ------- | --------- | --------- | ------ | ---------------- | ----------------- |
| `ink.primary`    | 14.55 | 13.64     | 12.98     | 12.31  | 11.29   | 11.38     | 11.22     | —      | 6.93             | 7.00              |
| `ink.secondary`  | 9.77  | 9.15      | 8.71      | 8.26   | 7.58    | 7.64      | 7.53      | —      | —                | —                 |
| `ink.comment`    | 7.08  | 6.64      | 6.32      | 5.99   | 5.49    | 5.54      | 5.46      | —      | —                | —                 |
| `accent.action`  | 13.27 | 12.44     | —         | —      | —       | —         | —         | —      | 6.32             | —                 |
| `accent.resting` | 11.87 | 11.13     | —         | —      | —       | —         | —         | —      | —                | 5.72              |
| `status.danger`  | 10.02 | 9.39      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `status.warning` | 11.33 | 10.62     | —         | —      | —       | —         | —         | —      | —                | —                 |
| `status.info`    | 10.65 | 9.98      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `ink.on_action`  | —     | —         | —         | —      | —       | —         | —         | 13.27  | —                | —                 |
| `code.keyword`   | —     | 8.21      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.operator`  | —     | 5.34      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.function`  | —     | 7.83      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.string`    | —     | 8.73      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.type`      | —     | 6.96      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.tag`       | —     | 7.31      | —         | —      | —       | —         | —         | —      | —                | —                 |
| `code.regex`     | —     | 7.58      | —         | —      | —       | —         | —         | —      | —                | —                 |

**Reading the tables.**

- **Every audited pair passes in both schemes.** The tightest are light
  `code.operator` on the code ground (3.21, against 3.0), light
  `accent.resting` on its container (4.76) and light `ink.secondary` on the
  search-match wash (4.60).
- **Light `ink.comment` is a base → recessed2 tier.** Captions and dates may sit
  on the page, nav, cards and dividers, not on hover, popover or a wash, where
  they fall to ~4.0–4.4. Metadata in a popover takes `ink.secondary`. Dark
  `ink.comment` is audited on every surface and clears 5.46.
- **Syntax under a light wash is exempt.** An editor paints a selection but must
  leave syntax colour visible through it, so code on a light wash dips below
  3:1 (to ~2.4 for `code.operator`). Anything that _does_ control its
  foreground — web `::selection`, the name highlight — uses `ink.on_wash` and is
  in the table above.
- **Decorative strokes:** the divider tone measures 1.12:1 in both schemes and
  is invisible by construction; `illustration.backdrop` sits behind artwork and
  never carries text or marks a boundary.

### Token application

An element is styled by stating its **intent** on an axis; the token resolves.
No translation table — the element's meaning _is_ the index.

| Element                 | Intent                        | Token                                  |
| ----------------------- | ----------------------------- | -------------------------------------- |
| Page background         | elevation 0 (substrate edge)  | `surface.base`                         |
| Editor text pane        | elevation 0 (substrate edge)  | `surface.base`                         |
| Nav / footer            | elevation +1                  | `surface.recessed1`                    |
| Card                    | elevation +1, square          | `surface.recessed1` · `rounded.none`   |
| Popover / dialog        | elevation +4                  | `surface.overlay`                      |
| Primary button          | attention action              | `accent.action` (text `ink.on_action`) |
| Secondary button / link | attention action, outline     | `accent.action` border/text, no fill   |
| Kicker / eyebrow        | attention action, marker only | `accent.action`                        |
| Name highlight          | attention action, container   | `accent.action_container`              |
| Portrait bg, frames     | illustration                  | `illustration.backdrop`                |
| Body text               | ink primary                   | `ink.primary`                          |
| Caption / meta          | ink comment                   | `ink.comment`                          |
| Selected text           | state selection               | `state.selection` · `ink.on_wash`      |
| Code block              | elevation +1 · code palette   | `surface.recessed1` · `code.*`         |

A new element never introduces a new axis — it only picks an existing index.
If a decision can't be expressed as an intent on one of these axes, the
system is missing a token, not an exception.

### Elevation (surfaces)

Five surface steps create hierarchy through tone, never shadow, indexed by
**distance from the substrate edge**. `surface.base` is that edge — the
brightest tone in light (`#F3F8EF`), the darkest in dark (`#000000`) — and every
other surface steps _inward_ from it: progressively darker into the Leaf page,
progressively lighter up off the black floor. One structure, mirrored; the
scheme decides only which direction "inward" points.

- `surface.base` (0): the substrate edge — the page, and the editor's text pane.
- `surface.recessed1` (+1): nav, footer, code blocks, **cards**.
- `surface.recessed2` (+2): the 1px divider tone.
- `surface.raised` (+3): hover and active rows.
- `surface.overlay` (+4): popovers, dialogs, toasts.

The names keep their original sense — `recessed` reads as "settled into the
page," `raised` as "lifted off it" — but the index is unsigned, because there
is nothing on the far side of the substrate. Anchoring both schemes at the edge
means a surface can never be invented "past" `base`.

**Spacing is job-matched, not uniform.** Measured as L\* distance from base:

| step        | Light (Leaf) | Dark (Night) |
| ----------- | ------------ | ------------ |
| `recessed1` | −2.6         | +3.0         |
| `recessed2` | −4.3         | +5.5         |
| `raised`    | −7.3         | +8.2         |
| `overlay`   | −10.4        | +12.3        |

`raised` and `overlay` are pinned by what they do — the hover/active-row
distance and the dialog distance — and the two recessed steps fit in the room
below. A uniform interval was tried once and was wrong both ways at once: it
made hover shout while letting nav and sidebars go indistinct. Preserving what
each step is _for_ matters more than even spacing. Light runs slightly tighter
than dark because a bright page shows small tonal steps more readily.

**Watch the bottom of the dark ramp.** On pure black, `recessed1` (`#0B0B0B`)
measures 1.07:1 against the page. That is enough on a calibrated LCD and can
vanish on an OLED panel that crushes near-blacks. Nav and footer are separated
by spacing first (see _Elevation & Depth_), so this degrades to "no tone step"
rather than to a broken layout — but if it reads as missing on a real phone,
raise `recessed1` one step rather than adding a border.

### Selection & focus

- **`state.selection`**: a derived **resting** wash — `accent.resting` blended
  into `surface.base` (see _Derived state_). Both modes share one hue, a
  forest-green tint. It is a passive _state_ marker, so it stays low-chroma and
  never borrows the gold action accent.
- **Hover** (`state.hover` = `surface.raised`): reads as "active surface," not
  "spotlight."

### Ink

Four reading tiers split by **job**, not brightness — anything you _read_ meets
WCAG AA; anything you merely _locate_ need not.

- **`ink.primary`**: the default foreground — Leaf at tone 25 in light
  (`#363E30`) and tone 86 in dark (`#D0DAC9`), the same hue both ways. Never
  black or white, never a pure grey;
  in light it ties the text to the Leaf page, in dark it keeps the floor from
  feeling clinical.
- **`ink.secondary`**: quiet _text_ you still read — subheadings, ledes, nav
  labels. A step below `ink.primary` so chrome recedes under the content, and
  AA on every surface in both schemes.
- **`ink.comment`**: captions, bylines, timestamps, metadata. The quietest
  readable tone — recedes without disappearing. **All four tiers are now
  distinct in both schemes.** On cream, light could only fit three (comment
  converged with secondary); the deeper forest ink opened the range back up.
  Light `ink.comment` is limited to base → recessed2 (see _Measured contrast_).
- **`ink.faint`**: positional and decorative marks only — dividers, disabled
  states, ornamental numerals. Intentionally below AA text contrast because
  these are landmarks, not prose. Never use it for text a reader is meant to
  read.
- **`ink.on_action`**: text/icons on an `accent.action` fill (primary button
  labels) — the substrate edge, for maximum contrast on gold.
- **`ink.on_wash`**: text on a `state.*` wash (selected text, a search match).
  It is `{ink.primary}` in both schemes: it clears 7.10 on the light
  washes and 11.22 on the dark ones. Keep the token anyway — it names
  the job, so a future palette that needs a deeper value has one place to put
  it.

### Code (syntax)

The code palette is inky and perceptually-calibrated: every accent sits at the
same perceptual tier, so no single color shouts over its neighbours. Dark runs a
**brighter tier** (to read on the black floor), light a **deeper tier** (to
read on the Leaf page); same hue vocabulary, only the value flips.
Calibrated accents — not electric neon — preserve the "ink on paper" reading state
and leave `accent.action` free to be the single loud signal.

> The code palette's hue calibration and role mapping are adapted from Flexoki by
> Steph Ango (stephango.com/flexoki).

- **`code.keyword`** — control flow, imports, `const`, `return`, declarations.
  Green; keywords are the skeleton.
- **`code.operator`** (constant `#878580`, both modes) — `=`, `=>`, `?`, `:`,
  `+`, `&&`. Muted on purpose; recedes so keywords carry the structural emphasis.
- **`code.function`** — definitions, method calls. Orange — "active" but calm
  enough not to burn over a long session.
- **`code.string`** — string & template literals. Cyan — cool, recedes slightly.
- **`code.type`** — type/class/interface names. Blue — "external/structural,"
  without competing with green keywords.
- **`code.tag`** — HTML/JSX tags, language features, thrown exceptions. Magenta.
- **`code.regex`** — regex & special literals. Purple — the rarest; draws the eye.
- **`code.number`** — numeric & boolean literals. Shares purple with regex.
- **`code.variable`** (= `ink.primary`) — plain identifiers, object properties,
  parameters. The default reading state must not demand attention; it is the
  resting point the eye returns to between bright token moments.
- **`code.comment`** (= `ink.comment`) — italic where the font supports it
  (Operator Mono, Dank Mono, Victor Mono). Raised to the comment tier because a
  quieter tone fails WCAG AA at these canvas brightnesses.
- **`code.punctuation`** (= `ink.comment`) — delimiters, brackets, semicolons;
  distinguished from comments by glyph shape (single characters vs. words), not
  color.

### Attention (chrome)

Two channels with a strict division of labour: **`accent.action` (gold) =
action**, **`accent.resting` (green) = resting state**.

The **action accent** is gold, value-swapped to its substrate: **Cobalt 2 gold**
(`#FBC701`, tone 83) in dark, the same seed at tone 38 — a **deep gold**
(`#705800`) — in light so
it reads on the Leaf page. Gold against green is also the brand's one
complementary pairing — sun on leaves — which is why it reads as celebratory
rather than alarming. It marks the things you act on — links, primary
buttons, the active nav item, the kicker, the blockquote rule — as a marker,
outline, or small fill, never a broad background wash.

Why gold for action and not green? Gold is the one hue `code.*` uses in _neither_
mode (light and dark span red/orange/green/cyan/blue/purple/magenta, never
yellow). Green is the worst candidate for _action_: it is the most frequent code
color (keywords) and carries `status.success` / `diff.add`, so a green action mark
would collide constantly. Gold sits in the open slot — and that exclusivity is
what makes the action accent read as chrome rather than syntax.

The **resting accent** is green (`accent.resting`, = the `status.success` tier).
It carries passive signals — resting-state pills and the derived
`state.selection` wash. As a low-chroma background wash it lives in a different
visual layer than foreground text, so it never competes with green keyword
syntax in code blocks. Warm gold = you're acting; calm green = at rest.

- **`accent.action`** / **`accent.action_container`**: the action mark and its
  accent-adjacent surface for chrome background fills. Never used in code; never a
  broad fill.
- **`accent.resting`** / **`accent.resting_container`**: the resting mark and a
  deep-green surface for state fills (pills, washes). Confined to backgrounds and
  resting modes — never a foreground action mark.

**The resting register must stay quiet.** Being permitted a container fill is
not permission to be loud: a row of eleven saturated green pills becomes the
brightest thing on the page and competes with gold for the eye, which defeats
both. Repeated resting elements take a neutral recessed fill; the green
container is for a _single_ element genuinely signalling "at rest."

### Status

Status colors come from Flexoki accents one tier louder than code so they read
as "signal, not text." The tier inverts by substrate:
**dark uses the 200-series** (brighter than the 300 code tier), **light the
700-series** (darker than the 600 code tier). Same hue vocabulary as code; only
intensity changes.

- **`status.danger`** — error text and destructive actions. Never the chrome
  accent.
- **`status.warning`** — warnings; a step louder than orange function syntax.
- **`status.success`** (= `accent.resting`) — confirmations.
- **`status.info`** — informational notices and inline hints.

Lowest-priority hints fall to `ink.comment`.

## Typography

Typography is identical in both modes. Code samples use a monospace with
ligature support (JetBrains Mono):

- **Code font size:** 14px baseline.
- **Line height:** 1.65 — generous without loosening the vertical rhythm of a
  code block.
- **Letter spacing:** 0.5px. Breathing room without pushing long lines off the
  visible width.

### Three type roles: code, UI, content

The theme distinguishes three jobs, and each wants a different genre — a
grotesque built for UI reads cold across long prose, and a code mono reads
cramped in a paragraph.

- **Code** (`typography.code`): a calm humanist/neutral monospace with
  cursive-capable italics (JetBrains Mono / Operator Mono / Victor Mono).
- **UI** (`typography.ui`): a system-UI grotesque stack. This is the one place
  a neutral grotesque is correct — chrome should recede, render instantly with
  no web-font cost, and match the host OS. Used for nav, labels, buttons, and
  short headings only.
- **Content** (`typography.content`): a **text-optimised sans** for long-form
  reading. The shipped face is **Wix Madefor Text** — drawn by TypeTogether
  specifically for sustained reading at small-to-mid sizes, with open apertures
  and slightly humanist skeletons. Headlines take its sibling **Wix Madefor
  Display**, which is the point of choosing this family: two cuts drawn for the
  two jobs rather than one face stretched across both. **`Arial`** is the
  fallback, metric-matched through `Madefor Fallback` (below).

> Madefor has a `wght` axis of **400–800** and no optical-size axis. There is
> no weight below 400 in this system — a `font-light` utility does not resolve
> to 300, it clamps or synthesises. Design to 400 as the floor.

> **Why this is no longer a serif.** The original argument was voice, not
> legibility — it conceded that no reliable serif reading advantage exists once
> size, measure and leading are matched, and rested instead on "on a personal
> site the type _is_ the branding; there is no logo doing that job." That
> premise expired: the script wordmark is now the site's signature and carries
> the handmade identity by itself. With the voice accounted for, the only thing
> the serif was still buying was standing apart, which is not a reason to make
> every paragraph work harder. The reading face is now chosen to recede. Keep
> the chrome on the system stack; keep the signature doing the identity job.

As CSS custom properties for a derived site:

```css
/* headlines — the display cut (condensed, upright extrabold, h1/h2 only) */
--font-heading: "Big Shoulders Display Variable", "Arial Narrow", Arial,
  sans-serif;

/* long-form reading: blog body, docs, teasers — the text cut */
--font-content: "Wix Madefor Text Variable", "Madefor Fallback", Arial,
  Helvetica, sans-serif;

/* chrome: nav, buttons, labels, meta — the reading family, one tier down */
--font-ui: "Wix Madefor Text Variable", "Madefor Fallback", Arial, Helvetica,
  sans-serif;

/* code blocks — monospace with ligatures */
--font-code: "JetBrains Mono Variable", "JetBrains Mono", "Victor Mono",
  "Operator Mono", "Fira Code", ui-monospace, Menlo, Monaco, monospace;
```

Headlines render upright extrabold (`font: 800 …`) at a single weight, with size
doing all the separating — see _Scale_. The display family is condensed, which is
the one axis the reading family does not have: that is what earns it a slot under
the one-job-per-family rule. It stops at `h2`; below ~32px the condensed face
reads merely narrow rather than condensed, so `h3`–`h6` take `--font-content` at 600.

**Chrome shares the reading family.** It used to be the system-UI stack, whose
one virtue was rendering with no web font — but Madefor Text is already
preloaded for the body, so chrome now costs nothing either way, and the stack it
replaced named Inter _third_, behind `-apple-system`. Every comp drawn in Inter
was drawn against a face that only rendered on non-Apple hardware.

**Teasers are content, not chrome.** A post excerpt, lede, or card summary takes
`--font-content` like the body it previews. This used to read "short snippets
_may_ stay on `--font-ui`", and that permission was the one visible seam in the
system: the blog index set excerpts in sans, then the post you clicked was
serif. `--font-ui` is for chrome — nav, buttons, labels, dates, byline meta.

### Delivery

The type system is only as good as what actually reaches the reader, so three
delivery rules are part of the design, not an implementation detail:

- **Self-hosted, not CDN.** Fonts ship from the site's own origin, bundled and
  fingerprinted at build time. Browser cache partitioning (2020) removed the shared-cache
  argument for the Google Fonts CDN; what remained was two extra origins to
  handshake with in front of a render-blocking stylesheet, plus a third party in
  every reader's request path.
- **Preload what is above the fold.** Madefor Text, Big Shoulders Display and
  Freehand are on every page, so all three are `rel="preload"`ed with
  `crossorigin`. Latin subsets: Madefor Text 20KB, Big Shoulders 35KB, Freehand
  52KB. Big Shoulders costs ~15KB more than the Madefor Display it replaced —
  the price of the width axis, and still under the 67KB single face this system
  started from. JetBrains Mono is
  deliberately not preloaded — only post pages have code, so it stays lazy
  behind its `@font-face`. Madefor Text italic is likewise lazy: a separate
  face, fetched only on pages that render an `<em>`.
- **Metric-matched fallback.** `font-display: swap` means every reader sees the
  fallback first. With a sans reading face that fallback is **Arial**, not
  Georgia — Arial is ~7% narrower per character than Madefor Text with a
  shorter ascent, so an un-adjusted swap reflows the article body and costs
  CLS. A `Madefor Fallback` face re-metrics Arial onto Madefor Text's numbers
  (`size-adjust: 107.43%`, `ascent-override: 93.83%`,
  `descent-override: 23.46%`), making the swap a change of texture, not of
  layout. Measured from the shipped files at wght 400:

  | Face             | upem | hhea asc | hhea desc | avg advance |
  | ---------------- | ---- | -------- | --------- | ----------- |
  | Wix Madefor Text | 1000 | 1008     | −252      | 0.5175em    |
  | Arial            | 2048 | 1854     | −434      | 0.4817em    |

  Un-metricked faces must not be inserted ahead of it in a stack.

### Scale

Size ranks importance, so the scale must actually step. A title only 1.2×
its body copy reads as flat — and worse, an index whose titles are smaller
than the body text of the posts they link to reads as less important than its
own content.

| Role                 | Size | Notes                           |
| -------------------- | ---- | ------------------------------- |
| Wordmark (hero)      | 48px | the largest thing on any page   |
| Page / post title    | 32px | the display floor — see below   |
| Section heading      | 24px | under the floor: content at 600 |
| Body copy (prose)    | 19px | the sustained reading size      |
| Teaser / lede        | 18px | see the note on this step below |
| Chrome (nav, labels) | 16px | recedes by design               |
| Meta (dates, byline) | 14px | quietest running tier           |
| Kicker / eyebrow     | 12px | uppercase, 0.25em — see below   |

Opting an element out of the prose container also opts it out of prose's sizing —
set the size explicitly when you do, or it silently falls back to the 16px
browser default.

> **Known weakness in this table.** The rule above says the scale must actually
> step, and 19 → 18 does not: a 1px difference is below the threshold at which
> anyone perceives a rank, so the teaser tier is decorative rather than
> structural. The ratios across the whole table (1.6, 1.25, 1.26, 1.06, 1.125,
> 1.14) are not a modular scale either — they are seven locally-chosen numbers.
> Left as-is deliberately for now, and recorded here so the next person changing
> a size knows they are editing a list, not deriving from a ratio. The honest fix
> is a single ratio (1.25) with the teaser folded into the body tier.

**The label tier does the work a shape used to do.** Radius 0 flattens badges
and pills into plain rectangles, so a kicker, a filter pill and a date have no
outline distinguishing them — the type has to say "label" on its own. That is
why the eyebrow is real uppercase at **12px with 0.25em of tracking** and not a
size step alone: case, tracking and the gold accent are three differentiators
stacked to replace the one the pill shape used to give for free. It was
previously 14px small-caps at 0.08em, which relied on `font-variant-caps: all-small-caps` — Madefor ships no true small-cap glyphs, so the browser was
synthesising them, and 0.08em is too tight to read as a label at any size.

**Measure.** The reading column is capped at **65 characters** — ~639px of text
at the 19px body size, plus gutters, so the column is 700px. Measure is a
property of the type, not of a breakpoint: sizing the column from a device
width instead put the same copy at **72 characters per line**, past the top of
the comfortable 45–75 range and well past the 60–66 optimum. If the body size
or face changes, this width is recomputed from the new average advance, not
carried over — and it was, at the Fraunces → Madefor Text swap. The two faces
turned out to be within 1% of each other (0.5175em vs 0.5218em over a–z plus
space), so 700px survived the change by measurement rather than by inertia.

Weight carries the same two registers that gold and green carry in color. A
headline is a momentary point of emphasis — the **action** register — so it
takes added weight. Body copy is the sustained reading state — the **resting**
register — so it stays at a calm regular weight. Two levers, one idea: hue for
chrome, weight for type.

**The display tier is one weight.** Every `h1`/`h2` is 800; size alone separates
the levels. This is the same argument the layout makes about card fills — if
size already ranks two things, weight ranking them again is a second mechanism
for a job that is done, and the two can disagree.

> **The 400-at-48px register was retired here.** It let a display heading that
> was a _statement_ ("Let's talk.") drop to the axis floor against the 600 every
> other heading took, on the reasoning that at 48px size has established the
> emphasis and weight is free to step back. That was sound for a normal-width
> face. It does not survive the move to a condensed one: Big Shoulders at 400 is
> narrow _and_ light, which reads as a fallback font rather than as restraint —
> condensation and low weight pull in the same direction instead of trading off.
> The exception had exactly one use in the system, and it is now 800 like the
> rest. Recorded rather than deleted, because the register was a good idea and
> the reason it fails is specific to the width axis.

**Titles are upright, never italic.** Extrabold _italic_ was tried and shouts:
at 30px across a list it reads as urgency rather than confidence. The weight
survived that finding and the slant did not — a condensed upright extrabold is
dense without leaning, which is the distinction the earlier note was reaching
for. The script wordmark already carries the page's one slanted flourish, so
titles stay upright to give the layout a vertical anchor; two competing slants
read as noise. Italic is reserved for the wordmark and for emphasis within
prose.

### Heading colors

Heading hierarchy is built from **tone, not hue** — the same principle as the
four surface steps. Different-colored headings (green h2, blue h3…) would read
as noise on a calm reading surface and undo the ink-on-paper voice. So the
scale stays in the warm ink family and steps _down_ in weight as it descends.
The chrome accent (`{accent.action}`) is allowed at exactly one content
touchpoint: a small **eyebrow/kicker** above the title — the accent as a
_marker_, consistent with its chrome rule, never as a broad heading fill.

| Element                  | Token             | Role                                             |
| ------------------------ | ----------------- | ------------------------------------------------ |
| Eyebrow / kicker         | `{accent.action}` | accent marker, uppercase 12px, above title only  |
| `h1` (page title)        | `{ink.primary}`   | full-strength ink; size + weight carry emphasis  |
| `h2` (section)           | `{ink.primary}`   | ink; separated from h1 by size, not color        |
| `h3` (subsection)        | `{ink.secondary}` | one tonal step down — still AA, clearly quieter  |
| `h4`–`h6`                | `{ink.secondary}` | smallest cuts; weight/size do the work           |
| Body                     | `{ink.primary}`   | the resting reading tone                         |
| Lede / standfirst        | `{ink.secondary}` | intro paragraph, a step quiet under body         |
| Caption / byline / meta  | `{ink.comment}`   | quietest readable tone (AA), italic where apt    |
| Links                    | `{accent.action}` | the accent — the one hue allowed inline in prose |
| Blockquote border + mark | `{accent.action}` | accent as an outline/marker, not a fill          |

```css
.kicker {
  color: var(--accent-action);
} /* uppercase eyebrow */
h1,
h2 {
  color: var(--ink-primary);
}
h3,
h4,
h5,
h6 {
  color: var(--ink-secondary);
}
.lede {
  color: var(--ink-secondary);
}
.meta,
figcaption {
  color: var(--ink-comment);
}
a {
  color: var(--accent-action);
}
```

Rationale: ink for the loud headings, a single tonal step to `ink.secondary` for
the quieter ones (still WCAG AA), `ink.comment` for true metadata. The accent
enters content only as a marker (kicker, link, quote rule) — the same scarcity
it holds everywhere else.

## Layout

Layout is mostly unprescribed, with one exception: **spacing is generous,
deliberately.** A crowded field fights attention and a cramped one fights the
calm default state, so whitespace is not leftover room — it is the interval
that makes the single loud element read as loud (Japanese _ma_: the silence
that makes the note). Err toward more space than feels necessary. The failure
mode of this system is a timid loud moment, never too much quiet.

Otherwise Forest Flower is a color and typography token set, not a layout
system. The one metric it fixes: **base spacing unit 8px**. The scale is
`8 · 16 · 24 · 32` (`sm` · `lg` · `xl` · `xxl`) plus two deliberate half-steps —
`xs: 4px` for icon gaps and `md: 12px` for control padding, where 8 is tight and
16 is loose. Those two are the only non-multiples; anything else should be a
multiple of 8.

## Elevation & Depth

Depth is tonal, never emissive — the five surface steps carry it (see
_Elevation (surfaces)_). No drop shadows. No blur. No decorative borders.

Shadow is excluded because it is **redundant**, not because it is ugly: shadow
and tone do the same job — signal that one plane sits above another — and tone
already does it. Two mechanisms for one function is precisely what simplicity
rules out. This holds on every surface, so a website card signals elevation
through `{surface.raised}` tone and the space around it exactly as a popup
does. If that stops reading clearly, the fix is more space or a larger tone
step, never a shadow.

**Separation** has exactly two devices:

1. **Spacing** — the primary one (see Layout). Two regions far enough apart need
   no line at all.
2. **Tone** — a region shifts surface (nav at `{surface.recessed1}` against a
   page at `{surface.base}`) and reads as its own plane, unstroked.

If neither carries it, the answer is to restructure the layout — not to draw a
line. The 1px rule at `{surface.recessed2}` is **not** a third tier: it measures
1.12:1 in both schemes, so it is invisible by construction and WCAG-exempt
only because it is decorative. Making it load-bearing would need ~3:1 (roughly
`#888D83` on Leaf, 3.16), a distinctly grey stroke that contradicts the calm
surface. So it stays decorative, and nothing depends on it.

**Bounding a control is a different job.** An input needs a real boundary, and
it gets one from a `{surface.recessed1}` fill plus an `{accent.action}` focus
ring — a fill, not a stroke. Reach for tone when the job is "this is
interactive"; a border tone can't do it.

The one exception is an `{accent.action}` outline used as a functional
highlight — a focus ring, a blockquote rule. That is attention, not elevation.

## Shapes

**Two values: square and circular. There is no partial rounding.**

- **Every rectangle** — chrome, buttons, inputs, pills, cards, code blocks — is
  `{rounded.none}` (0px).
- **`{rounded.full}`** is reserved for elements that are actually circular: an
  avatar, a toggle knob. Never a rectangle pretending to be soft.

Why square, when the system is otherwise warm? Because **warmth is already
carried by colour and typeface** — the Leaf page, forest ink, the celebratory
gold, Fraunces' calligraphic curves, the script wordmark. A radius would
be a _second_ mechanism for a job those already do, which is the same
redundancy argument that rules out shadows. Warm palette, warm type, hard
geometry — the contrast is the point, and it is a standard editorial register
rather than a compromise.

The earlier 3px chrome was the worst of both: too small to read as softness,
too large to read as deliberate geometry. It was also an editor leftover —
"decorative rounding is noise" was reasoning about code, not about a website.

Square only reads as intentional when the layout is disciplined. Here that
discipline is **spacing**, not hairline rules: the generous, consistent gaps of
the _ma_ principle are what keep hard corners from looking accidental. If the
spacing goes sloppy, the corners are what will look wrong.

## Motion

Motion follows the same two registers that govern color: the **resting** register
is slow or absent, the **action** register is quick and decisive. Nothing
animates without a reason — an interface that moves on its own, unprompted,
is noise wearing a "lively" costume, not identity.

- **`motion.resting`** (400ms, ease-out) — state changes nobody actively
  triggered: a theme switch, a page transition, a fade-in on scroll. Calm and
  unhurried; never looping, never idle.
- **`motion.action`** (130ms, snap easing) — direct feedback to something the
  visitor just did: a button press, a hover, a toggle. Quick and unambiguous; a
  delayed or mushy response undercuts the "you did that, it worked" signal.
- **`motion.none`** (0ms) — `prefers-reduced-motion`, respected everywhere,
  no exceptions.

**Playful** is carried by two things: the **wordmark** — a gold script signature
(`typography.wordmark`, Freehand) in `{accent.action}`, used for the name and
nowhere else — and Fraunces' character in the headings. The wordmark is the
system's one handmade mark; its scarcity is what keeps it from becoming
ornament. Never use it for a heading, body copy, or chrome.

The wordmark is the single exception to "gold means act here." It was tried in
`{accent.resting}` green, which is more defensible on paper — a masthead is
identity, not an action — but gold is what actually reads as the site's
signature, and one fixed mark that never moves or repeats doesn't compete with
the accent's action meaning the way a page of gold links would. Judged by
looking, not by rule.

## Components

See the YAML front matter for full component token definitions. Every component
references color tokens by name, so the same definitions drive both modes —
only the resolved values change. Behavioral notes:

**Links:** gold marks the **exceptional** link, not the **structural** one.

- A link _inline in prose_ is surrounded by non-links, so color is what tells
  you it's actionable → `{accent.action}`.
- A link that is the whole element — a post title in a list, a nav item, a card
  heading — already reads as actionable from its position, size, and hover. It
  takes `{ink.primary}` at rest and `{accent.action}` on hover, so the accent
  marks the one you are acting on rather than all ten at once.

Color is spent where context doesn't already carry the meaning. A list of ten
gold titles isn't ten signals; it's the accent becoming the default, which is
the same as having no accent. This resolves the collision between this rule and
the heading table below — when an element is both a heading and a link, the
heading rule wins at rest.

**Primary button:** an `{accent.action}` fill with `{ink.on_action}` text, at
`{rounded.none}`. This is the only broad accent fill in the system, and it earns
it by being the single most important action on a page. If a page has several,
one is primary and the rest are secondary outlines.

**Secondary button:** an `{accent.action}` outline and text, no fill. Same
intent, quieter register — the accent as marker rather than surface.

**Kicker / eyebrow:** `{accent.action}`, uppercase 12px at 0.25em, above the
title only. The accent's one decorative-feeling use, kept legitimate by being a
positional marker rather than a colored heading.

**Blockquote:** an `{accent.action}` left rule with `{ink.secondary}` text.
Outline and tone, never a filled panel.

**Code blocks:** `{surface.recessed1}` ground with the full `code.*` palette on
top — the one place the syntax tokens appear, and why that palette is part of
this system.

> **Known gap, stated rather than glossed.** On the website the ground is
> correct but the syntax colors are not: `rehype-pretty-code` is registered with
> no options, so Shiki falls back to its bundled `github-dark` theme and paints
> over the `code.*` palette in both modes. Today the only `code.*` tokens that
> reach the site are the five `--chart-*` aliases. Either pass Forest Flower to
> Shiki as a theme, or stop claiming this palette drives the site — until one of
> those happens, the section above describes an intention, not the rendered
> output.

**Selected text:** `{state.selection}` — the derived resting-green wash, never
the gold accent. Selection is a passive state, not an action.

**Theme toggle:** one button cycling light → dark → system (sun · moon ·
monitor), stored in the `theme` cookie. **System is the default** — a visitor
who has never chosen sees the scheme their OS asks for. An inline `<head>`
script resolves `system` to the `.dark` / `.light` class before first paint and
follows OS changes live, so there is no wrong-scheme flash; `theme-color` ships
as a `media`-qualified pair in system mode.

## Do's and Don'ts

- Do keep `{accent.action}` scarce. It marks the thing to act on — a link, the
  primary button, the kicker. Spend it everywhere and it stops meaning anything.
- Do use `{code.variable}` (= `{ink.primary}`) for plain identifiers in code
  blocks. The neutral resting tone must not be brightened (dark) or darkened
  (light).
- Do treat the mode as a value swap on the semantic token layer — never fork
  components, typography, or prose per mode. If a value must change between
  modes, it belongs in the token table, not in a component or a second file.
- Don't use green (`{accent.resting}`) as an _action_ mark — links, buttons, and
  active states stay gold (`{accent.action}`). The reason is collision: green is
  the most frequent code hue and already carries `status.success` / `diff.add`,
  so a green "act here" would read ambiguously. It stays off actions and away
  from code, not out of the foreground entirely — the wordmark is green
  foreground text precisely because a masthead is identity, not an action.
- Don't derive state colours (`state.selection`, `state.match_all`) by hand.
  They are blends of the attention accents over `surface.base`; change the blend
  alpha, never paste a literal hex. The alpha is **per-substrate** (0.24/0.25
  light, 0.16 dark) — do not unify them, the light and dark canvases have
  measurably different headroom (see _Derived state_).
- Do pair a `state.*` wash with `{ink.on_wash}` wherever you control the
  foreground. Today it resolves to `{ink.primary}` in both schemes (≥ 7.12 on
  every wash), but naming the job keeps the pairing correct if the palette
  moves. Leaving the foreground unset is only correct when something else must
  show through, as syntax colour does under an editor selection.
- Don't use shadows, blur, glows, or neon effects on any surface. Tone
  (`{surface.raised}`, `{surface.overlay}`) plus spacing already signal
  elevation; a shadow is a second mechanism for a job already done, which is
  what simplicity rules out.
- Don't invent a surface past `{surface.base}` — there is nothing on the far
  side of the substrate edge. In dark every other surface is _lighter_ than base;
  in light every other surface is _darker_. A tone beyond the edge in either
  direction is off-ramp and drops text contrast below designed levels.
- Don't set light `{ink.comment}` on `{surface.raised}`, `{surface.overlay}` or
  a wash — it measures 4.43 / 4.07 / ≤ 3.81 there. Metadata in a popover takes
  `{ink.secondary}`. This is a **light-only** limit; dark `ink.comment` clears
  5.86 everywhere. (Cream used to bar _all_ light prose from raised/overlay;
  the forest ink lifted that.)
- Don't apply the accent to errors. The accent is the identity — errors always
  use `{status.danger}`.
- Don't change `{ink.comment}` to anything brighter (dark) or darker (light).
  Metadata must stay subordinate; if it feels hard to read, increase the font
  size before touching the color.
- Do validate color pairs against WCAG AA (4.5:1 normal text, 3:1 large text)
  and record the measured ratio next to the token, so the claim is checkable
  rather than asserted. Measure against the tightest ground a token actually
  sits on, not just `{surface.base}` — the tables in _Measured contrast_ cover
  all five surfaces and both washes for exactly this reason.
- Known exemptions, stated rather than glossed: `{ink.faint}` (decorative and
  positional), the `{surface.recessed2}` divider tone (decorative, 1.12:1 both
  schemes), syntax colour under a light `{state.*}` wash where the foreground
  cannot be set (2.36–3.02, see _Measured contrast_), and
  the `code.*` syntax palette, which targets **3:1**, not 4.5:1 — several light
  hues sit at 3.9–4.2:1 against the code ground and `code.operator` sits at
  3.21:1. Do not describe the syntax palette as AA; it isn't.
- Don't use `{ink.faint}` for text a reader actually reads — use
  `{ink.secondary}`.
- Do trace every color decision to an existing token. If it can't be expressed
  as an intent on one of the axes, the system is missing a token — inventing a
  one-off hex is gut, not brand.
- Do let color (gold) and type (Fraunces' characterful weight) carry playful. If
  a dedicated illustrated touch gets added later, keep it singular; multiplying
  it into a decorative system turns it into ornament.
- Don't animate anything the visitor didn't trigger and that carries no real
  information. An idle bounce or a looping shimmer is noise wearing a
  "lively" costume — it competes with, rather than earns, attention.
