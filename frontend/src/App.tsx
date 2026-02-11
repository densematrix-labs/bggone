import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'

const HomePage = lazy(() => import('./pages/HomePage'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const PaymentSuccessPage = lazy(() => import('./pages/PaymentSuccessPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const VsPage = lazy(() => import('./pages/VsPage'))
const AlternativePage = lazy(() => import('./pages/AlternativePage'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/vs/:competitor" element={<VsPage />} />
          <Route path="/alternative/:useCase" element={<AlternativePage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
