const templateData = [
  {
    title: "Buzzer and Led Flasher with transistor",
    description:
      "This circuit uses a resistor (R1) and a capacitor (C1) to make a blinking signal. This signal turns the LED and buzzer on and off one after the other. A transistor works like a switch to control them. Resistors R2 and R3 protect the LED and buzzer from too much current. You can change how fast it blinks by changing R1 or C1",
    components: ["LED", "Battery", "Transistor(BC547)", "Resistor(1k)"],
    type: "Complex",
    circuitImage: "/buzzerLedFlasher.png",
    url:"https://cbai.ramankumar.me/shared/18464396-052d-420f-879b-5511f91e1611"
  },
  {
    title: "Touch-activated led circuit",
    description:
    "This circuit uses a touch sensor (like a switch) to control an LED using a transistor. When you touch the sensor, it sends a small current to the transistor's base, allowing a larger current to flow and turn on the LED. A 1MΩ resistor limits the base current, and a 220Ω resistor protects the LED. If the sensor isn't touched, the LED stays off..",
    components: ["LED", "Battery", "Transistor (2N3904),Resistor (1M)"],
    type: "Iot",
    circuitImage: "/touchActivated.png",
    url:"https://cbai.ramankumar.me/shared/683c2572-d105-4924-9535-e4b7d29f6395"
  },
  {
    title: "Simple Buzzer Circuit",
    description:
      "This circuit uses a 9V battery to power a buzzer through a 220Ω resistor. The resistor limits the current flowing to the buzzer, preventing damage. The buzzer will continuously beep as long as the circuit is closed",
    components: ["Resistor (220)", "Buzzer", "Battery 9v"],
    type: "Basic",
    circuitImage: "/simpleBuzzer.png",
    url:"https://cbai.ramankumar.me/shared/f7205735-56c5-4133-8dc1-60d443bbac48"
  },
];
export default templateData;
