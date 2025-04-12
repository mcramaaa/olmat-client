"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface PaymentCountdownProps {
  expiresAt: string
}

export function PaymentCountdown({ expiresAt }: PaymentCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expiryTime = new Date(expiresAt).getTime()
      const now = new Date().getTime()
      const difference = expiryTime - now

      if (difference <= 0) {
        setTimeLeft(null)
        return
      }

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }

    // Calculate immediately
    calculateTimeLeft()

    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  if (!timeLeft) {
    return (
      <div className="text-red-600 font-medium flex items-center">
        <Clock className="mr-2 h-4 w-4" />
        Payment deadline expired
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="text-yellow-800 font-medium flex items-center">
        <Clock className="mr-2 h-4 w-4" />
        Complete payment within:
      </div>
      <div className="flex gap-2 mt-1">
        <div className="bg-yellow-100 rounded px-2 py-1 text-yellow-800 font-mono">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <span className="text-yellow-800">:</span>
        <div className="bg-yellow-100 rounded px-2 py-1 text-yellow-800 font-mono">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <span className="text-yellow-800">:</span>
        <div className="bg-yellow-100 rounded px-2 py-1 text-yellow-800 font-mono">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  )
}

