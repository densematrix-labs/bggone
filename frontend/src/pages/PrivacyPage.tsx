import { useTranslation } from 'react-i18next'
import styles from './LegalPage.module.css'

export default function PrivacyPage() {
  const { t } = useTranslation()
  
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: February 2026</p>
        
        <section>
          <h2>Introduction</h2>
          <p>
            BgGone ("we", "our", or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, and safeguard your information 
            when you use our background removal service.
          </p>
        </section>
        
        <section>
          <h2>Information We Collect</h2>
          <h3>Images</h3>
          <p>
            Images you upload are processed in memory and immediately deleted after processing. 
            We do not store your images on our servers.
          </p>
          
          <h3>Device Identifier</h3>
          <p>
            We use a device fingerprint to track free usage limits. This is stored locally 
            on your device and helps us provide fair access to our free tier.
          </p>
          
          <h3>Analytics</h3>
          <p>
            We use Google Analytics 4 to understand how our service is used. This includes 
            anonymized usage data like page views and feature usage.
          </p>
        </section>
        
        <section>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide the background removal service</li>
            <li>To enforce usage limits on our free tier</li>
            <li>To improve our service based on usage patterns</li>
            <li>To process payments (if you upgrade to a paid plan)</li>
          </ul>
        </section>
        
        <section>
          <h2>Data Retention</h2>
          <p>
            Uploaded images are deleted immediately after processing. Payment information 
            is handled by our payment processor (Creem) and is subject to their privacy policy.
          </p>
        </section>
        
        <section>
          <h2>Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. 
            Contact us at support@densematrix.ai for any privacy-related requests.
          </p>
        </section>
        
        <section>
          <h2>Contact</h2>
          <p>
            For any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:support@densematrix.ai">support@densematrix.ai</a>
          </p>
        </section>
      </div>
    </div>
  )
}
