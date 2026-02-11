import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import styles from './DropZone.module.css'

interface DropZoneProps {
  onFileSelect: (file: File) => void
  isProcessing: boolean
  disabled?: boolean
}

const ACCEPTED_TYPES = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
  'image/gif': ['.gif'],
}

const MAX_SIZE = 20 * 1024 * 1024 // 20MB

export default function DropZone({ onFileSelect, isProcessing, disabled }: DropZoneProps) {
  const { t } = useTranslation()
  const [dragError, setDragError] = useState<string | null>(null)
  
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setDragError(null)
    
    if (rejectedFiles.length > 0) {
      const error = rejectedFiles[0].errors[0]
      if (error.code === 'file-too-large') {
        setDragError(t('dropzone.errorSize'))
      } else if (error.code === 'file-invalid-type') {
        setDragError(t('dropzone.errorType'))
      }
      return
    }
    
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0])
    }
  }, [onFileSelect, t])
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
    disabled: disabled || isProcessing,
  })
  
  return (
    <div className={styles.wrapper}>
      <motion.div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${isDragReject ? styles.reject : ''} ${isProcessing ? styles.processing : ''}`}
        whileHover={{ scale: disabled || isProcessing ? 1 : 1.01 }}
        whileTap={{ scale: disabled || isProcessing ? 1 : 0.99 }}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.content}
            >
              <div className={styles.processingIcon}>
                <div className={styles.spinner}></div>
                <span>⚡</span>
              </div>
              <p className={styles.title}>{t('dropzone.processing')}</p>
              <p className={styles.subtitle}>{t('dropzone.processingHint')}</p>
            </motion.div>
          ) : isDragActive ? (
            <motion.div
              key="dragging"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={styles.content}
            >
              <div className={styles.iconActive}>📥</div>
              <p className={styles.title}>{t('dropzone.drop')}</p>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.content}
            >
              <div className={styles.icon}>🖼️</div>
              <p className={styles.title}>{t('dropzone.title')}</p>
              <p className={styles.subtitle}>{t('dropzone.subtitle')}</p>
              <button className={styles.button}>{t('dropzone.button')}</button>
              <p className={styles.hint}>{t('dropzone.hint')}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <AnimatePresence>
        {dragError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.error}
          >
            {dragError}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
