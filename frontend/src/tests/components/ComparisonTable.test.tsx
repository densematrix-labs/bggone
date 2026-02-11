import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ComparisonTable from '../../components/ComparisonTable'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      if (params?.competitor) return `Why Choose BgGone Over ${params.competitor}?`
      const translations: Record<string, string> = {
        'comparison.feature': 'Feature',
        'comparison.freeHD': 'Free High Resolution',
        'comparison.noSignup': 'No Signup Required',
        'comparison.dailyFree': 'Free Uses Per Day',
        'comparison.hdLimit': 'HD Output Limit',
        'comparison.price': 'Price',
        'comparison.batchProcess': 'Batch Processing',
        'comparison.unlimited': 'Unlimited',
        'comparison.times': 'times',
        'comparison.time': 'time',
      }
      return translations[key] || key
    },
  }),
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    tr: ({ children, ...props }: any) => <tr {...props}>{children}</tr>,
  },
}))

describe('ComparisonTable', () => {
  it('renders comparison table with default competitor', () => {
    render(<ComparisonTable />)
    
    expect(screen.getByText('Why Choose BgGone Over remove.bg?')).toBeInTheDocument()
  })
  
  it('renders with custom competitor', () => {
    render(<ComparisonTable competitor="PhotoRoom" />)
    
    expect(screen.getByText('Why Choose BgGone Over PhotoRoom?')).toBeInTheDocument()
  })
  
  it('displays comparison features', () => {
    render(<ComparisonTable />)
    
    expect(screen.getByText('Free High Resolution')).toBeInTheDocument()
    expect(screen.getByText('No Signup Required')).toBeInTheDocument()
  })
  
  it('shows BgGone logo', () => {
    render(<ComparisonTable />)
    
    expect(screen.getByText('⚡ BgGone')).toBeInTheDocument()
  })
})
