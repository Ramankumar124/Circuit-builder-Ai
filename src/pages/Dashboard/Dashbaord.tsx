import { useCallback, useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import FlowChart from "../../flowchart";
import { useCircuitContext } from "../../context/circuitContext";
import ProjectDialog from "../../components/ui/DialogBox";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import useDownloadImage from "@/hooks/userDownloadImage";
import { ReactFlowInstance } from "@xyflow/react";

type NodeType = {
  type: string;
  data: {
    label: string;
  };
};

interface SelectedValues {
  [key: string]: string;
}

interface HandleChangeEvent {
  target: {
    value: string;
  };
}

// Add CircuitData interface to properly type the circuit data
interface CircuitData {
  node?: NodeType[] | null;
  prompt?: string;
  explanation?: string;
  circuitName?: string;
}

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

const ComponentDropdowns = () => {
  const [selectedValues, setSelectedValues] = useState<SelectedValues>({});
  const [dropdownData, setDropdownData] = useState<Record<string, Set<string>>>(
    {}
  );
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
    setSelectedValues((prevSelectedValues: SelectedValues) => ({
      ...prevSelectedValues,
      [type]: event.target.value,
    }));
  };

  return (
    <div>
      {Object.keys(dropdownData).map((type) => (
        <FormControl fullWidth key={type} style={{ marginBottom: "1rem" }}>
          <InputLabel style={{ color: "white", backgroundColor: "#404040" }}>
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

const Dashboard = () => {
  const { flowRef } = useCircuitContext();
  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const [isDialogOpen, setisDialogOpen] = useState<boolean>(false);

  const prompt = useSelector((state: RootState) => state?.circuit?.prompt);
  const circuitdata = useSelector(
    (state: RootState) => state?.circuit as CircuitData
  );
  const [exportMethod, setExportMethod] = useState<string>("");

  const downloadImage = useDownloadImage(
    flowRef,
    setExportMethod,
    reactFlowInstance
  );

  const handleDialog = () => {
    setisDialogOpen(false);
  };

  return (
    <div className="w-full h-screen flex flex-grow flex-col overflow-hidden">
      <nav className="text-white bg-[#282626] ">
        <div className="flex justify-between items-center px-4 py-2 bg-[#282626] ">
          <div className="flex items-center">
            <a href="/home" className="text-white font-bold text-2xl">
              <span className="text-[#6E56CF]">Circuit</span>Builder
              <span className="text-[#6E56CF]">AI</span>
            </a>
          </div>
          <div className="mr-10">
            <TextGenerateEffect words={circuitdata?.circuitName || ""} />
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-2xl bg-white text-black py-2 px-4">
              Share
            </button>
          </div>
        </div>
      </nav>

      <div className="flex flex-grow h-full bg-black">
        <div
          id="left"
          className="w-[20%] h-[95%] px-4 text-white bg-[#262626] m-[10px] rounded-2xl"
        >
          <h1 className="font-bold text-2xl py-4   text-start">Components</h1>
          <ComponentDropdowns />
          <div className="flex justify-center mt-4 gap-4">
            <Button
              variant="contained"
              className="bg-blue-500 hover:bg-blue-600 text-lg"
              onClick={() => setisDialogOpen(true)}
            >
              Save
            </Button>
            <FormControl
              fullWidth
              style={{
                width: "150px",
                backgroundColor: "#404040",
                color: "white",
                border: "2px",
              }}
            >
              <InputLabel id="dropdown-label" style={{ color: "white" }}>
                Export As
              </InputLabel>
              <Select
                style={{ color: "white" }}
                labelId="dropdown-label"
                value={exportMethod}
                onChange={(event) => {
                  const format = event.target.value;
                  setExportMethod(format);
                  if (format) {
                    downloadImage(format);
                  }
                }}
              >
                <MenuItem value="png">PNG</MenuItem>
                <MenuItem value="jpeg">JPEG</MenuItem>
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="svg">SVG</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div
          id="mid"
          className="w-[60%] h-[95%] flex items-start justify-center rounded-4xl  m-[20px]"
        >
          <FlowChart />
        </div>

        <div className="w-1 bg-black "></div>

        <div
          id="right"
          className="w-[20%] h-[95%] p-4 text-white bg-[#262626] m-[10px] rounded-2xl"
        >
          {/* Card Component to Display Prompt */}
          <Card
            className="mt-4 p-2 bg-[#404040]"
            style={{ backgroundColor: "#404040", color: "white" }}
          >
            <CardContent>
              <Typography className="font-bold">Prompt:</Typography>
              <Typography variant="body1" className="text-white ">
                {prompt || "No prompt available"}
              </Typography>
            </CardContent>
          </Card>

          <Card
            className="mt-4 p-4 bg-[#404040]"
            style={{ backgroundColor: "#404040", color: "white" }}
          >
            <CardContent>
              <Typography style={{ fontSize: "20px" }}>
                Circuit Explanation:
              </Typography>
              <Typography
                variant="body1"
                style={{ fontSize: "15px" }}
                className="text-white text-sm "
              >
                {circuitdata?.explanation || "No explanation available"}
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>
      <ProjectDialog onClose={handleDialog} open={isDialogOpen} />
    </div>
  );
};

export default Dashboard;
