'use client'

import { createContext, useContext, useState } from 'react'

const ServicesContext = createContext(null)

export function ServicesProvider({ children }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedServiceId, setSelectedServiceId] = useState(null)
  const [selectedPackageId, setSelectedPackageId] = useState(null)
  const [slideupOpen, setSlideupOpen] = useState(false)
  const [activeTagId, setActiveTagId] = useState(null)
  const [contactPopupOpen, setContactPopupOpen] = useState(false)

  function openSlideup(serviceId) {
    setSelectedServiceId(serviceId)
    setSelectedPackageId(null)
    setSlideupOpen(true)
  }

  function closeSlideup() {
    setSlideupOpen(false)
  }

  function openContactPopup() {
    setContactPopupOpen(true)
  }

  function closeContactPopup() {
    setContactPopupOpen(false)
  }

  return (
    <ServicesContext.Provider value={{
      selectedCategoryId, setSelectedCategoryId,
      selectedServiceId, setSelectedServiceId,
      selectedPackageId, setSelectedPackageId,
      slideupOpen, openSlideup, closeSlideup,
      activeTagId, setActiveTagId,
      contactPopupOpen, openContactPopup, closeContactPopup,
    }}>
      {children}
    </ServicesContext.Provider>
  )
}

export function useServicesContext() {
  const ctx = useContext(ServicesContext)
  if (!ctx) throw new Error('useServicesContext must be used inside ServicesProvider')
  return ctx
}
