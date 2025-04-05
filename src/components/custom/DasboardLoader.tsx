import React, { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

const DasboardLoader: React.FC<{
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsLoading }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="fixed inset-0 bg-white/80 dark:bg-slate-950/80 z-50 flex flex-col items-center justify-center">
      <div className="w-64 mb-4">
        <Progress value={progress} className="h-2" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium mb-1">Loading Circuit Builder</h3>
        <p className="text-sm text-slate-500">Preparing your workspace...</p>
      </div>
    </div>
  );
};

export default DasboardLoader;
