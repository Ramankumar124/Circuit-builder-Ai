import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FolderOpen, Loader2 } from "lucide-react";
import useDownloadImage from "@/hooks/userDownloadImage";
import { ReactFlowInstance } from "@xyflow/react";
import { useCircuitContext } from "@/context/circuitContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useDispatch } from "react-redux";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { formatDistanceToNow } from "date-fns";
import { setCircuit } from "@/redux/features/circuitSlice";
import { toast } from "react-hot-toast";
import ComponentDropdowns from "../custom/ComponentsDropdown";
import { Edge, Node } from "@/interfaces/circuit";

interface LeftBarProps {
  setSelectedComponent: React.Dispatch<React.SetStateAction<any>>;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setisDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ExportFormat = "png" | "jpeg" | "pdf" | "svg";

interface Project {
  id: string;
  projectName: string;
  createdAt: string;
  circuit: {
    id: string;
    circuitName: string;
    node: Node;
    edge: Edge;
    explaination: string;
  };
  prompt: string;
}

interface RecentComponent {
  type: string;
  label: string;
  count: number;
}

const LeftBar: React.FC<LeftBarProps> = ({
  setSelectedComponent,
  setIsDetailsOpen,
  setisDialogOpen,
}) => {
  const { flowRef } = useCircuitContext();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllProjectsQuery(undefined);
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const [exportMethod, setExportMethod] = useState<string>("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [recentComponents, setRecentComponents] = useState<RecentComponent[]>(
    []
  );

  // Format the date to "X time ago" (e.g., "2 days ago", "1 hour ago")
  const formatTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error:any) {
      return "Unknown date";
    }
  };

  // Extract recent components from projects
  const extractRecentComponents = (projects: Project[]) => {
    const componentMap = new Map<string, RecentComponent>();

    // Process all projects and their nodes
    projects.forEach((project) => {
      if (project.circuit && Array.isArray(project.circuit.node)) {
        project.circuit.node.forEach((node) => {
          if (node.type && node.data && node.data.label) {
            const key = `${node.type}-${node.data.label}`;

            if (componentMap.has(key)) {
              // Increment count for existing component
              const component = componentMap.get(key)!;
              component.count += 1;
              componentMap.set(key, component);
            } else {
              // Add new component
              componentMap.set(key, {
                type: node.type,
                label: node.data.label,
                count: 1,
              });
            }
          }
        });
      }
    });

    // Convert map to array, sort by count, and get top 4
    return Array.from(componentMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);
  };

  // Load projects and extract components from API data
  useEffect(() => {
    if (data && data.data && data.data.data) {
      const projectsData = data.data.data;
      setProjects(projectsData);

      // Extract recent components
      const components = extractRecentComponents(projectsData);
      setRecentComponents(components);
    }
  }, [data]);

  // Handle component selection
  const handleComponentSelect = (label: string) => {
    setSelectedComponent(label);
    setIsDetailsOpen(true);
  };

  // Handle opening a project
  const handleOpenProject = (project: Project) => {
    try {
      if (project && project.circuit) {
        dispatch(
          setCircuit({
            explanation: project.circuit.explaination || "",
            suggestions: [],
            circuitName: project.circuit.circuitName || "",
            node: project.circuit.node || null,
            edge: project.circuit.edge || null,
            prompt: project.prompt || "",
          })
        );
        window.location.reload();
      } else {
        toast.error("Failed to load project data");
      }
    } catch (error) {
      toast.error("Error loading project");
      console.error("Error loading project:", error);
    }
  };

  const downloadImage = useDownloadImage(
    flowRef,
    setExportMethod,
    reactFlowInstance
  );

  return (
    <div className="flex flex-col justify-end h-full pb-2">
      <Tabs
        defaultValue="components"
        className="flex-1 flex flex-col bg-white rounded-4xl p-3 h-screen"
      >
        <TabsList className="w-full rounded-4xl justify-start bg-white border-b border-slate-200 dark:border-slate-800 px-2">
          <TabsTrigger
            value="components"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-600 data-[state=active]:shadow-none"
          >
            Components
          </TabsTrigger>
          <TabsTrigger
            value="recent"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-600 data-[state=active]:shadow-none"
          >
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="components"
          className="flex-1 overflow-auto p-3 space-y-4 mt-0 bg-white"
        >
          <ComponentDropdowns
            setSelectedComponent={setSelectedComponent}
            setIsDetailsOpen={setIsDetailsOpen}
          />
          <div className="bg-slate-100 p-3 rounded-lg mt-2 mb-4">
            <p className="text-sm text-slate-600 italic">
              <span className="font-medium">Note:</span> Click on any component
              to view detailed information.
            </p>
          </div>
        </TabsContent>

        <TabsContent
          value="recent"
          className="flex-1 overflow-auto p-3 mt-0 bg-white"
        >
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-500">
              Recently Used
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {isLoading ? (
                <div className="col-span-2 flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                </div>
              ) : recentComponents.length === 0 ? (
                <div className="col-span-2 text-center p-4 text-sm text-slate-500">
                  No components found
                </div>
              ) : (
                recentComponents.map((component, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-auto py-2 justify-start"
                    onClick={() => handleComponentSelect(component.label)}
                  >
                    <div className="w-3 h-3 rounded-full bg-slate-500 mr-2"></div>
                    {component.label}
                  </Button>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-slate-500">
              Recent Projects
            </h3>
            {isLoading ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center p-4 text-sm text-slate-500">
                No projects found. Create and save your first circuit!
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {projects.slice(0, 4).map((project) => (
                  <Card
                    key={project.id}
                    className="p-2 hover:bg-slate-50 transition-colors w-[300px] cursor-pointer"
                    onClick={() => handleOpenProject(project)}
                  >
                    <div className="flex justify-between items-center">
                    <div className="flex flex-col ml-4">
                      <h4
                        className="text-sm font-medium line-clamp-1"
                      >
                        {project.projectName}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {formatTimeAgo(project.createdAt)}
                      </p>
                    </div>
                    <FolderOpen className="text-gray-500"/>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="flex justify-center mt-4 gap-4">
        <Button
          id="save project"
          className="bg-blue-500 hover:bg-blue-600 text-lg"
          onClick={() => {
            setisDialogOpen(true);
          }}
        >
          Save
        </Button>
        <div className="w-[150px]">
          <Select
            value={exportMethod}
            onValueChange={(value) => {
              setExportMethod(value);
              if (value) {
                downloadImage(value as ExportFormat);
              }
            }}
          >
            <SelectTrigger className="bg-white-800 text-black border-2">
              <SelectValue placeholder="Export As" className="text-black" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
