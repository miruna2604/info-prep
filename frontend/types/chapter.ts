export type Lesson = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  content?: string;
};

export type Chapter = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};
