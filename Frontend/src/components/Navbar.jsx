import React from "react";
import ICAL from "ical.js";

async function getNextRace() {
  try {
    const response = await fetch("/f1-calendar.ics");
    const calendarText = await response.text();

    const jcalData = ICAL.parse(calendarText);
    const comp = new ICAL.Component(jcalData);

    const events = comp.getAllSubcomponents("vevent");
    const now = new Date();

    let nextRace = null;

    events.forEach((eventComp) => {
      const event = new ICAL.Event(eventComp);
      const raceDate = event.startDate.toJSDate();

      if (event.summary.includes("GP") && raceDate > now) {
        if (!nextRace || raceDate < nextRace.startDate.toJSDate()) {
          nextRace = event;
        }
      }
    });

    if (nextRace) {
      const location = nextRace.location?.split(",")[0]?.trim() || "";
      const summary = nextRace.summary.replace("Grand Prix", "GP").trim();

      // Formata a data usando apenas JS nativo
      const date = nextRace.startDate.toJSDate().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

      return {
        name: summary,
        location: location,
        date: date,
      };
    }

    return null;
  } catch (error) {
    console.error("Erro ao ler o calendário:", error);
    return null;
  }
}

export default function Navbar() {
  const [nextRace, setNextRace] = React.useState(null);

  React.useEffect(() => {
    getNextRace().then(setNextRace);
  }, []);

  return (
    <nav className="fixed top-0 z-50 w-full">
      {/* Parte fixa */}
      <div className="bg-dark-blue">
        <div
          className="mx-auto max-w-[1600px] py-3"
          style={{
            backgroundImage: `
              linear-gradient(
                180deg, 
                rgba(21, 21, 30, 0.9) 0%, 
                rgba(21, 21, 30, 1) 100%
              ),
              url('/lines.svg')
            `,
            backgroundSize: "cover",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex items-center justify-between">
            {/* Icone - Lado esquerdo */}
            <div className="flex items-center space-x-4">
              <img src="/icon.svg" alt="Logo" className="h-12 w-12" />
              <p className="text-2xl text-white">Custom F1 Calendar</p>
            </div>

            {/* Botoes - Lado direito */}
            <div className="flex items-center space-x-4">
              <button className="bg-red hover:bg-dark-red rounded-full px-4 py-2 text-sm font-semibold text-white transition-colors duration-200">
                Subscribe
              </button>
              <button className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition-colors duration-200">
                Add Manually
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra com próxima corrida */}
      <div className="border-light-gray border-b-2 bg-white">
        <div className="mx-auto max-w-[1600px] py-2">
          <div className="flex items-center justify-between">
            {/* Texto - Lado esquerdo */}
            <div className="flex items-center space-x-4">
              <p>The Calendar you can personalize your way</p>
            </div>

            {/* Próxima corrida - Lado direito */}
            {nextRace ? (
              <div className="flex items-center space-x-4">
                <p>🏁 Next Race</p>
                <p className="font-bold">{nextRace.location}</p>
                <p className="bg-light-gray rounded-lg px-2 py-1 text-sm font-bold">
                  {parseInt(nextRace.date, 10) - 2} - {nextRace.date}
                </p>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <p className="">Nenhuma corrida encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
