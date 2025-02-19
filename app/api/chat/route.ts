import { NextResponse } from "next/server"

const TARGET_URL = "https://api.individual.githubcopilot.com/chat/completions"

export async function OPTIONS() {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  })
  return new NextResponse(null, { headers })
}

export async function POST(request: Request) {
  try {
    // Forward the incoming request to the external endpoint
    const requestBody = await request.json()
    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(requestBody),
    })

    // Retrieve response from external server
    const data = await response.text()

    // Return the data from your own route with CORS headers
    const headers = new Headers({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    })

    return new NextResponse(data, { status: response.status, headers })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 })
  }
}