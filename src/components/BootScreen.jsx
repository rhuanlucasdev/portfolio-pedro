import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa6";
import {
  HiArrowRight,
  HiMiniSpeakerWave,
  HiMiniWifi,
  HiOutlineBattery100,
  HiPower,
} from "react-icons/hi2";
import { useClock } from "../hooks/useClock.js";

export default function BootScreen({ onEnter }) {
  const { time, date } = useClock();

  function playLoginSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const context = new AudioContext();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.035, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.35);
    gain.connect(context.destination);

    [523.25, 659.25].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        frequency,
        context.currentTime + index * 0.11
      );
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.11);
      oscillator.stop(context.currentTime + index * 0.11 + 0.18);
    });
  }

  function handleEnter() {
    playLoginSound();
    onEnter();
  }

  return (
    <motion.main
      className="fixed inset-0 overflow-hidden bg-slate-950 font-system text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#17344f_0%,#0a4f7e_38%,#0f8cc9_62%,#d6f4ff_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.28),transparent_20%),radial-gradient(circle_at_76%_36%,rgba(255,255,255,0.22),transparent_18%),linear-gradient(110deg,transparent_0_42%,rgba(255,255,255,0.2)_42%_44%,transparent_44%_100%)]" />
      <div className="absolute inset-0 backdrop-blur-[6px]" />
      <div className="absolute inset-0 bg-black/42" />

      <section className="relative z-10 flex min-h-screen flex-col px-8 py-7">
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            className="w-full max-w-[320px] text-center"
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="mx-auto grid h-32 w-32 place-items-center rounded-full bg-[#7a8794] text-white shadow-[0_16px_45px_rgba(0,0,0,0.28)] ring-1 ring-white/20">
              <FaUser size={58} />
            </div>

            <h1 className="mt-5 text-3xl font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]">
              Rhuan Lucas
            </h1>

            <button
              className="mt-5 flex h-9 w-full items-center border border-white/30 bg-white/90 text-left text-sm text-slate-700 shadow-[0_8px_24px_rgba(0,0,0,0.18)] outline-none transition hover:bg-white focus-visible:ring-2 focus-visible:ring-white"
              onClick={handleEnter}
            >
              <span className="flex-1 px-3 text-slate-500">Entrar</span>
              <span className="grid h-full w-10 place-items-center bg-[#0078d7] text-white hover:bg-[#006cc1]">
                <HiArrowRight size={18} />
              </span>
            </button>
          </motion.div>
        </div>

        <footer className="flex items-end justify-between text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
          <div>
            <p className="text-[clamp(3rem,8vw,6rem)] font-light leading-none">
              {time}
            </p>
            <p className="mt-2 text-lg font-light sm:text-xl">{date}</p>
          </div>

          <div className="flex items-center gap-5 pb-1 text-white/95">
            <HiMiniWifi size={22} />
            <HiMiniSpeakerWave size={23} />
            <HiOutlineBattery100 size={25} />
            <HiPower size={24} />
          </div>
        </footer>
      </section>
    </motion.main>
  );
}
