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

