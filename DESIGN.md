---
version: alpha
name: Forest Flower

schemes:
  dark:
    # Ordered edge-outward: base is the substrate edge, every step is inward.
    # Spacing is job-matched, not uniform — see Elevation (surfaces).
    surface:
      base: "#13181D" # the substrate edge — page floor, editor text pane
      recessed1: "#191E24" # nav, footer, cards, code blocks           (+1)
      recessed2: "#1D2329" # the 1px divider (border)                  (+2)
      raised: "#23292F" # hover, active rows                        (+3)
      overlay: "#2B3239" # popovers, dialogs, toasts                 (+4)
    ink:
      primary: "#D3C6AA" # body / default fg                          (AA)
      secondary: "#A6B0A0" # subheadings, ledes, nav — read            (AA)
      comment: "#969E95" # captions, bylines, meta — read            (AA)
      faint: "#7A8478" # dividers, disabled — locate only     (AA-exempt)
      on_action: "{surface.base}" # text/icon on an accent.action fill = #13181D
      on_wash: "{ink.primary}" # text on a state.* wash — dark needs no deeper tier
    accent:
      action: "#FFC600" # scarce "act here / you are here"
      action_container: "#403319"
      resting: "#BEC97E" # passive identity (resting state)
      resting_container: "#1B3A22" # overlay tier, resting hue
    # Status — outcome / condition
    status:
      danger: "#F89A8A"
      warning: "#F9AE77"
      success: "{accent.resting}" # = #BEC97E
      info: "#92BFDB"
    state:
      selection: "#2E342D" # blend(accent.resting, 0.16, surface.base)
      match_all: "#393418" # blend(accent.action,  0.16, surface.base)
      active: "{accent.action}" # the current one among many
      hover: "{surface.raised}"
      disabled: "{ink.faint}"
    code:
      keyword: "#A0AF54"
      operator: "#878580" # constant — recedes on every line
      function: "#EC8B49"
      string: "#5ABDAC"
      type: "#66A0C8"
      tag: "#E47DA8"
      regex: "#A699D0"
      number: "{code.regex}"
      variable: "{ink.primary}"
      punctuation: "{ink.comment}"
      comment: "{ink.comment}"
  light:
    surface:
      base: "#FDF6E3" # the substrate edge — the cream page
      recessed1: "#F4F0D9" # (+1)
      recessed2: "#EFEBD4" # (+2)
      raised: "#E6E2CC" # (+3)
      overlay: "#DEDAC2" # (+4)
    ink:
      primary: "#5C6A72" # 5.18 on base
      secondary: "#606D5C" # 5.07 on base / 4.77 on recessed1
      comment: "#606E5E" # 5.01 / 4.71 — converges with secondary; see Ink
      faint: "#A6B0A0" # 1.87 — decorative only, AA-exempt by design
      on_action: "{surface.base}" # = #FDF6E3
      on_wash: "#49575E" # ink.primary one step deeper — 4.95 on state.selection
    accent:
      action: "#6F5800"
      action_container: "#FBE8D3"
      resting: "#4D6B0E"
      resting_container: "#E1E0C1"
    status:
      danger: "#942822"
      warning: "#9B4A0F"
      success: "{accent.resting}" # = #4D6B0E
      info: "#1A4F8C"
    state:
      selection: "#D3D5B0" # blend(accent.resting, 0.24, surface.base)
      match_all: "#DACFAA" # blend(accent.action,  0.25, surface.base)
      active: "{accent.action}"
      hover: "{surface.raised}"
      disabled: "{ink.faint}"
    code:
      keyword: "#66800B"
      operator: "#878580"
      function: "#BC5215"
      string: "#24837B"
      type: "#205EA6"
      tag: "#A02F6F"
      regex: "#5E409D"
      number: "{code.regex}"
      variable: "{ink.primary}"
      punctuation: "{ink.comment}"
      comment: "{ink.comment}"

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
      "{surface.recessed1}" # NOT raised: body copy on light
      # raised measures 4.29:1, below AA. Raised is for transient hover only.
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

- **Dark** — a near-black forest floor (#13181D) with the ramp stepping up out
  of it, brighter-tier syntax inks, a single bright gold (#FFC600) chrome
  accent: a forest at night, the shell recedes and the code glows.
- **Light** — warm cream parchment surfaces, deeper-tier syntax inks, the same
  gold darkened (#6F5800) to read on cream: ink on aged paper.

The same ramp serves the website and the editor: the page and the editor's text
pane are both `surface.base`, chrome and panels sit at `surface.recessed1`. The
near-black floor is what gives the cool half of the syntax palette room to
read — `code.type` and `status.info` sit within 10° of the surface hue, so they
separate by lightness or not at all.

## Pipeline

The `schemes:` block in this file is the source of truth. `styles/tokens.css` is
generated from it and must never be hand-edited; `styles/globals.css` layers the
shadcn role aliases (`--background`, `--card`, `--primary`, `--ring`) on top of
those primitives, and `tailwind.config.ts` exposes them as utilities.

The generator is `scripts/build-tokens.mjs`, run by the `tokens` and
`prebuild` npm scripts. It parses the `schemes:` block of this file (plus
the editor palettes in `FOREST-FLOWER-EDITOR.md`), resolves the `{a.b}`
aliases and emits both scheme blocks as HSL triples. `tokens.css` is
committed, so `bun run dev` does not regenerate it — after editing a hex
here, run `bun run tokens` (production builds still regenerate via
`prebuild`). Hand-edits to `tokens.css` are overwritten.

Only colors are generated. The typography, spacing, radius, and motion blocks in
this front matter are documentation that `globals.css` and `tailwind.config.ts`
implement by hand, so those two must be updated alongside any change here.

`FOREST-FLOWER-EDITOR.md` extends this file with the two editor-only domain
palettes (git diff, terminal ANSI). It inherits everything else and redefines
nothing; the generator folds its palettes into `tokens.css` as custom
properties, though no website component consumes them.

## Colors

Every color is a semantic token — named for its job, resolved per scheme in the
front matter `schemes:` block.

> The intensity pattern inverts by substrate: dark needs _brighter_ tokens to
> read against the forest canvas; light needs _deeper_ tokens to read against the
> cream canvas — code/status hues flip 300→600 / 200→700. Only `code.operator`
> (and `none`) hold one value across both schemes; see `constant:` in the front
> matter.

### Token axes

Tokens are organised by the semantic **axis** they belong to. An element is
styled by **indexing an axis** — a nav is "recessed", a link is "action" — so
there is no component-by-component mapping table.

| Axis          | Index                                             | Tokens                                     | Source            |
| ------------- | ------------------------------------------------- | ------------------------------------------ | ----------------- |
| **Elevation** | base · recessed-1 · recessed-2 · raised · overlay | `surface.*` (+ `border` = recessed-2 tone) | Everforest        |
| **Ink**       | primary · secondary · comment · faint · on-action | `ink.*`                                    | Everforest / ink  |
| **Attention** | action · resting (+ containers)                   | `accent.*`                                 | Gold + Green      |
| **Status**    | danger · warning · success · info                 | `status.*`                                 | Flexoki           |
| **State**     | selection · match-all · active · hover · disabled | `state.*` (**derived**)                    | Attention/Surface |
| **Code**      | keyword · function · string · type · tag · …      | `code.*`                                   | Flexoki           |

Two further axes — **Diff** (`diff.*`) and **Terminal** (`terminal.ansi.*`) —
are editor-only and live in `FOREST-FLOWER-EDITOR.md`. Nothing on the website
consumes them.

**Source palettes.** Surfaces are Everforest (forest dark / parchment light).
Accents are Flexoki, role-mapped (300/200 dark, 600/700 light). The action accent
is gold — Cobalt 2 `#FFC600` dark, deep `#6F5800` light. The resting accent is
Flexoki green (= the `status.success` tier).

**Aliases, not copies.** Several tokens are references, so one edit propagates:
`status.success → {accent.resting}`, `code.variable → {ink.primary}`, `code.comment` = `code.punctuation` = `{ink.comment}`,
`state.active → {accent.action}`, `ink.on_action → {surface.base}` (the
substrate edge is by definition the extreme tone, so it is also the right
foreground on a gold fill), and `ink.on_wash → {ink.primary}` in **dark only** —
light needs a genuinely deeper value there, so that one is a literal rather than
a ref. An alias in one scheme and a literal in the other is allowed precisely
because the substrates differ; what may not differ is the token's job. In the front matter these are `{a.b}` refs that
resolve within the enclosing scheme.

**Derived state.** State washes are computed from the attention accents rather
than stored as hand-picked literals, so they always sit inside the palette:

- `state.selection = blend(accent.resting, α, surface.base)` — a low-chroma
  green wash behind selected text. One hue both modes.
- `state.match_all = blend(accent.action, α, surface.base)` — a faint gold
  wash behind all matches of a search; the **current** match stays solid
  `accent.action` (`state.active`) so it still pops.

**α is per-substrate: 0.24 / 0.25 in light, 0.16 in dark.** A wash has to satisfy
three things at once — text on it stays readable, the wash itself is visible
against `surface.base`, and `selection` is telling apart from `match_all`. Dark
satisfies all three comfortably at 0.16 (every ink tier ≥ 4.54, every syntax
token ≥ 3.39, ΔE 14.9 between the two washes), and 0.16 is chosen rather than
0.24 because the deeper wash dropped `ink.comment` to 3.77 and `code.operator`
to 2.82.

Light cannot satisfy all three, and the numbers say so plainly. Its ink tiers
start at only 5.01–5.18 against cream, so any wash eats the headroom: AA needs
α ≤ 0.05, a visible wash needs α ≥ 0.06, and telling the two washes apart needs
α ≥ 0.14 (ΔE 3.1; at 0.07 they measure ΔE 1.13 — indistinguishable). The
constraints do not overlap. Light therefore keeps the larger, usable wash and
takes a foreground instead: see `ink.on_wash` and the wash exemption in
_Measured contrast_.

### Token value table

| Token                               | Job                                          | Light     | Dark      |
| ----------------------------------- | -------------------------------------------- | --------- | --------- |
| `surface.base`                      | substrate edge — page, editor pane (0)       | `#FDF6E3` | `#13181D` |
| `surface.recessed1`                 | nav, footer, cards, code blocks (+1)         | `#F4F0D9` | `#191E24` |
| `surface.recessed2`                 | 1px divider tone (+2)                        | `#EFEBD4` | `#1D2329` |
| `surface.raised`                    | hover, active rows (+3)                      | `#E6E2CC` | `#23292F` |
| `surface.overlay`                   | popovers, dialogs, toasts (+4)               | `#DEDAC2` | `#2B3239` |
| `ink.primary`                       | body / default fg (AA)                       | `#5C6A72` | `#D3C6AA` |
| `ink.secondary`                     | subheadings, ledes, nav — read (AA)          | `#606D5C` | `#A6B0A0` |
| `ink.comment`                       | captions, bylines, meta — read (AA)          | `#606E5E` | `#969E95` |
| `ink.faint`                         | dividers, disabled — locate (AA-exempt)      | `#A6B0A0` | `#7A8478` |
| `ink.on_action` (= surface.base)    | text/icon on an `accent.action` fill         | `#FDF6E3` | `#13181D` |
| `ink.on_wash`                       | text on a `state.*` wash (light: deeper ink) | `#49575E` | `#D3C6AA` |
| `accent.action`                     | the scarce "act here" mark                   | `#6F5800` | `#FFC600` |
| `accent.action_container`           | accent-adjacent bg fill                      | `#FBE8D3` | `#403319` |
| `accent.resting`                    | resting identity                             | `#4D6B0E` | `#BEC97E` |
| `accent.resting_container`          | state bg fills (pills, washes)               | `#E1E0C1` | `#1B3A22` |
| `status.danger`                     | errors, destructive                          | `#942822` | `#F89A8A` |
| `status.warning`                    | warnings                                     | `#9B4A0F` | `#F9AE77` |
| `status.success` (= accent.resting) | confirmations                                | `#4D6B0E` | `#BEC97E` |
| `status.info`                       | informational notices, hints                 | `#1A4F8C` | `#92BFDB` |
| `state.selection`                   | selected-text wash — _derived_ resting       | `#D3D5B0` | `#2E342D` |
| `state.match_all`                   | all matches of a search — _derived_ action   | `#DACFAA` | `#393418` |
| `code.keyword`                      | control flow, imports, declarations          | `#66800B` | `#A0AF54` |
| `code.operator` (**constant**)      | `=` `=>` `?` `:` `+` `&&`                    | `#878580` | `#878580` |
| `code.function`                     | function defs, method calls                  | `#BC5215` | `#EC8B49` |
| `code.string`                       | string & template literals                   | `#24837B` | `#5ABDAC` |
| `code.type`                         | type/class/interface names                   | `#205EA6` | `#66A0C8` |
| `code.tag`                          | HTML/JSX tags, language features             | `#A02F6F` | `#E47DA8` |
| `code.regex` / `code.number`        | regex; numeric & boolean literals            | `#5E409D` | `#A699D0` |
| `code.variable` (= ink.primary)     | plain identifiers, properties                | `#5C6A72` | `#D3C6AA` |
| `code.punctuation` (= ink.comment)  | delimiters, brackets, semicolons             | `#606E5E` | `#969E95` |
| `code.comment` (= ink.comment)      | comments, italic where supported             | `#606E5E` | `#969E95` |

The git-diff and terminal-ANSI palettes are held in `FOREST-FLOWER-EDITOR.md`,
which extends this file. They are editor surfaces; the website resolves neither.

### Measured contrast

This system requires that every claim be checkable, so the ratios are recorded
here rather than asserted. Ink is measured against **the tightest ground it is
permitted to sit on**, which is not the same surface in both schemes: in dark
that is `surface.overlay`, the far end of the ramp, because the dark ramp clears
AA on all five steps; in light it is `surface.recessed2`, because light prose is
barred from `raised` and `overlay` (below). Accents and status are measured
against `surface.base`.

| Pair                     | Light (recessed2) | Dark (overlay) | Target | Verdict            |
| ------------------------ | ----------------- | -------------- | ------ | ------------------ |
| `ink.primary`            | 4.66              | 7.68           | 4.5    | pass               |
| `ink.secondary`          | 4.56              | 5.77           | 4.5    | pass               |
| `ink.comment`            | **4.50**          | 4.71           | 4.5    | pass (at the line) |
| `ink.faint`              | **1.87**          | **3.34**       | —      | exempt, see below  |
| `code.operator` (lowest) | **3.07**          | 3.52           | 3.0    | pass (3:1 tier)    |
| `code.keyword`           | 3.76              | 5.41           | 3.0    | pass (3:1 tier)    |
| `code.string`            | 3.80              | 5.75           | 3.0    | pass (3:1 tier)    |

| Pair (on base)   | Light | Dark  | Target | Verdict |
| ---------------- | ----- | ----- | ------ | ------- |
| `accent.action`  | 6.34  | 11.33 | 4.5    | pass    |
| `accent.resting` | 5.68  | 10.07 | 4.5    | pass    |
| `status.danger`  | 7.53  | 8.49  | 4.5    | pass    |
| `status.warning` | 5.76  | 9.65  | 4.5    | pass    |
| `status.info`    | 7.66  | 9.10  | 4.5    | pass    |

**The dark ramp is AA-clean end to end.** Every readable ink tier and every
syntax token clears its target on all five dark surfaces:

| on dark         | base  | recessed1 | recessed2 | raised | overlay  |
| --------------- | ----- | --------- | --------- | ------ | -------- |
| `ink.primary`   | 10.57 | 9.92      | 9.38      | 8.69   | 7.68     |
| `ink.secondary` | 7.94  | 7.46      | 7.05      | 6.53   | 5.77     |
| `ink.comment`   | 6.48  | 6.08      | 5.75      | 5.33   | **4.71** |
| `ink.faint`     | 4.59  | 4.31      | 4.08      | 3.78   | 3.34     |
| `code.operator` | 4.84  | 4.55      | 4.30      | 3.98   | **3.52** |
| `code.type`     | 6.32  | 5.93      | 5.61      | 5.20   | 4.59     |

`ink.comment` on `surface.overlay` is the binding constraint at 4.71. It is the
step that caps how far the ramp may reach, so `surface.overlay` is pinned by
accessibility while the steps below it are pinned by job (see _Elevation_).

**The `state.*` washes, measured at last.** Nothing in this system used to
record what a wash does to the text on top of it, and both washes sit well off
`surface.base` — so they were quietly the least-tested pairs in the palette.
Measured against the shipped values:

| on the wash     | light `selection` | light `match_all` | dark `selection` | dark `match_all` | target |
| --------------- | ----------------- | ----------------- | ---------------- | ---------------- | ------ |
| `ink.on_wash`   | 4.95              | 4.80              | 7.55             | 7.40             | 4.5    |
| `ink.primary`   | **3.70**          | **3.59**          | 7.55             | 7.40             | 4.5    |
| `ink.comment`   | **3.58**          | **3.47**          | 4.63             | 4.54             | 4.5    |
| `code.keyword`  | **2.99**          | **2.90**          | 5.32             | 5.22             | 3.0    |
| `code.operator` | **2.44**          | **2.37**          | 3.46             | 3.39             | 3.0    |
| `code.string`   | **3.02**          | **2.93**          | 5.66             | 5.55             | 3.0    |

Dark passes throughout — that is what dropping α from 0.24 to 0.16 bought. Light
passes **only via `ink.on_wash`**, and the bolded light figures are a stated
exemption, not an oversight: they apply where a consumer paints the wash but
cannot set the foreground, which in practice means **an editor, where syntax
colour must remain visible through a selection**. Setting one foreground there
would flatten selected code to a single colour, which is a worse outcome than a
transient dip on a user-initiated state. Any consumer that _does_ control the
foreground — a web `::selection`, a single-ink highlight — must use
`ink.on_wash` and is then fully AA. See _Derived state_ for why light cannot
simply use a lighter wash.

**Light `surface.raised` and `surface.overlay` fail for sustained reading, and
that is now a light-only constraint.** Every ink tier drops below AA on
them — `ink.primary` 4.29 / 3.97, `ink.secondary` 4.20 / 3.88, `ink.comment`
4.14 / 3.83 — so on cream those two are hover, active-row, and dialog-chrome
tones with no prose on them, which is the reason cards sit at
`surface.recessed1`. Light therefore has three reading surfaces where dark has
five; the cream canvas simply has less usable range before ink stops carrying.
This asymmetry is a substrate fact, recorded rather than papered over: do not
"fix" it by darkening light ink, which would collapse `ink.comment` into
`ink.secondary` further than it already has (see _Ink_).

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
| Body text               | ink primary                   | `ink.primary`                          |
| Caption / meta          | ink comment                   | `ink.comment`                          |
| Selected text           | state selection               | `state.selection` · `ink.on_wash`      |
| Code block              | elevation −1 · code palette   | `surface.recessed1` · `code.*`         |

A new element never introduces a new axis — it only picks an existing index.
If a decision can't be expressed as an intent on one of these axes, the
system is missing a token, not an exception.

### Elevation (surfaces)

Five surface steps create hierarchy through tone, never shadow, indexed by
**distance from the substrate edge**. `surface.base` is that edge — the
brightest tone in light (`#FDF6E3`), the darkest in dark (`#13181D`) — and every
other surface steps _inward_ from it: progressively darker on cream,
progressively lighter up off the forest floor. One structure, mirrored; the scheme
decides only which direction "inward" points.

- `surface.base` (0): the substrate edge — the page, and the editor's text pane.
- `surface.recessed1` (+1): nav, footer, code blocks, **cards**.
- `surface.recessed2` (+2): the 1px divider tone.
- `surface.raised` (+3): hover and active rows. **Light only:** body copy here
  measures 4.29:1, below AA, so nothing a reader dwells on may rest on light
  `raised` — which is why cards sit at +1, not +3. Dark `raised` measures 8.22
  and carries prose fine, but cards stay at +1 in both schemes rather than
  forking the component per mode.
- `surface.overlay` (+4): popovers, dialogs, toasts.

The names keep their original sense — `recessed` reads as "settled into the
page," `raised` as "lifted off it" — but the index is unsigned, because there
is nothing on the far side of the substrate. That is precisely what the earlier
signed scheme got wrong in dark: it placed `base` mid-ramp with two layers
below it, which spent the dark scheme's floor on a divider tone and left the two
schemes structurally different despite sharing token names. Anchoring both at
the edge also means a surface can never be invented "past" `base`.

**Spacing is job-matched, not uniform.** The dark steps sit at +3.0 / +5.4 /
+8.2 / +12.5 L\* from base (light runs ~2.4 apiece). The outer two are pinned by
what they do rather than by an even interval: `raised` takes +8.2 because that is
exactly the hover and active-row distance the earlier mid-tone ramp had, and
`overlay` +12.5 for the same reason. The two recessed steps then fit in the room
below `raised`, at 2.4–3.0 L\* apiece.

An earlier revision used a uniform 3.4 L\* and it was wrong in both directions at
once: it pushed `raised` out to +10.2 — a quarter louder than designed, so hover
and the editor's current line shouted — while pulling chrome separation in, so
sidebars and nav went indistinct. Even intervals are not the goal; preserving
what each step is _for_ is.

This is also the cost of edge-anchoring that is easy to miss. Five surfaces
stacked on one side of a near-black floor crowd each other in a way the old
two-sided ramp did not: previously `recessed2` and `raised` sat on opposite
sides of `base`, 16.9 L\* apart, and now they share 8.2 L\* of room. So the
recessed steps get less separation than they used to, and cannot be widened
without making `raised` loud again. What is held constant across the schemes is
the number of steps and the job each one does — not the tonal distance between
them, which the substrate dictates.

### Selection & focus

- **`state.selection`**: a derived **resting** wash — `accent.resting` blended
  into `surface.base` at ~24% (see _Derived state_). Both modes share one hue (a
  forest-green tint). It is a passive _state_ marker, so it stays low-chroma and
  never borrows the gold action accent.
- **Hover** (`state.hover` = `surface.raised`): reads as "active surface," not
  "spotlight."

### Ink

Four reading tiers split by **job**, not brightness — anything you _read_ meets
WCAG AA; anything you merely _locate_ need not.

- **`ink.primary`**: the default foreground — Everforest parchment (dark) /
  slate-green (light). Not white/black, not grey; sits against the canvas without
  harsh contrast.
- **`ink.secondary`**: quiet _text_ you still read — subheadings, ledes, nav
  labels. A step below `ink.primary` so chrome recedes under the content, but it
  meets WCAG AA (4.5:1) against `surface.recessed1` in both modes.
- **`ink.faint`**: positional and decorative marks only — dividers, disabled
  states, ornamental numerals. Intentionally below WCAG AA text contrast because
  these are landmarks, not prose. The split from `ink.secondary` is by _job_,
  not shade. Never use it for text a reader is meant to read.
- **`ink.comment`**: captions, bylines, timestamps, metadata. The quietest
  readable tone that still meets WCAG AA (4.5:1) — recedes without disappearing.
  **In light mode this tier converges with `ink.secondary`.** The cream canvas is
  bright enough that any tone passing 4.5:1 against `surface.recessed1` lands
  essentially where `ink.secondary` already sits, so light has three readable
  tiers, not four, and metadata separates by size and italic rather than tone.
  Dark has the range to keep all four distinct. This is a substrate constraint,
  not a value that needs retuning.
- **`ink.on_action`**: text/icons placed on an `accent.action` fill (primary
  button labels) — the deepest substrate tone, for maximum contrast on gold.
- **`ink.on_wash`**: text placed on a `state.*` wash (selected text, a search
  match). In dark it is simply `{ink.primary}`, which already clears AA on the
  0.16 washes. In light it is a **deeper cut of `ink.primary`** — same hue (242°)
  and chroma (7.1), L\* 43.9 → 36 — because the light wash is dark enough to pull
  ordinary body ink under AA. Use it wherever a consumer sets both the wash and
  its foreground; where a consumer cannot (an editor, where syntax colour must
  show through a selection), the wash is exempt and the ratios are recorded.

### Code (syntax)

The code palette is inky and perceptually-calibrated: every accent sits at the
same perceptual tier, so no single color shouts over its neighbours. Dark runs a
**brighter tier** (the canvas is lighter than true black), light a **deeper
tier** (to read against cream); same hue vocabulary, only the value flips.
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
(#FFC600) in dark, the same gold darkened to a **deep gold** (#6F5800) in light so
it reads on the cream canvas. It marks the things you act on — links, primary
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
1.11:1 in light and 1.13:1 in dark, so it is invisible by construction and
WCAG-exempt only because it is decorative. Making it load-bearing would need
~3:1 (roughly `#8A8A78` on cream), a distinctly grey stroke that contradicts the
calm surface. So it stays decorative, and nothing depends on it.

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
carried by colour and typeface** — cream and forest surfaces, the celebratory
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
  foreground. Body ink on the light wash measures 3.70 — below AA — and
  `ink.on_wash` is the token that fixes it. Leaving the foreground unset is only
  correct when something else must show through, as syntax colour does under an
  editor selection.
- Don't use shadows, blur, glows, or neon effects on any surface. Tone
  (`{surface.raised}`, `{surface.overlay}`) plus spacing already signal
  elevation; a shadow is a second mechanism for a job already done, which is
  what simplicity rules out.
- Don't invent a surface past `{surface.base}` — there is nothing on the far
  side of the substrate edge. In dark every other surface is _lighter_ than base;
  in light every other surface is _darker_. A tone beyond the edge in either
  direction is off-ramp and drops text contrast below designed levels.
- Don't set prose on light `{surface.raised}` or `{surface.overlay}` — every ink
  tier falls below AA there (see _Measured contrast_). This is a **light-only**
  constraint: the dark ramp clears AA on all five steps. Don't generalise it into
  a shared rule, and don't relax the light side to match.
- Don't apply the accent to errors. The accent is the identity — errors always
  use `{status.danger}`.
- Don't change `{ink.comment}` to anything brighter (dark) or darker (light).
  Metadata must stay subordinate; if it feels hard to read, increase the font
  size before touching the color.
- Do validate color pairs against WCAG AA (4.5:1 normal text, 3:1 large text)
  and record the measured ratio next to the token, so the claim is checkable
  rather than asserted. Measure against the tightest ground a token actually
  sits on — for ink tiers that is `{surface.recessed1}` (nav, code blocks), not
  `{surface.base}`.
- Known exemptions, stated rather than glossed: `{ink.faint}` (decorative and
  positional), the `{surface.recessed2}` divider tone (decorative, 1.11:1 light /
  1.13:1 dark), the light `{state.*}` washes where the foreground cannot be set
  (2.37–3.70, see _Measured contrast_), and
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
