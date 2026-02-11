import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import DropZone from '../components/DropZone'
import ImagePreview from '../components/ImagePreview'
import UsageCounter from '../components/UsageCounter'
import ComparisonTable from '../components/ComparisonTable'
import FeedbackWidget from '../components/FeedbackWidget'
import { useAppStore } from '../stores/appStore'
import { removeBackground, checkRateLimit } from '../lib/api'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { t } = useTranslation()
  const {
    isProcessing,
    error,
    originalImage,
    processedImage,
    originalFileName,
    remaining,
    setRateLimit,
    setProcessing,
    setError,
    setImages,
    reset,
  } = useAppStore()
  
  // Check rate limit on mount
  useEffect(() => {
    checkRateLimit()
      .then(data => setRateLimit(data.remaining, data.daily_limit, data.reset_at))
      .catch(console.error)
  }, [setRateLimit])
  
  const handleFileSelect = useCallback(async (file: File) => {
    setProcessing(true)
    setImages(null, null, null)
    
    // Create preview of original
    const originalUrl = URL.createObjectURL(file)
    
    try {
      const result = await removeBackground(file)
      const processedUrl = URL.createObjectURL(result.blob)
      
      setImages(originalUrl, processedUrl, file.name)
      setRateLimit(result.remaining, result.dailyLimit)
      setProcessing(false)
    } catch (err: any) {
      setError(err.message || 'Failed to process image')
      URL.revokeObjectURL(originalUrl)
    }
  }, [setProcessing, setImages, setRateLimit, setError])
  
  const handleReset = useCallback(() => {
    if (originalImage) URL.revokeObjectURL(originalImage)
    if (processedImage) URL.revokeObjectURL(processedImage)
    reset()
  }, [originalImage, processedImage, reset])
  
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>
            {t('hero.title')}
          </h1>
          <p className={styles.subtitle}>
            {t('hero.subtitle')}
          </p>
          
          <div className={styles.features}>
            <span className={styles.feature}>✓ {t('hero.feature1')}</span>
            <span className={styles.feature}>✓ {t('hero.feature2')}</span>
            <span className={styles.feature}>✓ {t('hero.feature3')}</span>
          </div>
        </motion.div>
        
        {/* Main Tool Section */}
        <motion.div
          className={styles.toolSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {processedImage && originalImage && originalFileName ? (
            <ImagePreview
              originalImage={originalImage}
              processedImage={processedImage}
              fileName={originalFileName}
              onReset={handleReset}
            />
          ) : (
            <DropZone
              onFileSelect={handleFileSelect}
              isProcessing={isProcessing}
              disabled={remaining === 0}
            />
          )}
          
          {error && (
            <motion.p
              className={styles.error}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          
          <UsageCounter />
        </motion.div>
      </section>
      
      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2>{t('how.title')}</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepIcon}>📤</span>
            <h3>{t('how.step1Title')}</h3>
            <p>{t('how.step1Desc')}</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>⚡</span>
            <h3>{t('how.step2Title')}</h3>
            <p>{t('how.step2Desc')}</p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>📥</span>
            <h3>{t('how.step3Title')}</h3>
            <p>{t('how.step3Desc')}</p>
          </div>
        </div>
      </section>
      
      {/* Comparison Table (SEO: competitor_intercept) */}
      <ComparisonTable competitor="remove.bg" />
      
      {/* Feedback Widget (for aggregateRating) */}
      <FeedbackWidget />
    </div>
  )
}
