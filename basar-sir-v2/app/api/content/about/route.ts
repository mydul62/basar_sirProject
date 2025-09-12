import { contentStore } from "@/lib/content-store"
import { type NextRequest, NextResponse } from "next/server"


export async function GET() {
  try {
    const about = contentStore.getAbout()
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const about = contentStore.updateAbout(body)
    return NextResponse.json(about)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 })
  }
}
