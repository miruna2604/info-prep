import type { Metadata } from "next";
import { CurriculumMap } from "../../../components/curriculum/CurriculumMap";

export const metadata: Metadata = {
  title: "Harta materiei · InfoPrep",
  description: "Materia de BAC la informatică, organizată într-o hartă cu 13 capitole.",
};

export default function CurriculumPage() {
  return <CurriculumMap />;
}
