/**
 * Device fingerprinting for rate limiting.
 * Uses FingerprintJS to generate a stable device ID.
 */
import FingerprintJS from '@fingerprintjs/fingerprintjs'

let cachedDeviceId: string | null = null

export async function getDeviceId(): Promise<string> {
  // Return cached value if available
  if (cachedDeviceId) {
    return cachedDeviceId
  }
  
  // Check localStorage first
  const storedId = localStorage.getItem('bggone_device_id')
  if (storedId) {
    cachedDeviceId = storedId
    return storedId
  }
  
  try {
    // Generate new fingerprint
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    cachedDeviceId = result.visitorId
    
    // Store for future sessions
    localStorage.setItem('bggone_device_id', cachedDeviceId)
    
    return cachedDeviceId
  } catch (error) {
    // Fallback to random ID if fingerprinting fails
    const fallbackId = `fallback_${Math.random().toString(36).substring(2)}_${Date.now()}`
    localStorage.setItem('bggone_device_id', fallbackId)
    cachedDeviceId = fallbackId
    return fallbackId
  }
}
