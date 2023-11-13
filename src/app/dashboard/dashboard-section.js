"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function DashboardSection() {
  return (
    <>
      <h1>Dashboard</h1>
      <p>This is the dashboard page</p>
      <Button onClick={() => signOut()}>LogOut</Button>
    </>
  )
}
