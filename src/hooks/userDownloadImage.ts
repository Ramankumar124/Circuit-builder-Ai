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
                            !node.classList?.contains("react-flow__attribution")
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

                if (format === "pdf") {
                    const pdf = new jsPDF({
                        orientation: "landscape",
                        unit: "mm",
                        format: "a4",
                    });

                    const imgProps = pdf.getImageProperties(dataUrl);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
                    pdf.save(
                        `circuit_diagram_${new Date().toISOString().slice(0, 10)}.pdf`
                    );
                } else {
                    const link = document.createElement("a");
                    link.download = `circuit_diagram_${new Date()
                        .toISOString()
                        .slice(0, 10)}.${format}`;
                    link.href = dataUrl;
                    link.click();
                }

                setExportMethod("");
            } catch (error) {
                console.error("Error exporting:", error);
                alert("Failed to export diagram. Please try again.");
            }
        },
        [flowRef, setExportMethod, reactFlowInstance]
    );
};

export default useDownloadImage;
