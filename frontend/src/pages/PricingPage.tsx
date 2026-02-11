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
  
  // Pricing based on competitor analysis - 70-82% cheaper than remove.bg
  const tiers: PricingTier[] = [
    {
      sku: 'free',
      name: t('pricing.free.name'),
      price: '$0',
      features: [
        t('pricing.free.feature1'),  // 5 images/day
        t('pricing.free.feature2'),  // Full HD resolution
        t('pricing.free.feature3'),  // No signup
        t('pricing.free.feature4'),  // Instant processing
      ],
    },
    {
      sku: 'starter_50',
      name: t('pricing.starter.name'),
      price: '$2.99',
      priceNote: t('pricing.oneTime'),
      features: [
        t('pricing.starter.feature1'),  // 50 credits
        t('pricing.starter.feature2'),  // $0.06/image (73% cheaper than remove.bg)
        t('pricing.starter.feature3'),  // Never expires
        t('pricing.starter.feature4'),  // Priority processing
      ],
    },
    {
      sku: 'pro_200',
      name: t('pricing.pro.name'),
      price: '$6.99',
      priceNote: t('pricing.oneTime'),
      features: [
        t('pricing.pro.feature1'),  // 200 credits
        t('pricing.pro.feature2'),  // $0.035/image (82% cheaper!)
        t('pricing.pro.feature3'),  // Never expires
        t('pricing.pro.feature4'),  // Priority processing
      ],
      popular: true,
    },
    {
      sku: 'unlimited_monthly',
      name: t('pricing.unlimited.name'),
      price: '$4.99',
      priceNote: t('pricing.monthly'),
      features: [
        t('pricing.unlimited.feature1'),  // Unlimited images
        t('pricing.unlimited.feature2'),  // Best value
        t('pricing.unlimited.feature3'),  // Cancel anytime
        t('pricing.unlimited.feature4'),  // Priority support
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
