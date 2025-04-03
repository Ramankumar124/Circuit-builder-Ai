import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setCircuit } from "@/redux/features/circuitSlice";
import { useNavigate } from "react-router-dom";
import { nullable } from "zod";
import { UserMenu } from "@/components/custom/user-menu";
import { Zap } from "lucide-react";
function SavedProject() {
  const id = useSelector((state: RootState) => state?.auth?.user?._id);

  const { data, isSuccess, isError } = useGetAllProjectsQuery(id!);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  type CircuitType = {
    explanation: string;
    suggestions: string[];
    circuitName: string;
    node: any;
    edge: any;
    prompt: string;
  };

  const handleOpenTool = (project: any) => {
    console.log(project);
    const circuit = project?.circuit;
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
    navigate("/dashboard");
  };
  return (
    <div className="w-full h-screen bg-[#282626]">
      <nav id="header" className=" w-full z-50 bg-[#191919]">
        <div className="flex w-full px-4 py-2 items-center text-bold text-xl text-[#899598]  justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <Zap className="mr-2 h-5 w-5 text-yellow-300" />
            <span className="text-[#6E56CF]">Circuit</span>
            <span className="text-white">Builder</span>
            <span className="text-[#6E56CF]">AI</span>
          </h1>
          <h1 className="text-[#6E56CF] font-bold text-3xl" >My Projects</h1>
          <UserMenu />
        </div>
      </nav>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate__animated animate__fadeInUp p-4">
        {data?.data?.data.map((project: any) => (
          <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-700 shadow-lg hover:shadow-[#6E56CF]/10 transition-all duration-300 hover:-translate-y-1 group animate__fadeInUp">
            <div className="p-6">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#6E56CF] to-[#5546a9] flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {project.projectName}
              </h3>{" "}
              *
              <p className="text-neutral-400 mb-4">
                {project?.circuit.explaination}
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
            <div className="h-2 bg-gradient-to-r from-[#6E56CF] to-[#7d66dc]"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedProject;
