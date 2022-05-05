import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackSent: () => void;
  onRestartFeedback: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackSent,
  onRestartFeedback,
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>("");

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const handleChangeComment = (e: any) => setComment(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("** data: ", { screenshot, comment });
    onFeedbackSent();
  };

  return (
    <>
      <header>
        <button
          type="button"
          onClick={onRestartFeedback}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="h-4 w-4" />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            className="w-6 h-6"
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmit}>
        <textarea
          onChange={handleChangeComment}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md border focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none p-2 scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotSuccess={setScreenshot}
          />
          <button
            disabled={comment.length === 0}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}
