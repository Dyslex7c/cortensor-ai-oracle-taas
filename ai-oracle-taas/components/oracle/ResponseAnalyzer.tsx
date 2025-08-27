"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, Brain, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResponseAnalyzerProps {
  queryId: string
}

interface MinerResponse {
  id: string
  response: string
  confidence: number
  reputation: number
  processingTime: number
  status: "completed" | "processing" | "failed"
}

interface AnalysisResult {
  consensus: string
  confidenceScore: number
  hallucinationRisk: number
  minerResponses: MinerResponse[]
  verificationStatus: "verified" | "disputed" | "processing"
  processingTime: number
}

export function ResponseAnalyzer({ queryId }: ResponseAnalyzerProps) {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for demonstration
  useEffect(() => {
    const mockAnalysis: AnalysisResult = {
      consensus:
        "The current population of Tokyo, Japan is approximately 14 million people in the city proper and about 37.4 million in the Greater Tokyo Area, making it the most populous metropolitan area in the world.",
      confidenceScore: 94,
      hallucinationRisk: 6,
      verificationStatus: "verified",
      processingTime: 2.3,
      minerResponses: [
        {
          id: "miner-1",
          response:
            "Tokyo has approximately 14 million residents in the city proper and 37.4 million in the metropolitan area.",
          confidence: 96,
          reputation: 4.8,
          processingTime: 1.8,
          status: "completed",
        },
        {
          id: "miner-2",
          response: "The population of Tokyo is around 13.9 million in the city and 37.3 million in the greater area.",
          confidence: 92,
          reputation: 4.6,
          processingTime: 2.1,
          status: "completed",
        },
        {
          id: "miner-3",
          response:
            "Tokyo's population is approximately 14.1 million people, with the metropolitan area having about 37.5 million.",
          confidence: 95,
          reputation: 4.9,
          processingTime: 2.0,
          status: "completed",
        },
      ],
    }

    setTimeout(() => {
      setAnalysis(mockAnalysis)
      setIsLoading(false)
    }, 2000)
  }, [queryId])

  if (isLoading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary animate-spin" />
            Analyzing Responses...
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing miners</span>
              <span className="text-foreground">3/3</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
          <div className="text-sm text-muted-foreground">Collecting responses from decentralized miners...</div>
        </CardContent>
      </Card>
    )
  }

  if (!analysis) return null

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          Truth Analysis Complete
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="consensus" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="consensus">Consensus</TabsTrigger>
            <TabsTrigger value="miners">Miners</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="consensus" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge
                  variant={analysis.verificationStatus === "verified" ? "default" : "secondary"}
                  className="bg-primary text-primary-foreground"
                >
                  {analysis.verificationStatus.toUpperCase()}
                </Badge>
                <span className="text-sm text-muted-foreground">Processed in {analysis.processingTime}s</span>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <p className="text-foreground leading-relaxed">{analysis.consensus}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="text-sm font-medium text-foreground">{analysis.confidenceScore}%</span>
                  </div>
                  <Progress value={analysis.confidenceScore} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Hallucination Risk</span>
                    <span className="text-sm font-medium text-foreground">{analysis.hallucinationRisk}%</span>
                  </div>
                  <Progress value={analysis.hallucinationRisk} className="h-2" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="miners" className="space-y-4">
            <div className="space-y-3">
              {analysis.minerResponses.map((miner, index) => (
                <motion.div
                  key={miner.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-muted/30 rounded-lg border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">Miner {index + 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {miner.confidence}% confidence
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        ⭐ {miner.reputation}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{miner.response}</p>
                  <div className="text-xs text-muted-foreground">Processed in {miner.processingTime}s</div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{analysis.confidenceScore}%</div>
                <div className="text-sm text-muted-foreground">Truth Confidence</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{100 - analysis.hallucinationRisk}%</div>
                <div className="text-sm text-muted-foreground">Accuracy Score</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{analysis.processingTime}s</div>
                <div className="text-sm text-muted-foreground">Processing Time</div>
              </div>

              <div className="text-center p-4 bg-muted/30 rounded-lg border border-border">
                <Brain className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{analysis.minerResponses.length}</div>
                <div className="text-sm text-muted-foreground">Miners Consulted</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
