import {
  FileText,
  Sparkles,
  Wrench,
  AppWindow,
  Activity,
  ListChecks,
  BookOpen,
  GraduationCap,
  Briefcase,
  Pencil,
  Code,
  Camera,
} from "lucide-react";

/* names usable in a post's `icon:` frontmatter field */
const ICONS = {
  filetext: FileText,
  sparkles: Sparkles,
  wrench: Wrench,
  appwindow: AppWindow,
  activity: Activity,
  listchecks: ListChecks,
  bookopen: BookOpen,
  graduationcap: GraduationCap,
  briefcase: Briefcase,
  pencil: Pencil,
  code: Code,
  camera: Camera,
};

export function iconFor(name) {
  return ICONS[String(name || "").toLowerCase()] || FileText;
}
