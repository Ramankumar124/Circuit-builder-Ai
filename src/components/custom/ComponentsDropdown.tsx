import { RootState } from "@/redux/Store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface ComponentDropdownsProps {
  setSelectedComponent: React.Dispatch<React.SetStateAction<string | null>>;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface SelectedValues {
  [key: string]: string;
}
interface HandleChangeEvent {
  target: {
    value: string;
  };
}
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
const ComponentDropdowns = ({
  setSelectedComponent,
  setIsDetailsOpen,
}: ComponentDropdownsProps) => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({});
  const [dropdownData, setDropdownData] = useState<Record<string, Set<string>>>(
    {}
  );

  const getDropdownData = (nodes: NodeType[]) => {
    const dropdownData: Record<string, Set<string>> = {};

    nodes?.forEach((node) => {
      const { type, data } = node;
      if (!dropdownData[type]) {
        dropdownData[type] = new Set();
      }
      dropdownData[type].add(data.label);
    });

    return dropdownData;
  };
  const circuitData = useSelector(
    (state: RootState) => state?.circuit as CircuitData
  );

  useEffect(() => {
    if (circuitData?.node) {
      setDropdownData(
        getDropdownData(Array.isArray(circuitData.node) ? circuitData.node : [])
      );
    }
  }, [circuitData]);

  return (
    <div className="space-y-4">
      {Object.keys(dropdownData).map((type) => (
        <div key={type}>
              
                  <Select onValueChange={(value) => {
                  setSelectedComponent(value);
                  setIsDetailsOpen(true);
                  setSelectedValues((prev) => ({
                    ...prev,
                    [type]: value,
                  }));
                  }}>
                  <SelectTrigger className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-white text-black border-2">
                    <SelectValue placeholder={type.charAt(0).toUpperCase() + type.slice(1)} className='text-black' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                    <SelectLabel>{`Select ${type.charAt(0).toUpperCase() + type.slice(1)}`}</SelectLabel>
                    {[...dropdownData[type]].map((label, index) => (
                      <SelectItem key={index} value={label}>
                      {label}
                      </SelectItem>
                    ))}
                    </SelectGroup>
                  </SelectContent>
                  </Select>
              
        </div>
      ))}
    </div>
  );
};

export default ComponentDropdowns;