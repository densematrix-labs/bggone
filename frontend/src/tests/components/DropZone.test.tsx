import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import DropZone from '../../components/DropZone'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('DropZone', () => {
  it('renders drop zone with title', () => {
    render(
      <DropZone
        onFileSelect={() => {}}
        isProcessing={false}
      />
    )
    
    expect(screen.getByText('dropzone.title')).toBeInTheDocument()
    expect(screen.getByText('dropzone.button')).toBeInTheDocument()
  })
  
  it('shows processing state', () => {
    render(
      <DropZone
        onFileSelect={() => {}}
        isProcessing={true}
      />
    )
    
    expect(screen.getByText('dropzone.processing')).toBeInTheDocument()
  })
  
  it('shows hint text when not processing', () => {
    render(
      <DropZone
        onFileSelect={() => {}}
        isProcessing={false}
      />
    )
    
    expect(screen.getByText('dropzone.hint')).toBeInTheDocument()
  })
  
  it('shows processing hint when processing', () => {
    render(
      <DropZone
        onFileSelect={() => {}}
        isProcessing={true}
      />
    )
    
    expect(screen.getByText('dropzone.processingHint')).toBeInTheDocument()
  })
  
  it('renders file input element', () => {
    render(
      <DropZone
        onFileSelect={() => {}}
        isProcessing={false}
      />
    )
    
    const input = document.querySelector('input[type="file"]')
    expect(input).toBeInTheDocument()
  })
})
