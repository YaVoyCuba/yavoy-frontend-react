import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages as enMessages } from './locales/en/messages.js'
import { messages as esMessages } from './locales/es/messages.js'

// Load all locales and activate Spanish as primary
i18n.load({ en: enMessages, es: esMessages })
i18n.activate('es')

export { i18n, I18nProvider }
