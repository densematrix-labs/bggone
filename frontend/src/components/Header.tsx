import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'
import { getDemoStatus } from '../lib/api'
import styles from './Header.module.css'

export default function Header() {
  const { t } = useTranslation()
  const [showIntro, setShowIntro] = useState(false)

  useEffect(() => {
    let mounted = true
    getDemoStatus()
      .then((status) => {
        if (mounted) setShowIntro(status.intro_enabled)
      })
      .catch(() => {
        if (mounted) setShowIntro(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>BgGone</span>
        </Link>
        
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>{t('nav.home')}</Link>
          {showIntro && <Link to="/intro" className={styles.navLink}>简介</Link>}
          <Link to="/pricing" className={styles.navLink}>{t('nav.pricing')}</Link>
        </nav>
        
        <div className={styles.actions}>
          <LanguageSelector />
        </div>
      </div>
    </header>
  )
}
