/**
 * Global app state store using Zustand.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
  // Rate limiting
  remaining: number
  dailyLimit: number
  resetAt: number | null
  
  // Processing state
  isProcessing: boolean
  error: string | null
  
  // Results
  originalImage: string | null
  processedImage: string | null
  originalFileName: string | null
  
  // Actions
  setRateLimit: (remaining: number, dailyLimit: number, resetAt?: number) => void
  setProcessing: (isProcessing: boolean) => void
  setError: (error: string | null) => void
  setImages: (original: string | null, processed: string | null, fileName?: string | null) => void
  reset: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      remaining: 5,
      dailyLimit: 5,
      resetAt: null,
      isProcessing: false,
      error: null,
      originalImage: null,
      processedImage: null,
      originalFileName: null,
      
      setRateLimit: (remaining, dailyLimit, resetAt) => set({ 
        remaining, 
        dailyLimit, 
        resetAt: resetAt || null 
      }),
      
      setProcessing: (isProcessing) => set({ isProcessing, error: null }),
      
      setError: (error) => set({ error, isProcessing: false }),
      
      setImages: (original, processed, fileName = null) => set({ 
        originalImage: original, 
        processedImage: processed,
        originalFileName: fileName
      }),
      
      reset: () => set({
        isProcessing: false,
        error: null,
        originalImage: null,
        processedImage: null,
        originalFileName: null,
      }),
    }),
    {
      name: 'bggone-state',
      partialize: (state) => ({
        remaining: state.remaining,
        dailyLimit: state.dailyLimit,
        resetAt: state.resetAt,
      }),
    }
  )
)
