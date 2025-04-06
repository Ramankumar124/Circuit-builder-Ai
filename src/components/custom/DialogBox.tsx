import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { useSavedProjectMutation } from "@/redux/api/projectApi";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CircuitState } from "@/interfaces/circuit";
import { useDispatch } from "react-redux";
import { setCircuit, setProjectId } from "@/redux/features/circuitSlice";
interface ProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

const ProjectDialog: React.FC<ProjectDialogProps> = ({ open, onClose }) => {
  const [projectName, setProjectName] = useState("");
  const prompt = useSelector((state: RootState) => state?.circuit?.prompt);
 const dispatch=useDispatch();
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
   const response =  await saveProject(payload);
console.log(response.data.data);
 dispatch(setProjectId({
  projectId:response?.data?.data.id as string
 }))

      toast.success("Project saved succesfully ");
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      toast.error(error.data.message || "Unable to save project");
      console.log("error", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <Toaster/>
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Enter Project Name</DialogTitle>
        <DialogDescription>
        Please enter a name to save your circuit project.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Project Name
        </Label>
        <Input
          type="text"
          id="name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="col-span-3"
        />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleSave} disabled={isSuccess}>
        Save Project
        </Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
