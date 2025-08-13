import { useState, useEffect } from "react";
import { combinations } from "../components/CalendarCombinations";

export default function Homepage() {
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
    <div className="mx-auto flex max-w-md flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        F1 Calendar Subscription
      </h1>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="emoji"
            checked={emoji}
            onChange={(e) => handleEmojiChange(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="emoji" className="text-sm font-medium text-gray-700">
            Emoji 🏁
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="practice"
            checked={practice}
            onChange={(e) => handlePracticeChange(e.target.checked)}
            disabled={!quali}
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <label
            htmlFor="practice"
            className={`text-sm font-medium ${!quali ? "text-gray-400" : "text-gray-700"}`}
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
            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="quali" className="text-sm font-medium text-gray-700">
            Qualifying ⏱️
          </label>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-medium text-gray-700">
            Selected File:
          </h3>
          <div className="rounded-md bg-gray-100 p-3">
            <code className="text-sm text-gray-800">{selectedFile}</code>
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          className="w-full rounded-md bg-red-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
        >
          Subscribe to Calendar
        </button>
      </div>

      <div className="text-xs text-gray-500">
        <p className="mb-2">Rules:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Emoji: Independent toggle</li>
          <li>Practice: Can only be enabled if Qualifying is enabled</li>
          <li>
            Qualifying: Independent toggle, but disabling it also disables
            Practice
          </li>
        </ul>
      </div>
    </div>
  );
}
