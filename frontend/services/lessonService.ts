import { apiFetch } from "./api";

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

export async function getLesson(
  chapterSlug: string,
  lessonSlug: string,
): Promise<LessonApiResponse> {
  return apiFetch<LessonApiResponse>(
    `/chapters/${encodeURIComponent(chapterSlug)}/lessons/${encodeURIComponent(lessonSlug)}`,
  );
}
