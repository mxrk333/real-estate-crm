# The Design System: Executive Suite Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Monolith"**

To design for the highest tier of Philippine enterprise is to balance legacy with hyper-modernity. This design system moves away from the "app-like" density of traditional SaaS and moves toward an **Editorial Architectural** experience. Think of the expansive lobbies of Ayala Tower One or the structural clarity of SM Aura—spaces that feel vast, expensive, and intentional.

We break the "template" look by utilizing **intentional asymmetry** and **high-contrast scale**. Large-scale typography serves as a structural element, while generous negative space (white space) isn't just "empty"—it is a luxury. We prioritize the "Executive View": high-level data clarity, reduced visual noise, and a feeling of calm authority.

---

## 2. Colors: Tonal Authority
Our palette is anchored in `primary` (#002b64), a deep navy that commands respect. However, the secret to a high-end feel is how we treat the "space" around the color.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning content. 
In this system, boundaries are defined strictly through **Background Color Shifts**. To separate a sidebar from a main content area, do not draw a line; instead, place a `surface-container-low` (#f3f4f5) panel against a `surface` (#f8f9fa) background.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface tiers to create "nested" depth:
*   **Base Layer:** `background` (#f8f9fa)
*   **Content Areas:** `surface-container-low` (#f3f4f5)
*   **Primary Cards:** `surface-container-lowest` (#ffffff)
*   **Active/Elevated Elements:** `surface-bright` (#f8f9fa)

### The "Glass & Gradient" Rule
To avoid a flat, "Bootstrap" appearance:
*   **Floating Navigation:** Use `surface` colors at 80% opacity with a `24px` backdrop blur (Glassmorphism).
*   **Signature Textures:** Apply a subtle linear gradient to main CTAs transitioning from `primary` (#002b64) to `primary_container` (#1d427f) at a 135-degree angle. This provides a "soul" and metallic depth to the buttons.

---

## 3. Typography: The Editorial Voice
We use a dual-typeface system to distinguish between **Command** (Headlines) and **Utility** (Body).

*   **Manrope (Display & Headline):** Chosen for its geometric precision and modern corporate feel. 
    *   *Display-LG (3.5rem):* Use for hero statements with tight letter spacing (-0.02em).
    *   *Headline-MD (1.75rem):* Use for section headers to provide an authoritative anchor.
*   **Inter (Title, Body, Label):** Chosen for its unmatched readability in data-heavy enterprise contexts.
    *   *Body-LG (1rem):* Always use a generous line height (1.6) to ensure the "Executive Suite" feels breathable.
    *   *Title-SM (1rem):* Bolded for field labels and card titles to ensure immediate scannability.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are often "dirty." In this system, we use light and tone to imply height.

*   **The Layering Principle:** Avoid shadows for static cards. Instead, place a `surface-container-lowest` (#ffffff) card on top of a `surface-container-low` (#f3f4f5) background. The subtle 2% difference in lightness creates a soft, natural lift.
*   **Ambient Shadows:** For "floating" elements like modals or dropdowns, use an ultra-diffused shadow: `0px 24px 48px rgba(25, 28, 29, 0.06)`. The shadow color must be a tint of `on_surface` (#191c1d), never pure black.
*   **The "Ghost Border":** If a container requires a border for accessibility (e.g., in high-contrast needs), use `outline_variant` (#c4c5d5) at **15% opacity**. It should be felt, not seen.

---

## 5. Components: The Executive Toolkit

### Buttons (The High-Touch Point)
*   **Primary:** Solid `primary` (#002b64). Roundedness: `md` (0.375rem). Use the subtle gradient mentioned in Section 2.
*   **Secondary:** Ghost style. No background, `primary` text, and a `Ghost Border` that only appears on hover.
*   **Scale:** All touch targets must be a minimum of 48px in height to ensure accessibility and a "substantial" feel.

### Input Fields
*   **Style:** Minimalist. No background fill—only a bottom border (2px) using `outline_variant`. When focused, the border transitions to `primary` and grows to 3px.
*   **Labels:** Use `label-md` in `on_surface_variant` (#444653). Always place labels above the input, never as placeholders.

### Cards & Lists
*   **The Divider Forbiddance:** Never use horizontal lines to separate list items. Use **Vertical White Space** (24px or 32px) or a subtle hover state shift to `surface-container-high` (#e7e8e9).
*   **Information Density:** Cards should have a minimum padding of `xl` (1.5rem / 24px) to maintain the "Spacious" characteristic.

### Navigation: The "Executive Rail"
*   In place of a cluttered top-bar, use a wide, left-aligned **Navigation Rail**. Use `surface-container-lowest` (#ffffff) as the base, with active states indicated by a thick (4px) vertical bar in `primary` on the left edge of the menu item.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. For example, a large `display-md` headline on the left with 3 columns of `body-md` text on the right.
*   **Do** use the `primary_fixed` (#d8e2ff) color for subtle highlight backgrounds in tables or data grids.
*   **Do** treat white space as a first-class citizen. If a layout feels "crowded," double the padding.

### Don't:
*   **Don't** use 100% opaque black for text. Use `on_surface` (#191c1d) to maintain a sophisticated, soft-ink look.
*   **Don't** use standard "drop shadows" (e.g., 0 2px 4px). They feel cheap and dated.
*   **Don't** use vibrant, saturated accent colors outside of the defined `tertiary` (#591400) for specific "Premium Alerts." Stick to the Navy/Grey/White foundation to maintain the "Trustworthy" aesthetic.
*   **Don't** use "Click Here" buttons. High-end systems use authoritative verbs: "Execute," "Authorize," "Review Portfolio."