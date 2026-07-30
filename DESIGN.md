---
version: alpha
name: Forest Flower

schemes:
  dark:
    surface:
      recessed2: "#1D2226" # the 1px divider (border); deepest layer
      recessed1: "#232A2E" # nav, footer, code blocks
      base: "#2D353B" # the page — reading plane
      raised: "#3D484D" # cards, hover, floats
      overlay: "#475258" # popovers, dialogs, toasts (+2)
    ink:
      primary: "#D3C6AA" # body / default fg                          (AA)
      secondary: "#A6B0A0" # subheadings, ledes, nav — read            (AA)
      comment: "#969E95" # captions, bylines, meta — read            (AA)
      faint: "#7A8478" # dividers, disabled — locate only     (AA-exempt)
      on_action: "#1D2226" # text/icon on an accent.action fill
    accent:
      action: "#FFC600" # scarce "act here / you are here"
      action_container: "#403319"
      resting: "#BEC97E" # passive identity (resting state)
      resting_container: "#3A5A40"
    # Status — outcome / condition
    status:
      danger: "#F89A8A"
      warning: "#F9AE77"
      success: "{accent.resting}" # = #BEC97E
      info: "#92BFDB"
    state:
      selection: "#50594B" # blend(accent.resting, 0.24, surface.base)
      match_all: "#62592C" # blend(accent.action,  0.25, surface.base)
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
    # Domain — diff (git) = the status family
    diff:
      add: "{status.success}"
      change: "{status.warning}"
      delete: "{status.danger}"
      untracked: "{status.info}"
      ignored: "{ink.comment}"
      conflict: "{code.tag}"
      add_bg: "#4D564A"
      change_bg: "#5A5048"
      delete_bg: "#5A4B4C"
    # Domain — terminal ANSI (Flexoki dark)
    terminal:
      ansi:
        black: "#1D2226"
        red: "#D14D41"
        green: "#879A39"
        yellow: "#D0A215"
        blue: "#4385BE"
        magenta: "#CE5D97"
        cyan: "#3AA99F"
        white: "#D3C6AA"
        bright_black: "#575653"
        bright_red: "#E8705F"
        bright_green: "#A0AF54"
        bright_yellow: "#ECCB60"
        bright_blue: "#66A0C8"
        bright_magenta: "#E47DA8"
        bright_cyan: "#5ABDAC"
        bright_white: "#FFFFFF"
  light:
    surface:
      recessed2: "#EFEBD4"
      recessed1: "#F4F0D9"
      base: "#FDF6E3"
      raised: "#E6E2CC"
      overlay: "#DEDAC2"
    ink:
      primary: "#5C6A72" # 5.18 on base
      secondary: "#606D5C" # 5.07 on base / 4.77 on recessed1
      comment: "#606E5E" # 5.01 / 4.71 — converges with secondary; see Ink
      faint: "#A6B0A0" # 1.87 — decorative only, AA-exempt by design
      on_action: "#FDF6E3"
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
      selection: "#D3D5B0"
      match_all: "#DACFAA"
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
    diff:
      add: "{status.success}"
      change: "{status.warning}"
      delete: "{status.danger}"
      untracked: "{status.info}"
      ignored: "{ink.comment}"
      conflict: "{code.tag}"
      add_bg: "#D6D7B4"
      change_bg: "#E7D0B4"
      delete_bg: "#E6C9B9"
    terminal:
      ansi:
        black: "#1C1B1A"
        red: "#AF3029"
        green: "#66800B"
        yellow: "#AD8301"
        blue: "#205EA6"
        magenta: "#A02F6F"
        cyan: "#24837B"
        white: "#5C6A72"
        bright_black: "#6F6E69"
        bright_red: "#C03E1D"
        bright_green: "#879A39"
        bright_yellow: "#D0A215"
        bright_blue: "#4385BE"
        bright_magenta: "#CE5D97"
        bright_cyan: "#3AA99F"
        bright_white: "#FDF6E3"

constant:
  - code.operator # "#878580" in both schemes

typography:
  code:
    fontFamily: "JetBrains Mono, Operator Mono, Menlo, Monaco, Courier New, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0.5px
  ui:
    fontFamily: "-apple-system, BlinkMacSystemFont, Inter, IBM Plex Sans, Segoe UI, Helvetica, Arial, sans-serif"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  content:
    fontFamily: "Fraunces, Newsreader, Source Serif 4, Georgia, Cambria, Times New Roman, serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
  heading:
    fontFamily: "Fraunces, Newsreader, Georgia, serif"
    fontWeight: 800
    fontStyle: italic
  wordmark: # the name only — never a heading, body, or chrome
    fontFamily: "Freehand, Brush Script MT, cursive"
    fontWeight: 400

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
    backgroundColor: "{surface.recessed1}" # NOT raised: body copy on light
      # raised measures 4.29:1, below AA. Raised is for transient hover only.
    textColor: "{ink.primary}"
    rounded: "{rounded.lg}"

  button-primary:
    backgroundColor: "{accent.action}"
    textColor: "{ink.on_action}"
    rounded: "{rounded.sm}"

  button-secondary:
    backgroundColor: "none"
    borderColor: "{accent.action}"
    textColor: "{accent.action}"
    rounded: "{rounded.sm}"

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
    rounded: "{rounded.md}"

  blockquote:
    borderColor: "{accent.action}"
    textColor: "{ink.secondary}"
---

A warm-surface, calm-ink brand and interface system. One semantic token layer
— elevation · ink · attention · status · state, plus code/diff/terminal domain
palettes — drives every surface from a single source.

## Overview

Forest Flower reflects three things. **Simplicity** — nothing appears without
a functional reason: no shadows, no blur, no decorative borders; depth comes
from tone, hierarchy from spacing. An **intensity/rest duality** — a calm
default, full commitment when engaged: gold marks the moments of intensity,
green the moments of rest, and motion follows the same split. And **warmth** —
surfaces are never cold or harsh white, gold is celebratory rather than
alarming, and Fraunces carries real character; restraint should read as calm,
never as sterile.

Light and dark are one system, not two: the same tokens, typography, shapes,
and rules drive both — only resolved values flip.

- **Dark** — warm grey-green forest surfaces, brighter-tier syntax inks, a
  single bright gold (#FFC600) chrome accent: a forest at night, the shell
  recedes and the code glows.
- **Light** — warm cream parchment surfaces, deeper-tier syntax inks, the same
  gold darkened (#6F5800) to read on cream: ink on aged paper.

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
| **Elevation** | recessed-2 · recessed-1 · base · raised · overlay | `surface.*` (+ `border` = recessed-2 tone) | Everforest        |
| **Ink**       | primary · secondary · comment · faint · on-action | `ink.*`                                    | Everforest / ink  |
| **Attention** | action · resting (+ containers)                   | `accent.*`                                 | Gold + Green      |
| **Status**    | danger · warning · success · info                 | `status.*`                                 | Flexoki           |
| **State**     | selection · match-all · active · hover · disabled | `state.*` (**derived**)                    | Attention/Surface |
| **Code**      | keyword · function · string · type · tag · …      | `code.*`                                   | Flexoki           |
| **Diff**      | add · change · delete · untracked · …             | `diff.*` (= `status.*` / `code.tag`)       | Flexoki           |
| **Terminal**  | ansi[0..15]                                       | `terminal.ansi.*`                          | Flexoki           |

**Source palettes.** Surfaces are Everforest (forest dark / parchment light).
Accents are Flexoki, role-mapped (300/200 dark, 600/700 light). The action accent
is gold — Cobalt 2 `#FFC600` dark, deep `#6F5800` light. The resting accent is
Flexoki green (= the `status.success` tier).

**Aliases, not copies.** Several tokens are references, so one edit propagates:
`status.success → {accent.resting}`, `diff.* → {status.*}`, `code.variable →
{ink.primary}`, `code.comment` = `code.punctuation` = `{ink.comment}`,
`state.active → {accent.action}`. In the front matter these are `{a.b}` refs that
resolve within the enclosing scheme.

**Derived state.** State washes are computed from the attention accents rather
than stored as hand-picked literals, so they always sit inside the palette:

- `state.selection = blend(accent.resting, 0.24, surface.base)` — a low-chroma
  green wash behind selected text. One hue both modes.
- `state.match_all = blend(accent.action, 0.25, surface.base)` — a faint gold
  wash behind all matches of a search; the **current** match stays solid
  `accent.action` (`state.active`) so it still pops.

### Token value table

| Token                               | Job                                          | Light     | Dark      |
| ----------------------------------- | -------------------------------------------- | --------- | --------- |
| `surface.base`                      | the page — reading plane                     | `#FDF6E3` | `#2D353B` |
| `surface.recessed1`                 | nav, footer, code blocks                     | `#F4F0D9` | `#232A2E` |
| `surface.recessed2`                 | 1px divider; deepest layer                   | `#EFEBD4` | `#1D2226` |
| `surface.raised`                    | cards, hover, floats                         | `#E6E2CC` | `#3D484D` |
| `surface.overlay`                   | popovers, dialogs, toasts (+2)               | `#DEDAC2` | `#475258` |
| `ink.primary`                       | body / default fg (AA)                       | `#5C6A72` | `#D3C6AA` |
| `ink.secondary`                     | subheadings, ledes, nav — read (AA)          | `#606D5C` | `#A6B0A0` |
| `ink.comment`                       | captions, bylines, meta — read (AA)          | `#606E5E` | `#969E95` |
| `ink.faint`                         | dividers, disabled — locate (AA-exempt)      | `#A6B0A0` | `#7A8478` |
| `ink.on_action`                     | text/icon on an `accent.action` fill         | `#FDF6E3` | `#1D2226` |
| `accent.action`                     | the scarce "act here" mark                   | `#6F5800` | `#FFC600` |
| `accent.action_container`           | accent-adjacent bg fill                      | `#FBE8D3` | `#403319` |
| `accent.resting`                    | resting identity                             | `#4D6B0E` | `#BEC97E` |
| `accent.resting_container`          | state bg fills (pills, washes)               | `#E1E0C1` | `#3A5A40` |
| `status.danger`                     | errors, destructive                          | `#942822` | `#F89A8A` |
| `status.warning`                    | warnings                                     | `#9B4A0F` | `#F9AE77` |
| `status.success` (= accent.resting) | confirmations                                | `#4D6B0E` | `#BEC97E` |
| `status.info`                       | informational notices, hints                 | `#1A4F8C` | `#92BFDB` |
| `state.selection`                   | selected-text wash — _derived_ resting @24%  | `#D3D5B0` | `#50594B` |
| `state.match_all`                   | all matches of a search — _derived_ @25%     | `#DACFAA` | `#62592C` |
| `code.keyword`                      | control flow, imports, declarations          | `#66800B` | `#A0AF54` |
| `code.operator` (**constant**)      | `=` `=>` `?` `:` `+` `&&`                    | `#878580` | `#878580` |
| `code.function`                     | function defs, method calls                  | `#BC5215` | `#EC8B49` |
| `code.string`                       | string & template literals                   | `#24837B` | `#5ABDAC` |
| `code.type`                         | type/class/interface names                   | `#205EA6` | `#66A0C8` |
| `code.tag`                          | HTML/JSX tags, language features             | `#A02F6F` | `#E47DA8` |
| `code.regex` / `code.number`        | regex; numeric & boolean literals            | `#5E409D` | `#A699D0` |
| `code.variable` (= ink.primary)     | plain identifiers, properties                | `#5C6A72` | `#D3C6AA` |
| `code.punctuation` (= ink.comment)  | delimiters, brackets, semicolons             | `#829181` | `#969E95` |
| `code.comment` (= ink.comment)      | comments, italic where supported             | `#829181` | `#969E95` |

`diff.*` map to the status family (`add → success`, `change → warning`, `delete →
danger`, `untracked → info`, `ignored → ink.comment`, `conflict → code.tag`). The
`diff.*_bg` line-background washes are `blend(status hue, 0.22, surface.base)`.
`terminal.ansi.*` is the 16-slot Flexoki mapping (dark vs light), held in full in
the front matter `schemes:` block.

### Token application

An element is styled by stating its **intent** on an axis; the token resolves.
No translation table — the element's meaning _is_ the index.

| Element                 | Intent                        | Token                                  |
| ----------------------- | ----------------------------- | -------------------------------------- |
| Page background         | elevation 0                   | `surface.base`                         |
| Nav / footer            | elevation −1                  | `surface.recessed1`                    |
| Card                    | elevation +1, panel rounding  | `surface.raised` · `rounded.lg`        |
| Popover / dialog        | elevation +2                  | `surface.overlay`                      |
| Primary button          | attention action              | `accent.action` (text `ink.on_action`) |
| Secondary button / link | attention action, outline     | `accent.action` border/text, no fill   |
| Kicker / eyebrow        | attention action, marker only | `accent.action`                        |
| Body text               | ink primary                   | `ink.primary`                          |
| Caption / meta          | ink comment                   | `ink.comment`                          |
| Selected text           | state selection               | `state.selection`                      |
| Code block              | elevation −1 · code palette   | `surface.recessed1` · `code.*`         |

A new element never introduces a new axis — it only picks an existing index.
If a decision can't be expressed as an intent on one of these axes, the
system is missing a token, not an exception.

### Elevation (surfaces)

Five surface steps create hierarchy through tone, never shadow, indexed by signed
distance from the reading plane. In **dark** they ascend out of the forest
(`surface.recessed2` darkest → `surface.overlay` lightest); in **light** the ramp
inverts (`surface.base` is the _brightest_ layer; recessed and raised steps read
progressively _darker_) — the same tonal-depth idea, mirrored.

- `surface.recessed2` (−2): the 1px divider tone; deepest settled layer.
- `surface.recessed1` (−1): nav, footer, code blocks.
- `surface.base` (0): the page — the reading plane.
- `surface.raised` (+1): cards, hover, active rows.
- `surface.overlay` (+2): popovers, dialogs, toasts — a step above `raised`.

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

- **`status.danger`** — error text, destructive actions, `diff.delete`. Never
  the chrome accent.
- **`status.warning`** — warnings; a step louder than orange function syntax.
- **`status.success`** (= `accent.resting`) — confirmations, `diff.add`.
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
- **Content** (`typography.content`): a **warm serif** for long-form reading
  (blog posts, docs). This is the literal expression of the theme's "ink on
  paper" philosophy — the serif tradition _is_ ink on paper. The shipped face is
  **Fraunces** (a free, high-contrast "old-style" serif with characterful
  italics and built-in optical sizing) — used italic + heavy for headlines and
  at a text weight for body copy. **`Georgia`** is the critical fallback because it is a warm,
  readable serif present on nearly every OS, so even with no web font the
  reading surface stays inky rather than collapsing to a cold grotesque.

> Fraunces is variable — let `font-optical-sizing: auto` size it per use, so
> headline hairlines stay crisp while body text thickens for reading.

> Do not use the UI grotesque stack (Inter / system-ui) for body prose. Inter
> is purpose-built for interface text at small sizes; across 1,500 words it
> reads characterless and "generic internet," undoing the warm Everforest /
> Flexoki identity. Keep Inter for chrome; give the reading surface a serif.

As CSS custom properties for a derived site:

```css
/* headlines — editorial masthead voice, ink on paper (italic + heavy) */
--font-heading: "Fraunces", "Newsreader", Georgia, serif;

/* long-form reading: blog body, docs — warm serif */
--font-content:
  "Fraunces", "Newsreader", "Source Serif 4", Georgia, Cambria,
  "Times New Roman", serif;

/* chrome: nav, buttons, labels, card teasers — recede, render instantly */
--font-ui:
  -apple-system, BlinkMacSystemFont, "Inter", "IBM Plex Sans", "Segoe UI",
  Helvetica, Arial, sans-serif;

/* code blocks — monospace with ligatures */
--font-code:
  "JetBrains Mono", "Victor Mono", "Operator Mono", "Fira Code", ui-monospace,
  Menlo, Monaco, monospace;
```

Headlines render italic + bold (`font: italic 700 …`). Card teasers and other
short snippets may stay on `--font-ui`; the full article body switches to
`--font-content` for the long-form reading experience.

### Scale

Size ranks importance, so the scale must actually step. A title only 1.2×
its body copy reads as flat — and worse, an index whose titles are smaller
than the body text of the posts they link to reads as less important than its
own content.

| Role                 | Size | Notes                                     |
| -------------------- | ---- | ----------------------------------------- |
| Wordmark (hero)      | 48px | the largest thing on any page             |
| Page / post title    | 30px | upright semibold — see below              |
| Section heading      | 24px |                                           |
| Body copy (prose)    | 19px | the sustained reading size                |
| Teaser / lede        | 18px | just under body — subordinate, not small  |
| Chrome (nav, labels) | 16px | recedes by design                         |
| Meta (dates, byline) | 14px | quietest tier                             |

Opting an element out of prose (`not-prose`) also opts it out of prose's
sizing — set the size explicitly when you do, or it silently falls back to the
16px browser default.

Weight carries the same intensity/rest split that gold and green carry in
color. A headline is a momentary point of emphasis — the **action** pole — so
it takes added weight. Body copy is the sustained reading state — the
**resting** pole — so it stays at a calm regular weight. One duality, two
levers: hue for chrome, weight for type.

**Titles are upright semibold, not italic-heavy.** Extrabold italic was tried
and shouts: at 30px across a list it reads as urgency rather than confidence.
The script wordmark already carries the page's one slanted flourish, so titles
stay upright to give the layout a vertical anchor — two competing slants read
as noise. Italic is reserved for the wordmark and for emphasis within prose.

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
| Eyebrow / kicker         | `{accent.action}` | accent marker, small-caps, above the title only  |
| `h1` (page title)        | `{ink.primary}`   | full-strength ink; size + italic carry weight    |
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
} /* small-caps eyebrow */
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
system. The one metric it fixes: **base spacing unit 8px** — use multiples for
all margins, paddings, and gaps.

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
1.11:1 in light and 1.29:1 in dark, so it is invisible by construction and
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
gold, Fraunces' calligraphic curves, the brush-script wordmark. A radius would
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

Motion follows the same duality that governs color: the **resting** register
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
`{rounded.sm}`. This is the only broad accent fill in the system, and it earns
it by being the single most important action on a page. If a page has several,
one is primary and the rest are secondary outlines.

**Secondary button:** an `{accent.action}` outline and text, no fill. Same
intent, quieter register — the accent as marker rather than surface.

**Kicker / eyebrow:** `{accent.action}`, small-caps, above the title only. The
accent's one decorative-feeling use, kept legitimate by being a positional
marker rather than a colored heading.

**Blockquote:** an `{accent.action}` left rule with `{ink.secondary}` text.
Outline and tone, never a filled panel.

**Code blocks:** `{surface.recessed1}` ground with the full `code.*` palette on
top — the one place the syntax tokens appear, and why that palette is part of
this system.

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
  alpha, never paste a literal hex.
- Don't use shadows, blur, glows, or neon effects on any surface. Tone
  (`{surface.raised}`, `{surface.overlay}`) plus spacing already signal
  elevation; a shadow is a second mechanism for a job already done, which is
  what simplicity rules out.
- Don't use a background lighter than `{surface.base}` in dark, nor darker in
  light, for bulk reading. Doing so drops text contrast below designed levels.
  (`surface.raised` is the deliberate exception — hover and cards, not prose.)
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
  positional), the `{surface.recessed2}` divider tone (decorative, ~1.1:1), and
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
