import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from '../../stores/appStore'

describe('appStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAppStore.setState({
      remaining: 5,
      dailyLimit: 5,
      resetAt: null,
      isProcessing: false,
      error: null,
      originalImage: null,
      processedImage: null,
      originalFileName: null,
    })
  })
  
  it('has correct initial state', () => {
    const state = useAppStore.getState()
    
    expect(state.remaining).toBe(5)
    expect(state.dailyLimit).toBe(5)
    expect(state.isProcessing).toBe(false)
    expect(state.error).toBeNull()
  })
  
  it('setRateLimit updates remaining and dailyLimit', () => {
    useAppStore.getState().setRateLimit(3, 10, 1234567890)
    
    const state = useAppStore.getState()
    expect(state.remaining).toBe(3)
    expect(state.dailyLimit).toBe(10)
    expect(state.resetAt).toBe(1234567890)
  })
  
  it('setProcessing updates isProcessing and clears error', () => {
    useAppStore.setState({ error: 'Some error' })
    useAppStore.getState().setProcessing(true)
    
    const state = useAppStore.getState()
    expect(state.isProcessing).toBe(true)
    expect(state.error).toBeNull()
  })
  
  it('setError updates error and stops processing', () => {
    useAppStore.setState({ isProcessing: true })
    useAppStore.getState().setError('Test error')
    
    const state = useAppStore.getState()
    expect(state.error).toBe('Test error')
    expect(state.isProcessing).toBe(false)
  })
  
  it('setImages updates image states', () => {
    useAppStore.getState().setImages('original.png', 'processed.png', 'test.png')
    
    const state = useAppStore.getState()
    expect(state.originalImage).toBe('original.png')
    expect(state.processedImage).toBe('processed.png')
    expect(state.originalFileName).toBe('test.png')
  })
  
  it('reset clears processing state and images', () => {
    useAppStore.setState({
      isProcessing: true,
      error: 'error',
      originalImage: 'original.png',
      processedImage: 'processed.png',
      originalFileName: 'test.png',
    })
    
    useAppStore.getState().reset()
    
    const state = useAppStore.getState()
    expect(state.isProcessing).toBe(false)
    expect(state.error).toBeNull()
    expect(state.originalImage).toBeNull()
    expect(state.processedImage).toBeNull()
    expect(state.originalFileName).toBeNull()
  })
})
