#!/usr/bin/env bash
# Regenera el subset self-hosted de Material Symbols Outlined.
#
#   ./scripts/fetch-material-symbols.sh
#
# ICONOS es la lista de nombres de icono; al añadir un icono nuevo en src/ hay que
# añadirlo aquí y volver a ejecutar este script. Si se olvida, ese icono se verá
# como texto plano (no como glifo) porque no está en el subset.
#
# Se pide wght 100..700 y FILL 0..1 para conservar los ejes variables que usa
# src/Pages/frontend/PrivacyPolicyPage.jsx (fontVariationSettings: "'FILL' 1").
set -euo pipefail

cd "$(dirname "$0")/.."

UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36"
OUT="public/fonts/material-symbols-outlined.woff2"

ICONS=(
  account_tree ads_click call cake check_circle chevron_left chevron_right
  cloud contact_mail credit_card database gavel handshake help inventory
  local_cafe local_shipping location_on lunch_dining mail package_2
  partner_exchange payments person priority_high public redeem restaurant
  schedule security send shopping_bag shopping_basket shopping_cart_checkout
  star storefront support_agent verified_user
)

icon_names="$(IFS=,; echo "${ICONS[*]}")"
url="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=${icon_names}"

font_url="$(curl -sS -A "$UA" "$url" | grep -o 'https://fonts.gstatic.com[^)]*' | head -1)"

if [ -z "$font_url" ]; then
  echo "No se pudo obtener la URL de la fuente desde Google Fonts" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
curl -sS -o "$OUT" "$font_url"

printf '%s -> %s bytes\n' "$OUT" "$(wc -c <"$OUT" | tr -d ' ')"
echo "Iconos: ${#ICONS[@]}"
