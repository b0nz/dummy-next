import { getServerSession } from "next-auth"
import LoginForm from "./login-form"
import authOptions from "@/lib/authOptions"
import { redirect } from "next/navigation"

export default async function Login() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-foreground">
      <div className="flex flex-col bg-background shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  )
}
