"use client"

import { useRouter } from "next/navigation"
import { NetworkForm } from "@/src/components/dashboard/network-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddNetworkPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log("Creating network:", data)
    router.push("/dashboard/networks")
  }

  const handleCancel = () => {
    router.push("/dashboard/networks")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Network</CardTitle>
        </CardHeader>
        <CardContent>
          <NetworkForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
