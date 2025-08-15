import { useState, useEffect } from "react";
import { combinations } from "./CalendarCombinations";

export default function Subscribe() {
  const [emoji, setEmoji] = useState(false);
  const [practice, setPractice] = useState(false);
  const [quali, setQuali] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const getPreviewTitle = () => {
    if (practice) {
      return `${emoji ? "🏎️ " : ""}F1 Dutch GP: Practice 1`;
    }
    if (quali) {
      return `${emoji ? "⏱️ " : ""}F1 Dutch GP: Qualifying`;
    }
    return `${emoji ? "🏁 " : ""}F1 Dutch GP: Race`;
  };

  // File mapping based on active checkboxes
  const getSelectedFile = (emojiActive, practiceActive, qualiActive) => {
    const match = combinations.find(
      (combo) =>
        combo.emoji === emojiActive &&
        combo.practice === practiceActive &&
        combo.quali === qualiActive,
    );

    return match ? match.file : "f1-calendar.ics";
  };

  // Update selected file when checkboxes change
  useEffect(() => {
    const file = getSelectedFile(emoji, practice, quali);
    setSelectedFile(file);
  }, [emoji, practice, quali]);

  const handleEmojiChange = (checked) => {
    setEmoji(checked);
  };

  const handlePracticeChange = (checked) => {
    setPractice(checked);
  };

  const handleQualiChange = (checked) => {
    setQuali(checked);
    // If quali is being unchecked, also uncheck practice
    if (!checked && practice) {
      setPractice(false);
    }
  };

  const handleSubscribe = () => {
    if (selectedFile) {
      const webcalUrl = `webcal://${selectedFile}`;
      window.location.href = webcalUrl;
    }
  };

  return (
    <div className="flex flex-col justify-between gap-8 md:flex-row md:gap-4">
      {/* Checkboxes and File Selection */}
      <div className="flex w-full flex-col gap-6 md:w-1/2">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="emoji"
              checked={emoji}
              onChange={(e) => handleEmojiChange(e.target.checked)}
              className="border-light-gray text-red accent-red h-5 w-5 rounded"
            />
            <label htmlFor="emoji" className="">
              Emoji ⚡
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="practice"
              checked={practice}
              onChange={(e) => handlePracticeChange(e.target.checked)}
              disabled={!quali}
              className="border-light-gray text-red accent-red h-5 w-5 rounded disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label
              htmlFor="practice"
              className={` ${!quali ? "text-light-gray" : "text-black"}`}
            >
              Practice Sessions 🏎️
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="quali"
              checked={quali}
              onChange={(e) => handleQualiChange(e.target.checked)}
              className="border-light-gray text-red accent-red h-5 w-5 rounded"
            />
            <label htmlFor="quali" className="">
              Qualifying ⏱️
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={true}
              disabled
              className="border-light-gray accent-red h-5 w-5 cursor-not-allowed rounded"
            />
            <label className="text-black">Races 🏁</label>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="mb-4">
            <h3 className="mb-2 text-gray-700">Selected File:</h3>
            <div className="bg-off-white rounded-lg p-3">
              <code>{selectedFile}</code>
            </div>
          </div>

          <button
            onClick={handleSubscribe}
            className="bg-red hover:bg-dark-red w-full rounded-lg px-4 py-2 font-bold text-white transition-colors duration-200"
          >
            Subscribe to Calendar
          </button>
        </div>
      </div>

      {/* Calendar Preview */}
      <div className="flex w-[360px] flex-col justify-between gap-4">
        <div>
          <p className="mb-2 font-bold">Original Calendar</p>
          <div className="bg-red flex flex-col rounded-lg text-white">
            <div className="p-3">
              <p className="font-bold">
                🏁 FORMULA 1 HEINEKEN DUTCH GRAND PRIX 2025 - Race
              </p>
              <p>Netherlands</p>
              <p>14:00 - 16:00</p>
            </div>
          </div>
        </div>
        <div>
          <p className="mb-2 font-bold">Your F1 Calendar</p>
          <div className="bg-red flex flex-col rounded-lg text-white">
            <div className="p-3">
              <p className="font-bold">{getPreviewTitle()}</p>
              <p>Netherlands</p>
              <p>14:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
