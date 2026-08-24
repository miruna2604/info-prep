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
  return apiFetch<LessonApiResponse[]>(
    `/chapters/${encodeURIComponent(chapterSlug)}/lessons`,
  );
}
