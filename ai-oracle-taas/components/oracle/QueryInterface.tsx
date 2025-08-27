"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Settings, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface QueryInterfaceProps {
  onSubmitQuery: (query: string, options: QueryOptions) => void
  isLoading: boolean
}

interface QueryOptions {
  queryType: "fact" | "opinion" | "calculation" | "prediction"
  minerCount: number
  consensusThreshold: number
  timeoutMs: number
}

export function QueryInterface({ onSubmitQuery, isLoading }: QueryInterfaceProps) {
  const [query, setQuery] = useState("")
  const [options, setOptions] = useState<QueryOptions>({
    queryType: "fact",
    minerCount: 3,
    consensusThreshold: 0.8,
    timeoutMs: 30000,
  })
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = () => {
    if (query.trim() && !isLoading) {
      onSubmitQuery(query.trim(), options)
    }
  }

  const queryTypeDescriptions = {
    fact: "Objective, verifiable information",
    opinion: "Subjective viewpoints and preferences",
    calculation: "Mathematical computations",
    prediction: "Future forecasts and trends",
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Truth Query Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Query Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Your Question</label>
          <Textarea
            placeholder="Ask anything... e.g., 'What is the current population of Tokyo?' or 'Explain quantum computing'"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[120px] bg-input border-border text-foreground placeholder-muted-foreground focus:border-primary resize-none"
            maxLength={1000}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Be specific for better results</span>
            <span>{query.length}/1000</span>
          </div>
        </div>

        {/* Query Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-card-foreground">Query Type</label>
          <Select
            value={options.queryType}
            onValueChange={(value: any) => setOptions({ ...options, queryType: value })}
          >
            <SelectTrigger className="bg-input border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {Object.entries(queryTypeDescriptions).map(([type, description]) => (
                <SelectItem key={type} value={type} className="text-card-foreground hover:bg-muted">
                  <div className="flex flex-col items-start">
                    <span className="capitalize font-medium">{type}</span>
                    <span className="text-xs text-muted-foreground">{description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Settings */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Advanced Settings
              </span>
              <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.2 }}>
                ▼
              </motion.div>
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="space-y-4 pt-4">
            {/* Miner Count */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-card-foreground">Miners to Query</label>
                <Badge variant="outline" className="border-border text-foreground">
                  {options.minerCount}
                </Badge>
              </div>
              <Slider
                value={[options.minerCount]}
                onValueChange={([value]) => setOptions({ ...options, minerCount: value })}
                min={1}
                max={10}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">More miners = higher accuracy but slower response</p>
            </div>

            {/* Consensus Threshold */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-card-foreground">Consensus Threshold</label>
                <Badge variant="outline" className="border-border text-foreground">
                  {Math.round(options.consensusThreshold * 100)}%
                </Badge>
              </div>
              <Slider
                value={[options.consensusThreshold]}
                onValueChange={([value]) => setOptions({ ...options, consensusThreshold: value })}
                min={0.5}
                max={1.0}
                step={0.05}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Higher threshold = stricter consensus requirements</p>
            </div>

            {/* Timeout */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-card-foreground">Timeout</label>
                <Badge variant="outline" className="border-border text-foreground">
                  {options.timeoutMs / 1000}s
                </Badge>
              </div>
              <Slider
                value={[options.timeoutMs]}
                onValueChange={([value]) => setOptions({ ...options, timeoutMs: value })}
                min={5000}
                max={60000}
                step={5000}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">Maximum time to wait for miner responses</p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!query.trim() || isLoading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="lg"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing Query...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Submit to Oracle Network
            </div>
          )}
        </Button>

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-xs text-foreground">
            <p className="font-medium mb-1">How it works:</p>
            <p>
              Your query is sent to multiple AI miners in the Cortensor network. Their responses are analyzed for
              consensus, and hallucinations are detected and filtered out.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
