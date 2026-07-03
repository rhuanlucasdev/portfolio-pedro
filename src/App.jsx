import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "./components/BootScreen.jsx";
import Desktop from "./components/Desktop.jsx";
import { WindowProvider } from "./context/WindowContext.jsx";

export default function App() {
  const [booted, setBooted] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);

  function handlePowerAction(action) {
    setBooted(false);
    setSessionKey((key) => key + 1);

    if (action === "restart") {
      window.setTimeout(() => setBooted(true), 900);
    }
  }

  return (
    <WindowProvider key={sessionKey}>
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootScreen key="boot" onEnter={() => setBooted(true)} />
        ) : (
          <Desktop key="desktop" onPowerAction={handlePowerAction} />
        )}
      </AnimatePresence>
    </WindowProvider>
  );
}
