import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonContent } from "../../../../../../components/lesson/LessonContent";
import { DigitSumVisualizer } from "../../../../../../components/lesson/DigitSumVisualizer";
import { CountDigitsVisualizer } from "../../../../../../components/lesson/CountDigitsVisualizer";
import { DigitOccurrencesVisualizer } from "../../../../../../components/lesson/DigitOccurrencesVisualizer";
import { DigitConstructionVisualizer } from "../../../../../../components/lesson/DigitConstructionVisualizer";
import type { DigitAlgorithmSlug } from "../../../../../../lib/digitConstructionAlgorithms";
import { DivisorAlgorithmVisualizer } from "../../../../../../components/lesson/DivisorAlgorithmVisualizer";
import type { DivisorAlgorithmSlug } from "../../../../../../lib/divisorAlgorithms";
import { OddDigitsPlaceValueVisualizer } from "../../../../../../components/lesson/OddDigitsPlaceValueVisualizer";
import { ExtremeValuesVisualizer } from "../../../../../../components/lesson/ExtremeValuesVisualizer";
import type { ExtremeAlgorithmSlug } from "../../../../../../lib/extremeValueAlgorithms";
import { FrequencyVectorVisualizer } from "../../../../../../components/lesson/FrequencyVectorVisualizer";
import type { FrequencyAlgorithmSlug } from "../../../../../../lib/frequencyVectorAlgorithms";
import { ConsecutiveSequenceVisualizer } from "../../../../../../components/lesson/ConsecutiveSequenceVisualizer";
import type { SequenceAlgorithmSlug } from "../../../../../../lib/consecutiveSequenceAlgorithms";
import { SortingVisualizer } from "../../../../../../components/lesson/SortingVisualizer";
import { StructFieldsVisualizer } from "../../../../../../components/lesson/StructFieldsVisualizer";
import { StructArrayVisualizer } from "../../../../../../components/lesson/StructArrayVisualizer";
import { SearchMergeVisualizer } from "../../../../../../components/lesson/SearchMergeVisualizer";
import type { SearchMergeAlgorithmSlug } from "../../../../../../lib/searchMergeAlgorithms";
import { ApiError } from "../../../../../../services/api";
import { getChapter } from "../../../../../../services/chapterService";
import { getLesson } from "../../../../../../services/lessonService";

type LessonPageProps = {
  params: Promise<{ chapterSlug: string; lessonSlug: string }>;
};

async function loadLessonPageData(chapterSlug: string, lessonSlug: string) {
  try {
    return await Promise.all([
      getChapter(chapterSlug),
      getLesson(chapterSlug, lessonSlug),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { chapterSlug, lessonSlug } = await params;

  if (!chapterSlug || !lessonSlug) {
    notFound();
  }

  const [chapter, lesson] = await loadLessonPageData(
    chapterSlug,
    lessonSlug,
  );
  const hasDigitSumVisualizer =
    chapter.slug === "algoritmi-elementari" && lesson.slug === "suma-cifrelor";
  const hasCountDigitsVisualizer =
    chapter.slug === "algoritmi-elementari" && lesson.slug === "numarul-de-cifre";
  const hasDigitOccurrencesVisualizer =
    chapter.slug === "algoritmi-elementari" &&
    lesson.slug === "numarul-de-aparitii-ale-unei-cifre";
  const constructionAlgorithmSlugs: DigitAlgorithmSlug[] = [
    "rasturnatul-unui-numar",
    "numar-palindrom",
    "eliminarea-cifrelor-pare",
  ];
  const constructionAlgorithm = constructionAlgorithmSlugs.find(
    (slug) => chapter.slug === "algoritmi-elementari" && lesson.slug === slug,
  );
  const divisorAlgorithmSlugs: DivisorAlgorithmSlug[] = [
    "divizorii-unui-numar",
    "numarul-divizorilor",
    "suma-divizorilor",
    "verificarea-unui-numar-prim",
    "numere-prime-dintr-un-interval",
    "descompunerea-in-factori-primi",
    "cmmdc-algoritmul-lui-euclid",
    "cmmmc",
    "numere-prime-intre-ele",
  ];
  const divisorAlgorithm = divisorAlgorithmSlugs.find(
    (slug) => chapter.slug === "algoritmi-elementari" && lesson.slug === slug,
  );
  const extremeAlgorithmSlugs: ExtremeAlgorithmSlug[] = [
    "minimul-si-maximul-unui-vector",
    "cele-mai-mari-doua-valori-distincte",
    "cele-mai-mici-doua-valori-distincte",
    "cele-mai-mari-trei-valori-distincte",
    "cele-mai-mici-trei-valori-distincte",
  ];
  const extremeAlgorithm = extremeAlgorithmSlugs.find(
    (slug) => chapter.slug === "algoritmi-elementari" && lesson.slug === slug,
  );
  const frequencyAlgorithmSlugs: FrequencyAlgorithmSlug[] = [
    "vector-frecventa-numarul-aparitiilor",
    "vector-aparitii-exista-sau-nu",
  ];
  const frequencyAlgorithm = frequencyAlgorithmSlugs.find(
    (slug) => chapter.slug === "algoritmi-elementari" && lesson.slug === slug,
  );
  const sequenceAlgorithmSlugs: SequenceAlgorithmSlug[] = [
    "cea-mai-lunga-secventa-pozitiva",
    "cea-mai-lunga-secventa-de-numere-egale",
    "cea-mai-lunga-secventa-strict-crescatoare",
  ];
  const sequenceAlgorithm = sequenceAlgorithmSlugs.find(
    (slug) => chapter.slug === "algoritmi-elementari" && lesson.slug === slug,
  );
  const hasCombinedSortingLesson =
    chapter.slug === "vectori" && lesson.slug === "sortarea-vectorilor";
  const hasStructFieldsVisualizer =
    chapter.slug === "structuri-de-date-struct" && lesson.slug === "campuri";
  const hasStructArrayVisualizer =
    chapter.slug === "structuri-de-date-struct" && lesson.slug === "vectori-de-structuri";
  const structReadingHeading = "# Citirea câmpurilor";
  const [structFieldsIntro, structFieldsAfterAnimation] = hasStructFieldsVisualizer
    ? (lesson.content ?? "").split(structReadingHeading)
    : [lesson.content ?? "", ""];
  const structArrayReadingHeading = "# Citirea unui vector de structuri";
  const [structArrayIntro, structArrayAfterAnimation] = hasStructArrayVisualizer
    ? (lesson.content ?? "").split(structArrayReadingHeading)
    : [lesson.content ?? "", ""];
  const searchMergeAlgorithmSlugs: SearchMergeAlgorithmSlug[] = [
    "cautare-binara",
    "interclasarea-a-doi-vectori-sortati",
  ];
  const searchMergeAlgorithm = searchMergeAlgorithmSlugs.find(
    (slug) => chapter.slug === "algoritmi-elementari" && lesson.slug === slug,
  );
  const hasInteractiveVisualizer =
    hasDigitSumVisualizer ||
    hasCountDigitsVisualizer ||
    hasDigitOccurrencesVisualizer ||
    Boolean(constructionAlgorithm) ||
    Boolean(divisorAlgorithm) ||
    Boolean(extremeAlgorithm) ||
    Boolean(frequencyAlgorithm) ||
    Boolean(sequenceAlgorithm) ||
    hasCombinedSortingLesson ||
    hasStructFieldsVisualizer ||
    hasStructArrayVisualizer ||
    Boolean(searchMergeAlgorithm);
  const hasOddDigitsPlaceValueVisualizer =
    chapter.slug === "algoritmi-elementari" && lesson.slug === "eliminarea-cifrelor-pare";
  const secondSolutionHeading = "## Soluția 2: așezăm direct cifra pe poziția corectă";
  const [firstSolutionContent, secondSolutionBody] = hasOddDigitsPlaceValueVisualizer
    ? (lesson.content ?? "").split(secondSolutionHeading)
    : [lesson.content ?? "", ""];
  const hasCombinedDivisorsLesson =
    chapter.slug === "algoritmi-elementari" && lesson.slug === "divizorii-unui-numar";
  const properDivisorsHeading = "## 2. Divizorii proprii";
  const efficientDivisorsHeading = "## 3. Metoda eficientă: verificăm numai până la √n";
  const divisorsContentParts = hasCombinedDivisorsLesson
    ? (lesson.content ?? "").split(properDivisorsHeading)
    : [lesson.content ?? "", ""];
  const properAndEfficientParts = divisorsContentParts[1]?.split(efficientDivisorsHeading) ?? ["", ""];
  const hasCombinedCmmdcLesson =
    chapter.slug === "algoritmi-elementari" && lesson.slug === "cmmdc-algoritmul-lui-euclid";
  const subtractionGcdHeading = "## 2. Algoritmul lui Euclid cu scăderi";
  const [divisionGcdContent, subtractionGcdBody] = hasCombinedCmmdcLesson
    ? (lesson.content ?? "").split(subtractionGcdHeading)
    : [lesson.content ?? "", ""];
  const bubbleSortHeading = "# Bubble Sort";
  const selectionSortHeading = "# Selection Sort";
  const insertionSortHeading = "# Insertion Sort";
  const sortingComparisonHeading = "# Cum le diferențiezi?";
  const [sortingIntro, afterBubbleHeading] = hasCombinedSortingLesson
    ? (lesson.content ?? "").split(bubbleSortHeading)
    : [lesson.content ?? "", ""];
  const [bubbleSortBody, afterSelectionHeading] = afterBubbleHeading?.split(selectionSortHeading) ?? ["", ""];
  const [selectionSortBody, afterInsertionHeading] = afterSelectionHeading?.split(insertionSortHeading) ?? ["", ""];
  const [insertionSortBody, sortingComparisonBody] = afterInsertionHeading?.split(sortingComparisonHeading) ?? ["", ""];
  const initialLessonContent = hasOddDigitsPlaceValueVisualizer
    ? firstSolutionContent
    : hasCombinedDivisorsLesson
      ? divisorsContentParts[0]
      : hasCombinedCmmdcLesson
        ? divisionGcdContent
      : hasCombinedSortingLesson
        ? sortingIntro
      : hasStructFieldsVisualizer
        ? structFieldsIntro
      : hasStructArrayVisualizer
        ? structArrayIntro
      : lesson.content;

  if (lesson.chapter_id !== chapter.id) {
    notFound();
  }

  return (
    <section className={`mx-auto ${hasInteractiveVisualizer ? "max-w-6xl" : "max-w-3xl"}`}>
      <nav aria-label="Navigare ierarhică" className="flex flex-wrap gap-2 text-sm text-slate-400">
        <Link href="/chapters" className="hover:text-slate-200">Capitole</Link>
        <span>/</span>
        <Link href={`/chapters/${chapter.id}`} className="hover:text-slate-200">{chapter.title}</Link>
      </nav>

      <header className="mt-6 border-b border-slate-800 pb-8">
        <p className="text-sm font-medium text-emerald-400">Lecție</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-emerald-300 md:text-5xl">{lesson.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          {lesson.description}
        </p>
      </header>

      {lesson.content ? (
        <div className="mt-8">
          <LessonContent
            content={initialLessonContent ?? ""}
          />
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm text-slate-400">
          Materialul complet al lecției este în curs de pregătire.
        </p>
      )}

      {hasDigitSumVisualizer && (
        <div className="mt-10">
          <DigitSumVisualizer />
        </div>
      )}

      {hasCountDigitsVisualizer && (
        <div className="mt-10">
          <CountDigitsVisualizer />
        </div>
      )}

      {hasDigitOccurrencesVisualizer && (
        <div className="mt-10">
          <DigitOccurrencesVisualizer />
        </div>
      )}

      {constructionAlgorithm && (
        <div className="mt-10">
          <DigitConstructionVisualizer algorithm={constructionAlgorithm} />
        </div>
      )}

      {hasOddDigitsPlaceValueVisualizer && (
        <>
          <div className="mt-12">
            <LessonContent content={`${secondSolutionHeading}${secondSolutionBody}`} />
          </div>
          <div className="mt-8">
            <OddDigitsPlaceValueVisualizer />
          </div>
        </>
      )}

      {divisorAlgorithm && (
        <div className="mt-10">
          <DivisorAlgorithmVisualizer algorithm={divisorAlgorithm} />
        </div>
      )}

      {extremeAlgorithm && (
        <div className="mt-10">
          <ExtremeValuesVisualizer algorithm={extremeAlgorithm} />
        </div>
      )}

      {frequencyAlgorithm && (
        <div className="mt-10">
          <FrequencyVectorVisualizer algorithm={frequencyAlgorithm} />
        </div>
      )}

      {sequenceAlgorithm && (
        <div className="mt-10">
          <ConsecutiveSequenceVisualizer algorithm={sequenceAlgorithm} />
        </div>
      )}

      {searchMergeAlgorithm && (
        <div className="mt-10">
          <SearchMergeVisualizer algorithm={searchMergeAlgorithm} />
        </div>
      )}

      {hasCombinedDivisorsLesson && (
        <>
          <div className="mt-12">
            <LessonContent content={`${properDivisorsHeading}${properAndEfficientParts[0]}`} />
          </div>
          <div className="mt-8">
            <DivisorAlgorithmVisualizer algorithm="divizorii-proprii" />
          </div>
          <div className="mt-12">
            <LessonContent content={`${efficientDivisorsHeading}${properAndEfficientParts[1]}`} />
          </div>
          <div className="mt-8">
            <DivisorAlgorithmVisualizer algorithm="divizori-eficient-radical" />
          </div>
        </>
      )}

      {hasCombinedCmmdcLesson && (
        <>
          <div className="mt-12">
            <LessonContent content={`${subtractionGcdHeading}${subtractionGcdBody}`} />
          </div>
          <div className="mt-8">
            <DivisorAlgorithmVisualizer algorithm="cmmdc-prin-scaderi" />
          </div>
        </>
      )}

      {hasCombinedSortingLesson && (
        <>
          <div className="mt-12"><LessonContent content={`${bubbleSortHeading}${bubbleSortBody}`} /></div>
          <div className="mt-8"><SortingVisualizer algorithm="bubble-sort" /></div>

          <div className="mt-14"><LessonContent content={`${selectionSortHeading}${selectionSortBody}`} /></div>
          <div className="mt-8"><SortingVisualizer algorithm="selection-sort" /></div>

          <div className="mt-14"><LessonContent content={`${insertionSortHeading}${insertionSortBody}`} /></div>
          <div className="mt-8"><SortingVisualizer algorithm="insertion-sort" /></div>

          {sortingComparisonBody && (
            <div className="mt-14"><LessonContent content={`${sortingComparisonHeading}${sortingComparisonBody}`} /></div>
          )}
        </>
      )}

      {hasStructFieldsVisualizer && (
        <>
          <div className="mt-10"><StructFieldsVisualizer /></div>
          <div className="mt-12"><LessonContent content={`${structReadingHeading}${structFieldsAfterAnimation}`} /></div>
        </>
      )}

      {hasStructArrayVisualizer && (
        <>
          <div className="mt-10"><StructArrayVisualizer /></div>
          <div className="mt-12"><LessonContent content={`${structArrayReadingHeading}${structArrayAfterAnimation}`} /></div>
        </>
      )}

      <footer className="mt-12 border-t border-slate-800 pt-6">
        <Link href={`/chapters/${chapter.id}`} className="text-sm font-medium text-emerald-300 hover:text-emerald-200">
          ← Înapoi la capitol
        </Link>
      </footer>
    </section>
  );
}
