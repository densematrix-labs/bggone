/**
 * API client for BgGone backend.
 */
import { getDeviceId } from './fingerprint'

const API_BASE = import.meta.env.VITE_API_URL || ''

export interface RateLimitStatus {
  allowed: boolean
  remaining: number
  reset_at: number
  daily_limit: number
}

export interface ImageInfo {
  width: number
  height: number
  format: string
  size_bytes: number
}

export interface RemoveBgResult {
  blob: Blob
  remaining: number
  dailyLimit: number
}

/**
 * Check current rate limit status for the device.
 */
export async function checkRateLimit(): Promise<RateLimitStatus> {
  const deviceId = await getDeviceId()
  
  const response = await fetch(`${API_BASE}/api/v1/rate-limit`, {
    headers: {
      'X-Device-ID': deviceId,
    },
  })
  
  if (!response.ok) {
    throw new Error('Failed to check rate limit')
  }
  
  return response.json()
}

/**
 * Remove background from an image.
 */
export async function removeBackground(file: File): Promise<RemoveBgResult> {
  const deviceId = await getDeviceId()
  
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch(`${API_BASE}/api/v1/remove-bg`, {
    method: 'POST',
    headers: {
      'X-Device-ID': deviceId,
    },
    body: formData,
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }))
    throw new Error(error.detail?.message || error.detail || 'Failed to process image')
  }
  
  const blob = await response.blob()
  const remaining = parseInt(response.headers.get('X-Remaining-Uses') || '0', 10)
  const dailyLimit = parseInt(response.headers.get('X-Daily-Limit') || '5', 10)
  
  return { blob, remaining, dailyLimit }
}

/**
 * Get image info without processing.
 */
export async function getImageInfo(file: File): Promise<ImageInfo> {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch(`${API_BASE}/api/v1/image-info`, {
    method: 'POST',
    body: formData,
  })
  
  if (!response.ok) {
    throw new Error('Failed to get image info')
  }
  
  return response.json()
}

/**
 * Create a Creem checkout session.
 */
export async function createCheckout(productSku: string): Promise<string> {
  const deviceId = await getDeviceId()
  
  const response = await fetch(`${API_BASE}/api/v1/payment/create-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_sku: productSku,
      device_id: deviceId,
      success_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/pricing`,
    }),
  })
  
  if (!response.ok) {
    throw new Error('Failed to create checkout')
  }
  
  const data = await response.json()
  return data.checkout_url
}
