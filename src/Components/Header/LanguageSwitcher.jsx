import React, { useState, useEffect } from 'react'
import { i18n } from '../../i18n'

const LanguageSwitcher = () => {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || i18n.locale || 'en'
    } catch (e) {
      return i18n.locale || 'en'
    }
  })

  useEffect(() => {
    if (!lang) return
    i18n.activate(lang)
    try { localStorage.setItem('lang', lang) } catch (e) {}
  }, [lang])

  return (
    <div className="flex items-center">
      <select
        aria-label="Select language"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent text-sm text-gray-700 border border-gray-200 rounded px-2 py-1"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  )
}

export default LanguageSwitcher
