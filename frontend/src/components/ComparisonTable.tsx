import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import styles from './ComparisonTable.module.css'

interface ComparisonItem {
  feature: string
  us: string | boolean
  them: string | boolean
}

interface ComparisonTableProps {
  competitor?: string
  items?: ComparisonItem[]
}

export default function ComparisonTable({ 
  competitor = 'remove.bg',
  items 
}: ComparisonTableProps) {
  const { t } = useTranslation()
  
  const defaultItems: ComparisonItem[] = [
    { feature: t('comparison.freeHD'), us: true, them: false },
    { feature: t('comparison.noSignup'), us: true, them: false },
    { feature: t('comparison.dailyFree'), us: '5 ' + t('comparison.times'), them: '1 ' + t('comparison.time') },
    { feature: t('comparison.hdLimit'), us: t('comparison.unlimited'), them: '500px' },
    { feature: t('comparison.price'), us: '$5/mo', them: '€9/mo (40 credits)' },
    { feature: t('comparison.batchProcess'), us: true, them: true },
  ]
  
  const comparisonItems = items || defaultItems
  
  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <span className={styles.yes}>✓</span>
      ) : (
        <span className={styles.no}>✗</span>
      )
    }
    return value
  }
  
  return (
    <motion.section 
      className={styles.section}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className={styles.title}>
        {t('comparison.title', { competitor })}
      </h2>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('comparison.feature')}</th>
              <th className={styles.usColumn}>
                <span className={styles.logo}>⚡ BgGone</span>
              </th>
              <th className={styles.themColumn}>{competitor}</th>
            </tr>
          </thead>
          <tbody>
            {comparisonItems.map((item, index) => (
              <motion.tr 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <td>{item.feature}</td>
                <td className={styles.usCell}>{renderValue(item.us)}</td>
                <td className={styles.themCell}>{renderValue(item.them)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}
