import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { useSavedProjectMutation } from "@/redux/api/projectApi";
import { Edge } from "@xyflow/react";
import { redirect } from "react-router-dom";
interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
}
interface CircuitState {
  prompt: string | null;
  node: Node | null;
  edge: Edge | null;
  circuitName: string | null;
  explanation: string | null;
  suggestions: string[] | null;
}
const ProjectDialog: React.FC<ProjectDialogProps> = ({ open, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const prompt = useSelector((state: RootState) => state?.circuit?.prompt);
  const userId = useSelector((state: RootState) => state?.auth?.user?._id);
  const circuitData = useSelector(
    (state: RootState) => state?.circuit as CircuitState
  );
  const [saveProject, { isSuccess }] = useSavedProjectMutation();

  const handleSave = async () => {
    try {
      const payload = {
        circuit: circuitData,
        projectName,
        prompt,
      };
      await saveProject(payload);
      toast.success("Project saved succesfully ope");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      toast.error(error.data.message || "Unable to save project");
      console.log("error", error);
    }
  };

  return (
    <Dialog open={open} onClose={() => {}}>
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        <Toaster />
        <DialogTitle className="text-lg font-semibold text-black">
          Enter Project Name
        </DialogTitle>
        <IconButton onClick={onClose} className="text-white">
          <X size={20} />
        </IconButton>
      </div>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="mt-4 mb-3 text-white "
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
          onClick={handleSave}
          disabled={isSuccess}
        >
          Save Project
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
