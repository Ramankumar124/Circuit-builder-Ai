import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Zap } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
const RightBar = () => {
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
        <TabsTrigger
          value="properties"
          className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-purple-600 data-[state=active]:shadow-none"
        >
          Properties
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
        <CardContent className="text-sm space-y-3"></CardContent>
      </Card>

      <div className="mt-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">
              Related Circuits
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="h-auto py-2 justify-start text-left"
            >
              <div className="flex flex-col items-start">
                <span className="text-xs">LED Chaser</span>
                <span className="text-[10px] text-slate-500">
                  Sequential LEDs
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-2 justify-start text-left"
            >
              <div className="flex flex-col items-start">
                <span className="text-xs">LED Dimmer</span>
                <span className="text-[10px] text-slate-500">
                  Variable brightness
                </span>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>
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
            Create a circuit with 10 LEDs and a battery
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-medium mb-2 text-sm">
              Try these prompts:
            </h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
              >
                Create a blinking LED circuit with a 555 timer
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
              >
                Design a temperature sensor with LED indicator
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start text-xs"
              >
                Make a light-activated LED circuit with photoresistor
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent
      value="properties"
      className="p-3 overflow-auto mt-0  h-full"
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">
            Circuit Properties
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="circuit-name">Circuit Name</Label>
            <input
              id="circuit-name"
              className="w-full px-3 py-2 border border-slate-200 rounded-md"
              defaultValue="Ten LED Circuit"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="circuit-description">Description</Label>
            <textarea
              id="circuit-description"
              className="w-full px-3 py-2 border border-slate-200 rounded-md h-20"
              defaultValue="A simple circuit with 10 LEDs powered by a 9V battery."
            />
          </div>

          <div className="space-y-2">
            <Label>Visibility</Label>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="private"
                name="visibility"
                defaultChecked
              />
              <Label htmlFor="private" className="text-sm">
                Private
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="public" name="visibility" />
              <Label htmlFor="public" className="text-sm">
                Public
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 cursor-pointer">
                LED
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">
                Battery
              </Badge>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer">
                Resistor
              </Badge>
              <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer">
                + Add Tag
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
  )
}

export default RightBar