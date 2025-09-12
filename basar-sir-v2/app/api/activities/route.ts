import { type NextRequest, NextResponse } from "next/server"
import { activitiesStore } from "@/lib/activities-store"

export async function GET() {
  try {
    const activities = activitiesStore.getAll()
    return NextResponse.json(activities)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const activity = activitiesStore.create(body)
    return NextResponse.json(activity, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create activity" }, { status: 500 })
  }
}
