import { useState, useEffect } from "react";
import { combinations } from "./CalendarCombinations";

export default function Subscribe() {
  const [emoji, setEmoji] = useState(false);
  const [practice, setPractice] = useState(false);
  const [quali, setQuali] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

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
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="emoji"
            checked={emoji}
            onChange={(e) => handleEmojiChange(e.target.checked)}
            className="border-light-gray text-red accent-red h-5 w-5 rounded bg-white"
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
            className="border-light-gray text-red accent-red h-5 w-5 rounded bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
            className="border-light-gray text-red accent-red h-5 w-5 rounded bg-white"
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
            className="border-light-gray accent-red h-5 w-5 cursor-not-allowed rounded bg-white"
          />
          <label className="text-black">Races 🏁</label>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="mb-4">
          <h3 className="mb-2 text-gray-700">Selected File:</h3>
          <div className="bg-off-white rounded-md p-3">
            <code>{selectedFile}</code>
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          className="bg-red hover:bg-dark-red w-full rounded-md px-4 py-2 font-bold text-white transition-colors duration-200"
        >
          Subscribe to Calendar
        </button>
      </div>
    </div>
  );
}
