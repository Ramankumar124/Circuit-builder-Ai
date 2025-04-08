import { RootState } from "@/redux/Store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CircuitData, NodeType } from "@/interfaces/circuit";

interface ComponentDropdownsProps {
  setSelectedComponent: React.Dispatch<React.SetStateAction<string | null>>;
  setIsDetailsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComponentDropdowns = ({
  setSelectedComponent,
  setIsDetailsOpen,
}: ComponentDropdownsProps) => {
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
          <Select
            onValueChange={(value) => {
              setSelectedComponent(value);
              setIsDetailsOpen(true);
            }}
          >
            <SelectTrigger className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 bg-white text-black border-2">
              <SelectValue
                placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
                className="text-black"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{`Select ${
                  type.charAt(0).toUpperCase() + type.slice(1)
                }`}</SelectLabel>
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
