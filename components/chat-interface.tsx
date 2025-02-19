"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RotateCcw, Send, ImageIcon, Copy, Shuffle, MoreHorizontal } from "lucide-react"
import { ModelInfoSection } from "./model-info"
import type { ModelInfo, Message } from "../lib/types"

interface ChatInterfaceProps {
  modelInfo: ModelInfo
  messages: Message[]
  isGenerating: boolean
  input: string
  onInputChange: (value: string) => void
  onSubmit: () => void
}

export function ChatInterface({
  modelInfo,
  messages,
  isGenerating,
  input,
  onInputChange,
  onSubmit,
}: ChatInterfaceProps) {
  return (
    <Card className="flex flex-col h-[800px]">
      <CardHeader className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              {modelInfo.provider}
            </Button>
            <Button variant="secondary" size="sm">
              Synced
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Shuffle className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto p-0">
        <ModelInfoSection info={modelInfo} />
        <div className="p-4 space-y-4">
          {messages.map((message, i) => (
            <div
              key={`${message.timestamp}-${i}`}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isGenerating && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <div className="flex gap-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce [animation-delay:0.2s]">●</span>
                  <span className="animate-bounce [animation-delay:0.4s]">●</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit()
          }}
          className="flex w-full gap-2"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isGenerating}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}

