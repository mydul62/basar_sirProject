import { type NextRequest, NextResponse } from "next/server"
import { contentStore } from "@/lib/content-store"

export async function GET() {
  try {
    const hero = contentStore.getHero()
    return NextResponse.json(hero)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hero content" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const hero = contentStore.updateHero(body)
    return NextResponse.json(hero)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update hero content" }, { status: 500 })
  }
}
