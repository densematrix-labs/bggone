import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <span className={styles.logo}>⚡ BgGone</span>
          <p className={styles.tagline}>{t('footer.tagline')}</p>
        </div>
        
        <div className={styles.links}>
          <div className={styles.column}>
            <h4>{t('footer.product')}</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/pricing">{t('nav.pricing')}</Link>
          </div>
          
          <div className={styles.column}>
            <h4>{t('footer.compare')}</h4>
            <Link to="/vs/erase-bg">vs Erase.bg</Link>
            <Link to="/vs/photoroom">vs PhotoRoom</Link>
            <Link to="/vs/canva">vs Canva</Link>
          </div>
          
          <div className={styles.column}>
            <h4>{t('footer.legal')}</h4>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© 2026 BgGone by <a href="https://densematrix.ai" target="_blank" rel="noopener">DenseMatrix</a></p>
        </div>
      </div>
    </footer>
  )
}
