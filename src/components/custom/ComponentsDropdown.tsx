import { RootState } from "@/redux/Store";
import { FormControl, MenuItem, Select,InputLabel } from "@mui/material";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const handleChange = (type: string) => (event: HandleChangeEvent) => {
    const firstElement = [...dropdownData[type]][0];
    setSelectedComponent(firstElement);
    setIsDetailsOpen(true);
    setSelectedValues((prevSelectedValues: SelectedValues) => ({
      ...prevSelectedValues,
      [type]: event.target.value,
    }));
  };

  return (
    <div>
      {Object.keys(dropdownData).map((type) => (
        <FormControl fullWidth key={type} style={{ marginBottom: "1rem" }}>
          <InputLabel>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </InputLabel>
          <Select
            style={{ color: "white", backgroundColor: "#404040" }}
            value={selectedValues[type] || ""}
            onChange={handleChange(type)}
          >
            {[...dropdownData[type]].map((label, index) => (
              <MenuItem
                style={{ color: "black", backgroundColor: "white" }}
                key={index}
                value={label}
              >
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

export default ComponentDropdowns;