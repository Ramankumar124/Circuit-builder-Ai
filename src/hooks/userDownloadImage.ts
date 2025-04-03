import { useCallback } from "react";
import { toPng, toJpeg, toSvg } from "html-to-image";
import jsPDF from "jspdf";

interface UseDownloadImageOptions {
    flowRef: React.RefObject<HTMLDivElement>;
    setExportMethod: React.Dispatch<React.SetStateAction<string>>;
    reactFlowInstance: React.MutableRefObject<any>;
}

type ExportFormat = "png" | "jpeg" | "svg" | "pdf";

const useDownloadImage = (
    flowRef: UseDownloadImageOptions["flowRef"],
    setExportMethod: UseDownloadImageOptions["setExportMethod"],
    reactFlowInstance: UseDownloadImageOptions["reactFlowInstance"]
) => {
    return useCallback(
        async (format: ExportFormat) => {
            if (!flowRef.current) return;
            try {
                reactFlowInstance.current?.fitView({ padding: 0.2 });

                await new Promise((resolve) => setTimeout(resolve, 500));

                // Enhance the visibility of all edges and nodes before export
                const edges = flowRef.current.querySelectorAll<HTMLElement>(".react-flow__edge");
                const nodes = flowRef.current.querySelectorAll<HTMLElement>(".react-flow__node");

                // Store original styles to restore later
                const originalStyles = new Map<HTMLElement, { opacity?: string; strokeWidth?: string; border?: string }>();

                // Enhance edges
                edges.forEach((edge) => {
                    originalStyles.set(edge, {
                        opacity: edge.style.opacity,
                        strokeWidth: edge.style.strokeWidth,
                    });

                    edge.style.opacity = "1";
                    edge.style.strokeWidth = "1px";

                    // Ensure path elements are visible
                    const paths = edge.querySelectorAll<SVGPathElement>("path");
                    paths.forEach((path) => {
                        path.style.stroke = path.style.stroke || "#000";
                        path.style.strokeWidth = "1px";
                    });
                });

                // Enhance nodes
                nodes.forEach((node) => {
                    originalStyles.set(node, {
                        opacity: node.style.opacity,
                        border: node.style.border,
                    });
                    node.style.opacity = "1";
                });

                // Allow DOM to update with new styles
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Create a temporary canvas to add the text
                const canvas = document.createElement('canvas');
                canvas.width = flowRef.current.offsetWidth * 4; // Match pixelRatio
                canvas.height = flowRef.current.offsetHeight * 4; // Match pixelRatio
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    throw new Error("Canvas context not available");
                }

                const options = {
                    quality: 1,
                    pixelRatio: 4, // Higher for better quality
                    backgroundColor: "#ffffff",
                    width: flowRef.current.offsetWidth,
                    height: flowRef.current.offsetHeight,
                    style: {
                        transform: "scale(1)", // Ensure no scaling issues
                    },
                    filter: (node: HTMLElement) => {
                        return (
                            !node.classList?.contains("react-flow__controls") &&
                            !node.classList?.contains("react-flow__attribution") &&
                            !node.classList?.contains("react-flow__minimap")
                        );
                    },
                    cacheBust: true, // Prevent caching issues
                };

                let dataUrl: string;
                // For PDF, capture as PNG first
                if (format === "pdf") {
                    dataUrl = await toPng(flowRef.current, options);
                } else {
                    switch (format) {
                        case "png":
                            dataUrl = await toPng(flowRef.current, options);
                            break;
                        case "jpeg":
                            dataUrl = await toJpeg(flowRef.current, {
                                ...options,
                                quality: 0.95,
                            });
                            break;
                        case "svg":
                            dataUrl = await toSvg(flowRef.current, options);
                            break;
                        default:
                            return;
                    }
                }

                // Restore original styles
                edges.forEach((edge) => {
                    const original = originalStyles.get(edge);
                    if (original) {
                        edge.style.opacity = original.opacity || "";
                        edge.style.strokeWidth = original.strokeWidth || "";
                    }
                });

                nodes.forEach((node) => {
                    const original = originalStyles.get(node);
                    if (original) {
                        node.style.opacity = original.opacity || "";
                        node.style.border = original.border || "";
                    }
                });

                // Add the text to the canvas
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    ctx.font = `bold ${24 * 4}px sans-serif`; // Adjust font size as needed, multiplied by pixelRatio
                    ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black
                    ctx.textAlign = "right";
                    ctx.textBaseline = "bottom";
                    ctx.fillText(
                        "CircuitBuilderAI",
                        canvas.width - 20 * 4, // Right margin, multiplied by pixelRatio
                        canvas.height - 10 * 4 // Bottom margin, multiplied by pixelRatio
                    );

                    // Get the final data URL from the canvas
                    const finalDataUrl = canvas.toDataURL(`image/${format === 'jpeg' ? 'jpeg' : 'png'}`);

                    if (format === "pdf") {
                        const pdf = new jsPDF({
                            orientation: "landscape",
                            unit: "mm",
                            format: "a4",
                        });

                        const imgProps = pdf.getImageProperties(finalDataUrl);
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                        pdf.addImage(finalDataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
                        pdf.save(
                            `circuit_diagram_${new Date().toISOString().slice(0, 10)}.pdf`
                        );
                    } else {
                        const link = document.createElement("a");
                        link.download = `circuit_diagram_${new Date()
                            .toISOString()
                            .slice(0, 10)}.${format}`;
                        link.href = finalDataUrl;
                        link.click();
                    }

                    setExportMethod("");
                };
                img.onerror = (error) => {
                    console.error("Error loading image:", error);
                    alert("Failed to add text to the diagram. Please try again.");
                };
                img.src = dataUrl;


            } catch (error) {
                console.error("Error exporting:", error);
                alert("Failed to export diagram. Please try again.");
            }
        },
        [flowRef, setExportMethod, reactFlowInstance]
    );
};

export default useDownloadImage;
