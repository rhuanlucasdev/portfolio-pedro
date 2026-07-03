import { createContext, useContext, useMemo, useState } from "react";
import { apps } from "../data/apps.js";

const WindowContext = createContext(null);

const initialState = apps.reduce((acc, app) => {
  acc[app.id] = {
    ...app,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: app.defaultPosition,
    size: app.defaultSize,
  };
  return acc;
}, {});

function getCenteredPosition(windowData) {
  if (typeof window === "undefined") return windowData.defaultPosition;

  const taskbarHeight = 40;
  const margin = 12;
  const availableWidth = window.innerWidth;
  const availableHeight = window.innerHeight - taskbarHeight;
  const width = Math.min(windowData.size.width, availableWidth - margin * 2);
  const height = Math.min(windowData.size.height, availableHeight - margin * 2);

  return {
    x: Math.max(margin, Math.round((availableWidth - width) / 2)),
    y: Math.max(margin, Math.round((availableHeight - height) / 2)),
  };
}

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState(initialState);
  const [highestZ, setHighestZ] = useState(10);
  const [muted, setMuted] = useState(true);

  function playSystemClick() {
    if (muted || typeof window === "undefined") return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(660, context.currentTime);
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.08);
  }

  function withNextZ(update) {
    setHighestZ((currentZ) => {
      const nextZ = currentZ + 1;
      setWindows((current) => update(current, nextZ));
      return nextZ;
    });
  }

  function focusWindow(id) {
    withNextZ((current, nextZ) => ({
      ...current,
      [id]: {
        ...current[id],
        zIndex: nextZ,
        isMinimized: false,
      },
    }));
  }

  function openWindow(id) {
    playSystemClick();
    withNextZ((current, nextZ) => {
      const target = current[id];
      const shouldCenter = !target.isOpen;

      return {
        ...current,
        [id]: {
          ...target,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZ,
          position: shouldCenter ? getCenteredPosition(target) : target.position,
        },
      };
    });
  }

  function closeWindow(id) {
    playSystemClick();
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }));
  }

  function minimizeWindow(id) {
    playSystemClick();
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isMinimized: true,
      },
    }));
  }

  function toggleMaximize(id) {
    playSystemClick();
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isMaximized: !current[id].isMaximized,
        isMinimized: false,
      },
    }));
    focusWindow(id);
  }

  function updatePosition(id, position) {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        position,
      },
    }));
  }

  const value = useMemo(
    () => ({
      windows,
      apps,
      muted,
      setMuted,
      openWindow,
      closeWindow,
      minimizeWindow,
      toggleMaximize,
      focusWindow,
      updatePosition,
    }),
    [windows, muted]
  );

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);

  if (!context) {
    throw new Error("useWindows deve ser usado dentro de WindowProvider");
  }

  return context;
}
