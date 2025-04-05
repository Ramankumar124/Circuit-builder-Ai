
import { useState } from "react"
import { Check, Copy, Facebook, Link, Twitter, Mail, QrCode } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaFacebook, FaTwitter } from "react-icons/fa6"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)
  const [isGeneratingQR, setIsGeneratingQR] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const shareUrl = "https://circuitbuilderai.com/projects/ten-led-circuit"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generateQRCode = () => {


    
    setIsGeneratingQR(true)
    // Simulate loading
    setTimeout(() => {
      setIsGeneratingQR(false)
      setShowQR(true)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Share your circuit</DialogTitle>
          <DialogDescription>Anyone with the link can view this circuit</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4">
            <div className="flex items-center space-x-2">
              <div className="grid flex-1 gap-2">
                <Input value={shareUrl} readOnly className="w-full" />
              </div>
              <Button
                type="submit"
                size="sm"
                className="px-3 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            {!showQR ? (
              <Button variant="outline" className="w-full mt-4" onClick={generateQRCode} disabled={isGeneratingQR}>
                {isGeneratingQR ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating Link...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate Link
                  </>
                )}
              </Button>
            ) : (
              <div className="mt-4 flex flex-col items-center">
                <div className="w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                  <div className="w-24 h-24 bg-[url('/placeholder.svg?height=96&width=96')] bg-contain"></div>
                </div>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowQR(false)}>
                  Hide QR Code
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="social" className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <FaTwitter className="mr-2 h-4 w-4 text-blue-500" />
                Twitter
              </Button>
              <Button variant="outline" className="justify-start">
                <FaFacebook className="mr-2 h-4 w-4 text-blue-700" />
                Facebook
              </Button>
              <Button variant="outline" className="justify-start">
                <Mail className="mr-2 h-4 w-4 text-red-500" />
                Email
              </Button>
              <Button variant="outline" className="justify-start">
                <Link className="mr-2 h-4 w-4" />
                Copy Link
              </Button>
            </div>

            <div className="mt-4">
              <label className="text-sm font-medium">Add a message (optional)</label>
              <textarea
                className="mt-1 w-full rounded-md border border-slate-200 p-2 text-sm"
                rows={3}
                placeholder="Check out this circuit I built with CircuitBuilderAI!"
              ></textarea>
            </div>
          </TabsContent>

          <TabsContent value="embed" className="mt-4">
          {!showQR ? (
              <Button variant="outline" className="w-full mt-4" onClick={generateQRCode} disabled={isGeneratingQR}>
                {isGeneratingQR ? (
                  <>
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                    Generating QR Code...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate QR Code
                  </>
                )}
              </Button>
            ) : (
              <div className="mt-4 flex flex-col items-center">
                <div className="w-32 h-32 bg-slate-100 rounded-lg flex items-center justify-center">
                  <div className="w-24 h-24 bg-[url('/placeholder.svg?height=96&width=96')] bg-contain"></div>
                </div>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowQR(false)}>
                  Hide QR Code
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4 flex flex-col sm:flex-row gap-2">
          <div className="text-xs text-slate-500">This circuit will be accessible to anyone with the link</div>
          <Button variant="outline" size="sm" className="sm:ml-auto" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

