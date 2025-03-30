interface SetIsListening {
    (isListening: boolean): void;
}

interface SetPrompt {
    (prompt: string): void;
}

interface SetRecognition {
    (recognition: any | null): void;
}

export function speachSearch(
    setIsListening: SetIsListening,
    setPrompt: SetPrompt,
    setRecognition: SetRecognition
): void {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const rec: any = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "en-US";
        rec.onresult = (event: any) => {
            let transcript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
        
            setPrompt(transcript);
        };

        rec.onend = () => {
            setIsListening(false);
        };

        setRecognition(rec);
    } else {
        console.error("Speech Recognition API is not supported in this browser.");
    }
}