import { ChapterCard } from "../../../components/chapter/ChapterCard";
import { chapters } from "../../../data/chapters";

export default function ChaptersPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-sm font-medium text-emerald-400">Parcurs de învățare</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Capitole</h1>
      <p className="mt-3 max-w-2xl text-slate-400">Construiește o bază solidă în C++, un subiect pe rând.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {chapters.map((chapter) => <ChapterCard key={chapter.id} chapter={chapter} />)}
      </div>
    </section>
  );
}
