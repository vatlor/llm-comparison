export interface ModelInfo {
  provider: string
  model: string
  description: string
  context: string
  inputPricing: string
  outputPricing: string
  icon: string
}

export interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

export interface ChatState {
  messages: Message[]
  isGenerating: boolean
}

