import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { checkRateLimit } from '../lib/api'
import { useAppStore } from '../stores/appStore'
import styles from './PaymentSuccessPage.module.css'

export default function PaymentSuccessPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const { setRateLimit } = useAppStore()
  
  // Refresh rate limit after successful payment
  useEffect(() => {
    checkRateLimit()
      .then(data => setRateLimit(data.remaining, data.daily_limit, data.reset_at))
      .catch(console.error)
  }, [setRateLimit])
  
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.icon}>✅</div>
        <h1>{t('paymentSuccess.title')}</h1>
        <p>{t('paymentSuccess.message')}</p>
        
        <Link to="/" className={styles.button}>
          {t('paymentSuccess.startUsing')} →
        </Link>
        
        <p className={styles.note}>
          {t('paymentSuccess.note')}
        </p>
      </motion.div>
    </div>
  )
}
