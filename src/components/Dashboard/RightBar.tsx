import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import { TextGenerateEffect } from "../ui/text-generate-effect";
const RightBar = () => {
    const circuitData=useSelector((state:RootState)=>state?.circuit)
  return (
    <Tabs defaultValue="explanation" className="flex flex-col h-full">
    <div className="border-b border-slate-200 dark:border-slate-800">
      <TabsList className="w-full justify-start rounded-none bg-transparent border-b">
        <TabsTrigger
          value="explanation"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-600 data-[state=active]:shadow-none"
        >
          Explanation
        </TabsTrigger>
        <TabsTrigger
          value="prompt"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-600 data-[state=active]:shadow-none"
        >
          Prompt
        </TabsTrigger>
 
      </TabsList>
    </div>

    <TabsContent
      value="explanation"
      className="p-3 overflow-auto mt-0 h-full"
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Zap className="mr-2 h-4 w-4 text-yellow-500" />
            Circuit Explanation:
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-3">
            <TextGenerateEffect words={circuitData?.explanation as string}/>
            
        </CardContent>
      </Card>

    </TabsContent>

    <TabsContent
      value="prompt"
      className="p-3 overflow-auto mt-0 h-full"
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Prompt:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {circuitData?.prompt}
          </p>

    
        </CardContent>
      </Card>
    </TabsContent>

  </Tabs>
  )
}

export default RightBar