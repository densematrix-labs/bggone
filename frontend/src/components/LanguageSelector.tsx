import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import styles from './LanguageSelector.module.css'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0]
  
  const handleChange = (code: string) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }
  
  return (
    <div className={styles.selector}>
      <button 
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span>{currentLang.flag}</span>
        <span className={styles.code}>{currentLang.code.toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map(lang => (
            <button
              key={lang.code}
              className={styles.option}
              onClick={() => handleChange(lang.code)}
              data-active={lang.code === i18n.language}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
