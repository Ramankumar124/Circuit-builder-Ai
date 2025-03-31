import { useState, useEffect } from "react";
import { FaWandMagicSparkles } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import { FaMicrophone } from "react-icons/fa";
import { setCircuit } from "../../redux/features/circuitSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { speachSearch } from "@/utils/speachSearch";
import {
  useCreateCircuitMutation,
  useEhancePromptMutation,
} from "@/redux/api/circuitApi";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { loadingStates } from "@/constants/config";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}




export default function PromptPage() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any | null>(null);
  const [prompt, setPrompt] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createCircuit, { isLoading, isError }] = useCreateCircuitMutation();
  const [enhancePrompt] = useEhancePromptMutation();

  useEffect(() => {
    speachSearch(setIsListening, setPrompt, setRecognition);
  }, []);

  const toggleListening = () => {
    if (!recognition) return;
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const addToPrompt = (event: any) => {
    setPrompt(event.currentTarget.textContent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleApi = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty!");
      return;
    }
    try {
      const response = await createCircuit(prompt).unwrap();
      let rawData = response?.data;
      if (typeof rawData !== "string") {
        console.error("API returned unexpected format:", rawData);
        toast.error("Invalid API response format");
        return;
      }
      // **Fix Regex to Remove Markdown Artifacts**
      const cleanedResponse = rawData.replace(/```json|```/g, "").trim();
      // **Parse the cleaned JSON string**
      const parsedData = JSON.parse(cleanedResponse);
      if (parsedData) {
        dispatch(
          setCircuit({
            prompt: prompt,
            node: parsedData?.nodes || null,
            edge: parsedData?.edges || null,
            explanation: parsedData.explanation || null,
            suggestions: parsedData.suggestions || null,
            circuitName: parsedData.circuit_name || "", // Extract circuit name
          })
        );
        navigate("/dashboard");
      } else {
        toast.error("Failed to parse circuit data");
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || error?.message || "Unable to genrate circuit t"
      );
    }
  };

  const handleEnhancePrompt = async () => {
    setPrompt("Your Prompt Is Enhancing.... ");
    try {
      const response = await enhancePrompt(prompt).unwrap();
      if (response) {
        setPrompt(response.data);
      }
    } catch (error: any) {
      setPrompt("");
      toast.error(
        error?.data?.message || error?.message || "Unable to ehance prompt"
      );
    }
  };

  return (
    <div>
      <Toaster />
      {isLoading && (
        <div className="relative w-full h-[60vh] flex items-center justify-center ">
          <Loader
            loadingStates={loadingStates}
            loading={true}
            duration={2000}
          />
        </div>
      )}
      <nav id="header" className="fixed w-full z-50 bg-[#191919]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center ">
          <div className="flex items-center text-bold text-xl text-[#899598] -ml-10">
            <a href="/myprojects" className="text-bold text-white">
              <span className="text-blue-700">My</span> Projects{" "}
            </a>
            {/* <RxHamburgerMenu /> */}
          </div>
        </div>
      </nav>

      <div className="min-h-screen bg-[#191919] text-white flex flex-col items-center justify-center p-4  overflow-hidden">
        {/* Buttons */}
        <div className="flex items-center">
          <a className="text-white font-bold text-6xl">
            <span className="text-[#6E56CF]">Circuit</span>Builder
            <span className="text-[#6E56CF]">AI</span>
          </a>
        </div>
        <div className="gap-2 p-5 justify-center items-center mt-30">
          <div className="grid grid-cols-2 md:grid-cols-3 w-300 gap-5">
            {[
              "Create a circuit with 10 LEDs and a battery",
              "create a circuit in which a buzzer is connected with battery",
              "Create a Circuit in which Led is blinking in Every Second",
              "a circuit which Uses A diode to show flow of electricity",
              "create a LEd matrix using 9 leds ",
              "Buzzer beeping after every 1 second",
            ].map((text, index) => (
              <div
                key={index}
                onClick={addToPrompt}
                className="bg-[#262626] text-white p-2 rounded-lg cursor-pointer hover:bg-[#252526]"
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="p-6 pb-3 mt-16 w-300 mx-auto bg-[#242424] rounded-xl">
          <div className="flex items-center">
            <textarea
              value={prompt}
              onChange={handleChange}
              placeholder="Enter your circuit prompt..."
              className="w-full p-2 bg-[#242424] text-white border-none focus:outline-none rounded-md resize-none overflow-hidden scrollbar-hide"
            ></textarea>

            {/* Microphone Button */}
            <button
              onClick={toggleListening}
              className={`ml-3 p-3 text-white rounded-full ${
                isListening ? "bg-red-500" : "bg-blue-500"
              }`}
              title={isListening ? "Stop Listening" : "Start Listening"}
            >
              <FaMicrophone className="text-xl" />
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <button
              className="h-10 w-auto px-2 text-3xl text-white rounded-md cursor-pointer relative group"
              onClick={handleEnhancePrompt}
            >
              <FaWandMagicSparkles />
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Enhance Prompt
              </span>
            </button>
            <button
              className="h-10 w-24 bg-white text-black rounded-md cursor-pointer"
              onClick={() => handleApi()}
              disabled={isLoading}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
