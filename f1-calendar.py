import requests
from ics import Calendar

# URL do calendário
url = "https://better-f1-calendar.vercel.app/api/calendar.ics"

response = requests.get(url)
response.raise_for_status()
calendar = Calendar(response.text)
F1calendar = Calendar()

# Filtra os eventos
for event in calendar.events:
    if "Practice" in event.name:
        event.name = event.name.replace("Practice", "🏎️ Practice")
        event.description = None
        # event.url = None
        F1calendar.events.add(event)
    if "Qualifying" in event.name:
        event.name = event.name.replace("Qualifying", "⏱️ Qualifying")
        event.description = None
        # event.url = None
        F1calendar.events.add(event)
    if "Race" in event.name:
        event.name = event.name.replace("Race", "🏁 Race")
        event.description = None
        # event.url = None
        F1calendar.events.add(event)

# Serializa o calendário, tira linhas em branco e adiciona CRLF 
ics_text = F1calendar.serialize()
lines = [line.strip() for line in ics_text.splitlines() if line.strip() != ""]
ics_crlf = "\r\n".join(lines) + "\r\n"

# Guarda o ficheiro
with open("f1-calendar-w-emoji-pract-quali.ics", "w", encoding="utf-8", newline="") as file:
    file.write(ics_crlf)

print("Calendário F1 personalizado criado com sucesso!")