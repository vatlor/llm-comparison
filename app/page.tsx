"use client"

import { useState } from "react"
import { ChatInterface } from "../components/chat-interface"
import type { ModelInfo, Message, ChatState } from "../lib/types"


const staticModels: ModelInfo[] = [
  {
    provider: "claude-3.5-sonnet",
    model: "claude-3.5-sonnet",
    description: "A large language model optimized for dialogue.",
    context: "4,096 tokens",
    inputPricing: "N/A",
    outputPricing: "N/A",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen.PNG-VV9pqhPHwQzkhNOxEzacb0LwWlSJjx.png",
  },
  {
    provider: "gemini-2.0-flash",
    model: "gemini-2.0-flash",
    description: "The latest GPT-4 model with improved capabilities.",
    context: "8,192 tokens",
    inputPricing: "N/A",
    outputPricing: "N/A",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screen.PNG-VV9pqhPHwQzkhNOxEzacb0LwWlSJjx.png",
  },
  {
    provider: "gpt-4-o-preview",
    model: "gpt-4-o-preview",
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
    Object.fromEntries(
      staticModels.map((model) => [
        model.model,
        { messages: [], isGenerating: false },
      ]),
    ),
  )

  // New external API details:
  const apiUrl = "https://api.individual.githubcopilot.com/chat/completions"
  const headers = {
    Authorization: "Bearer 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",
    "Content-Type": "application/json",
    "editor-version": "vscode/1.95.3",
  }

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

    // Call the external API for each model
    for (const model of staticModels) {
      try {
        // Create a payload compatible with the external API
        const payload = {
          messages: [{ role: "user", content: userMessage.content }],
          temperature: 0.7,
          max_tokens: 200,
          stream: false,
        }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ ...payload, model: model.model }),
        })

        if (!response.ok) {
          throw new Error("Failed to get response from external API")
        }

        const data = await response.json()
        const assistantMessage: Message = {
          role: "assistant",
          content: data?.choices?.[0]?.message?.content || "No response",
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