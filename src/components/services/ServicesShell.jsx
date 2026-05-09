'use client'

import ContactPopup from './ContactPopup'

export default function ServicesShell({ children }) {
  return (
    <>
      {children}
      <ContactPopup />
    </>
  )
}
