# README — Development (dev)

This document summarizes the steps required to work on the project and how to manage translations using LinguiJS (English as `sourceLocale`, Spanish as secondary).

Prerequisites
- Node >= 14, npm >= 6
- `type: "module"` in `package.json` (already configured)

Quick install
```bash
npm install
```

Important scripts (`package.json`)
- `npm run dev` — start development server (vite)
- `npm run build` — production build
- `npm run preview` — preview the build
- `npm run lingui:extract` — extract new i18n keys into `.po` files
- `npm run lingui:compile` — compile `.po` into JS catalogs (runs `postlingui:compile` to convert to ESM)
- `npm run lingui:add:es` — add `es` locale (example)

Site Behavior Configuration
### Default Language
To change the default language of the application (shown to new users):
1. Edit [src/i18n.js](src/i18n.js) and change `i18n.activate('es')` to the desired code (`es` or `en`).
2. Edit [src/Components/Header/LanguageSwitcher.jsx](src/Components/Header/LanguageSwitcher.jsx) and change the fallback value in the `useState` (e.g., `... || 'es'`).

### Main Landing Page
The behavior of the home page (`/`) is controlled via environment variables:
- `VITE_ENABLE_MAIN_LANDING`: 
  - `true`: Shows the welcome page (Landing Redesign).
  - `false`: Directly shows the **Restaurants** section on the home page.

Lingui i18n workflow
1. Add strings in components using the recommended macros:
   - For JSX fragments, use `Trans`:
     ```jsx
     import { Trans } from '@lingui/react/macro'
     <h1><Trans>Welcome to YaVoy Marketplace!</Trans></h1>
     ```
   - For attributes or runtime strings use `useLingui` + `msg`:
     ```jsx
     import { useLingui } from '@lingui/react'
     import { msg } from '@lingui/macro'

     function MyComponent(){
       const { _ } = useLingui()
       return <input placeholder={_(msg`Search`)} />
     }
     ```
   - Use `t` (tagged template) from `@lingui/macro` for compile-time constants (outside render).

2. Extract new keys:
```bash
npm run lingui:extract
```
This updates `src/locales/*/messages.po` adding new `msgid` entries.

3. Translate: open `src/locales/es/messages.po` and fill each `msgstr "..."` for new `msgid` entries.

4. Compile catalogs:
```bash
npm run lingui:compile
```
This project includes `scripts/fix-catalogs.cjs` registered in `postlingui:compile` to convert the compiled files to ESM (`export { messages }`) because `lingui compile` emits CommonJS by default.

5. Rebuild and verify:
```bash
npm run build
```
Ensure the build completes without errors and test the app in the browser.

Adding a new language
1. `npm run lingui:add-locale <locale>` or use `npm run lingui:add:es`.
2. Edit `src/locales/<locale>/messages.po` and add translations.
3. `npm run lingui:compile` and verify.

Troubleshooting and tips
- `ReferenceError: t is not defined` means `t` was used without importing it; instead use `_(msg`...`)` with `useLingui` for runtime translations inside components.
- If you see `module is not defined` or `module.exports` issues after compiling catalogs, run `npm run lingui:compile` (which triggers `postlingui:compile`) or manually run:
  ```bash
  node scripts/fix-catalogs.cjs
  ```
- For complex strings that include React elements (links, tags) prefer `Trans`.
- Avoid using `t` directly inside renders without the correct macro transform; use `msg` + `useLingui` or `Trans` instead.

Optional: Language switcher example
```jsx
import { i18n } from './i18n'

function LangSwitcher(){
  return (
    <select onChange={e => { i18n.activate(e.target.value); localStorage.setItem('lang', e.target.value); }}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  )
}
```
Recommendation: restore `localStorage` value on startup and activate the locale in `src/i18n.js`.

Best practices
- Extract and compile frequently when adding strings.
- Keep `src/locales/en/messages.po` as the source reference (`sourceLocale`).
- Use placeholders in `msgid` where variables are needed; avoid very large single `msgid` blobs.

Relevant files
- `package.json`
- `src/i18n.js`
- `scripts/fix-catalogs.cjs`
- `src/locales/es/messages.po`

Location component
The `Location` component (`src/Components/Header/Location.jsx`) lets users select a delivery province and municipality. It can be toggled on or off via constants in `src/utils/constants.js`.

- `LOCATION_PICKER_ENABLED` — set to `true` (default) to show the interactive picker; set to `false` to lock the app to a fixed location.
- `FIXED_PROVINCE` — the province dispatched to Redux when the picker is disabled.
- `FIXED_MUNICIPALITY` — the municipality dispatched to Redux when the picker is disabled.

To disable the picker and lock to a specific location:
```js
// src/utils/constants.js
export const LOCATION_PICKER_ENABLED = false;
export const FIXED_PROVINCE     = { label: 'La Habana', value: { id: 1, name: 'La Habana' } };
export const FIXED_MUNICIPALITY = { label: 'Plaza de la Revolución', value: { id: 1, name: 'Plaza de la Revolución' } };
```
Update `id` and `name` to match the actual values returned by the backend (`/api/v1/location/provinces` and `/api/v1/location/province/:id/municipalities`).

When the picker is disabled:
- The picker UI is not rendered.
- `FIXED_PROVINCE` and `FIXED_MUNICIPALITY` are dispatched to the Redux store once on mount.
- The rest of the app (restaurants list, cart validation, etc.) behaves as if the user had selected that location manually.

When the picker is enabled, all standard behavior is restored: the dialog opens automatically on the first visit if no location has been set, and users can change their delivery zone at any time.

Icons (Material Symbols Outlined)
Icons are rendered with the `material-symbols-outlined` class and the icon name as text:
```jsx
<span className="notranslate material-symbols-outlined !text-2xl">restaurant</span>
```

The font is **self-hosted and subsetted**: `public/fonts/material-symbols-outlined.woff2` (18 KB) contains only the icons the project actually uses. It used to come from Google Fonts without subsetting (`wght,FILL@100..700,0..1`), which meant 1.09 MB, two chained third-party origins, and a missing `font-display` (3 s of invisible glyphs before the swap). The `href` of the `<link rel="preload">` in [index.html](index.html) and the `src()` in [src/styles/material-symbols.css](src/styles/material-symbols.css) must match exactly.

### Adding a new icon
1. Add the icon name (no `.woff2`, with underscores, exactly as it appears on https://fonts.google.com/icons) to the `ICONS` array in [scripts/fetch-material-symbols.sh](scripts/fetch-material-symbols.sh):
   ```bash
   ICONS=(
     account_tree ads_click call cake
     # ... add the new icon here, for example: rocket_launch
   )
   ```
2. Regenerate the subset (**mandatory**, the `.woff2` is versioned in the repo):
   ```bash
   ./scripts/fetch-material-symbols.sh
   ```
   The script queries the Google Fonts API with `icon_names=<list>` and overwrites `public/fonts/material-symbols-outlined.woff2`. It prints the resulting size and how many icons are included.
3. Commit **both** changes (the script and the regenerated `.woff2`).
4. Verify:
   ```bash
   npm run dev
   ```
   The new icon renders as a glyph. There is no need to touch `index.html` or the CSS.

### If you forget to regenerate the subset
The icon **will not draw**: you see the plain ligature text (`rocket_launch`) instead of the symbol. There is no console error or warning, so it is easy to miss in review. That is the only symptom.

### Icons with a dynamic value
If the icon name comes from a variable, the name still has to be present in the script's `ICONS` array. Examples in this project:
- `CATEGORY_CARDS` and `STORE_ICONS` in [src/Components/Landing/Restaurants.jsx](src/Components/Landing/Restaurants.jsx), rendered as `{category.icon}` and `{icon}`.

### Notes
- The subset keeps the `wght` (100–700) and `FILL` (0–1) variable axes, so `style={{ fontVariationSettings: "'FILL' 1" }}` keeps working.
- Do not change the `font-family` by hand or add another `<link>` to Google Fonts: it would reintroduce the two-origin waterfall this removes.
- Do not accidentally commit the full font (1.09 MB); check the size the script prints.

Environment variables and local overrides
- Vite supports multiple `.env` files and a precedence order: `.env` → `.env.[mode]` → `.env.[mode].local`.
- Recommended workflow:
  - Keep repository-wide defaults in `.env` or `.env.[mode]` (versioned).
  - Keep developer overrides in `.env.[mode].local` (gitignored). This lets each developer use `VITE_APP_BASE_URL=http://127.0.0.1:9000` locally without editing the shared files.
- Example local file (do not commit):
```env
# .env.development.local
VITE_APP_BASE_URL=http://127.0.0.1:9000
VITE_DEFAULT_MAIL=servicios@yavoycuba.com
VITE_DEFAULT_PHONE=+1 (305) 645-7572
VITE_DEFAULT_PLACE=Miami, FL, USA
```
- CI / Hosting (no change to repo): set `VITE_APP_BASE_URL` in your hosting provider's environment variables or CI secrets (Vercel, Netlify, GitHub Actions). Example for GitHub Actions:
```yaml
- name: Build
  env:
    VITE_APP_BASE_URL: ${{ secrets.VITE_APP_BASE_URL }}
  run: npm run build
```
- If you need to change values at runtime without rebuilding, use a runtime `public/config.json` and load it at app startup (see earlier discussion in this README).