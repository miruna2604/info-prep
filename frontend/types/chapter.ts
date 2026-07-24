export type LessonContent = {
  objectives: string[];
  introduction: string;
  intuition: string;
  steps: string[];
  syntax: string;
  exampleCode: string;
  exampleExplanation: string;
  exampleTrace?: {
    columns: string[];
    rows: string[][];
    conclusion: string;
  };
  commonMistake: string;
  keyIdeas: string[];
  videoUrl?: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
  content?: LessonContent;
};

export type Chapter = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};
