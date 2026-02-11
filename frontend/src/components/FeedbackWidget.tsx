import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FeedbackWidget.module.css'

export default function FeedbackWidget() {
  const { t } = useTranslation()
  const [voted, setVoted] = useState(false)
  const [rating, setRating] = useState(0)
  
  const handleVote = async (value: number) => {
    setRating(value)
    setVoted(true)
    
    // Send to backend (fire and forget)
    try {
      await fetch('/api/v1/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          tool: 'bggone', 
          rating: value, 
          timestamp: Date.now() 
        }),
      })
    } catch {
      // Ignore errors
    }
  }
  
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <AnimatePresence mode="wait">
        {voted ? (
          <motion.p 
            key="thanks"
            className={styles.thanks}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('feedback.thanks')} 🙏
          </motion.p>
        ) : (
          <motion.div 
            key="form"
            className={styles.form}
            exit={{ opacity: 0 }}
          >
            <p className={styles.question}>{t('feedback.question')}</p>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={styles.star}
                  onClick={() => handleVote(star)}
                  onMouseEnter={() => setRating(star)}
                  onMouseLeave={() => setRating(0)}
                  aria-label={`Rate ${star} stars`}
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
