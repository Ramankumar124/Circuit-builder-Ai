import Loader from "@/components/custom/Loader";
import { useGetShareDataQuery } from "@/redux/api/shareApi";
import { setCircuit } from "@/redux/features/circuitSlice";
import { AppDispatch } from "@/redux/Store";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const SharedProjectLoader = () => {
  const { shareId } = useParams();
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetShareDataQuery(shareId as string);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(response);

    if (
      response &&
      response.data &&
      response.data.project &&
      response.data.project.circuit
    ) {
      const project = response.data.project;
      const circuit = project.circuit;
      console.log("from share", circuit);

      dispatch(
        setCircuit({
          explanation: circuit.explaination || "",
          suggestions: circuit.suggestions || [],
          circuitName: circuit.circuitName || "",
          node: circuit.node || null,
          edge: circuit.edge || null,
          prompt: project.prompt || "",
        })
      );

      navigate(`/dashboard?shared=${shareId}`);
    } else if (!isLoading && response) {
      toast.error("Shared project data is incomplete", { duration: 3000 });
      navigate("/dashboard");
    }
  }, [response, isLoading, isError, shareId, dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster />
      {isLoading && <Loader />}
    </div>
  );
};

export default SharedProjectLoader;
