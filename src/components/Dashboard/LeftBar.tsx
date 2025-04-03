import React, { useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import ComponentDropdowns from '../custom/ComponentsDropdown'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { FolderOpen } from 'lucide-react'
import useDownloadImage from '@/hooks/userDownloadImage'
import { ReactFlowInstance } from '@xyflow/react'
import { useCircuitContext } from '@/context/circuitContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface LeftBarProps {
  setSelectedComponent: React.Dispatch<React.SetStateAction<any>>;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setisDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
type ExportFormat = "png" | "jpeg" | "pdf" | "svg";
const LeftBar:React.FC<LeftBarProps> = ({setSelectedComponent,setIsDetailsOpen,setisDialogOpen}) => {
      const { flowRef } = useCircuitContext();
      const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
      const [recentProjects, setRecentProjects] = useState([
        { id: 1, name: "LED Flasher", date: "2 days ago" },
        { id: 2, name: "Arduino Sensor", date: "1 week ago" },
        { id: 3, name: "Motor Controller", date: "2 weeks ago" },
      ]);
      const [exportMethod, setExportMethod] = useState<string>("");


  const downloadImage = useDownloadImage(
    flowRef,
    setExportMethod,
    reactFlowInstance
  );

  return (
    <div className='flex flex-col justify-end h-full pb-2' >
          <Tabs
            defaultValue="components"
            className="flex-1 flex flex-col bg-white rounded-4xl p-3 h-screen"
          >
            <TabsList className="w-full rounded-4xl justify-start  bg-white border-b border-slate-200 dark:border-slate-800 px-2">
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
                  <span className="font-medium">Note:</span> Click on any component to view detailed information.
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-auto py-2 justify-start"
                  >
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    Red LED
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-auto py-2 justify-start"
                  >
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    9V Battery
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-auto py-2 justify-start"
                  >
                    <div className="w-3 h-3 rounded-full bg-amber-600 mr-2"></div>
                    220Ω Resistor
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-auto py-2 justify-start"
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    Capacitor
                  </Button>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium text-slate-500">
                  Recent Projects
                </h3>
                <div className="space-y-2">
                  {recentProjects.map((project) => (
                    <Card key={project.id} className="p-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">
                            {project.name}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {project.date}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <FolderOpen className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <div className="flex justify-center mt-4 gap-4">
            <Button
                id="save project"
              className="bg-blue-500 hover:bg-blue-600 text-lg"
              onClick={
                () =>{
                     setisDialogOpen(true)
                     console.log("dilog dabaya");
                     }
                    }
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
                  <SelectValue placeholder="Export As" className='text-black' />
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
  )
}

export default LeftBar