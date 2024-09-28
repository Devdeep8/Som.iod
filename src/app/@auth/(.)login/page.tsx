'use client'

import { useRouter } from "next/navigation"
import SignInCard from '@/components/Login'
import { useEffect } from 'react'

export default function InterceptedSignIn() {
  const router = useRouter()

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // If the click is outside the modal (backdrop), close it (go back)
    if (e.target === e.currentTarget) {
      router.back()
    }
  }

  // Optional: Handle Escape key to also close the modal
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back()
      }
    }
    window.addEventListener('keydown', handleEscapeKey)
    
    return () => window.removeEventListener('keydown', handleEscapeKey)
  }, [router])

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50'
      onClick={handleBackdropClick} // Trigger on backdrop click
    >
      {/* SignInCard container */}
      <div
        className='relative w-1/2 p-6 rounded-l'
        onClick={(e) => e.stopPropagation()} // Prevent click inside the card from closing it
      >
        <SignInCard />
      </div>
    </div>
  )
}
