import toast from "react-hot-toast";

export const downloadQRCode = (qrCodeRef: React.RefObject<HTMLDivElement>) => {
    if (!qrCodeRef.current) return;

    try {
      const svg = qrCodeRef.current.querySelector("svg");
      if (!svg) return;

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");
        downloadLink.download = "circuit-qr-code.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    } catch (error: any) {
      console.error("Error downloading QR code:", error);
      toast.error("Failed to download QR code");
    }
  };
