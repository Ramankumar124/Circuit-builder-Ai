
import ResistorNode from "../components/Electric/ResisterNode";
import LEDNode from "../components/Electric/LEDNode";
import Capacitor from "../components/Electric/capacitor";
import Buzzer from "../components/Electric/Buzzer";
import Transistor from '../components/Electric/BJTTransistor';
import Batery from "../components/Electric/Battery";
import Diode from "../components/Electric/Diode";
import Inductor from "../components/Electric/Indutor";
import Switch from "../components/Electric/Switch";

export const nodeTypes = {
    Battery: Batery,
    Resistor: ResistorNode,
    Led: LEDNode,
    Capacitor: Capacitor,
    Buzzer: Buzzer,
    Transistor: Transistor,
    Diode: Diode,
    Inductor:Inductor,
    Switch:Switch
  };