import { useState } from "react";
import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotSuccess: (screenshot: string | null) => void;
}

export function ScreenshotButton({
  screenshot,
  onScreenshotSuccess,
}: ScreenshotButtonProps) {
  const [isProcessingScreenshot, setIsProcessingScreenshot] = useState(false);

  const onTakeScreenshot = async () => {
    setIsProcessingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");
    onScreenshotSuccess(base64image);
    setIsProcessingScreenshot(false);
  };

  if (screenshot) {
    return (
      <button
        type="button"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <Trash weight="fill" onClick={() => onScreenshotSuccess(null)} />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onTakeScreenshot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      {isProcessingScreenshot && <Loading />}
      {!isProcessingScreenshot && <Camera className="w-6 h-6" />}
    </button>
  );
}
