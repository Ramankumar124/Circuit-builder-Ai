import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import {
  useDeleteProjectMutation,
  useGetAllProjectsQuery,
} from "@/redux/api/projectApi";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setCircuit, setProjectId } from "@/redux/features/circuitSlice";
import { useNavigate } from "react-router-dom";
import { UserMenu } from "@/components/custom/user-menu";
import { Zap } from "lucide-react";
import Loader from "@/components/custom/Loader";

import { MdDelete } from "react-icons/md";
function SavedProject() {
  const id = useSelector((state: RootState) => state?.auth?.user?.id);

  const { data, isLoading } = useGetAllProjectsQuery(id!);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteProject = async (id: string) => {
    console.log(id);

    await deleteProject(id);
    window.location.reload();
  };
  const handleOpenTool = (project: any) => {
    console.log(project);
    const circuit = project?.circuit;
    if (project) console.log(project.id);

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
    dispatch(setProjectId({ projectId: project.id }));
    navigate("/dashboard");
  };
  return (
    <div className="w-full h-screen bg-[#282626] overflow-y-scroll">
      <nav id="header" className=" w-full z-50 bg-[#191919]">
        <div className="flex w-full px-4 py-2 items-center text-bold text-xl text-[#899598]  justify-between">
          <h1 className=" md:text-2xl font-bold flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-300" />
            <span className="hidden md:block text-[#6E56CF]">Circuit</span>
            <span className="hidden md:block text-white">Builder</span>
            <span className="hidden md:block text-[#6E56CF]">AI</span>
          </h1>
          <h1 className="text-[#6E56CF] font-bold md:text-3xl">My Projects</h1>
          <UserMenu />
        </div>
      </nav>

      {isLoading ? (
        <div className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      ) : (
        <>
          {data?.data?.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[70vh] animate__animated animate__fadeIn">
              <div className="text-center p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 max-w-md mx-auto">
                <Zap className="mx-auto h-12 w-12 text-[#6E56CF] mb-4 opacity-70" />
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  No Projects Found
                </h2>
                <p className="text-neutral-400 mb-6 text-sm sm:text-base">
                  You haven't created any circuit projects yet. Go to the home
                  page and create your first circuit!
                </p>
                <button
                  onClick={() => navigate("/home")}
                  className="px-6 py-2 bg-[#6E56CF] text-white rounded-lg hover:bg-[#5843b8] transition-colors"
                >
                  Create New Circuit
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate__animated animate__fadeInUp p-4">
              {data?.data?.data.map((project: any, index: number) => (
                <div
                  key={index}
                  className="bg-neutral-900 rounded-xl h-full  overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp"
                >
                  <div className="md:p-6 p-2 h-full">
                    <div className="flex items-center justify-between ">
                      <h3 className="md:text-xl text-sm font-bold text-white mb-2">
                        {project.projectName}
                      </h3>
                      <button className=" hover:text-red-500">
                        <MdDelete
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-gray-400 text-2xl"
                        />
                      </button>
                    </div>
                    <p className="text-neutral-400 text-xs md:text-lg  mb-4">
                      {project?.circuit?.explaination}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        {project?.circuit?.node &&
                          Array.isArray(project?.circuit?.node) &&
                          [
                            ...new Set(
                              project.circuit.node.map(
                                (node: any) => node.data?.label
                              )
                            ),
                          ]
                            .filter(Boolean)
                            .slice(0, 3)
                            .map((label, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-neutral-800 rounded text-xs text-neutral-400"
                              >
                                {label as string}
                              </span>
                            ))}
                      </div>
                      <button
                        onClick={() => handleOpenTool(project)}
                        className="text-[#6E56CF] group-hover:text-white transition-colors flex items-center text-sm font-medium"
                      >
                        Open Tool
                        <FaArrowRightLong />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SavedProject;
