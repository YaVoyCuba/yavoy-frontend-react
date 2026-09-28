# README — Desarrollo (dev)

Este documento resume los pasos necesarios para trabajar en el proyecto y cómo manejar la traducción con LinguiJS (English como `sourceLocale`, Español como secundario).

Requisitos previos
- Node >= 14, npm >= 6
- `type: "module"` en `package.json` (ya configurado)

Instalación rápida
```bash
npm install
```

Scripts importantes (en `package.json`)
- `npm run dev` — servidor de desarrollo (vite)
- `npm run build` — build de producción
- `npm run preview` — preview del build
- `npm run lingui:extract` — extrae nuevas claves de i18n a los `.po`
- `npm run lingui:compile` — compila `.po` a JS (ejecuta `postlingui:compile` para convertir a ESM)
- `npm run lingui:add:es` — añade locale `es` (ejemplo)

Configuración de Comportamiento del Sitio
### Idioma por defecto
Para cambiar el idioma por defecto de la aplicación (el que se muestra a usuarios nuevos):
1. Edita [src/i18n.js](src/i18n.js) y cambia `i18n.activate('es')` por el código deseado (`es` o `en`).
2. Edita [src/Components/Header/LanguageSwitcher.jsx](src/Components/Header/LanguageSwitcher.jsx) y cambia el valor por defecto en el `useState` (ej: `... || 'es'`).

### Landing Page Principal
El comportamiento de la página de inicio (`/`) se controla mediante variables de entorno:
- `VITE_ENABLE_MAIN_LANDING`: 
  - `true`: Muestra la página de bienvenida (Landing Redesign).
  - `false`: Muestra directamente la sección de **Restaurantes** en la página de inicio.

Flujo de trabajo de i18n (Lingui)
1. Añade cadenas en componentes usando las macros recomendadas:
   - Para fragmentos JSX use `Trans`:
     ```jsx
     import { Trans } from '@lingui/react/macro'
     <h1><Trans>Welcome to YaVoy Marketplace!</Trans></h1>
     ```
   - Para atributos o strings en tiempo de ejecución use `useLingui` + `msg`:
     ```jsx
     import { useLingui } from '@lingui/react'
     import { msg } from '@lingui/macro'

     function MyComponent(){
       const { _ } = useLingui()
       return <input placeholder={_(msg`Search`)} />
     }
     ```
   - `t` (tagged template) desde `@lingui/macro` se usa para constantes en tiempo de compilación (fuera del render).

2. Extrae nuevas claves:
```bash
npm run lingui:extract
```
Esto actualizará `src/locales/*/messages.po` añadiendo las nuevas `msgid`.

3. Traduce: abre [src/locales/es/messages.po](src/locales/es/messages.po) y rellena cada `msgstr "..."` para las `msgid` nuevas.

4. Compila los catálogos:
```bash
npm run lingui:compile
```
El proyecto incluye `scripts/fix-catalogs.cjs` y una entrada `postlingui:compile` que convierte automáticamente los ficheros compilados a formato ESM (export { messages }) porque el output por defecto de `lingui compile` es CommonJS.

5. Rebuild y verificación:
```bash
npm run build
```
Comprueba que el build termina sin errores y verifica en el navegador.

Añadir un nuevo idioma
1. `npm run lingui:add-locale <locale>` o `npm run lingui:add:es` (ejemplo ya en `package.json`).
2. Edita `src/locales/<locale>/messages.po` y añade traducciones.
3. `npm run lingui:compile` y verificar.

Consejos y resolución de problemas
- Si ves `ReferenceError: t is not defined` significa que se usó `t` sin importarlo; o usa `_(msg`...`)` con `useLingui` para runtime.
- Si ves `module is not defined` o issues con `module.exports` tras compilar catálogos, corre `npm run lingui:compile` (ejecuta `postlingui:compile`) o manualmente:
  ```bash
  node scripts/fix-catalogs.cjs
  ```
- Para strings complejas con elementos React (enlaces, tags) preferir `Trans`.
- Evita usar `t\`...\`` directamente dentro de renders sin el transform correcto; usa `msg` + `useLingui` o `Trans`.

Implementar selector de idioma (opcional)
```jsx
import { i18n } from './i18n'

function LangSwitcher(){
  return (
    <select onChange={e=>{ i18n.activate(e.target.value); localStorage.setItem('lang', e.target.value) }}> 
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  )
}
```
Recomendación: restaurar `localStorage` al arrancar y activar el locale en `src/i18n.js`.

Buenas prácticas
- Extrae y compila frecuentemente cuando se agregan cadenas.
- Mantén `src/locales/en/messages.po` como referencia fuente (sourceLocale).
- Evita grandes chunk de texto sin variables; usa placeholders en las `msgid` donde aplique.

Archivos relevantes
- [package.json](package.json)
- [src/i18n.js](src/i18n.js)
- [scripts/fix-catalogs.cjs](scripts/fix-catalogs.cjs)
- [src/locales/es/messages.po](src/locales/es/messages.po)

Componente Location
El componente `Location` (`src/Components/Header/Location.jsx`) permite al usuario seleccionar una provincia y un municipio de entrega. Puede habilitarse o deshabilitarse mediante constantes en `src/utils/constants.js`.

- `LOCATION_PICKER_ENABLED` — `true` (valor por defecto) muestra el selector interactivo; `false` bloquea la app a una ubicación fija.
- `FIXED_PROVINCE` — la provincia que se despacha a Redux cuando el selector está deshabilitado.
- `FIXED_MUNICIPALITY` — el municipio que se despacha a Redux cuando el selector está deshabilitado.

Para deshabilitar el selector y fijar una ubicación concreta:
```js
// src/utils/constants.js
export const LOCATION_PICKER_ENABLED = false;
export const FIXED_PROVINCE     = { label: 'La Habana', value: { id: 1, name: 'La Habana' } };
export const FIXED_MUNICIPALITY = { label: 'Plaza de la Revolución', value: { id: 1, name: 'Plaza de la Revolución' } };
```
Actualiza `id` y `name` con los valores reales devueltos por el backend (`/api/v1/location/provinces` y `/api/v1/location/province/:id/municipalities`).

Cuando el selector está deshabilitado:
- No se renderiza ninguna UI de selección de ubicación.
- `FIXED_PROVINCE` y `FIXED_MUNICIPALITY` se despachan al store de Redux una sola vez al montar el componente.
- El resto de la app (listado de restaurantes, validación del carrito, etc.) se comporta como si el usuario hubiera seleccionado esa ubicación manualmente.

Cuando el selector está habilitado se restaura todo el comportamiento estándar: el diálogo se abre automáticamente en la primera visita si no hay ubicación guardada, y el usuario puede cambiar su zona de entrega en cualquier momento.

Iconos (Material Symbols Outlined)
Los iconos se usan con la clase `material-symbols-outlined` y el nombre del icono como texto:
```jsx
<span className="notranslate material-symbols-outlined !text-2xl">restaurant</span>
```

La fuente está **self-hosted y subsetteada**: `public/fonts/material-symbols-outlined.woff2` (18 KB) contiene únicamente los iconos que el proyecto usa. Antes venía de Google Fonts sin subset (`wght,FILL@100..700,0..1`), lo que suponía 1,09 MB, dos orígenes de terceros en cadena y un `font-display` ausente (3 s de glifos invisibles antes del swap). El `href` del `<link rel="preload">` en [index.html](index.html) y el `src()` de [src/styles/material-symbols.css](src/styles/material-symbols.css) deben coincidir exactamente.

### Añadir un icono nuevo
1. Añade el nombre del icono (sin `.woff2`, con guiones bajos, tal cual aparece en https://fonts.google.com/icons) al array `ICONS` de [scripts/fetch-material-symbols.sh](scripts/fetch-material-symbols.sh):
   ```bash
   ICONS=(
     account_tree ads_click call cake
     # ... añade aquí el icono nuevo, por ejemplo: rocket_launch
   )
   ```
2. Regenera el subset (**obligatorio**, el `.woff2` está versionado en el repo):
   ```bash
   ./scripts/fetch-material-symbols.sh
   ```
   El script consulta la API de Google Fonts con `icon_names=<lista>` y sobrescribe `public/fonts/material-symbols-outlined.woff2`. Imprime el tamaño resultante y cuántos iconos incluye.
3. Commitea **ambos** cambios (el script y el `.woff2` regenerado).
4. Verifica:
   ```bash
   npm run dev
   ```
   El icono nuevo se ve como glifo. No hace falta tocar `index.html` ni el CSS.

### Si olvidas regenerar el subset
El icono **no se dibuja**: en su lugar se ve el texto plano con el nombre de la ligature (`rocket_launch`) en lugar del símbolo. No hay error de consola ni warning, así que es fácil que pase desapercibido en revisión. Es el único síntoma.

### Iconos con valor dinámico
Si el nombre del icono viene de una variable, el nombre sigue teniendo que estar en el array `ICONS` del script. Ejemplos en el proyecto:
- `CATEGORY_CARDS` y `STORE_ICONS` en [src/Components/Landing/Restaurants.jsx](src/Components/Landing/Restaurants.jsx), que se renderizan como `{category.icon}` y `{icon}`.

### Notes
- El subset conserva los ejes variables `wght` (100–700) y `FILL` (0–1), así que `style={{ fontVariationSettings: "'FILL' 1" }}` sigue funcionando.
- No cambies el `font-family` a mano ni añadas otro `<link>` a Google Fonts: reintroduciría el waterfall de dos orígenes que esto elimina.
- No subas un `.woff2` de la fuente completa (1,09 MB) por accidente; comprueba el tamaño que imprime el script.

Variables de entorno y overrides locales
- Vite soporta varios ficheros `.env` con este orden de precedencia: `.env` → `.env.[mode]` → `.env.[mode].local`.
- Flujo recomendado:
  - Mantén valores por defecto en `.env` o `.env.[mode]` (versionados en el repo).
  - Mantén overrides de desarrollador en `.env.[mode].local` (gitignored). Así cada dev puede usar `VITE_APP_BASE_URL=http://127.0.0.1:9000` sin modificar archivos compartidos.
- Ejemplo de fichero local (no commitear):
```env
# .env.development.local
VITE_APP_BASE_URL=http://127.0.0.1:9000
VITE_DEFAULT_MAIL=servicios@yavoycuba.com
VITE_DEFAULT_PHONE=+1 (305) 645-7572
VITE_DEFAULT_PLACE=Miami, FL, USA
```
- CI / Hosting (sin tocar el repo): configura `VITE_APP_BASE_URL` en las variables de entorno del proveedor (Vercel, Netlify, GitHub Actions). Ejemplo en GitHub Actions:
```yaml
- name: Build
  env:
    VITE_APP_BASE_URL: ${{ secrets.VITE_APP_BASE_URL }}
  run: npm run build
```
- Si necesitas cambiar valores en runtime sin rebuild, usa `public/config.json` y cárgalo al arrancar la app.

