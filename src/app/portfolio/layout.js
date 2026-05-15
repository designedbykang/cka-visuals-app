import { PortfolioProvider } from '@/context/PortfolioContext'

export default function PortfolioLayout({ children }) {
  return (
    <PortfolioProvider>
      {children}
    </PortfolioProvider>
  )
}
