import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useGetCompDetailMutation } from "@/redux/api/circuitApi";

interface ComponentDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  componentId: string | null;
}

export function ComponentDetails({
  open,
  onOpenChange,
  componentId,
}: ComponentDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [component, setComponent] = useState<any>(null);
  const [getDetails] = useGetCompDetailMutation();

  useEffect(() => {
    if (open && componentId) {
      setLoading(true);
      setProgress(0);

      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      // Fetch component details
      async function getSpecifications() {
        try {
          const response = await getDetails(componentId!);
          const cleanedResponse = response?.data?.data
            .replace(/```json|```/g, "")
            .trim();
          const data = JSON.parse(cleanedResponse);
          setComponent(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching component details:", error);
          setLoading(false);
        }
      }

      getSpecifications();

      return () => clearInterval(interval);
    }
  }, [open, componentId, getDetails]);

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {loading ? (
          <div className="py-8 flex flex-col items-center justify-center">
            <Progress value={progress} className="w-64 mb-4" />
            <p className="text-sm text-slate-500">
              Loading component details...
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">
                {component?.name || "Component Details"}
              </DialogTitle>
              <DialogDescription>
                {component?.description || ""}
              </DialogDescription>
            </DialogHeader>

            {component && (
              <Tabs defaultValue="specs" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="usage">Usage</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                {/* Specifications Tab */}
                <TabsContent value="specs" className="space-y-4 mt-4">
                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    {component["Component Type"] && (
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 min-w-[140px]">
                          Component Type:
                        </span>
                        <span className="text-slate-600">
                          {component["Component Type"]}
                        </span>
                      </div>
                    )}

                    {component["Given Value"] && (
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 min-w-[140px]">
                          Given Value:
                        </span>
                        <span className="text-slate-600">
                          {component["Given Value"]}
                        </span>
                      </div>
                    )}

                    {component["Operating Voltage"] && (
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 min-w-[140px]">
                          Operating Voltage:
                        </span>
                        <span className="text-slate-600">
                          {component["Operating Voltage"]}
                        </span>
                      </div>
                    )}

                    {component["Operating Current"] && (
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 min-w-[140px]">
                          Operating Current:
                        </span>
                        <span className="text-slate-600">
                          {component["Operating Current"]}
                        </span>
                      </div>
                    )}

                    {component["Polarity"] && (
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 min-w-[140px]">
                          Polarity:
                        </span>
                        <span className="text-slate-600">
                          {component["Polarity"]}
                        </span>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Usage Tab */}
                <TabsContent value="usage" className="space-y-4 mt-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    {component["Common Uses"] ? (
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 min-w-[140px]">
                          Common Uses:
                        </span>
                        <span className="text-slate-600">
                          {component["Common Uses"]}
                        </span>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">
                        No usage information available
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes" className="space-y-4 mt-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    {component["Special Notes"] ? (
                      <div className="flex items-start">
                        <span className="font-medium text-slate-700 min-w-[140px]">
                          Special Notes:
                        </span>
                        <span className="text-slate-600">
                          {component["Special Notes"]}
                        </span>
                      </div>
                    ) : (
                      <p className="text-slate-500 italic">
                        No special notes available
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
