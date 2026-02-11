import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('fingerprint', () => {
  beforeEach(() => {
    vi.resetModules()
  })
  
  it('getDeviceId function exists', async () => {
    const { getDeviceId } = await import('../../lib/fingerprint')
    expect(typeof getDeviceId).toBe('function')
  })
  
  it('getDeviceId returns a string', async () => {
    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('test-device-id')
    
    const { getDeviceId } = await import('../../lib/fingerprint')
    const deviceId = await getDeviceId()
    
    expect(typeof deviceId).toBe('string')
    expect(deviceId.length).toBeGreaterThan(0)
  })
})
