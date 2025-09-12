"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AwardForm } from "@/src/components/dashboard/award-form"
import { CreateAward } from "@/src/services/award"
import Swal from "sweetalert2"
export default function AddAwardPage() {
  const router = useRouter()




const handleSubmit = async (data: any) => {
  try {
    const res = await CreateAward(data)
    console.log("Response:", res)

    Swal.fire({
      icon: "success",
      title: "Award Added!",
      text: "The award has been created successfully.",
      timer: 2000,
      showConfirmButton: false,
    })

    router.push("/dashboard/awards")
  } catch (error) {
    console.error("Error adding award:", error)

    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Something went wrong while creating the award.",
    })
  }
}

  const handleCancel = () => {
    router.push("/dashboard/awards")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Award</h1>
        <p className="text-muted-foreground">Add a new award or recognition to your profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Award Details</CardTitle>
          <CardDescription>Fill in the information about your award or recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <AwardForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
