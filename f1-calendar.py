import requests
from ics import Calendar

# URL do calendário original
url = "https://better-f1-calendar.vercel.app/api/calendar.ics"
response = requests.get(url)
response.raise_for_status()
calendar = Calendar(response.text)

# Lista de configurações para gerar os ficheiros
configs = [
    {"emojis": True,  "practice": True,  "qualifying": True,  "filename": "myf1calendar-emoji-pract-quali-races.ics"},
    {"emojis": False, "practice": True,  "qualifying": True,  "filename": "myf1calendar-pract-quali-races.ics"},
    {"emojis": True,  "practice": False, "qualifying": True,  "filename": "myf1calendar-emoji-quali-races.ics"},
    {"emojis": False, "practice": False, "qualifying": True,  "filename": "myf1calendar-quali-races.ics"},
    {"emojis": True,  "practice": False, "qualifying": False, "filename": "myf1calendar-emoji-races.ics"},
    {"emojis": False, "practice": False, "qualifying": False, "filename": "myf1calendar-races.ics"},
]

# Emojis para cada tipo de evento
emoji_map = {
    "Practice": "🏎️ ",
    "Qualifying": "⏱️ ",
    "Race": "🏁 ",
}

# Função para gerar calendário filtrado
def generate_calendar(emojis, practice, qualifying):
    new_cal = Calendar()
    for event in calendar.events:
        include_event = False
        if practice and "Practice" in event.name:
            include_event = True
        if qualifying and "Qualifying" in event.name:
            include_event = True
        if "Race" in event.name:
            include_event = True

        if include_event:
            new_event = event.clone()
            if emojis:
                if "Practice" in new_event.name:
                    new_event.name = emoji_map["Practice"] + new_event.name
                elif "Qualifying" in new_event.name:
                    new_event.name = emoji_map["Qualifying"] + new_event.name
                elif "Race" in new_event.name:
                    new_event.name = emoji_map["Race"] + new_event.name
            new_event.description = None
            new_cal.events.add(new_event)
    return new_cal

# Loop para gerar todos os ficheiros
for cfg in configs:
    cal = generate_calendar(cfg["emojis"], cfg["practice"], cfg["qualifying"])
    ics_text = cal.serialize()
    lines = [line.strip() for line in ics_text.splitlines() if line.strip()]
    ics_crlf = "\r\n".join(lines) + "\r\n"
    with open(cfg["filename"], "w", encoding="utf-8", newline="") as f:
        f.write(ics_crlf)

print("Todos os calendários F1 foram criados com sucesso!")
