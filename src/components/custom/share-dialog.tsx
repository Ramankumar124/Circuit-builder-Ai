import { useState, useRef, useEffect } from "react";
import { Check, Copy, Mail, QrCode, Download } from "lucide-react";
import { IoLogoWhatsapp } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaFacebook, FaX } from "react-icons/fa6";
import { useLazyCreateShareLinkQuery } from "@/redux/api/shareApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import toast, { Toaster } from "react-hot-toast";
import QRCode from "react-qr-code";
import { Skeleton } from "@/components/ui/skeleton";
import { downloadQRCode } from "@/utils/ShareDownLoadQr";
interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareDialog({ open, onOpenChange }: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingQR, setIsGeneratingQR] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [customMessage, setCustomMessage] = useState(
    "Check out this circuit I built with CircuitBuilderAI!"
  );
  const [initialLoading, setInitialLoading] = useState(true);

  const qrCodeRef = useRef<HTMLDivElement>(null);

  const projectId = useSelector((state: RootState) => state.circuit.projectId);

  const [generateLink, { isLoading }] = useLazyCreateShareLinkQuery();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateShareLink = async () => {
    if (!projectId) {
      toast.error("Please save your project before sharing");
      return;
    }

    console.log("Generating share link for project:", projectId);

    try {
      const result = await generateLink(projectId);
      console.log("RTK Query response:", result);

      if (result.data && result.data.data) {
        setShareUrl(result.data.data);
        toast.success("Share link generated successfully!");
      } else if (result.error) {
        console.error("Error from RTK Query:", result.error);
        toast.error("Failed to generate share link");
      }
    } catch (error) {
      console.error("Error generating share link:", error);
      toast.error("Failed to generate share link");
    }
  };

  const generateQRCode = () => {
    if (!shareUrl) {
      toast.error("Please generate a share link first");
      return;
    }

    setIsGeneratingQR(true);
    setTimeout(() => {
      setIsGeneratingQR(false);
      setShowQR(true);
    }, 500);
  };

  const handleSocialShare = (platform: string) => {
    toast.error("Please Generate the Link First");
    if (!shareUrl) return;

    const message = encodeURIComponent(customMessage + " " + shareUrl);
    let url = "";

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${message}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}&quote=${encodeURIComponent(customMessage)}`;
        break;
      case "email":
        url = `mailto:?subject=Check out this circuit&body=${message}`;
        window.open(url, "_self");
        return;
      case "whatsapp":
        url = `https://api.whatsapp.com/send?text=${message}`;
        break;
      default:
        return;
    }

    window.open(url, "_blank");
  };

  useEffect(() => {
    if (open) {
      setInitialLoading(true);
      generateShareLink().finally(() => {
        setTimeout(() => setInitialLoading(false), 800);
      });
    } else {
      setShowQR(false);
      setInitialLoading(true);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Toaster />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Share your circuit</DialogTitle>
          <DialogDescription>
            Anyone with the link can view this circuit
          </DialogDescription>
        </DialogHeader>

        {initialLoading || isLoading ? (
          <div className="py-6 space-y-4">
            <Skeleton className="h-8 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ) : (
          <Tabs defaultValue="link" className="mt-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="link">Link</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="qrcode">QR Code</TabsTrigger>
            </TabsList>

            <TabsContent value="link" className="mt-4">
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Input
                    value={shareUrl}
                    placeholder="Create Your Link"
                    readOnly
                    className="w-full"
                  />
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
            </TabsContent>

            <TabsContent value="social" className="mt-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSocialShare("twitter")}
                  disabled={!shareUrl}
                >
                  <FaX className="mr-2 h-4 w-4 text-blue-500" />
                  Twitter
                </Button>

                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSocialShare("facebook")}
                  disabled={!shareUrl}
                >
                  <FaFacebook className="mr-2 h-4 w-4 text-blue-700" />
                  Facebook
                </Button>

                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSocialShare("email")}
                  disabled={!shareUrl}
                >
                  <Mail className="mr-2 h-4 w-4 text-red-500" />
                  Email
                </Button>

                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => handleSocialShare("whatsapp")}
                  disabled={!shareUrl}
                >
                  <IoLogoWhatsapp className="text-green-500" />
                  WhatsApp
                </Button>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Add a message (optional)
                </label>
                <textarea
                  className="mt-1 w-full rounded-md border border-slate-200 p-2 text-sm"
                  rows={3}
                  placeholder="Check out this circuit I built with CircuitBuilderAI!"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                ></textarea>
              </div>
            </TabsContent>

            <TabsContent value="qrcode" className="mt-4">
              {!showQR ? (
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-sm text-center text-gray-600">
                    Generate a QR code for your circuit that others can scan to
                    view
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={generateQRCode}
                    disabled={isGeneratingQR || !shareUrl}
                  >
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
                  {!shareUrl && (
                    <p className="text-xs text-amber-600">
                      You need to generate a share link first
                    </p>
                  )}
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  <div
                    ref={qrCodeRef}
                    className="p-4 bg-white rounded-lg flex items-center justify-center"
                  >
                    <QRCode
                      value={shareUrl}
                      size={180}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        downloadQRCode(
                          qrCodeRef as React.RefObject<HTMLDivElement>
                        )
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowQR(false)}
                    >
                      Generate New
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Scan this QR code with a mobile device to view the circuit
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}
   
      </DialogContent>
    </Dialog>
  );
}
