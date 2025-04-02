import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface ComponentDetailsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  componentId: string | null
}

// Mock component data
const componentData = {
  "battery-9v": {
    name: "9V Battery",
    description: "A standard 9V battery commonly used in electronic circuits.",
    specs: [
      { name: "Voltage", value: "9V" },
      { name: "Chemistry", value: "Alkaline" },
      { name: "Capacity", value: "~500mAh" },
      { name: "Max Current", value: "~200mA" },
    ],
    usage: "Commonly used in small electronic devices and circuits that require a moderate voltage source.",
    image: "/placeholder.svg?height=200&width=200",
  },
  "led-red": {
    name: "Red LED",
    description: "A standard red light-emitting diode.",
    specs: [
      { name: "Forward Voltage", value: "1.8-2.2V" },
      { name: "Max Current", value: "20mA" },
      { name: "Wavelength", value: "620-625nm" },
      { name: "Luminous Intensity", value: "~5000mcd" },
    ],
    usage: "Used as indicators, in displays, and for general illumination in electronic circuits.",
    image: "/placeholder.svg?height=200&width=200",
  },
  "Resistor (220Ω)": {
    name: "220 Ohm Resistor",
    description: "A standard 220Ω resistor used for current limiting.",
    specs: [
      { name: "Resistance", value: "220Ω" },
      { name: "Tolerance", value: "±5%" },
      { name: "Power Rating", value: "0.25W" },
      { name: "Temperature Coefficient", value: "±100ppm/°C" },
    ],
    usage: "Commonly used for current limiting in LED circuits and as pull-up/pull-down resistors.",
    image: "/placeholder.svg?height=200&width=200",
  },
}

export function ComponentDetails({ open, onOpenChange, componentId }: ComponentDetailsProps) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [component, setComponent] = useState<any>(null)

  useEffect(() => {
    if (open && componentId) {
      setLoading(true)
      setProgress(0)
      // Simulate loading data
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setLoading(false)
            return 100
          }
          return prev + 10
        })
      }, 100)

      // Get component data
      const data = componentData[componentId as keyof typeof componentData]
      console.log(data);
      
      if (data) {
        setComponent(data)
      }

      return () => clearInterval(interval)
    }
  }, [open, componentId])

  if (!component) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <Progress value={progress} className="w-64 mb-4" />
            <p className="text-sm text-slate-500">Loading component details...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{component.name}</DialogTitle>
              <DialogDescription>{component.description}</DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="specs" className="mt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="usage">Usage</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
              </TabsList>

              <TabsContent value="specs" className="mt-4">
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <div className="bg-slate-100 rounded-lg p-2 flex items-center justify-center">
                      <img
                        src={component.image || "/placeholder.svg"}
                        alt={component.name}
                        className="max-w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="w-2/3">
                    <h3 className="text-sm font-medium mb-2">Technical Specifications</h3>
                    <div className="space-y-2">
                      {component.specs.map((spec: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-sm text-slate-600">{spec.name}:</span>
                          <span className="text-sm font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Common Usage</h3>
                    <p className="text-sm text-slate-600">{component.usage}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Best Practices</h3>
                    <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                      <li>Always check the polarity when connecting to a circuit</li>
                      <li>Use appropriate current limiting components</li>
                      <li>Avoid exceeding maximum ratings</li>
                      <li>Store in a cool, dry place when not in use</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="examples" className="mt-4">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium mb-2">Example Circuits</h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-slate-200 rounded-lg p-2">
                      <div className="bg-slate-100 rounded h-24 mb-2 flex items-center justify-center text-xs text-slate-500">
                        Circuit Preview
                      </div>
                      <h4 className="text-sm font-medium">Basic LED Circuit</h4>
                      <p className="text-xs text-slate-500">Simple LED with current limiting resistor</p>
                    </div>

                    <div className="border border-slate-200 rounded-lg p-2">
                      <div className="bg-slate-100 rounded h-24 mb-2 flex items-center justify-center text-xs text-slate-500">
                        Circuit Preview
                      </div>
                      <h4 className="text-sm font-medium">LED Array</h4>
                      <p className="text-xs text-slate-500">Multiple LEDs in parallel configuration</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button variant="outline" size="sm" className="sm:ml-auto" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Add to Circuit</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

