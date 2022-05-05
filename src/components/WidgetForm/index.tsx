import { useState } from "react";

import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";

import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de inseto",
    },
  },
  IDEA: {
    title: "Idéia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de lampada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de nuvem de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

  const onRestartFeedback = () => {
    setFeedbackType(null);
    setFeedbackSent(false);
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onRestartFeedback={onRestartFeedback} />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep setFeedbackType={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              onFeedbackSent={() => setFeedbackSent(true)}
              onRestartFeedback={onRestartFeedback}
              feedbackType={feedbackType}
            />
          )}
        </>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ♥️ por{" "}
        <a
          href="https://github.com/lucaspesso4"
          target="_blank"
          className="underline underline-offset-2"
        >
          lucaspessoa
        </a>
      </footer>
    </div>
  );
}
