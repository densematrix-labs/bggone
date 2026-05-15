import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import styles from './IntroPage.module.css'

const metrics = [
  { label: 'HD Output', value: 'Full-res', detail: 'No 500px preview cap' },
  { label: 'Daily Free Uses', value: '5', detail: 'No signup required' },
  { label: 'Positioning', value: '70%+', detail: 'Lower-cost remove.bg alternative' },
]

const sections = [
  {
    title: 'Built for creators who need fast background removal',
    body: 'BgGone focuses on the single job users search for every day: remove the background from a product photo, avatar, campaign visual, or marketplace image without forcing a signup wall.',
  },
  {
    title: 'A clearer alternative to remove.bg',
    body: 'The product highlights full-resolution output, a transparent free tier, and a simple upgrade path. The page is designed to intercept users searching for practical remove.bg alternatives.',
  },
  {
    title: 'Optimized by the Code Factory workflow',
    body: 'This page was added as an incremental product optimization: clarify positioning, improve SEO context, and give sales/demo teams a cleaner story to show customers.',
  },
]

export default function IntroPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <motion.div
          className={styles.heroText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <p className={styles.eyebrow}>Product Brief</p>
          <h1>BgGone turns one proven competitor demand into a focused AI product.</h1>
          <p className={styles.subtitle}>
            A fast, no-signup background removal tool positioned around the highest-intent search path: users looking for a practical remove.bg alternative.
          </p>
          <div className={styles.actions}>
            <Link to="/" className={styles.primary}>Try BgGone</Link>
            <Link to="/pricing" className={styles.secondary}>View pricing</Link>
          </div>
        </motion.div>

        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <div className={styles.panelHeader}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.beforeAfter}>
            <div>Original image</div>
            <div>Clean transparent output</div>
          </div>
          <div className={styles.progress}>
            <span />
          </div>
          <p>AI edge detection, instant preview, commercial-ready export.</p>
        </motion.div>
      </section>

      <section className={styles.metrics}>
        {metrics.map((item) => (
          <div className={styles.metricCard} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
            <p>{item.detail}</p>
          </div>
        ))}
      </section>

      <section className={styles.sections}>
        {sections.map((section, index) => (
          <motion.article
            className={styles.sectionCard}
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </motion.article>
        ))}
      </section>
    </main>
  )
}
