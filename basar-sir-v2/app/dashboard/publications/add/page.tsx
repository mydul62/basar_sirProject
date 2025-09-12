"use client"

import { useRouter } from "next/navigation"
import { PublicationForm } from "@/src/components/dashboard/publication-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreatePublication } from "@/src/services/Publications"
import Swal from "sweetalert2"
export default function AddPublicationPage() {
  const router = useRouter()





const handleSubmit = async (data: any) => {
  try {
    const res = await CreatePublication(data)
    console.log("Response:", res)

    Swal.fire({
      icon: "success",
      title: "Publication Created!",
      text: "Your publication has been added successfully.",
      timer: 2000,
      showConfirmButton: false,
    })

    router.push("/dashboard/publications")
  } catch (error) {
    console.error("Error:", error)

    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Something went wrong while creating publication.",
    })
  }
}


  const handleCancel = () => {
    router.push("/dashboard/publications")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Publication</CardTitle>
        </CardHeader>
        <CardContent>
          <PublicationForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
