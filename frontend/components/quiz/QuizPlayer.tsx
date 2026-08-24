"use client";

import { useState } from "react";

import { InlineMarkdown } from "../common/InlineMarkdown";
import {
  submitQuiz,
  type Quiz,
  type QuizResult,
} from "../../services/quizService";

type QuizPlayerProps = {
  quiz: Quiz;
};

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const answeredQuestions = Object.keys(answers).length;
  const isComplete = answeredQuestions === quiz.questions.length;

  async function handleSubmit() {
    if (!isComplete) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const quizResult = await submitQuiz(
        quiz.chapter_slug,
        quiz.lesson_slug,
        Object.entries(answers).map(([questionId, optionId]) => ({
          question_id: Number(questionId),
          option_id: optionId,
        })),
      );
      setResult(quizResult);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Quizul nu a putut fi trimis.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleRetry() {
    setAnswers({});
    setResult(null);
    setError(null);
  }

  return (
    <div className="space-y-6">
      {quiz.questions.map((question, questionIndex) => {
        const questionResult = result?.questions.find(
          (item) => item.question_id === question.id,
        );

        return (
          <fieldset
            key={question.id}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <legend className="px-2 font-semibold text-white">
              {questionIndex + 1}. <InlineMarkdown>{question.text}</InlineMarkdown>
            </legend>

            <div className="mt-4 space-y-3">
              {question.options.map((option) => {
                const isSelected = answers[question.id] === option.id;
                const isCorrectOption =
                  questionResult?.correct_option_id === option.id;
                const isWrongSelection =
                  Boolean(questionResult) && isSelected && !isCorrectOption;

                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${
                      isCorrectOption
                        ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                        : isWrongSelection
                          ? "border-red-400/60 bg-red-400/10 text-red-200"
                          : isSelected
                            ? "border-sky-400/60 bg-sky-400/10 text-sky-100"
                            : "border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={isSelected}
                      disabled={Boolean(result)}
                      onChange={() => {
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: option.id,
                        }));
                      }}
                      className="accent-emerald-400"
                    />
                    <span>
                      <InlineMarkdown>{option.text}</InlineMarkdown>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {error && (
        <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
          {error}
        </p>
      )}

      {result ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-5">
          <p className="font-semibold text-emerald-200">
            Scor: {result.correct_answers} din {result.total_questions}
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-white"
          >
            Încearcă din nou
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-slate-400">
            {answeredQuestions} din {quiz.questions.length} întrebări completate
          </p>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isComplete || isSubmitting}
            className={`rounded-lg px-5 py-2.5 text-sm font-medium ${
              isComplete && !isSubmitting
                ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                : "cursor-not-allowed bg-slate-800 text-slate-500"
            }`}
          >
            {isSubmitting ? "Se verifică..." : "Verifică răspunsurile"}
          </button>
        </div>
      )}
    </div>
  );
}
