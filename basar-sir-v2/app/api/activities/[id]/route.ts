import { type NextRequest, NextResponse } from "next/server"
import { activitiesStore } from "@/lib/activities-store"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const activity = activitiesStore.getById(params.id)
    if (!activity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }
    return NextResponse.json(activity)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activity" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const activity = activitiesStore.update(params.id, body)
    if (!activity) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }
    return NextResponse.json(activity)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const success = activitiesStore.delete(params.id)
    if (!success) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Activity deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 })
  }
}
