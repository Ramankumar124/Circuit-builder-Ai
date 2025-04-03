import { useRef, useState } from "react";
import FlowChart from "../../flowchart";
import { useCircuitContext } from "../../context/circuitContext";
import ProjectDialog from "../../components/custom/DialogBox";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

import useDownloadImage from "@/hooks/userDownloadImage";
import { ReactFlowInstance } from "@xyflow/react";
import { FolderOpen, History, Settings, Share, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/custom/user-menu";
import { ShareDialog } from "@/components/custom/share-dialog";
import { ComponentDetails } from "@/components/ui/components-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ComponentDropdowns from "@/components/custom/ComponentsDropdown";
import DasboardLoader from "@/components/custom/DasboardLoader";
import { Card } from "@/components/ui/card";
import RightBar from "@/components/Dashboard/RightBar";
import LeftBar from "@/components/Dashboard/LeftBar";
import Header from "@/components/Dashboard/Header";

type NodeType = {
  type: string;
  data: {
    label: string;
  };
};

interface CircuitData {
  node?: NodeType[] | null;
  prompt?: string;
  explanation?: string;
  circuitName?: string;
}

const Dashboard = () => {
  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const handleDialog = () => {
    setisDialogOpen(false);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-grow flex-col overflow-hidden">
     <Header setIsShareOpen={setIsShareOpen}/>
        <div className="flex flex-grow bg-black py-4">
          <div id="leftbar" className="h-full w-1/5 bg-white rounded-4xl">
            <LeftBar
              setSelectedComponent={setSelectedComponent}
              setIsDetailsOpen={setIsDetailsOpen}
              setisDialogOpen={setisDialogOpen}
            />
          </div>
          <div
            id="mid"
            className="w-[60%]  flex items-start justify-center rounded-4xl  m-[20px]"
          >
            <FlowChart />
          </div>
          <div
            id="rightbar"
            className=" w-1/5 h-full bg-white rounded-4xl pt-3 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col"
          >
            <RightBar />
          </div>
        </div>
        <ProjectDialog onClose={handleDialog} open={isDialogOpen} />
        <ComponentDetails
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
          componentId={selectedComponent}
        />
        <ShareDialog open={isShareOpen} onOpenChange={setIsShareOpen} />
        {isLoading && <DasboardLoader setIsLoading={setIsLoading} />}
      </div>
    </>
  );
};

export default Dashboard;
