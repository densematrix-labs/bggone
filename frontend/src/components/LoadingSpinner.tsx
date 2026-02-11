import styles from './LoadingSpinner.module.css'

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.ring}></div>
        <span className={styles.icon}>⚡</span>
      </div>
    </div>
  )
}
