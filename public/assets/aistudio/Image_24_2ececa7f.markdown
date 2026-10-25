---
name: Task Marketplace Kinetic System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2a1700'
  on-tertiary-container: '#b87500'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '800'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xxs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-xxl: 3rem
---

## Brand & Style

This design system establishes a high-velocity, dependable framework for an on-demand labor and skill marketplace. The identity balances two critical operational demands: absolute structural dependability (for transactional safety, identity verification, and payout processing) and rapid, kinetic agility (for immediate dispatch, task bidding, and real-time completion).

The target audience encompasses a bilateral user base: task posters demanding accountability, speed, and quality assurance, alongside independent workers requiring transparency, immediate liquidity, and seamless navigation. The interface evokes unyielding financial trust, clarity during high-stress urgent requests, and continuous forward momentum.

The visual style fuses **Corporate Modern** rigor with **Tactile Utility**:
- Crisp, mathematically balanced card containers with clear structural boundaries.
- Tactile, high-contrast action triggers ensuring unmissable feedback in transit or field work.
- Ambient information architecture that foregrounds dynamic states: real-time worker locations, escrow release states, urgent task flags, and dual worker/poster status transitions.
- Functional whitespace calibrated for dense data presentation without perceptual clutter.

## Colors

The palette establishes an immediate hierarchy between institutional trust, operational vitality, and operational urgency.

- **Primary (`#0F172A` / Deep Slate Indigo):** Serves as the anchor for the system. Used for core structural boundaries, navigation anchors, primary headings, top-level navigation headers, and unyielding baseline UI elements. Represents structural permanence and operational governance.
- **Secondary (`#059669` / Vibrant Emerald Teal):** Signifies liquidity, successful matches, verified credibility, and direct affirmative actions. Paired with lighter tint shifts (`#10B981`, `#ECFDF5`) for active task counters, completion buttons, accepted bids, and funds released in escrow.
- **Tertiary (`#F59E0B` / Urgent Warm Amber):** Reserved strictly for temporal priority, urgent task badges, pending confirmations, attention-required notices, and immediate expiration warnings. Used judiciously to prevent visual desensitization.
- **Neutral (`#64748B` / Cool Steel Slate):** Governs structural outlines, muted body captions, secondary metadata (distance, timestamps, rating counts), and background structural tiers (`#F8FAFC`, `#F1F5F9`).

### Surface & Functional Architecture
- **Base Canvas:** `#F8FAFC` (Clean slate-tinted canvas preventing harsh glare under outdoor mobile usage).
- **Surface Layer 1 (Card/Container):** `#FFFFFF` with low-opacity borders (`#E2E8F0`).
- **Surface Layer 2 (Elevated Sheets & Modals):** `#FFFFFF` with structural boundary definition.
- **On-Primary:** `#FFFFFF` high contrast text across deep slate and emerald surfaces.

## Typography

The typography couples the open, energetic structural geometry of **Plus Jakarta Sans** for titles, display headers, and pricing figures with the hyper-utilitarian neutral clarity of **Inter** for dense transactional interfaces, status tags, and metadata reading.

- **Headlines:** Set in Plus Jakarta Sans (600 to 800 weight) with tight negative tracking to maintain commanding authority and rapid scanning on compact screens. Numbers in task payouts and hourly rates utilize tabular alignment properties for crisp balance.
- **Body & Data:** Set in Inter (400 and 500 weight) to guarantee legibility at high parsing speeds across adverse outdoor light conditions, small device displays, and varying density scales.
- **Labels & Status Pills:** High-contrast Inter (600 to 700 weight) rendered with deliberate positive tracking in smaller scales (`label-sm`) to maximize rapid decipherability on status badges, worker badges, and dual-mode switches.

## Layout & Spacing

This design system uses an **8-point linear spatial cadence** (with a 4-point sub-grid for badges, icons, and micro-alignments) optimized for mobile-first thumb-zone navigation.

### Mobile Grid & Layout
- **Mobile Grid (under 600px):** 4-column fluid layout with `1rem` (16px) canvas edge margins and `0.75rem` (12px) internal gutters. Fixed bottom navigation and contextual action trays adhere strictly to safe-area insets.
- **Tablet / Expanded Screen (600px - 1024px):** 8-column layout with `1.5rem` (24px) margins and `1rem` (16px) gutters. Task feeds switch to dual-column masonry or card matrices.
- **Desktop (over 1024px):** 12-column layout max-width constrained to `1200px` centered with persistent dual-rail sidebars (dispatch controls + filter panel).

### Spacing Application
- `space-xs` (4px) & `space-sm` (8px): Used strictly for pill badge internal padding, status dot separations, and icon-to-label gaps.
- `space-md` (16px): The universal spacing base. Card internal padding, field row spacing, standard vertical stacking in feed lists.
- `space-lg` (24px): Boundary spacing between unrelated card clusters, section headers, and category grid modules.
- `space-xl` (32px): Modal and bottom-sheet separation from main canvas anchors.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Surface Stacking** reinforced by **Ambient, Slate-Tinted Shadows** and **Low-Contrast Structural Borders**. This ensures cards do not visually float without anchor, reinforcing physical safety and structural clarity.

### Depth Hierarchy
- **Level 0 (Base Canvas):** Background layer (`#F8FAFC`). Flat, no elevation.
- **Level 1 (Resting Cards & Tiles):** Surface background (`#FFFFFF`), enclosed by a continuous 1px border (`#E2E8F0`). Shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Active/Interactive State & Dropdowns):** Subtle lift on tap or swipe. Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`. Border shifts to `#CBD5E1`.
- **Level 3 (Floating Actions & Sticky Modals):** Sticky action trays, filter pills, floating bid buttons. Shadow: `0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -4px rgba(15, 23, 42, 0.05)`.
- **Level 4 (Bottom Sheets & Context Drawers):** High-layer overlays over dimmed backdrop (`rgba(15, 23, 42, 0.4)`). Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.15), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`.

## Shapes

The design system implements a **Tier 2 (Rounded)** curvature language. This standardizes a consistent 0.5rem (8px) base radius across the core card ecosystem, with deliberate, strategic variations based on component scale and interactivity:

- **Status Badges, Filter Chips, & Mode Toggles:** Fully rounded pill shapes (`rounded-full` / `9999px`) to visually isolate dynamic categorical and temporal information from static content.
- **Input Fields & Buttons:** Standardized at `0.75rem` (12px) for an ergonomic, friendly hand feel that remains modern and precise.
- **Category Icon Tiles:** `0.75rem` (12px) to `1rem` (16px) squircle containers that frame dynamic iconography cleanly.
- **Task Cards & Information Sheets:** `1rem` (16px) outer radius to maintain smooth integration with edge screens while maintaining structural container identity.
- **Bottom Sheets:** Top corners curved at `1.5rem` (24px) for intuitive gestural grounding.

## Components

### Buttons
- **Primary CTA:** Deep Slate Indigo (`#0F172A`) or Emerald Teal (`#059669` for payout/apply triggers) fill, text in white (`label-lg`), height: 48px (mobile touch standard), roundedness: 12px. Subtle scale compression on active tap (0.98).
- **Urgent / Expedited CTA:** Amber surface (`#F59E0B`) with deep slate text (`#0F172A`) for immediate booking actions.
- **Secondary Outlined:** Border: 1.5px solid `#E2E8F0`, background: `#FFFFFF`, text: `#0F172A`. On press: `#F8FAFC`.
- **Tertiary / Destructive:** Muted slate or soft red flat fills with crisp typography.

### Role Toggle (Poster / Worker Switch)
- Segmented container with a `#F1F5F9` recessed track (padding: 4px, rounded: full).
- The active selected thumb utilizes white surface fill (`#FFFFFF`), a subtle 1px border (`#E2E8F0`), and Level 1 elevation.
- Smooth kinetic spring transition between "Post a Task" and "Earn as Worker" modes with synchronized label color shifts.

### Status Badges & Urgent Tags
- **Urgent Badge:** Amber tint (`#FEF3C7`), text (`#B45309`), accompanied by a 6px pulsating dot indicator. Rounded pill (`9999px`), padding: 4px 10px, typography: `label-sm`.
- **Verified / Safe Badge:** Soft emerald background (`#ECFDF5`), bold emerald text (`#047857`), paired with a shield-check vector.
- **In-Escrow Status:** Slate-indigo surface tint (`#F1F5F9`), slate text (`#334155`), padlock glyph.

### Category Icon Tiles
- Square aspect-ratio tiles (72px to 84px on mobile) constructed on `#FFFFFF` base layers with 1px `#E2E8F0` borders.
- Center-aligned category glyphs paired with high-legibility `label-sm` category names below.
- Active or selected categories invert to a subtle emerald wash (`#ECFDF5`) with a 1.5px `#059669` boundary.

### Cards (Task & Bid Listings)
- Multi-tier layouts containing:
  - Header: Poster/Worker avatar, verified check, time-since-posted, urgent status pill.
  - Body: Task title (`headline-sm`), two-line truncated description (`body-md`), location & distance metadata.
  - Footer: Tabular price anchor (e.g., "$120 Fixed" or "$45/hr" in Plus Jakarta Sans bold) alongside quick-action acceptance button.

### Input Fields & Controls
- **Inputs:** Height: 48px, background: `#FFFFFF`, border: 1.5px `#CBD5E1`, typography: `body-md`. Focus state transitions to 2px `#0F172A` ring with zero lateral jump. Error state highlights in vibrant crimson (`#EF4444`).
- **Checkboxes & Radios:** Emerald Teal (`#059669`) fill on checked state with crisp white vectors. Inactive state: `#CBD5E1` outline on white.