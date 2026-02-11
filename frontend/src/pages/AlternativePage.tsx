import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import styles from './AlternativePage.module.css'

const useCaseInfo: Record<string, { title: string; description: string; benefits: string[] }> = {
  'etsy-sellers': {
    title: 'Etsy Sellers',
    description: 'Create professional product photos for your Etsy shop with clean, transparent backgrounds.',
    benefits: [
      'Make your products stand out in search results',
      'Create consistent, professional listings',
      'No need for expensive photo equipment',
      'Process multiple products quickly',
    ],
  },
  'shopify': {
    title: 'Shopify Store Owners',
    description: 'Enhance your Shopify store with professional product images that convert.',
    benefits: [
      'Match your store\'s aesthetic perfectly',
      'Improve product page conversion rates',
      'Create cohesive collection displays',
      'Easy batch processing for large catalogs',
    ],
  },
  'designers': {
    title: 'Graphic Designers',
    description: 'Speed up your design workflow with instant background removal.',
    benefits: [
      'Save hours on manual masking',
      'Get clean edges even on complex subjects',
      'Export in high resolution for print',
      'Integrate seamlessly into your workflow',
    ],
  },
  'photographers': {
    title: 'Photographers',
    description: 'Quickly edit and deliver photos with professional background removal.',
    benefits: [
      'Speed up post-processing workflow',
      'Offer additional services to clients',
      'Create composite images easily',
      'Batch process event photos',
    ],
  },
}

export default function AlternativePage() {
  const { useCase } = useParams<{ useCase: string }>()
  const { t } = useTranslation()
  
  const info = useCase ? useCaseInfo[useCase] : null
  
  if (!info) {
    return (
      <div className={styles.page}>
        <h1>{t('alternative.notFound')}</h1>
        <Link to="/">{t('alternative.backHome')}</Link>
      </div>
    )
  }
  
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Best remove.bg Alternative for {info.title}</h1>
        <p>{info.description}</p>
      </motion.div>
      
      <motion.section
        className={styles.benefits}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2>{t('alternative.whyBgGone')}</h2>
        <ul>
          {info.benefits.map((benefit, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <span className={styles.check}>✓</span>
              {benefit}
            </motion.li>
          ))}
        </ul>
      </motion.section>
      
      <motion.section
        className={styles.advantages}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2>{t('alternative.overRemoveBg')}</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>🆓 {t('alternative.freeHD')}</h3>
            <p>{t('alternative.freeHDDesc')}</p>
          </div>
          <div className={styles.card}>
            <h3>🚀 {t('alternative.noSignup')}</h3>
            <p>{t('alternative.noSignupDesc')}</p>
          </div>
          <div className={styles.card}>
            <h3>💰 {t('alternative.affordable')}</h3>
            <p>{t('alternative.affordableDesc')}</p>
          </div>
        </div>
      </motion.section>
      
      <motion.div
        className={styles.cta}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Link to="/" className={styles.ctaButton}>
          {t('alternative.tryNow')} →
        </Link>
      </motion.div>
    </div>
  )
}
