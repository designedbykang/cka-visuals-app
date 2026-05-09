import { ServicesProvider } from '@/context/ServicesContext'
import ServicesShell from '@/components/services/ServicesShell'

export default function ServicesLayout({ children }) {
  return (
    <ServicesProvider>
      <ServicesShell>{children}</ServicesShell>
    </ServicesProvider>
  )
}
