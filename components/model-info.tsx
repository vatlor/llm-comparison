import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ModelInfo } from "../lib/types"

interface ModelInfoProps {
  info: ModelInfo
}

export function ModelInfoSection({ info }: ModelInfoProps) {
  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Image
            src={info.icon || "/placeholder.svg"}
            alt={info.provider}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-muted-foreground">{info.provider}</span>
          <span>/</span>
          <span className="font-medium">{info.model}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{info.description}</p>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Context</span>
            <span className="text-muted-foreground">{info.context}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="font-medium">Input Pricing</span>
            <span className="text-muted-foreground">{info.inputPricing}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="font-medium">Output Pricing</span>
            <span className="text-muted-foreground">{info.outputPricing}</span>
          </div>
        </div>

        <div className="flex gap-4 mt-6 text-sm text-muted-foreground">
          <Link href="#" className="flex items-center gap-1 hover:text-foreground">
            Model Page
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link href="#" className="flex items-center gap-1 hover:text-foreground">
            Pricing
            <ExternalLink className="h-3 w-3" />
          </Link>
          <Link href="#" className="flex items-center gap-1 hover:text-foreground">
            Website
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

