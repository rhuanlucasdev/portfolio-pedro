import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "./components/BootScreen.jsx";
import Desktop from "./components/Desktop.jsx";
import { WindowProvider } from "./context/WindowContext.jsx";

export default function App() {
  const [booted, setBooted] = useState(false);

  return (
    <WindowProvider>
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootScreen key="boot" onEnter={() => setBooted(true)} />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </WindowProvider>
  );
}
