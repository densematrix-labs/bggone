import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { createCheckout } from '../lib/api'
import styles from './PricingPage.module.css'

interface PricingTier {
  sku: string
  name: string
  price: string
  priceNote?: string
  features: string[]
  popular?: boolean
}

export default function PricingPage() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState<string | null>(null)
  
  const tiers: PricingTier[] = [
    {
      sku: 'free',
      name: t('pricing.free.name'),
      price: '$0',
      features: [
        t('pricing.free.feature1'),
        t('pricing.free.feature2'),
        t('pricing.free.feature3'),
        t('pricing.free.feature4'),
      ],
    },
    {
      sku: 'pack_20',
      name: t('pricing.pack20.name'),
      price: '$4.99',
      priceNote: t('pricing.oneTime'),
      features: [
        t('pricing.pack20.feature1'),
        t('pricing.pack20.feature2'),
        t('pricing.pack20.feature3'),
        t('pricing.pack20.feature4'),
      ],
      popular: true,
    },
    {
      sku: 'unlimited',
      name: t('pricing.unlimited.name'),
      price: '$9.99',
      priceNote: t('pricing.monthly'),
      features: [
        t('pricing.unlimited.feature1'),
        t('pricing.unlimited.feature2'),
        t('pricing.unlimited.feature3'),
        t('pricing.unlimited.feature4'),
      ],
    },
  ]
  
  const handlePurchase = async (sku: string) => {
    if (sku === 'free') return
    
    setLoading(sku)
    try {
      const checkoutUrl = await createCheckout(sku)
      window.location.href = checkoutUrl
    } catch (error) {
      console.error('Checkout failed:', error)
      setLoading(null)
    }
  }
  
  return (
    <div className={styles.page}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>{t('pricing.title')}</h1>
        <p>{t('pricing.subtitle')}</p>
      </motion.div>
      
      <div className={styles.tiers}>
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.sku}
            className={`${styles.tier} ${tier.popular ? styles.popular : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {tier.popular && (
              <span className={styles.popularBadge}>{t('pricing.popular')}</span>
            )}
            
            <h2 className={styles.tierName}>{tier.name}</h2>
            
            <div className={styles.priceContainer}>
              <span className={styles.price}>{tier.price}</span>
              {tier.priceNote && (
                <span className={styles.priceNote}>{tier.priceNote}</span>
              )}
            </div>
            
            <ul className={styles.features}>
              {tier.features.map((feature, i) => (
                <li key={i}>
                  <span className={styles.check}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <button
              className={`${styles.button} ${tier.sku === 'free' ? styles.buttonSecondary : ''}`}
              onClick={() => handlePurchase(tier.sku)}
              disabled={loading === tier.sku}
            >
              {loading === tier.sku ? (
                <span className={styles.loading}>⏳</span>
              ) : tier.sku === 'free' ? (
                t('pricing.currentPlan')
              ) : (
                t('pricing.getStarted')
              )}
            </button>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className={styles.guarantee}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p>🔒 {t('pricing.guarantee')}</p>
      </motion.div>
    </div>
  )
}
