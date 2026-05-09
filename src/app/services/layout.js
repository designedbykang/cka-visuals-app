import { ServicesProvider } from '@/context/ServicesContext'

export default function ServicesLayout({ children }) {
  return (
    <ServicesProvider>
      {children}
    </ServicesProvider>
  )
}
