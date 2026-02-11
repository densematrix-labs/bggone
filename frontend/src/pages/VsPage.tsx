import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ComparisonTable from '../components/ComparisonTable'
import styles from './VsPage.module.css'

const competitorInfo: Record<string, { name: string; features: string[] }> = {
  'erase-bg': {
    name: 'Erase.bg',
    features: ['Free tier available', 'Simple interface', 'API access'],
  },
  'photoroom': {
    name: 'PhotoRoom',
    features: ['Mobile app', 'Templates', 'Batch processing'],
  },
  'canva': {
    name: 'Canva',
    features: ['Design tools', 'Templates', 'Team collaboration'],
  },
  'slazzer': {
    name: 'Slazzer',
    features: ['API access', 'Bulk processing', 'WordPress plugin'],
  },
  'remove-bg': {
    name: 'remove.bg',
    features: ['Industry leader', 'API access', 'Photoshop plugin'],
  },
}

export default function VsPage() {
  const { competitor } = useParams<{ competitor: string }>()
  const { t } = useTranslation()
  
  const info = competitor ? competitorInfo[competitor] : null
  const competitorName = info?.name || competitor || 'Competitor'
  
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>BgGone vs {competitorName}</h1>
        <p>{t('vs.subtitle', { competitor: competitorName })}</p>
      </motion.div>
      
      <ComparisonTable competitor={competitorName} />
      
      <motion.section
        className={styles.verdict}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2>{t('vs.whyChoose')}</h2>
        <div className={styles.reasons}>
          <div className={styles.reason}>
            <span className={styles.icon}>🆓</span>
            <h3>{t('vs.reason1Title')}</h3>
            <p>{t('vs.reason1Desc')}</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.icon}>📸</span>
            <h3>{t('vs.reason2Title')}</h3>
            <p>{t('vs.reason2Desc')}</p>
          </div>
          <div className={styles.reason}>
            <span className={styles.icon}>⚡</span>
            <h3>{t('vs.reason3Title')}</h3>
            <p>{t('vs.reason3Desc')}</p>
          </div>
        </div>
      </motion.section>
      
      <motion.div
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/" className={styles.ctaButton}>
          {t('vs.tryNow')} →
        </Link>
      </motion.div>
      
      <section className={styles.related}>
        <h3>{t('vs.moreComparisons')}</h3>
        <div className={styles.links}>
          {Object.entries(competitorInfo)
            .filter(([key]) => key !== competitor)
            .slice(0, 4)
            .map(([key, { name }]) => (
              <Link key={key} to={`/vs/${key}`}>
                BgGone vs {name}
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
