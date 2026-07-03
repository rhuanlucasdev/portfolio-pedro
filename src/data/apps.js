import { FaRegAddressCard, FaRegFilePdf, FaTerminal } from "react-icons/fa6";
import {
  HiDocumentText,
  HiFolderOpen,
  HiOutlineFolderOpen,
  HiOutlineMail,
  HiCog,
  HiTrash,
} from "react-icons/hi";
import { PiCodeBlockBold } from "react-icons/pi";

import ProjectsSection from "../sections/ProjectsSection.jsx";
import AboutSection from "../sections/AboutSection.jsx";
import ContactSection from "../sections/ContactSection.jsx";
import ResumeSection from "../sections/ResumeSection.jsx";
import SkillsSection from "../sections/SkillsSection.jsx";
import CmdSection from "../sections/CmdSection.jsx";
import ExplorerSection from "../sections/ExplorerSection.jsx";
import NotepadSection from "../sections/NotepadSection.jsx";
import RecycleBinSection from "../sections/RecycleBinSection.jsx";
import SettingsSection from "../sections/SettingsSection.jsx";

export const apps = [
  {
    id: "explorer",
    title: "explorer.exe",
    shortTitle: "Explorer",
    icon: HiFolderOpen,
    accent: "from-yellow-400 to-amber-500",
    component: ExplorerSection,
    defaultPosition: { x: 80, y: 60 },
    defaultSize: { width: 820, height: 520 },
  },
  {
    id: "readme",
    title: "README.txt",
    shortTitle: "README",
    icon: HiDocumentText,
    accent: "from-slate-100 to-slate-300",
    component: NotepadSection,
    defaultPosition: { x: 120, y: 90 },
    defaultSize: { width: 680, height: 500 },
  },
  {
    id: "recycle",
    title: "Lixeira",
    shortTitle: "Lixeira",
    icon: HiTrash,
    accent: "from-slate-200 to-slate-400",
    component: RecycleBinSection,
    defaultPosition: { x: 140, y: 80 },
    defaultSize: { width: 720, height: 460 },
  },
  {
    id: "settings",
    title: "Configurações",
    shortTitle: "Config.",
    icon: HiCog,
    accent: "from-slate-600 to-slate-800",
    component: SettingsSection,
    defaultPosition: { x: 160, y: 90 },
    defaultSize: { width: 760, height: 500 },
  },
  {
    id: "projects",
    title: "projetos.exe",
    shortTitle: "Projetos",
    icon: HiOutlineFolderOpen,
    accent: "from-blue-500 to-cyan-400",
    component: ProjectsSection,
    defaultPosition: { x: 90, y: 70 },
    defaultSize: { width: 760, height: 520 },
  },
  {
    id: "about",
    title: "sobre-mim.exe",
    shortTitle: "Sobre",
    icon: FaRegAddressCard,
    accent: "from-indigo-500 to-sky-400",
    component: AboutSection,
    defaultPosition: { x: 170, y: 110 },
    defaultSize: { width: 680, height: 460 },
  },
  {
    id: "contact",
    title: "contato.exe",
    shortTitle: "Contato",
    icon: HiOutlineMail,
    accent: "from-sky-500 to-blue-500",
    component: ContactSection,
    defaultPosition: { x: 260, y: 120 },
    defaultSize: { width: 640, height: 460 },
  },
  {
    id: "resume",
    title: "curriculo.pdf",
    shortTitle: "CV",
    icon: FaRegFilePdf,
    accent: "from-blue-600 to-slate-500",
    component: ResumeSection,
    defaultPosition: { x: 230, y: 80 },
    defaultSize: { width: 620, height: 540 },
  },
  {
    id: "skills",
    title: "habilidades.exe",
    shortTitle: "Skills",
    icon: PiCodeBlockBold,
    accent: "from-cyan-500 to-blue-600",
    component: SkillsSection,
    defaultPosition: { x: 320, y: 150 },
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: "cmd",
    title: "cmd.exe",
    shortTitle: "CMD",
    icon: FaTerminal,
    accent: "from-slate-900 to-slate-700",
    component: CmdSection,
    defaultPosition: { x: 130, y: 120 },
    defaultSize: { width: 720, height: 420 },
  },
];
