import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from './ImagePreview.module.css'

interface ImagePreviewProps {
  originalImage: string
  processedImage: string
  fileName: string
  onReset: () => void
}

export default function ImagePreview({ 
  originalImage, 
  processedImage, 
  fileName,
  onReset 
}: ImagePreviewProps) {
  const { t } = useTranslation()
  const [showOriginal, setShowOriginal] = useState(false)
  
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = processedImage
    link.download = `bggone_${fileName.replace(/\.[^/.]+$/, '')}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.preview}>
        <div 
          className={styles.imageContainer}
          onMouseEnter={() => setShowOriginal(true)}
          onMouseLeave={() => setShowOriginal(false)}
        >
          <div className={styles.checkerboard}>
            <img 
              src={showOriginal ? originalImage : processedImage} 
              alt={showOriginal ? "Original" : "Processed"}
              className={styles.image}
            />
          </div>
          
          <div className={styles.badge}>
            {showOriginal ? t('preview.original') : t('preview.processed')}
          </div>
          
          <div className={styles.hoverHint}>
            {t('preview.hoverHint')}
          </div>
        </div>
      </div>
      
      <div className={styles.actions}>
        <motion.button
          className={styles.downloadBtn}
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>📥</span>
          {t('preview.download')}
        </motion.button>
        
        <motion.button
          className={styles.resetBtn}
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>🔄</span>
          {t('preview.another')}
        </motion.button>
      </div>
    </motion.div>
  )
}
