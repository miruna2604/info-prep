import { apiFetch } from "./api";

export type ChapterApiResponse = {
  id: number;
  title: string;
  slug: string;
  description: string;
  display_order: number;
  is_published: boolean;
};

export type LessonApiResponse = {
  id: number;
  chapter_id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  video_url: string | null;
  pdf_url: string | null;
  display_order: number;
  is_published: boolean;
};

export async function getChapters(): Promise<ChapterApiResponse[]> {
    return apiFetch<ChapterApiResponse[]>("/chapters/");
}

export async function getChapter(
  chapterSlug: string,
): Promise<ChapterApiResponse> {
  return apiFetch<ChapterApiResponse>(
    `/chapters/${encodeURIComponent(chapterSlug)}`,
  );
}

export async function getChapterLessons(
  chapterSlug: string,
): Promise<LessonApiResponse[]> {
  const lessons = await apiFetch<LessonApiResponse[]>(
    `/chapters/${encodeURIComponent(chapterSlug)}/lessons`,
  );

  if (chapterSlug !== "bazele-programarii-in-cpp") return lessons;

  const introductoryOrder = [
    "structura-unui-program-cpp",
    "variabile-si-constante",
    "tipuri-de-date",
    "citire-si-afisare",
  ];
  const rank = (slug: string) => {
    const index = introductoryOrder.indexOf(slug);
    return index === -1 ? introductoryOrder.length : index;
  };

  // Keep the remaining lessons in their existing API order.
  return [...lessons].sort((a, b) => rank(a.slug) - rank(b.slug));
}
