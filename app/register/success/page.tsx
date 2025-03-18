"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RegistrationSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [registrationType, setRegistrationType] = useState<string>("")
  const [title, setTitle] = useState<string>("Registration Successful!")
  const [message, setMessage] = useState<string>("")
  const [nextSteps, setNextSteps] = useState<string[]>([])

  useEffect(() => {
    const type = searchParams.get("type") || ""
    setRegistrationType(type)

    switch (type) {
      case "account":
        setTitle("Account Created Successfully!")
        setMessage(
          "Thank you for creating an account for the International Mathematics Olympiad 2025. You can now log in and register participants.",
        )
        setNextSteps([
          "Log in to your account",
          "Register participants",
          "Complete your profile",
          "Stay updated with competition news",
        ])
        break
      case "school":
        setTitle("School Registration Successful!")
        setMessage(
          "Thank you for registering your school for the International Mathematics Olympiad 2025. We have sent a confirmation email with further instructions.",
        )
        setNextSteps([
          "Check your email for confirmation",
          "Create an account to register participants",
          "Prepare your students for the competition",
          "Stay updated with competition news",
        ])
        break
      case "participants":
        setTitle("Participants Registered Successfully!")
        setMessage(
          "Thank you for registering participants for the International Mathematics Olympiad 2025. We have sent a confirmation email with further instructions.",
        )
        setNextSteps([
          "Check your email for confirmation",
          "Complete any pending payments",
          "Prepare participants for the competition",
          "Stay updated with competition news",
        ])
        break
      default:
        // Redirect to home if no valid type
        router.push("/")
    }
  }, [searchParams, router])

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 md:py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <p className="mb-8 text-gray-600">{message}</p>
        <div className="space-y-4">
          <p className="font-medium">Next steps:</p>
          <ol className="list-decimal text-left space-y-2 pl-5">
            {nextSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="mt-8 space-x-4">
          {registrationType === "account" && (
            <Button asChild>
              <Link href="/login">Login to Your Account</Link>
            </Button>
          )}
          {registrationType === "school" && (
            <Button asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          )}
          {registrationType === "participants" && (
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

