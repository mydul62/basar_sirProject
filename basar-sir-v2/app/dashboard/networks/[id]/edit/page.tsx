"use client"

import { useRouter } from "next/navigation"
import { NetworkForm } from "@/src/components/dashboard/network-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, networks } from "@/src/lib/demo-data"
import { use, useEffect, useState } from "react"
import {SingleNetwork, updateNetworks } from "@/src/services/networks"
import Swal from "sweetalert2"
export default function EditNetworkPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)  

  const router = useRouter()

 const [network, setNetwork] = useState<Network>()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await SingleNetwork(id)
        setNetwork(res?.data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])


  if (!network) {
    return <div>Network not found</div>
  }




const handleSubmit = async (data: any) => {
  try {
    console.log("Updating network:", data)

    const res = await updateNetworks(id, data)
    console.log("Update Response:", res)

    Swal.fire({
      icon: "success",
      title: "Network Updated!",
      text: "The network has been updated successfully.",
      timer: 2000,
      showConfirmButton: false,
    })

    router.push("/dashboard/networks")
  } catch (error) {
    console.error("Error updating network:", error)

    Swal.fire({
      icon: "error",
      title: "Update Failed!",
      text: "Something went wrong while updating the network.",
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
          <CardTitle>Edit Network</CardTitle>
        </CardHeader>
        <CardContent>
          <NetworkForm
            initialData={
              network
                ? {
                    ...network,
                    startYear: network.startYear?.toString(),
                    endYear: network.endYear?.toString(),
                  }
                : undefined
            }
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  )
}
