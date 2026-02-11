import { useTranslation } from 'react-i18next'
import styles from './LegalPage.module.css'

export default function TermsPage() {
  const { t } = useTranslation()
  
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: February 2026</p>
        
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using BgGone ("Service"), you agree to be bound by these 
            Terms of Service. If you do not agree, please do not use the Service.
          </p>
        </section>
        
        <section>
          <h2>2. Service Description</h2>
          <p>
            BgGone is an AI-powered background removal tool that allows you to remove 
            backgrounds from images. We offer both free and paid tiers.
          </p>
        </section>
        
        <section>
          <h2>3. Free Tier Limitations</h2>
          <ul>
            <li>Free users are limited to 5 image processings per day per device</li>
            <li>This limit resets daily at midnight UTC</li>
            <li>Attempting to circumvent these limits may result in access restriction</li>
          </ul>
        </section>
        
        <section>
          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Upload illegal, harmful, or offensive content</li>
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to bypass usage limitations</li>
            <li>Interfere with or disrupt the Service</li>
            <li>Use automated systems to access the Service beyond normal use</li>
          </ul>
        </section>
        
        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            You retain all rights to images you upload. The processed images belong to you. 
            We claim no ownership over your content.
          </p>
        </section>
        
        <section>
          <h2>6. Payment Terms</h2>
          <p>
            Paid plans are processed through our payment partner Creem. All sales are final 
            unless otherwise required by law. Subscriptions can be cancelled at any time.
          </p>
        </section>
        
        <section>
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Service is provided "as is" without warranties of any kind. We do not 
            guarantee that the Service will be uninterrupted, error-free, or meet your 
            specific requirements.
          </p>
        </section>
        
        <section>
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we shall not be liable for any 
            indirect, incidental, special, or consequential damages arising from your 
            use of the Service.
          </p>
        </section>
        
        <section>
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Continued use of 
            the Service after changes constitutes acceptance of the new Terms.
          </p>
        </section>
        
        <section>
          <h2>10. Contact</h2>
          <p>
            For questions about these Terms, contact us at:
            <br />
            <a href="mailto:support@densematrix.ai">support@densematrix.ai</a>
          </p>
        </section>
      </div>
    </div>
  )
}
