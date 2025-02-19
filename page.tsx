"use client"

import { useState } from "react"
import { ChatInterface } from "./chat-interface"
import type { ModelInfo, Message, ChatState } from "./types"

// Static list of models
const staticModels: ModelInfo[] = [
  {
    provider: "GitHub Copilot",
    model: "gpt-3.5-turbo",
    description: "A large language model optimized for dialogue.",
    context: "4,096 tokens",
    inputPricing: "N/A",
    outputPricing: "N/A",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen.PNG-VV9pqhPHwQzkhNOxEzacb0LwWlSJjx.png",
  },
  {
    provider: "GitHub Copilot",
    model: "gpt-4",
    description: "The latest GPT-4 model with improved capabilities.",
    context: "8,192 tokens",
    inputPricing: "N/A",
    outputPricing: "N/A",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen.PNG-VV9pqhPHwQzkhNOxEzacb0LwWlSJjx.png",
  },
  {
    provider: "GitHub Copilot",
    model: "codex",
    description: "Specialized model for code-related tasks.",
    context: "2,048 tokens",
    inputPricing: "N/A",
    outputPricing: "N/A",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen.PNG-VV9pqhPHwQzkhNOxEzacb0LwWlSJjx.png",
  },
]

export default function ComparePage() {
  const [input, setInput] = useState("")
  const [chatStates, setChatStates] = useState<Record<string, ChatState>>(
    Object.fromEntries(staticModels.map((model) => [model.model, { messages: [], isGenerating: false }])),
  )

  const handleSubmit = async () => {
    if (!input.trim()) return

    const timestamp = Date.now()
    const userMessage: Message = {
      role: "user",
      content: input.trim(),
      timestamp,
    }

    // Add user message to all chats
    setChatStates((prev) => {
      const newStates = { ...prev }
      for (const modelId in newStates) {
        newStates[modelId] = {
          ...newStates[modelId],
          messages: [...newStates[modelId].messages, userMessage],
          isGenerating: true,
        }
      }
      return newStates
    })

    // Clear input after sending
    setInput("")

    // Simulate API calls for each model
    for (const model of staticModels) {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

        const assistantMessage: Message = {
          role: "assistant",
          content: `This is a simulated response from ${model.model}: ${input}`,
          timestamp: Date.now(),
        }

        setChatStates((prev) => ({
          ...prev,
          [model.model]: {
            messages: [...prev[model.model].messages, assistantMessage],
            isGenerating: false,
          },
        }))
      } catch (error) {
        console.error(`Error with ${model.model}:`, error)
        setChatStates((prev) => ({
          ...prev,
          [model.model]: {
            ...prev[model.model],
            isGenerating: false,
          },
        }))
      }
    }
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staticModels.map((model) => (
          <ChatInterface
            key={model.model}
            modelInfo={model}
            messages={chatStates[model.model].messages}
            isGenerating={chatStates[model.model].isGenerating}
            input={input}
            onInputChange={setInput}
            onSubmit={handleSubmit}
          />
        ))}
      </div>
    </div>
  )
}

