"use client"

import { useRouter } from "next/navigation"
import { NetworkForm } from "@/src/components/dashboard/network-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { networks } from "@/src/lib/demo-data"

export default function EditNetworkPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const network = networks.find((n) => n.id === params.id)

  if (!network) {
    return <div>Network not found</div>
  }

  const handleSubmit = (data: any) => {
    console.log("Updating network:", data)
    router.push("/dashboard/networks")
  }

  const handleCancel = () => {
    router.push("/dashboard/networks")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Network</CardTitle>
        </CardHeader>
        <CardContent>
          <NetworkForm initialData={network} onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
