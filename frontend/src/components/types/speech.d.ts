declare global {
  interface Window {
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
  }
}

export {};
