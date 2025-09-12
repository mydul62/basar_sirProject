"use client"

import { useRouter } from "next/navigation"
import { NetworkForm } from "@/src/components/dashboard/network-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateNetworks } from "@/src/services/networks"
import Swal from "sweetalert2"
export default function AddNetworkPage() {

const router = useRouter()

const handleSubmit = async (data: any) => {
  try {

    const res = await CreateNetworks(data)

    Swal.fire({
      icon: "success",
      title: "Network Created!",
      text: "Your network has been added successfully.",
      timer: 2000,
      showConfirmButton: false,
    })

    router.push("/dashboard/networks")
  } catch (error) {
    console.error("Error creating network:", error)

    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Something went wrong while creating the network.",
    })
  }
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
