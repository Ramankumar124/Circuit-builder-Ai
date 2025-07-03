const templateData = [
  {
    title: "Buzzer and Led Flasher with transistor",
    description:
      "This circuit uses a resistor (R1) and a capacitor (C1) to make a blinking signal. This signal turns the LED and buzzer on and off one after the other. A transistor works like a switch to control them. Resistors R2 and R3 protect the LED and buzzer from too much current. You can change how fast it blinks by changing R1 or C1",
    components: ["LED", "Battery", "Transistor(BC547)", "Resistor(1k)"],
    type: "Complex",
    circuitImage: "/buzzerAndLedFlasher.png",
    url: "https://cbai.ramankumar.me/shared/234f07df-512f-43d6-896b-b2a95a44e4e1",
  },
  {
    title: "Simple Led Blinking Circuit",
    description:
      "This circuit uses a 1Hz square wave to drive the base of a 2N2222 transistor, turning the LED on and off every second. The resistor limits the current through the LED, and the capacitor smooths out the signal to the transistor. The 2N2222 is used as a switch to control the LED operation.",
    components: [
      "Resistor",
      "LED",
      "Battery",
      "Transistor (2N2222)",
      "Capacitor",
    ],
    type: "Basic",
    circuitImage: "/Led blinkiing circuit.png",
    url: "https://cbai.ramankumar.me/shared/234f07df-512f-43d6-896b-b2a95a44e4e1",
  },
  {
    title: "10 LEDs in Series Circuit",
    description:
      "This circuit connects 10 LEDs in series with a 220Ω resistor and a 9V battery. The resistor limits the current to prevent damage to the LEDs. The LEDs will light up if the voltage drop across each is below its maximum forward voltage. You can adjust the resistor value to change brightness.",
    components: ["LED (10x)", "Battery (9V)", "Resistor (220Ω)"],
    type: "Basic",
    circuitImage: "/led chain.png",
    url: "https://cbai.ramankumar.me/shared/234f07df-512f-43d6-896b-b2a95a44e4e1",
  },
];
export default templateData;
