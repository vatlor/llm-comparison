import { NextResponse } from "next/server"

const staticModels = [
  {
    id: "gpt-3.5-turbo",
    description: "A large language model optimized for dialogue.",
    context_window: 4096,
  },
  {
    id: "gpt-4",
    description: "The latest GPT-4 model with improved capabilities.",
    context_window: 8192,
  },
  {
    id: "codex",
    description: "Specialized model for code-related tasks.",
    context_window: 2048,
  },
]

export async function GET() {
  return NextResponse.json({ data: staticModels })
}

export async function POST(request: Request) {
  try {
    const { model, messages, temperature, max_tokens } = await request.json()

    // Simulate API response
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const simulatedResponse = {
      choices: [
        {
          message: {
            content: `This is a simulated response from ${model}: ${messages[0].content}`,
          },
        },
      ],
    }

    return NextResponse.json(simulatedResponse)
  } catch (error) {
    console.error("Error simulating API call:", error)
    return NextResponse.json({ error: "Failed to get response from model" }, { status: 500 })
  }
}

