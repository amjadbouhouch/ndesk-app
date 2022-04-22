import { useState } from 'react'

export function usePortal(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue)

  const openPortal = () => setIsOpen(true)

  const closePortal = () => setIsOpen(false)

  return { isOpen, openPortal, closePortal }
}
