import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAppStore } from '../stores/appStore'
import styles from './UsageCounter.module.css'

export default function UsageCounter() {
  const { t } = useTranslation()
  const { remaining, dailyLimit, resetAt } = useAppStore()
  
  const percentage = (remaining / dailyLimit) * 100
  const isLow = remaining <= 1
  
  const formatResetTime = () => {
    if (!resetAt) return ''
    const date = new Date(resetAt * 1000)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.info}>
        <span className={styles.label}>{t('usage.remaining')}</span>
        <span className={`${styles.count} ${isLow ? styles.low : ''}`}>
          {remaining} / {dailyLimit}
        </span>
      </div>
      
      <div className={styles.bar}>
        <motion.div 
          className={`${styles.fill} ${isLow ? styles.fillLow : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      {remaining === 0 ? (
        <div className={styles.upgrade}>
          <p>{t('usage.limitReached')}</p>
          <Link to="/pricing" className={styles.upgradeLink}>
            {t('usage.upgrade')} →
          </Link>
        </div>
      ) : (
        <p className={styles.hint}>
          {t('usage.resetHint')} {formatResetTime()}
        </p>
      )}
    </motion.div>
  )
}
